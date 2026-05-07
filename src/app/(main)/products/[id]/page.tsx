import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/mock-data'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find(p => p.id === params.id)
  if (!product) notFound()

  const discountPct = Math.round((1 - product.dealPrice / product.originalPrice) * 100)

  return (
    <>
      {/* 히어로 */}
      <div
        className="relative h-56 sm:h-72 lg:h-80 flex items-end"
        style={{ background: product.bg }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-[120px] lg:text-[160px] opacity-10 select-none">
          ⛳
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(13,31,25,0.85) 0%, rgba(13,31,25,0.1) 60%)' }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 pb-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/search" className="text-xs text-white/60 hover:text-white/90 transition-colors">탐색</Link>
            <span className="text-white/40 text-xs">›</span>
            <span className="text-xs text-white/60">{product.destination}</span>
            <span className="text-white/40 text-xs">›</span>
            <span className="text-xs text-white/90">{product.city}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug">
            {product.title}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[13px] text-white/65">{product.flag} {product.destination} · {product.city}</span>
            <span className="text-white/30">·</span>
            <span className="text-[13px] text-white/65">{product.nights}박 {product.nights + 1}일 {product.rounds}라운드</span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* 왼쪽 콘텐츠 */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* 개요 */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-xl text-gray-900 font-normal mb-4">패키지 소개</h2>
              <p className="text-sm text-gray-600 leading-[1.8]">{product.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  { label: '여행 기간', value: `${product.nights}박 ${product.nights + 1}일` },
                  { label: '라운드', value: `${product.rounds}라운드` },
                  { label: '출발 도시', value: product.departureCity },
                  { label: '여행지', value: `${product.flag} ${product.city}` },
                ].map(item => (
                  <div key={item.label} className="bg-background rounded-xl p-3">
                    <div className="text-[11px] text-gray-400 mb-1">{item.label}</div>
                    <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 포함사항 */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-xl text-gray-900 font-normal mb-4">포함사항</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { included: true, label: `그린피 ${product.rounds}라운드`, icon: '⛳' },
                  { included: product.includesFlight, label: '항공권', icon: '✈️' },
                  { included: product.includesHotel, label: '호텔 숙박', icon: '🏨' },
                  { included: product.includesCaddie, label: '전담 캐디', icon: '🧤' },
                  { included: true, label: '공항 이동 지원', icon: '🚌' },
                  { included: true, label: '전담 매니저 배정', icon: '👤' },
                ].map(item => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      item.included ? 'bg-primary/5' : 'bg-gray-50 opacity-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className={`text-sm ${item.included ? 'text-gray-800 font-medium' : 'text-gray-400 line-through'}`}>
                      {item.label}
                    </span>
                    {item.included && <span className="ml-auto text-primary text-xs font-bold">✓</span>}
                  </div>
                ))}
              </div>
            </section>

            {/* 일정 */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-xl text-gray-900 font-normal mb-5">여행 일정</h2>
              <div className="flex flex-col">
                {product.schedule.map((day, i) => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-accent text-xs font-bold shrink-0">
                        {day.day}
                      </div>
                      {i < product.schedule.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className={`pb-5 ${i === product.schedule.length - 1 ? 'pb-0' : ''}`}>
                      <p className="text-sm font-semibold text-gray-900">{day.title}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 취소 정책 */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-xl text-gray-900 font-normal mb-4">취소 정책</h2>
              <div className="flex flex-col">
                {product.cancellation.map(policy => (
                  <div key={policy.daysBefore} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{policy.label}</span>
                    <span className={`text-sm font-semibold ${
                      policy.penalty === 0 ? 'text-primary' : policy.penalty === 100 ? 'text-red-600' : 'text-orange-500'
                    }`}>
                      {policy.penalty === 0 ? '무료 취소' : `${policy.penalty}% 위약금`}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 리뷰 */}
            {product.reviews.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-display text-xl text-gray-900 font-normal mb-4">
                  고객 리뷰 <span className="font-sans text-base text-gray-400">({product.reviews.length})</span>
                </h2>
                <div className="flex flex-col gap-5">
                  {product.reviews.map(review => (
                    <div key={review.name} className="flex gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-accent text-sm font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, #163028, #204a3c)' }}
                      >
                        {review.initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                          <span className="text-xs text-gray-400">{review.trip}</span>
                          <span className="text-xs text-accent ml-auto">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* 오른쪽 예약 카드 (데스크톱 sticky) */}
          <aside className="hidden lg:block w-[340px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-[84px]">
              {product.isDeal && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-4 flex items-center gap-2">
                  <span className="text-red-600 text-xs font-bold">🔥 이번 주 특가</span>
                  <span className="text-xs text-red-500 ml-auto">잔여 {product.slotsRemaining}자리</span>
                </div>
              )}
              <div className="mb-5">
                {product.isDeal && (
                  <div className="font-en text-sm text-gray-400 line-through">{product.originalPrice}만원</div>
                )}
                <div className="flex items-end gap-2">
                  <div className="font-en text-3xl font-bold text-red-600 leading-none">
                    {product.dealPrice}
                    <span className="text-base font-normal text-gray-500 font-sans">만원~</span>
                  </div>
                  {product.isDeal && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded font-en mb-0.5">
                      -{discountPct}%
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">1인 기준 · VAT 포함</div>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                {[
                  `${product.nights}박 ${product.nights + 1}일 · ${product.rounds}라운드`,
                  product.includesFlight ? '✈️ 항공 포함' : '✈️ 항공 미포함',
                  product.includesHotel ? '🏨 호텔 포함' : null,
                  product.includesCaddie ? '🧤 캐디 포함' : null,
                ].filter(Boolean).map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href={`/booking/${product.id}`}
                className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                예약 문의하기
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3">예약 후 24시간 내 담당자 연락</p>
            </div>
          </aside>
        </div>
      </div>

      {/* 모바일 하단 고정 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div>
          {product.isDeal && (
            <div className="font-en text-xs text-gray-400 line-through">{product.originalPrice}만원</div>
          )}
          <div className="font-en text-xl font-bold text-red-600 leading-none">
            {product.dealPrice}
            <span className="text-sm font-normal text-gray-500 font-sans">만원~</span>
          </div>
        </div>
        <Link
          href={`/booking/${product.id}`}
          className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
        >
          예약 문의하기
        </Link>
      </div>
      <div className="h-20 lg:hidden" />
    </>
  )
}
