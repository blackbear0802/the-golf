'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/mock-data'
import { notFound } from 'next/navigation'

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder-gray-400'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

export default function AdminProductEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = PRODUCTS.find(p => p.id === params.id)
  if (!product) notFound()

  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: product.title,
    destination: product.destination,
    city: product.city,
    nights: String(product.nights),
    rounds: String(product.rounds),
    dealPrice: String(product.dealPrice),
    originalPrice: String(product.originalPrice),
    includesFlight: product.includesFlight,
    includesHotel: product.includesHotel,
    includesCaddie: product.includesCaddie,
    isDeal: product.isDeal,
    slotsTotal: String(product.slotsTotal),
    departureCity: product.departureCity,
    description: product.description,
  })

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
      setForm(prev => ({ ...prev, [field]: value }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setSaving(false)
    router.push('/admin/products')
  }

  return (
    <div className="max-w-[680px]">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="text-sm text-gray-400 hover:text-primary transition-colors">
          ← 상품 목록
        </Link>
        <span className="text-gray-200">/</span>
        <span className="text-sm text-gray-700 truncate">{product.title}</span>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">상품 수정</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-700">기본 정보</h2>
          <div>
            <label className={labelClass}>상품명 *</label>
            <input type="text" className={inputClass} value={form.title} onChange={set('title')} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>여행 국가</label>
              <input type="text" className={inputClass} value={form.destination} onChange={set('destination')} />
            </div>
            <div>
              <label className={labelClass}>도시</label>
              <input type="text" className={inputClass} value={form.city} onChange={set('city')} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>박 수</label>
              <select className={inputClass} value={form.nights} onChange={set('nights')}>
                {[2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}박</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>라운드</label>
              <select className={inputClass} value={form.rounds} onChange={set('rounds')}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}라운드</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>출발 도시</label>
              <input type="text" className={inputClass} value={form.departureCity} onChange={set('departureCity')} />
            </div>
          </div>
          <div>
            <label className={labelClass}>상품 설명</label>
            <textarea className={`${inputClass} resize-none`} rows={4} value={form.description} onChange={set('description')} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-700">가격 설정</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>판매가 (만원)</label>
              <input type="number" className={inputClass} value={form.dealPrice} onChange={set('dealPrice')} required />
            </div>
            <div>
              <label className={labelClass}>정가 (만원)</label>
              <input type="number" className={inputClass} value={form.originalPrice} onChange={set('originalPrice')} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="isDeal" checked={form.isDeal} onChange={set('isDeal')} className="w-4 h-4 accent-primary" />
            <label htmlFor="isDeal" className="text-sm text-gray-700">이번 주 특가로 등록</label>
            {form.isDeal && (
              <div className="ml-auto flex items-center gap-2">
                <label className="text-sm text-gray-600">슬롯 수</label>
                <input type="number" className={inputClass + ' w-20'} value={form.slotsTotal} onChange={set('slotsTotal')} />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-gray-700">포함사항</h2>
          {[
            { key: 'includesFlight', label: '항공권 포함' },
            { key: 'includesHotel', label: '호텔 숙박 포함' },
            { key: 'includesCaddie', label: '전담 캐디 포함' },
          ].map(item => (
            <div key={item.key} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={item.key}
                checked={form[item.key as keyof typeof form] as boolean}
                onChange={set(item.key as keyof typeof form)}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor={item.key} className="text-sm text-gray-700">{item.label}</label>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="flex-1 text-center border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {saving ? '저장 중...' : '수정 완료'}
          </button>
        </div>
      </form>
    </div>
  )
}
