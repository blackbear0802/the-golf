import Link from 'next/link'
import { PRODUCTS } from '@/lib/mock-data'

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1000px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">상품 관리</h1>
          <p className="text-sm text-gray-400 mt-1">전체 {PRODUCTS.length}개 상품</p>
        </div>
        <Link
          href="/admin/products/create"
          className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          + 상품 등록
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {PRODUCTS.map(product => {
          const discountPct = Math.round((1 - product.dealPrice / product.originalPrice) * 100)
          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-5 p-5">
                {/* 썸네일 */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: product.bg }}
                >
                  ⛳
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {product.isDeal && (
                      <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded">
                        특가
                      </span>
                    )}
                    <span className="text-[11px] text-gray-400">{product.flag} {product.destination} · {product.city}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 truncate">{product.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {product.nights}박 {product.nights + 1}일 · {product.rounds}라운드
                    {product.includesFlight && ' · 항공포함'}
                    {product.includesHotel && ' · 호텔포함'}
                  </p>
                </div>

                {/* 가격 */}
                <div className="text-right shrink-0">
                  {product.isDeal && (
                    <div className="font-en text-xs text-gray-400 line-through">{product.originalPrice}만원</div>
                  )}
                  <div className="font-en text-lg font-bold text-red-600 leading-none">
                    {product.dealPrice}
                    <span className="text-xs font-normal text-gray-500 font-sans">만원~</span>
                  </div>
                  {product.isDeal && (
                    <div className="text-[10px] text-red-500 mt-0.5">-{discountPct}%</div>
                  )}
                </div>

                {/* 잔여 슬롯 */}
                {product.isDeal && (
                  <div className="text-center shrink-0">
                    <div className="font-en text-lg font-bold text-gray-700">{product.slotsRemaining}</div>
                    <div className="text-[10px] text-gray-400">/{product.slotsTotal} 잔여</div>
                  </div>
                )}

                {/* 액션 */}
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/products/${product.id}`}
                    target="_blank"
                    className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    미리보기
                  </Link>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-xs text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    수정
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
