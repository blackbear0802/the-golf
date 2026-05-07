'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'

const CHIPS = [
  { label: '🔥 이번 주 특가 보여줘', hot: true },
  { label: '🇹🇭 태국 100만원 이하', hot: false },
  { label: '🇻🇳 다낭 5월 출발', hot: false },
  { label: '비행 포함 3박', hot: false },
  { label: '4명 동반 추천', hot: false },
  { label: '⚡ 잔여 좌석 있는 패키지', hot: true },
]

export default function HeroChatInput() {
  const [value, setValue] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const query = value.trim()
    if (!query) return
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-[20px] overflow-hidden mb-5"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.12)' }}
    >
      <div className="flex items-center px-5 gap-3 min-h-[68px] py-1.5">
        <span className="text-xl opacity-50 shrink-0">⛳</span>
        <input
          type="text"
          className="flex-1 border-none outline-none text-[17px] text-gray-900 bg-transparent placeholder-gray-400 leading-relaxed"
          placeholder="예) 태국 3박 4일, 4명, 100만원 이하로 찾아줘"
          value={value}
          onChange={e => setValue(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="w-12 h-12 rounded-xl bg-primary hover:bg-primary-hover flex items-center justify-center shrink-0 transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="h-px bg-gray-100 mx-4" />

      <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto scrollbar-hide">
        <span className="text-xs text-gray-400 shrink-0">예시</span>
        {CHIPS.map(chip => (
          <button
            key={chip.label}
            type="button"
            onClick={() => setValue(chip.label)}
            className={`text-[13px] px-3.5 py-1.5 rounded-full border shrink-0 whitespace-nowrap transition-all ${
              chip.hot
                ? 'text-red-600 bg-red-50 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600'
                : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-primary hover:text-white hover:border-primary'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </form>
  )
}
