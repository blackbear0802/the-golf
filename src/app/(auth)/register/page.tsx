'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('이름, 이메일, 비밀번호는 필수 항목입니다.')
      return
    }
    if (form.password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        password: form.password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? '회원가입 중 오류가 발생했습니다.')
      setLoading(false)
      return
    }

    // 가입 완료 후 자동 로그인
    await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    router.push('/')
    router.refresh()
  }

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder-gray-400'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0d1f19' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="font-display text-accent text-2xl font-bold tracking-[0.14em]">
            THE GOLF
          </Link>
          <p className="text-white/45 text-sm mt-3">골프 여행의 고급스러움을 더 많은 골퍼에게</p>
        </div>

        <div className="bg-white rounded-[20px] p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-1.5">회원가입</h2>
          <p className="text-sm text-gray-500 mb-6">더 골프 계정을 만드세요</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>이름 *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="홍길동"
                value={form.name}
                onChange={set('name')}
                autoComplete="name"
              />
            </div>
            <div>
              <label className={labelClass}>이메일 *</label>
              <input
                type="email"
                className={inputClass}
                placeholder="example@email.com"
                value={form.email}
                onChange={set('email')}
                autoComplete="email"
              />
            </div>
            <div>
              <label className={labelClass}>연락처</label>
              <input
                type="tel"
                className={inputClass}
                placeholder="010-0000-0000"
                value={form.phone}
                onChange={set('phone')}
                autoComplete="tel"
              />
              <p className="text-xs text-gray-400 mt-1">예약 확인 연락에 사용됩니다.</p>
            </div>
            <div>
              <label className={labelClass}>비밀번호 *</label>
              <input
                type="password"
                className={inputClass}
                placeholder="8자 이상"
                value={form.password}
                onChange={set('password')}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className={labelClass}>비밀번호 확인 *</label>
              <input
                type="password"
                className={inputClass}
                placeholder="비밀번호를 다시 입력하세요"
                value={form.confirmPassword}
                onChange={set('confirmPassword')}
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors mt-1"
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">이미 계정이 있으신가요?</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <Link
            href="/login"
            className="block w-full text-center border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            로그인
          </Link>

          <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
            가입 시{' '}
            <Link href="/" className="text-primary underline">이용약관</Link>
            {' '}및{' '}
            <Link href="/" className="text-primary underline">개인정보처리방침</Link>
            에 동의합니다.
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-white/35 hover:text-white/65 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
