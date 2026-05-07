'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

function getSecondsUntilEndOfWeek() {
  const now = new Date()
  const target = new Date(now)
  const daysUntilSunday = now.getDay() === 0 ? 7 : 7 - now.getDay()
  target.setDate(target.getDate() + daysUntilSunday)
  target.setHours(23, 59, 59, 0)
  return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000))
}

function formatCountdown(totalSeconds: number) {
  const d = Math.floor(totalSeconds / 86400)
  const h = Math.floor((totalSeconds % 86400) / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  if (d > 0) return `${d}일 ${pad(h)} : ${pad(m)}`
  return `${pad(h)} : ${pad(m)} : ${pad(s)}`
}

export default function DealStrip() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setSeconds(getSecondsUntilEndOfWeek())
    const id = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const label = seconds > 0 ? formatCountdown(seconds) : '종료'

  return (
    <div className="bg-accent px-4 lg:px-8 py-2 lg:py-2.5 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-6">
      {/* 모바일: 짧은 문구 / 데스크톱: 전체 문구 */}
      <span className="text-[12px] lg:text-[13px] font-bold text-primary-deep text-center">
        <span className="lg:hidden">⚡ 이번 주 특가 — 최대 32% 할인 중</span>
        <span className="hidden lg:inline">⚡ 이번 주 특가 — 태국·베트남·필리핀 최대 32% 할인 중</span>
      </span>

      <div className="flex items-center gap-3 lg:gap-6">
        <div className="hidden lg:block w-px h-3.5 bg-primary-deep/25" />
        <span className="text-[12px] lg:text-[13px] font-bold text-primary-deep flex items-center gap-1.5 font-en">
          마감까지{' '}
          <span className="bg-primary-deep text-accent text-xs font-bold px-2.5 py-0.5 rounded-full tracking-[0.04em]">
            {label}
          </span>
        </span>
        <div className="hidden lg:block w-px h-3.5 bg-primary-deep/25" />
        <Link
          href="/search?deal=true"
          className="text-xs font-bold text-primary-deep underline opacity-65 hover:opacity-100 transition-opacity"
        >
          전체보기 →
        </Link>
      </div>
    </div>
  )
}
