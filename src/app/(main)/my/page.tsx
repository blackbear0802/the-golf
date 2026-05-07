import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const FLAG_MAP: Record<string, string> = {
  thailand: '🇹🇭', vietnam: '🇻🇳', philippines: '🇵🇭',
  malaysia: '🇲🇾', japan: '🇯🇵',
}

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

export default async function MyPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login?callbackUrl=/my')

  const userId = session.user.id

  const [user, bookings, scorecardCount, tripCount, recentScorecard] = await Promise.all([
    db.user.findUnique({
      where: { userId },
      select: { name: true, email: true, phone: true, createdAt: true, handicapIndex: true, avgScore: true },
    }),
    db.booking.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            destination: { select: { code: true, nameKo: true } },
            venue: { select: { region: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    db.scoreCard.count({ where: { userId } }),
    db.booking.count({ where: { userId, status: 'COMPLETED' } }),
    db.scoreCard.findFirst({
      where: { userId },
      include: { venue: { select: { name: true } } },
      orderBy: { playDate: 'desc' },
    }),
  ])

  if (!user) redirect('/login')

  const initial = user.name?.charAt(0) ?? '?'
  const memberSince = user.createdAt.toISOString().slice(0, 7)

  const recentBookings = bookings.map(b => ({
    id: b.bookingId,
    productTitle: b.product.title,
    flag: FLAG_MAP[b.product.destination?.code ?? ''] ?? '🌏',
    checkInDate: b.checkInDate.toISOString().split('T')[0],
    travelerCount: b.travelerCount,
    status: b.status,
  }))

  const holes = recentScorecard?.holes as { hole: number; par: number; score: number }[] | null
  const parTotal = holes?.reduce((s, h) => s + h.par, 0) ?? 72
  const scoreDiff = recentScorecard ? (recentScorecard.totalScore ?? 0) - parTotal : 0

  return (
    <div className="flex flex-col gap-6">

      {/* 프로필 카드 (모바일 전용) */}
      <div className="lg:hidden bg-white rounded-2xl shadow-sm overflow-hidden">
        <div
          className="px-6 py-6 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #163028, #204a3c)' }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-accent text-xl font-bold bg-white/10 shrink-0">
            {initial}
          </div>
          <div>
            <p className="text-white font-semibold text-base">{user.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{user.email}</p>
          </div>
          {user.handicapIndex && (
            <div className="ml-auto flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <span className="text-accent text-xs font-bold">H</span>
              <span className="text-white text-xs font-semibold">{user.handicapIndex.toString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: '핸디캡', value: user.handicapIndex?.toString() ?? '-' },
          { label: '평균 스코어', value: user.avgScore?.toString() ?? '-' },
          { label: '총 라운드', value: scorecardCount.toString(), unit: '회' },
          { label: '해외 여행', value: tripCount.toString(), unit: '회' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-[11px] text-gray-400 mb-1">{stat.label}</div>
            <div className="font-en text-2xl font-bold text-gray-900 leading-none">
              {stat.value}
              {'unit' in stat && <span className="text-sm font-normal text-gray-500 font-sans">{stat.unit}</span>}
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
        {recentBookings.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">아직 예약 내역이 없습니다.</p>
        ) : (
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
        )}
      </div>

      {/* 최근 스코어카드 */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">최근 스코어</h2>
          <Link href="/my/scorecard" className="text-xs text-primary hover:underline">전체 보기</Link>
        </div>
        {!recentScorecard ? (
          <p className="text-sm text-gray-400 py-4 text-center">아직 스코어 기록이 없습니다.</p>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-center shrink-0">
              <div className="font-en text-3xl font-bold text-gray-900 leading-none">{recentScorecard.totalScore}</div>
              <div className="text-[11px] text-gray-400 mt-1">
                {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {recentScorecard.venue?.name ?? '코스 미상'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {recentScorecard.playDate.toISOString().split('T')[0]}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 회원 정보 */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">회원 정보</h2>
        <div className="flex flex-col divide-y divide-gray-50">
          {[
            { label: '이름', value: user.name },
            { label: '연락처', value: user.phone ?? '-' },
            { label: '이메일', value: user.email ?? '-' },
            { label: '가입일', value: memberSince },
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
