import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const groups = await db.bookingGroup.findMany({ where: { status: 'OPEN' } })
  return NextResponse.json(groups)
}
