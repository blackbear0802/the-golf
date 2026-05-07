'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type BookingStatus = 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

interface Booking {
  id: string
  productId: string
  productTitle: string
  destination: string
  flag: string
  city: string
  nights: number
  rounds: number
  checkInDate: string
  travelerCount: number
  totalPrice: number
  status: BookingStatus
  createdAt: string
  specialRequests?: string | null
}

const TABS: { label: string; value: BookingStatus | 'ALL' }[] = [
  { label: '전체', value: 'ALL' },
  { label: '문의 접수', value: 'REQUESTED' },
  { label: '예약 확정', value: 'CONFIRMED' },
  { label: '여행 완료', value: 'COMPLETED' },
  { label: '취소', value: 'CANCELLED' },
]

const STATUS_LABEL: Record<BookingStatus, string> = {
  REQUESTED: '문의 접수',
  CONFIRMED: '예약 확정',
  COMPLETED: '여행 완료',
  CANCELLED: '취소됨',
}

const STATUS_COLOR: Record<BookingStatus, string> = {
  REQUESTED: 'text-orange-600 bg-orange-50 border-orange-100',
  CONFIRMED: 'text-primary bg-primary/10 border-primary/10',
  COMPLETED: 'text-gray-500 bg-gray-100 border-gray-200',
  CANCELLED: 'text-red-500 bg-red-50 border-red-100',
}

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'ALL'>('ALL')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/bookings')
      .then(r => r.json())
      .then(data => { setBookings(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = activeTab === 'ALL'
    ? bookings
    : bookings.filter(b => b.status === activeTab)

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-gray-900">예약 내역</h1>
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400 text-sm">
          불러오는 중...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-900">예약 내역</h1>

      {/* 탭 필터 */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 예약 목록 */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <p className="text-gray-400 text-sm mb-4">아직 예약 내역이 없습니다.</p>
          <Link href="/search" className="text-sm text-primary font-medium hover:underline">
            상품 둘러보기 →
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400 text-sm">
          해당하는 예약이 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(booking => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1 font-mono">
                      {booking.id.slice(0, 8).toUpperCase()}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">{booking.productTitle}</h3>
                  </div>
                  <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLOR[booking.status]}`}>
                    {STATUS_LABEL[booking.status]}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: '여행지', value: `${booking.flag} ${booking.city || booking.destination}` },
                    { label: '출발일', value: booking.checkInDate },
                    { label: '일정', value: `${booking.nights}박 ${booking.nights + 1}일 · ${booking.rounds}R` },
                    { label: '인원', value: `${booking.travelerCount}명` },
                  ].map(item => (
                    <div key={item.label} className="bg-background rounded-xl p-3">
                      <div className="text-[10px] text-gray-400 mb-0.5">{item.label}</div>
                      <div className="text-sm font-medium text-gray-900">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div>
                    <span className="text-xs text-gray-400">총 금액 </span>
                    <span className="font-en text-base font-bold text-gray-900">{booking.totalPrice}</span>
                    <span className="text-xs text-gray-500">만원</span>
                  </div>

                  {booking.status === 'COMPLETED' && (
                    <Link
                      href={`/products/${booking.productId}`}
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      다시 예약하기
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
