'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MOCK_USER } from '@/lib/mock-user-data'

const NAV_ITEMS = [
  { href: '/my', label: '프로필', icon: '👤' },
  { href: '/my/bookings', label: '예약 내역', icon: '📋' },
  { href: '/my/scorecard', label: '스코어카드', icon: '⛳' },
  { href: '/my/reviews', label: '내 리뷰', icon: '⭐' },
]

export default function MyNav() {
  const pathname = usePathname()

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <aside className="hidden lg:block w-[240px] shrink-0">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-[84px]">
          <div
            className="px-6 py-6 text-center"
            style={{ background: 'linear-gradient(135deg, #163028, #204a3c)' }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-accent text-2xl font-bold bg-white/10">
              {MOCK_USER.initial}
            </div>
            <p className="text-white font-semibold text-base">{MOCK_USER.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{MOCK_USER.email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <span className="text-accent text-xs font-bold">H</span>
              <span className="text-white text-xs font-semibold">{MOCK_USER.handicapIndex}</span>
            </div>
          </div>
          <nav className="py-2">
            {NAV_ITEMS.map(item => {
              const active = item.href === '/my' ? pathname === '/my' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                    active
                      ? 'text-primary font-semibold bg-primary/5'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                  {active && <span className="ml-auto w-1 h-4 rounded-full bg-primary" />}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* 모바일 탭바 */}
      <div className="lg:hidden bg-white border-b border-gray-100 px-4 mb-6 -mx-4">
        <div className="flex">
          {NAV_ITEMS.map(item => {
            const active = item.href === '/my' ? pathname === '/my' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors border-b-2 ${
                  active
                    ? 'text-primary border-primary font-semibold'
                    : 'text-gray-500 border-transparent'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
