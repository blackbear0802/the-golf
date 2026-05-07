'use client'

import { useState, useEffect } from 'react'

type BookingStatus = 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

interface AdminBooking {
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
  guestName: string
  guestPhone: string
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

const NEXT_STATUS: Partial<Record<BookingStatus, BookingStatus>> = {
  REQUESTED: 'CONFIRMED',
  CONFIRMED: 'COMPLETED',
}

const NEXT_LABEL: Partial<Record<BookingStatus, string>> = {
  REQUESTED: '예약 확정',
  CONFIRMED: '완료 처리',
}

export default function AdminCrmPage() {
  const [tab, setTab] = useState<BookingStatus | 'ALL'>('ALL')
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then(r => r.json())
      .then(data => { setBookings(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = tab === 'ALL' ? bookings : bookings.filter(b => b.status === tab)

  const counts: Record<string, number> = {
    ALL: bookings.length,
    REQUESTED: bookings.filter(b => b.status === 'REQUESTED').length,
    CONFIRMED: bookings.filter(b => b.status === 'CONFIRMED').length,
    COMPLETED: bookings.filter(b => b.status === 'COMPLETED').length,
    CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length,
  }

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
      }
    } finally {
      setUpdating(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        불러오는 중...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1000px]">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">예약 관리</h1>
        <p className="text-sm text-gray-400 mt-1">예약 문의 접수 및 상태 관리</p>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              tab === t.value
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30'
            }`}
          >
            {t.label}
            <span className={`ml-1.5 font-en text-xs ${tab === t.value ? 'text-white/70' : 'text-gray-400'}`}>
              {counts[t.value]}
            </span>
          </button>
        ))}
      </div>

      {/* 목록 */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400 text-sm">
          {bookings.length === 0 ? '아직 접수된 예약이 없습니다.' : '해당하는 예약이 없습니다.'}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(booking => {
            const isExpanded = expanded === booking.id
            const nextStatus = NEXT_STATUS[booking.status]
            const nextLabel = NEXT_LABEL[booking.status]
            const isUpdating = updating === booking.id

            return (
              <div key={booking.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* 헤더 행 */}
                <div
                  className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : booking.id)}
                >
                  <span className="text-xl shrink-0">{booking.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-400 font-mono">{booking.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-[11px] text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{booking.createdAt}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5 truncate">{booking.productTitle}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLOR[booking.status]}`}>
                      {STATUS_LABEL[booking.status]}
                    </span>
                    <span className="font-en text-sm font-bold text-gray-700">{booking.totalPrice}만원</span>
                    <span className="text-gray-300 text-sm">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* 상세 (펼침) */}
                {isExpanded && (
                  <div className="border-t border-gray-50 px-6 py-5 flex flex-col gap-4">
                    {/* 고객 정보 */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: '고객명', value: booking.guestName },
                        { label: '연락처', value: booking.guestPhone },
                        { label: '출발일', value: booking.checkInDate },
                        { label: '인원', value: `${booking.travelerCount}명` },
                      ].map(item => (
                        <div key={item.label} className="bg-background rounded-xl p-3">
                          <div className="text-[10px] text-gray-400 mb-0.5">{item.label}</div>
                          <div className="text-sm font-medium text-gray-900">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {booking.specialRequests && (
                      <div className="bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 text-sm text-yellow-800">
                        <span className="font-semibold text-xs text-yellow-600 block mb-1">특별 요청사항</span>
                        {booking.specialRequests}
                      </div>
                    )}

                    {/* 액션 버튼 */}
                    {(nextStatus || booking.status === 'REQUESTED' || booking.status === 'CONFIRMED') && (
                      <div className="flex gap-2 pt-2">
                        {nextStatus && nextLabel && (
                          <button
                            disabled={isUpdating}
                            onClick={() => updateStatus(booking.id, nextStatus)}
                            className="bg-primary hover:bg-primary-hover disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                          >
                            {isUpdating ? '처리 중...' : nextLabel}
                          </button>
                        )}
                        {(booking.status === 'REQUESTED' || booking.status === 'CONFIRMED') && (
                          <button
                            disabled={isUpdating}
                            onClick={() => updateStatus(booking.id, 'CANCELLED')}
                            className="bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-600 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                          >
                            취소 처리
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
