'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/mock-data'

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = PRODUCTS.find(p => p.id === params.id)

  const [form, setForm] = useState({
    guestName: '',
    guestPhone: '',
    checkInDate: '',
    travelerCount: '2',
    specialRequests: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>상품을 찾을 수 없습니다.</p>
        <Link href="/search" className="text-primary underline text-sm mt-2 block">탐색으로 돌아가기</Link>
      </div>
    )
  }

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.guestName || !form.guestPhone || !form.checkInDate) {
      setError('이름, 연락처, 출발 희망일을 입력해주세요.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const idempotencyKey = crypto.randomUUID()
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product!.id,
          idempotencyKey,
          checkInDate: form.checkInDate,
          travelerCount: Number(form.travelerCount),
          guestName: form.guestName,
          guestPhone: form.guestPhone,
          specialRequests: form.specialRequests,
        }),
      })
      const data = await res.json()
      router.push(`/booking/complete?bookingId=${data.bookingId}`)
    } catch {
      setError('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder-gray-400'

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
      <div className="mb-6">
        <Link href={`/products/${product.id}`} className="text-sm text-gray-500 hover:text-primary transition-colors">
          ← 상품 상세로 돌아가기
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* 예약 폼 */}
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl text-gray-900 font-normal mb-6">예약 문의</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* 연락처 정보 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">연락처 정보</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 *</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="예약자 이름을 입력하세요"
                    value={form.guestName}
                    onChange={set('guestName')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 *</label>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="010-0000-0000"
                    value={form.guestPhone}
                    onChange={set('guestPhone')}
                  />
                  <p className="text-xs text-gray-400 mt-1.5">담당자가 이 번호로 연락드립니다.</p>
                </div>
              </div>
            </div>

            {/* 여행 정보 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">여행 정보</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">출발 희망일 *</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={form.checkInDate}
                    onChange={set('checkInDate')}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">인원수</label>
                  <select className={inputClass} value={form.travelerCount} onChange={set('travelerCount')}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n}명</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">특별 요청사항</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="알레르기, 특별 요청 사항 등을 알려주세요"
                    value={form.specialRequests}
                    onChange={set('specialRequests')}
                  />
                </div>
              </div>
            </div>

            {/* 안내 */}
            <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-primary/80">
              예약 확정 전 문의 단계입니다. 담당자가 24시간 내 연락하여 일정과 금액을 최종 확인합니다.
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors text-base"
            >
              {submitting ? '접수 중...' : '예약 문의 접수하기'}
            </button>
          </form>
        </div>

        {/* 상품 요약 카드 (sticky) */}
        <aside className="lg:w-[320px] shrink-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden lg:sticky lg:top-[84px]">
            <div
              className="h-36 flex items-center justify-center text-5xl relative"
              style={{ background: product.bg }}
            >
              ⛳
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(13,31,25,0.5) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-3 left-3 z-10">
                <span className="text-[11px] text-white bg-primary/70 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  {product.flag} {product.destination} · {product.city}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3">{product.title}</h3>
              <div className="flex flex-col gap-1.5 text-xs text-gray-500 mb-4">
                <span>{product.nights}박 {product.nights + 1}일 · {product.rounds}라운드</span>
                {product.includesFlight && <span>✈️ 항공 포함</span>}
                {product.includesHotel && <span>🏨 호텔 포함</span>}
                {product.includesCaddie && <span>🧤 캐디 포함</span>}
              </div>
              <div className="border-t border-gray-100 pt-4">
                {product.isDeal && (
                  <div className="font-en text-xs text-gray-400 line-through">{product.originalPrice}만원</div>
                )}
                <div className="font-en text-2xl font-bold text-red-600 leading-none">
                  {product.dealPrice}
                  <span className="text-sm font-normal text-gray-500 font-sans">만원~</span>
                </div>
                <div className="text-[11px] text-gray-400 mt-1">1인 기준 · VAT 포함</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
