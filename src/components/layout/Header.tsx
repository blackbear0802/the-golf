'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/search', label: '골프 여행 탐색' },
  { href: '/search?deal=true', label: '이번 주 특가 🔥' },
  { href: '/matching', label: '동행 매칭' },
  { href: '/my/scorecard', label: '스코어카드' },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'

  async function handleSignOut() {
    setMenuOpen(false)
    await signOut({ redirect: false })
    router.push('/')
    router.refresh()
  }

  return (
    <div className="sticky top-0 z-50">
      <header className="bg-primary h-16 border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 h-full flex items-center gap-4 lg:gap-10">
          <Link
            href="/"
            className="font-display text-accent text-xl font-bold tracking-[0.14em] shrink-0"
          >
            THE GOLF
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`text-sm px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  pathname === href
                    ? 'text-white font-semibold'
                    : 'text-white/65 hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* 데스크톱 우측 */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isLoggedIn ? (
              <>
                <Link href="/my" className="text-[13px] text-white/65 hover:text-white transition-colors">
                  {session?.user?.name ?? '내 계정'}
                </Link>
                <Link href="/my/bookings" className="text-[13px] text-white/65 hover:text-white transition-colors">
                  예약 확인
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-[13px] text-accent border border-accent px-[18px] py-1.5 rounded-full font-semibold hover:bg-accent hover:text-primary-deep transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link href="/my/bookings" className="text-[13px] text-white/65 hover:text-white transition-colors">
                  예약 확인
                </Link>
                <Link
                  href="/login"
                  className="text-[13px] text-accent border border-accent px-[18px] py-1.5 rounded-full font-semibold hover:bg-accent hover:text-primary-deep transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/register"
                  className="text-[13px] font-semibold text-primary bg-accent hover:bg-accent-hover px-4 py-1.5 rounded-full transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>

          {/* 모바일 우측 */}
          <div className="flex lg:hidden items-center gap-2 ml-auto shrink-0">
            {isLoggedIn ? (
              <span className="text-[12px] text-white/65 truncate max-w-[80px]">
                {session?.user?.name}
              </span>
            ) : (
              <Link
                href="/login"
                className="text-[12px] font-semibold text-accent border border-accent px-3 py-1.5 rounded-full transition-colors"
              >
                로그인
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1.5 rounded-lg hover:bg-white/[0.07] transition-colors"
              aria-label="메뉴"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 드롭다운 */}
      {menuOpen && (
        <div className="lg:hidden bg-primary-deep border-b border-white/[0.08] px-4 py-3">
          <nav className="flex flex-col gap-0.5 mb-3">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === href
                    ? 'text-white font-semibold bg-white/[0.07]'
                    : 'text-white/65 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 pt-3 border-t border-white/[0.08]">
            {isLoggedIn ? (
              <>
                <Link
                  href="/my"
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] text-white/65 hover:text-white transition-colors"
                >
                  내 계정
                </Link>
                <Link
                  href="/my/bookings"
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] text-white/65 hover:text-white transition-colors"
                >
                  예약 확인
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-[13px] text-accent border border-accent px-4 py-1.5 rounded-full font-semibold"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] text-accent border border-accent px-4 py-1.5 rounded-full font-semibold hover:bg-accent hover:text-primary-deep transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] font-semibold text-primary bg-accent hover:bg-accent-hover px-4 py-1.5 rounded-full transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
