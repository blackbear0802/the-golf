import Link from 'next/link'
import { MOCK_USER, MOCK_BOOKINGS, MOCK_SCORECARDS } from '@/lib/mock-user-data'

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

export default function MyPage() {
  const recentBookings = MOCK_BOOKINGS.slice(0, 3)
  const recentScorecard = MOCK_SCORECARDS[0]
  const parTotal = recentScorecard.holes.reduce((s, h) => s + h.par, 0)
  const scoreDiff = recentScorecard.totalScore - parTotal

  return (
    <div className="flex flex-col gap-6">

      {/* 프로필 카드 (모바일 전용 — 데스크톱은 사이드바) */}
      <div className="lg:hidden bg-white rounded-2xl shadow-sm overflow-hidden">
        <div
          className="px-6 py-6 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #163028, #204a3c)' }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-accent text-xl font-bold bg-white/10 shrink-0">
            {MOCK_USER.initial}
          </div>
          <div>
            <p className="text-white font-semibold text-base">{MOCK_USER.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{MOCK_USER.email}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
            <span className="text-accent text-xs font-bold">H</span>
            <span className="text-white text-xs font-semibold">{MOCK_USER.handicapIndex}</span>
          </div>
        </div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: '핸디캡', value: MOCK_USER.handicapIndex.toString(), unit: '' },
          { label: '평균 스코어', value: MOCK_USER.avgScore.toString(), unit: '' },
          { label: '총 라운드', value: MOCK_USER.totalRounds.toString(), unit: '회' },
          { label: '해외 여행', value: MOCK_USER.totalTrips.toString(), unit: '회' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-[11px] text-gray-400 mb-1">{stat.label}</div>
            <div className="font-en text-2xl font-bold text-gray-900 leading-none">
              {stat.value}
              <span className="text-sm font-normal text-gray-500 font-sans">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 최근 예약 */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">최근 예약</h2>
          <Link href="/my/bookings" className="text-xs text-primary hover:underline">전체 보기</Link>
        </div>
        <div className="flex flex-col divide-y divide-gray-50">
          {recentBookings.map(booking => (
            <div key={booking.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className="text-2xl">{booking.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{booking.productTitle}</p>
                <p className="text-xs text-gray-400 mt-0.5">{booking.checkInDate} · {booking.travelerCount}명</p>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLOR[booking.status]}`}>
                {STATUS_LABEL[booking.status]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 최근 스코어카드 */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">최근 스코어</h2>
          <Link href="/my/scorecard" className="text-xs text-primary hover:underline">전체 보기</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center shrink-0">
            <div className="font-en text-3xl font-bold text-gray-900 leading-none">{recentScorecard.totalScore}</div>
            <div className="text-[11px] text-gray-400 mt-1">
              {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{recentScorecard.courseName}</p>
            <p className="text-xs text-gray-400 mt-0.5">{recentScorecard.flag} {recentScorecard.destination} · {recentScorecard.playedAt}</p>
            <div className="flex gap-4 mt-2">
              {[
                { label: '퍼팅', value: recentScorecard.putts },
                { label: '페어웨이', value: `${recentScorecard.fairways}/14` },
                { label: 'GIR', value: `${recentScorecard.gir}/18` },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="font-en text-sm font-bold text-gray-700">{stat.value}</div>
                  <div className="text-[10px] text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 회원 정보 */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">회원 정보</h2>
        <div className="flex flex-col divide-y divide-gray-50">
          {[
            { label: '이름', value: MOCK_USER.name },
            { label: '연락처', value: MOCK_USER.phone },
            { label: '이메일', value: MOCK_USER.email },
            { label: '가입일', value: MOCK_USER.memberSince },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <span className="text-sm text-gray-500">{item.label}</span>
              <span className="text-sm text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
