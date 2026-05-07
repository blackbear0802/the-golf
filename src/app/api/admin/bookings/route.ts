import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const FLAG_MAP: Record<string, string> = {
  thailand: '🇹🇭', vietnam: '🇻🇳', philippines: '🇵🇭',
  malaysia: '🇲🇾', japan: '🇯🇵',
}

export async function GET() {
  const bookings = await db.booking.findMany({
    include: {
      product: {
        include: {
          destination: { select: { code: true, nameKo: true } },
          venue:       { select: { region: true } },
        },
      },
      user: { select: { name: true, phone: true } },
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
      guestName: b.user.name,
      guestPhone: b.user.phone ?? '',
      specialRequests: b.specialRequests,
    }))
  )
}
