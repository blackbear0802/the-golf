import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const products = await db.product.findMany({ where: { status: 'PUBLISHED' } })
  return NextResponse.json(products)
}
