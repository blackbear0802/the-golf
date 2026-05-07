import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json()

  const allowed = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: '잘못된 상태값입니다.' }, { status: 400 })
  }

  const booking = await db.booking.update({
    where: { bookingId: params.id },
    data: {
      status,
      ...(status === 'CONFIRMED' ? { confirmedAt: new Date() } : {}),
    },
  })

  return NextResponse.json({ bookingId: booking.bookingId, status: booking.status })
}
