import Link from 'next/link'
import HeroChatInput from '@/components/features/HeroChatInput'

const DEAL_CARDS = [
  {
    id: 1,
    country: '🇹🇭 태국 · 치앙마이',
    slots: 3,
    title: '치앙마이 3박 4일\n3라운드 골프 패키지',
    meta: '5월 출발 기준',
    tags: ['그린피 3R', '캐디 포함', '숙박 포함'],
    slotsPct: 70,
    originalPrice: '128만원',
    dealPrice: '89',
    discount: '-30%',
    bg: 'linear-gradient(135deg, #1a6b3a 0%, #0d4a28 100%)',
    critical: false,
  },
  {
    id: 2,
    country: '🇻🇳 베트남 · 다낭',
    slots: 5,
    title: '다낭 해변 골프 4박 5일\n프리미엄 코스',
    meta: '5월 출발 기준',
    tags: ['그린피 3R', '호텔 포함'],
    slotsPct: 50,
    originalPrice: '168만원',
    dealPrice: '115',
    discount: '-32%',
    bg: 'linear-gradient(135deg, #1a4d6e 0%, #0d2a40 100%)',
    critical: false,
  },
  {
    id: 3,
    country: '🇵🇭 필리핀 · 클라크',
    slots: 1,
    title: '클라크 3박 4일\n2라운드 + 캐디',
    meta: '5월 출발 기준',
    tags: ['그린피 2R', '캐디 포함', '숙박 포함'],
    slotsPct: 93,
    originalPrice: '98만원',
    dealPrice: '72',
    discount: '-27%',
    bg: 'linear-gradient(135deg, #2a3a6e 0%, #151e40 100%)',
    critical: true,
  },
]

const DESTINATIONS = [
  { flag: '🇹🇭', name: '태국', price: '89만원~', courses: '14개 코스', bg: 'linear-gradient(180deg, #1a6b3a 0%, #0a3d20 100%)' },
  { flag: '🇻🇳', name: '베트남', price: '95만원~', courses: '9개 코스', bg: 'linear-gradient(180deg, #1a4d6e 0%, #0d2a40 100%)' },
  { flag: '🇵🇭', name: '필리핀', price: '72만원~', courses: '7개 코스', bg: 'linear-gradient(180deg, #2a3a6e 0%, #151e40 100%)' },
  { flag: '🇲🇾', name: '말레이시아', price: '108만원~', courses: '6개 코스', bg: 'linear-gradient(180deg, #6e2a2a 0%, #401515 100%)' },
  { flag: '🇯🇵', name: '일본', price: '135만원~', courses: '5개 코스', bg: 'linear-gradient(180deg, #3f4a44 0%, #1a2020 100%)' },
]

const TRUST_ITEMS = [
  { num: '24h', label: '예약 후 담당자\n연락 보장' },
  { num: '100%', label: '현지 그린피\n사전 확보' },
  { num: '4.8★', label: '누적 고객\n만족도' },
  { num: '2,400+', label: '누적 예약\n완료' },
]

const REVIEWS = [
  { initial: '김', name: '김○○ · 52세', trip: '태국 치앙마이 · 2026.03', stars: 5, text: '"담당자가 세세하게 챙겨줘서 처음 해외 골프 여행인데도 전혀 불안하지 않았습니다. 코스 컨디션도 최상이었어요."' },
  { initial: '박', name: '박○○ · 47세', trip: '베트남 다낭 · 2026.02', stars: 5, text: '"AI한테 \'다낭 4박, 4명, 150만원 이하\'라고 했더니 딱 맞는 패키지를 바로 찾아줬어요. 예약 과정도 너무 간편했습니다."' },
  { initial: '이', name: '이○○ · 55세', trip: '필리핀 클라크 · 2026.01', stars: 4, text: '"특가 알림 받고 바로 예약했는데 비용 대비 만족도가 높았습니다. 캐디 실력도 좋고, 코스 관리 상태가 기대 이상이었어요."' },
]

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section
        className="min-h-[80vh] lg:min-h-[calc(100vh-102px)] flex flex-col items-center justify-center px-4 sm:px-8 pb-14 pt-12 lg:pb-20 lg:pt-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0d1f19 0%, #163028 55%, #1e4a38 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(30,74,56,0.6) 0%, transparent 65%)' }}
        />
        <div
          className="absolute right-[4%] bottom-[-40px] text-[160px] lg:text-[260px] opacity-[0.04] select-none pointer-events-none"
          style={{ transform: 'rotate(-12deg)' }}
        >
          ⛳
        </div>

        <div className="relative z-10 w-full max-w-[720px] flex flex-col items-center text-center">
          <div className="flex items-center gap-2.5 mb-4 lg:mb-5">
            <span className="w-6 h-px bg-accent opacity-60" />
            <span className="text-[10px] lg:text-[11px] text-accent-soft tracking-[0.22em] uppercase font-medium">AI 골프 여행 플래너</span>
            <span className="w-6 h-px bg-accent opacity-60" />
          </div>

          <h1 className="font-display text-[32px] sm:text-4xl lg:text-5xl text-white leading-[1.2] font-normal mb-3">
            어디로 떠나고 싶으세요?<br />
            <strong className="text-accent font-bold">특가로 찾아드릴게요.</strong>
          </h1>

          <p className="text-[14px] lg:text-[15px] text-white/45 leading-relaxed mb-7 lg:mb-9">나라, 예산, 인원수만 말씀하세요</p>

          <HeroChatInput />

          {/* 통계 */}
          <div className="flex gap-4 sm:gap-9 mt-2">
            {[
              { num: '2,400+', label: '누적 예약' },
              { num: '4.8 ★', label: '고객 만족도' },
              { num: '5개국', label: '직접 소싱' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4 sm:gap-9">
                {i > 0 && <div className="w-px h-7 bg-white/10" />}
                <div className="text-center">
                  <div className="font-en text-base sm:text-xl font-bold text-white/85">{stat.num}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/35 mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 lg:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer">
          <span className="text-[12px] lg:text-[13px] font-bold text-accent tracking-[0.06em]">이번 주 특가 보기</span>
          <svg className="w-5 h-5 animate-bounce" viewBox="0 0 20 20" fill="none" stroke="#c9a227" strokeWidth="2.5">
            <polyline points="4 7 10 13 16 7" />
          </svg>
        </div>
      </section>

      {/* ─── 메인 콘텐츠 ─── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-10 lg:py-14 flex flex-col gap-10 lg:gap-14">

        {/* 이번 주 특가 */}
        <section>
          <div className="flex items-end justify-between mb-5 lg:mb-6">
            <div>
              <p className="text-[11px] text-accent tracking-[0.2em] uppercase font-medium mb-1.5">이번 주 특가</p>
              <h2 className="font-display text-[22px] lg:text-[26px] text-gray-900 font-normal flex items-center gap-2">
                지금 할인 중인 패키지{' '}
                <span className="font-sans text-xs bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full font-semibold">🔥 HOT</span>
              </h2>
            </div>
            <Link href="/search?deal=true" className="text-[13px] text-gray-500 hover:text-primary transition-colors pb-1 shrink-0">
              전체보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEAL_CARDS.map(card => (
              <div
                key={card.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="relative h-40 flex items-center justify-center text-4xl" style={{ background: card.bg }}>
                  ⛳
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(13,31,25,0.5) 0%, transparent 60%)' }}
                  />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[11px] text-white bg-primary/70 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                      {card.country}
                    </span>
                    <span className="text-[11px] font-bold text-white bg-red-600/85 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                      {card.critical ? `🔴 마지막 ${card.slots}자리` : `⚠ 잔여 ${card.slots}자리`}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-1.5">
                  <div className="text-base font-semibold text-gray-900 leading-snug whitespace-pre-line">
                    {card.title}
                  </div>
                  <div className="text-[13px] text-gray-500">{card.meta}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {card.tags.map(tag => (
                      <span key={tag} className="text-[11px] text-primary bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-red-500 whitespace-nowrap">
                      {card.critical ? `🔴 마지막 ${card.slots}자리` : `⚠ 잔여 ${card.slots}자리`}
                    </span>
                    <div className="flex-1 h-0.5 bg-gray-100 rounded overflow-hidden">
                      <div className="h-full bg-red-500 rounded" style={{ width: `${card.slotsPct}%` }} />
                    </div>
                  </div>
                  <div className="flex items-end justify-between mt-1 pt-3 border-t border-gray-100">
                    <div>
                      <div className="font-en text-xs text-gray-400 line-through">{card.originalPrice}</div>
                      <div className="font-en text-2xl font-bold text-red-600 leading-none">
                        {card.dealPrice}
                        <span className="text-xs font-normal text-gray-500 font-sans">만원~</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-red-600 text-white text-[13px] font-bold px-2.5 py-1 rounded font-en">
                        {card.discount}
                      </span>
                      <button className="bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-colors">
                        예약 문의
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 인기 여행지 */}
        <section>
          <div className="flex items-end justify-between mb-5 lg:mb-6">
            <div>
              <p className="text-[11px] text-accent tracking-[0.2em] uppercase font-medium mb-1.5">Destinations</p>
              <h2 className="font-display text-[22px] lg:text-[26px] text-gray-900 font-normal">인기 골프 여행지</h2>
            </div>
            <Link href="/search" className="text-[13px] text-gray-500 hover:text-primary transition-colors pb-1 shrink-0">
              전체 여행지 →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {DESTINATIONS.map(dest => (
              <div
                key={dest.name}
                className="rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all relative"
                style={{ aspectRatio: '3/4' }}
              >
                <div className="absolute inset-0" style={{ background: dest.bg }} />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(13,31,25,0.85) 0%, rgba(13,31,25,0.05) 60%)' }}
                />
                <div className="absolute bottom-3 left-3 z-10">
                  <div className="text-xl mb-1">{dest.flag}</div>
                  <div className="font-display text-[15px] text-white font-bold">{dest.name}</div>
                  <div className="font-en text-xs text-accent-soft mt-0.5">{dest.price}</div>
                  <div className="text-[11px] text-white/50">{dest.courses}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 신뢰 섹션 */}
        <div
          className="rounded-[20px] p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          style={{ background: '#163028' }}
        >
          <div>
            <h2 className="font-display text-[22px] lg:text-[28px] text-white font-normal leading-[1.35] mb-3">
              왜 더 골프인가요?
            </h2>
            <p className="text-sm text-white/50 leading-[1.7]">
              밴드 공급망을 통해 현지 그린피를 직접 소싱합니다. 예약 요청 후 24시간 내 전담 담당자가 연락드리고, 출발까지 모든 과정을 함께합니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {TRUST_ITEMS.map(item => (
              <div key={item.num} className="bg-white/5 border border-white/[0.08] rounded-xl p-4 lg:p-5">
                <div className="font-en text-2xl lg:text-[28px] font-bold text-accent">{item.num}</div>
                <div className="text-xs text-white/45 mt-1 leading-[1.4] whitespace-pre-line">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 리뷰 */}
        <section>
          <div className="flex items-end justify-between mb-5 lg:mb-6">
            <div>
              <p className="text-[11px] text-accent tracking-[0.2em] uppercase font-medium mb-1.5">Reviews</p>
              <h2 className="font-display text-[22px] lg:text-[26px] text-gray-900 font-normal">골퍼들의 이야기</h2>
            </div>
            <Link href="/my/reviews" className="text-[13px] text-gray-500 hover:text-primary transition-colors pb-1 shrink-0">
              리뷰 더보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map(review => (
              <div key={review.name} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-accent text-sm font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #163028, #204a3c)' }}
                  >
                    {review.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{review.trip}</div>
                  </div>
                  <div className="text-[13px] text-accent shrink-0">
                    {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-[1.65]">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
