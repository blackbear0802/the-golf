import Link from 'next/link'

const COLS = [
  {
    title: '여행',
    links: [
      { href: '/search', label: '골프 여행 탐색' },
      { href: '/search?deal=true', label: '이번 주 특가' },
      { href: '/search', label: '나라별 코스' },
      { href: '/matching', label: '동행 매칭' },
    ],
  },
  {
    title: '서비스',
    links: [
      { href: '/my/bookings', label: '예약 확인' },
      { href: '/my/scorecard', label: '스코어카드' },
      { href: '/my/reviews', label: '고객 리뷰' },
      { href: '/', label: '공지사항' },
    ],
  },
  {
    title: '회사',
    links: [
      { href: '/', label: '소개' },
      { href: '/', label: '고객센터' },
      { href: '/', label: '개인정보처리방침' },
      { href: '/', label: '이용약관' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary-deep">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 pt-10 lg:pt-12 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 lg:gap-10 pb-10 border-b border-white/[0.08]">
          {/* 브랜드 — 모바일에서 전체 너비 */}
          <div className="col-span-2 lg:col-span-1">
            <div className="font-display text-accent text-lg font-bold tracking-[0.14em] mb-3">
              THE GOLF
            </div>
            <p className="text-[13px] text-white/35 leading-[1.65]">
              골프 여행의 고급스러움을<br />더 많은 골퍼에게.<br />태국·베트남·필리핀·말레이시아·일본
            </p>
          </div>
          {COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-white/45 tracking-[0.1em] uppercase mb-3.5">
                {col.title}
              </h4>
              {col.links.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[13px] text-white/50 hover:text-white/80 mb-2 no-underline transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 mt-7">
          <span className="text-xs text-white/25">© 2026 THE GOLF. All rights reserved.</span>
          <div className="flex gap-5">
            {['개인정보처리방침', '이용약관', '고객센터'].map(label => (
              <Link key={label} href="/" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
