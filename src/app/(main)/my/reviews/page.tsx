import Link from 'next/link'
import { MOCK_REVIEWS } from '@/lib/mock-user-data'
import { MOCK_USER } from '@/lib/mock-user-data'

export default function MyReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-900">내 리뷰</h1>

      {MOCK_REVIEWS.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <p className="text-gray-400 text-sm mb-4">아직 작성한 리뷰가 없습니다.</p>
          <Link href="/search" className="text-sm text-primary font-medium hover:underline">
            여행 상품 둘러보기 →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {MOCK_REVIEWS.map(review => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-accent text-sm font-bold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #163028, #204a3c)' }}
                >
                  {MOCK_USER.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-gray-900">{MOCK_USER.name}</span>
                    <span className="text-xs text-gray-400">{review.createdAt}</span>
                    <span className="text-xs text-accent ml-auto">
                      {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    {review.flag} {review.destination} · {review.productTitle}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-primary/80">
        여행 완료 후 리뷰를 작성하면 다음 예약 시 <strong>5% 할인</strong>이 적용됩니다.
      </div>
    </div>
  )
}
