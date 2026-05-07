import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const FLAG_MAP: Record<string, string> = {
  thailand: '🇹🇭', vietnam: '🇻🇳', philippines: '🇵🇭',
  malaysia: '🇲🇾', japan: '🇯🇵',
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id ?? req.cookies.get('userId')?.value
  if (!userId) return NextResponse.json([])

  const bookings = await db.booking.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          destination: { select: { code: true, nameKo: true } },
          venue:       { select: { region: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(
    bookings.map(b => ({
      id: b.bookingId,
      productId: b.productId,
      productTitle: b.product.title,
      destination: b.product.destination?.nameKo ?? '해외',
      flag: FLAG_MAP[b.product.destination?.code ?? ''] ?? '🌏',
      city: b.product.venue?.region ?? '',
      nights: b.product.nights ?? 3,
      rounds: b.product.rounds ?? 2,
      checkInDate: b.checkInDate.toISOString().split('T')[0],
      travelerCount: b.travelerCount,
      totalPrice: Math.round((b.product.price?.toNumber() ?? 0) / 10000 * b.travelerCount),
      status: b.status,
      createdAt: b.createdAt.toISOString().split('T')[0],
      specialRequests: b.specialRequests,
    }))
  )
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { productId, checkInDate, travelerCount, guestName, guestPhone, specialRequests, idempotencyKey } = body

  if (!productId || !checkInDate || !travelerCount || !guestName || !guestPhone) {
    return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
  }

  // 중복 제출 방지
  if (idempotencyKey) {
    const existing = await db.booking.findUnique({ where: { idempotencyKey } })
    if (existing) return NextResponse.json({ bookingId: existing.bookingId })
  }

  const product = await db.product.findUnique({ where: { productId } })
  if (!product) {
    return NextResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 })
  }

  // 로그인 상태면 세션 사용, 아니면 전화번호로 게스트 사용자 생성
  const session = await getServerSession(authOptions)
  let userId: string

  if (session?.user?.id) {
    userId = session.user.id
  } else {
    let user = await db.user.findFirst({ where: { phone: guestPhone } })
    if (!user) {
      user = await db.user.create({
        data: { name: guestName, phone: guestPhone, role: 'customer' },
      })
    }
    userId = user.userId
  }

  const checkIn = new Date(checkInDate)
  const checkOut = new Date(checkIn)
  checkOut.setDate(checkOut.getDate() + (product.nights ?? 3))

  const booking = await db.booking.create({
    data: {
      userId,
      productId,
      status: 'REQUESTED',
      travelerCount: Number(travelerCount),
      specialRequests: specialRequests || null,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      idempotencyKey: idempotencyKey || null,
    },
  })

  const res = NextResponse.json({ bookingId: booking.bookingId }, { status: 201 })
  // 비로그인 게스트인 경우 쿠키로 userId 유지
  if (!session?.user?.id) {
    res.cookies.set('userId', userId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    })
  }
  return res
}
