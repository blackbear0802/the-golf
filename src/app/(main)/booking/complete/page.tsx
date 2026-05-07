import Link from 'next/link'

export default function BookingCompletePage({
  searchParams,
}: {
  searchParams: { bookingId?: string }
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-accent"
          style={{ background: 'linear-gradient(135deg, #163028, #204a3c)' }}
        >
          ✓
        </div>

        <h1 className="font-display text-2xl sm:text-3xl text-gray-900 font-normal mb-3">
          예약 문의가 접수되었습니다
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          담당자가 <strong className="text-primary">24시간 내</strong>에 연락드립니다.<br />
          카카오톡 또는 문자로 확인해드릴 예정입니다.
        </p>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">접수 절차</p>
          <div className="flex flex-col gap-4">
            {[
              { icon: '📋', title: '문의 접수 완료', desc: '요청 내용이 시스템에 등록되었습니다.' },
              { icon: '👤', title: '담당자 배정 (1–4시간)', desc: '전담 매니저가 배정됩니다.' },
              { icon: '📞', title: '담당자 연락 (24시간 이내)', desc: '카카오톡 또는 문자로 연락드립니다.' },
              { icon: '✅', title: '예약 확정', desc: '일정·금액 확인 후 최종 확정됩니다.' },
            ].map(step => (
              <div key={step.title} className="flex gap-3">
                <span className="text-xl shrink-0">{step.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {searchParams.bookingId && (
          <p className="text-xs text-gray-400 mb-6">
            문의 번호:{' '}
            <span className="font-mono text-gray-600">
              {searchParams.bookingId.slice(0, 8).toUpperCase()}
            </span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 text-center border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/my/bookings"
            className="flex-1 text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            예약 내역 확인
          </Link>
        </div>
      </div>
    </div>
  )
}
