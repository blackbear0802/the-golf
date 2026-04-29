import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  return NextResponse.json([])
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json(body, { status: 201 })
}
