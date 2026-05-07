import Link from 'next/link'
import { ADMIN_STATS, ADMIN_BOOKINGS } from '@/lib/mock-admin-data'

const STATUS_LABEL: Record<string, string> = {
  REQUESTED: '문의 접수',
  CONFIRMED: '예약 확정',
  COMPLETED: '여행 완료',
  CANCELLED: '취소됨',
}

const STATUS_COLOR: Record<string, string> = {
  REQUESTED: 'text-orange-600 bg-orange-50',
  CONFIRMED: 'text-primary bg-primary/10',
  COMPLETED: 'text-gray-500 bg-gray-100',
  CANCELLED: 'text-red-500 bg-red-50',
}

export default function AdminDashboardPage() {
  const recentBookings = [...ADMIN_BOOKINGS]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-8 max-w-[1000px]">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">대시보드</h1>
        <p className="text-sm text-gray-400 mt-1">2026년 4월 현황</p>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: '신규 문의',
            value: ADMIN_STATS.pendingCount,
            unit: '건',
            note: '처리 대기 중',
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            href: '/admin/crm',
          },
          {
            label: '예약 확정',
            value: ADMIN_STATS.confirmedCount,
            unit: '건',
            note: '이번 달 확정',
            color: 'text-primary',
            bg: 'bg-primary/5',
            href: '/admin/crm',
          },
          {
            label: '총 예약',
            value: ADMIN_STATS.totalBookings,
            unit: '건',
            note: '전체 누적',
            color: 'text-gray-700',
            bg: 'bg-white',
            href: '/admin/crm',
          },
          {
            label: '확정 매출',
            value: ADMIN_STATS.monthlyRevenue,
            unit: '만원',
            note: '확정 + 완료 기준',
            color: 'text-red-600',
            bg: 'bg-white',
            href: '/admin/crm',
          },
        ].map(stat => (
          <Link key={stat.label} href={stat.href} className={`${stat.bg} rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
            <div className={`font-en text-3xl font-bold leading-none ${stat.color}`}>
              {stat.value.toLocaleString()}
              <span className="text-sm font-normal text-gray-500 font-sans ml-1">{stat.unit}</span>
            </div>
            <div className="text-[11px] text-gray-400 mt-2">{stat.note}</div>
          </Link>
        ))}
      </div>

      {/* 빠른 액션 */}
      {ADMIN_STATS.pendingCount > 0 && (
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-700">
              처리 대기 중인 예약 문의 {ADMIN_STATS.pendingCount}건
            </p>
            <p className="text-xs text-orange-500 mt-0.5">24시간 내 응대를 권장합니다.</p>
          </div>
          <Link
            href="/admin/crm"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            지금 처리하기
          </Link>
        </div>
      )}

      {/* 최근 예약 */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="text-base font-semibold text-gray-900">최근 예약 문의</h2>
          <Link href="/admin/crm" className="text-xs text-primary hover:underline">전체 보기</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentBookings.map(booking => (
            <div key={booking.id} className="flex items-center gap-4 px-6 py-4">
              <span className="text-xl shrink-0">{booking.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{booking.productTitle}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {booking.guestName} · {booking.guestPhone} · {booking.createdAt}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLOR[booking.status]}`}>
                  {STATUS_LABEL[booking.status]}
                </span>
                <p className="font-en text-sm font-bold text-gray-700 mt-1">{booking.totalPrice}만원</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상품 현황 요약 */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="text-base font-semibold text-gray-900">상품 현황</h2>
          <Link href="/admin/products" className="text-xs text-primary hover:underline">상품 관리</Link>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-50">
          {[
            { label: '전체 상품', value: 6 },
            { label: '특가 진행 중', value: 3 },
            { label: '이번 달 문의', value: ADMIN_STATS.totalBookings },
          ].map(item => (
            <div key={item.label} className="px-6 py-4 text-center">
              <div className="font-en text-2xl font-bold text-gray-900">{item.value}</div>
              <div className="text-xs text-gray-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
