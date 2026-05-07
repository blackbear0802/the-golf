'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ADMIN_STATS } from '@/lib/mock-admin-data'

const NAV_ITEMS = [
  { href: '/admin', label: '대시보드', icon: '📊', exact: true },
  { href: '/admin/crm', label: '예약 관리', icon: '📋', badge: ADMIN_STATS.pendingCount },
  { href: '/admin/products', label: '상품 관리', icon: '⛳' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] shrink-0 flex flex-col bg-primary min-h-screen sticky top-0">
      {/* 로고 */}
      <div className="px-6 py-5 border-b border-white/10">
        <span className="font-display text-lg text-accent font-normal tracking-wide">더 골프</span>
        <span className="ml-2 text-[10px] text-white/40 uppercase tracking-widest">Admin</span>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 py-4">
        {NAV_ITEMS.map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                active
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>

      {/* 하단 링크 */}
      <div className="px-5 py-4 border-t border-white/10">
        <Link
          href="/"
          className="text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          ← 사이트로 돌아가기
        </Link>
      </div>
    </aside>
  )
}
