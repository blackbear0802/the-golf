'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS, type MockProduct } from '@/lib/mock-data'

const DESTINATION_OPTIONS = [
  { code: 'thailand', label: '🇹🇭 태국' },
  { code: 'vietnam', label: '🇻🇳 베트남' },
  { code: 'philippines', label: '🇵🇭 필리핀' },
  { code: 'malaysia', label: '🇲🇾 말레이시아' },
  { code: 'japan', label: '🇯🇵 일본' },
]

const PRICE_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'under100', label: '100만원 이하' },
  { value: '100to150', label: '100–150만원' },
  { value: 'over150', label: '150만원 이상' },
]

type PriceRange = 'all' | 'under100' | '100to150' | 'over150'
type Sort = 'recommended' | 'price_asc' | 'price_desc'

function FilterPanel({
  destinations, setDestinations,
  includesFlight, setIncludesFlight,
  includesHotel, setIncludesHotel,
  includesCaddie, setIncludesCaddie,
  dealOnly, setDealOnly,
  priceRange, setPriceRange,
  onClose,
}: {
  destinations: string[]
  setDestinations: (v: string[]) => void
  includesFlight: boolean
  setIncludesFlight: (v: boolean) => void
  includesHotel: boolean
  setIncludesHotel: (v: boolean) => void
  includesCaddie: boolean
  setIncludesCaddie: (v: boolean) => void
  dealOnly: boolean
  setDealOnly: (v: boolean) => void
  priceRange: PriceRange
  setPriceRange: (v: PriceRange) => void
  onClose?: () => void
}) {
  function toggleDest(code: string) {
    setDestinations(
      destinations.includes(code)
        ? destinations.filter(d => d !== code)
        : [...destinations, code]
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {onClose && (
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">필터</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 여행지 */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">여행지</p>
        <div className="flex flex-col gap-2">
          {DESTINATION_OPTIONS.map(dest => (
            <label key={dest.code} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={destinations.includes(dest.code)}
                onChange={() => toggleDest(dest.code)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{dest.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* 예산 */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">예산 (1인)</p>
        <div className="flex flex-col gap-2">
          {PRICE_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={priceRange === opt.value}
                onChange={() => setPriceRange(opt.value as PriceRange)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* 포함사항 */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">포함사항</p>
        <div className="flex flex-col gap-2">
          {[
            { label: '항공 포함', value: includesFlight, set: setIncludesFlight },
            { label: '호텔 포함', value: includesHotel, set: setIncludesHotel },
            { label: '캐디 포함', value: includesCaddie, set: setIncludesCaddie },
          ].map(item => (
            <label key={item.label} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={item.value}
                onChange={e => item.set(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* 특가 */}
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm font-semibold text-gray-700">이번 주 특가만</span>
        <div
          onClick={() => setDealOnly(!dealOnly)}
          className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
            dealOnly ? 'bg-primary' : 'bg-gray-200'
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
              dealOnly ? 'left-5' : 'left-1'
            }`}
          />
        </div>
      </label>
    </div>
  )
}

function ProductCard({ product }: { product: MockProduct }) {
  const slotsPct = Math.round((1 - product.slotsRemaining / product.slotsTotal) * 100)

  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all group"
    >
      {/* 이미지 */}
      <div
        className="h-44 sm:h-auto sm:w-52 lg:w-60 shrink-0 relative flex items-center justify-center text-5xl"
        style={{ background: product.bg }}
      >
        ⛳
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(13,31,25,0.55) 0%, transparent 60%)' }}
        />
        <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10">
          <span className="text-[11px] text-white bg-primary/70 px-2.5 py-0.5 rounded-full self-start backdrop-blur-sm">
            {product.flag} {product.destination} · {product.city}
          </span>
          {product.isDeal && product.slotsRemaining <= 5 && (
            <span className="text-[11px] font-bold text-white bg-red-600/90 px-2.5 py-0.5 rounded-full self-start">
              {product.slotsRemaining === 1 ? `🔴 마지막 ${product.slotsRemaining}자리` : `⚠ 잔여 ${product.slotsRemaining}자리`}
            </span>
          )}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex flex-col justify-between p-4 sm:p-5 flex-1 min-w-0">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="text-[13px] text-gray-500">
            {product.nights}박 {product.nights + 1}일 · {product.rounds}라운드 · {product.departureCity} 출발
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.includesFlight && (
              <span className="text-[11px] text-primary bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">항공 포함</span>
            )}
            {product.includesHotel && (
              <span className="text-[11px] text-primary bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">호텔 포함</span>
            )}
            {product.includesCaddie && (
              <span className="text-[11px] text-primary bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">캐디 포함</span>
            )}
            {product.isDeal && (
              <span className="text-[11px] text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-semibold">🔥 특가</span>
            )}
          </div>

          {product.isDeal && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-100 rounded overflow-hidden">
                <div className="h-full bg-red-400 rounded" style={{ width: `${slotsPct}%` }} />
              </div>
              <span className="text-[11px] text-red-500 font-semibold shrink-0">
                {product.slotsRemaining}자리 남음
              </span>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            {product.isDeal && (
              <div className="font-en text-xs text-gray-400 line-through">{product.originalPrice}만원</div>
            )}
            <div className="font-en text-2xl font-bold text-red-600 leading-none">
              {product.dealPrice}
              <span className="text-sm font-normal text-gray-500 font-sans">만원~</span>
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">1인 기준</div>
          </div>
          <div className="flex items-center gap-2">
            {product.isDeal && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded font-en">
                -{Math.round((1 - product.dealPrice / product.originalPrice) * 100)}%
              </span>
            )}
            <span className="bg-primary group-hover:bg-primary-hover text-white text-[13px] font-semibold px-4 py-2 rounded-full transition-colors">
              상세보기
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function SearchClient({
  initialQ,
  initialDeal,
}: {
  initialQ: string
  initialDeal: boolean
}) {
  const [destinations, setDestinations] = useState<string[]>([])
  const [includesFlight, setIncludesFlight] = useState(false)
  const [includesHotel, setIncludesHotel] = useState(false)
  const [includesCaddie, setIncludesCaddie] = useState(false)
  const [dealOnly, setDealOnly] = useState(initialDeal)
  const [priceRange, setPriceRange] = useState<PriceRange>('all')
  const [sort, setSort] = useState<Sort>('recommended')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      if (destinations.length > 0 && !destinations.includes(p.destinationCode)) return false
      if (includesFlight && !p.includesFlight) return false
      if (includesHotel && !p.includesHotel) return false
      if (includesCaddie && !p.includesCaddie) return false
      if (dealOnly && !p.isDeal) return false
      if (priceRange === 'under100' && p.dealPrice >= 100) return false
      if (priceRange === '100to150' && (p.dealPrice < 100 || p.dealPrice > 150)) return false
      if (priceRange === 'over150' && p.dealPrice <= 150) return false
      return true
    })
    if (sort === 'price_asc') result = [...result].sort((a, b) => a.dealPrice - b.dealPrice)
    if (sort === 'price_desc') result = [...result].sort((a, b) => b.dealPrice - a.dealPrice)
    return result
  }, [destinations, includesFlight, includesHotel, includesCaddie, dealOnly, priceRange, sort])

  const filterProps = {
    destinations, setDestinations,
    includesFlight, setIncludesFlight,
    includesHotel, setIncludesHotel,
    includesCaddie, setIncludesCaddie,
    dealOnly, setDealOnly,
    priceRange, setPriceRange,
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
      {/* AI 검색어 배너 */}
      {initialQ && (
        <div className="mb-6 bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-lg">⛳</span>
          <div>
            <p className="text-sm font-semibold text-primary">AI 검색 결과</p>
            <p className="text-xs text-gray-500 mt-0.5">"{initialQ}"에 맞는 패키지를 찾았습니다</p>
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* 데스크톱 필터 사이드바 */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-[84px]">
            <p className="font-semibold text-gray-900 mb-5">필터</p>
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {/* 결과 헤더 */}
          <div className="flex items-center justify-between mb-5 gap-3">
            <div className="flex items-center gap-3">
              {/* 모바일 필터 버튼 */}
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                필터
              </button>
              <span className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{filtered.length}개</span> 패키지
              </span>
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as Sort)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white outline-none"
            >
              <option value="recommended">추천순</option>
              <option value="price_asc">낮은 가격순</option>
              <option value="price_desc">높은 가격순</option>
            </select>
          </div>

          {/* 상품 목록 */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm">조건에 맞는 패키지가 없습니다.</p>
              <button
                onClick={() => {
                  setDestinations([])
                  setIncludesFlight(false)
                  setIncludesHotel(false)
                  setIncludesCaddie(false)
                  setDealOnly(false)
                  setPriceRange('all')
                }}
                className="mt-4 text-sm text-primary underline"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 모바일 필터 오버레이 */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto">
            <FilterPanel {...filterProps} onClose={() => setFilterOpen(false)} />
            <button
              onClick={() => setFilterOpen(false)}
              className="mt-6 w-full bg-primary text-white font-semibold py-3 rounded-xl"
            >
              {filtered.length}개 결과 보기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
