import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { name, email, password, phone } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: '이름, 이메일, 비밀번호를 입력해주세요.' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: '비밀번호는 8자 이상이어야 합니다.' }, { status: 400 })
  }

  const existing = await db.user.findFirst({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: '이미 사용 중인 이메일입니다.' }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await db.user.create({
    data: {
      name,
      email,
      phone: phone || null,
      passwordHash,
      role: 'customer',
    },
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
