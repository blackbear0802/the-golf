'use client'

import { useState } from 'react'
import { MOCK_SCORECARDS, MOCK_USER } from '@/lib/mock-user-data'

export default function ScorecardPage() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">스코어카드</h1>
        <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
          <span className="text-primary text-xs font-bold">핸디캡</span>
          <span className="font-en text-sm font-bold text-primary">{MOCK_USER.handicapIndex}</span>
        </div>
      </div>

      {/* 스코어 트렌드 요약 */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">최근 라운드</h2>
        <div className="flex items-end gap-3">
          {MOCK_SCORECARDS.map(card => {
            const par = card.holes.reduce((s, h) => s + h.par, 0)
            const diff = card.totalScore - par
            const barH = Math.min(100, Math.max(20, 100 - (card.totalScore - 72) * 3))
            return (
              <div key={card.id} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-en font-bold text-gray-700">{card.totalScore}</div>
                <div
                  className="w-full rounded-t-lg bg-primary/20 relative"
                  style={{ height: `${barH}px` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-primary transition-all"
                    style={{ height: `${barH * 0.6}px` }}
                  />
                </div>
                <div className="text-[10px] text-gray-400 text-center leading-tight">{card.playedAt.slice(5)}</div>
                <div className={`text-[10px] font-bold ${diff <= 0 ? 'text-primary' : 'text-red-500'}`}>
                  {diff > 0 ? `+${diff}` : diff}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 스코어카드 목록 */}
      <div className="flex flex-col gap-4">
        {MOCK_SCORECARDS.map(card => {
          const par = card.holes.reduce((s, h) => s + h.par, 0)
          const diff = card.totalScore - par
          const isExpanded = expanded === card.id
          const front9 = card.holes.slice(0, 9)
          const back9 = card.holes.slice(9)
          const front9Score = front9.reduce((s, h) => s + h.score, 0)
          const back9Score = back9.reduce((s, h) => s + h.score, 0)
          const front9Par = front9.reduce((s, h) => s + h.par, 0)
          const back9Par = back9.reduce((s, h) => s + h.par, 0)

          return (
            <div key={card.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : card.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{card.courseName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{card.flag} {card.destination} · {card.playedAt}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-en text-2xl font-bold text-gray-900 leading-none">{card.totalScore}</div>
                    <div className={`text-xs font-bold mt-0.5 ${diff <= 0 ? 'text-primary' : 'text-red-500'}`}>
                      {diff > 0 ? `+${diff}` : diff}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-3">
                  {[
                    { label: '퍼팅', value: card.putts },
                    { label: '페어웨이', value: `${card.fairways}/14` },
                    { label: 'GIR', value: `${card.gir}/18` },
                    { label: '전반', value: front9Score },
                    { label: '후반', value: back9Score },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <div className="font-en text-sm font-bold text-gray-700">{stat.value}</div>
                      <div className="text-[10px] text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                  <div className="ml-auto flex items-center text-xs text-gray-400">
                    {isExpanded ? '▲' : '▼'}
                  </div>
                </div>
              </div>

              {/* 홀별 스코어 (펼침) */}
              {isExpanded && (
                <div className="border-t border-gray-50 px-5 pb-5">
                  {[
                    { label: '전반 (1-9)', holes: front9, totalScore: front9Score, totalPar: front9Par },
                    { label: '후반 (10-18)', holes: back9, totalScore: back9Score, totalPar: back9Par },
                  ].map(half => (
                    <div key={half.label} className="mt-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">{half.label}</p>
                      <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full min-w-[400px] text-xs text-center">
                          <thead>
                            <tr className="text-gray-400">
                              <td className="py-1 text-left font-medium">홀</td>
                              {half.holes.map(h => <td key={h.hole} className="py-1 w-8">{h.hole}</td>)}
                              <td className="py-1 font-semibold text-gray-600">합계</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-gray-400">
                              <td className="py-1 text-left">PAR</td>
                              {half.holes.map(h => <td key={h.hole} className="py-1">{h.par}</td>)}
                              <td className="py-1 font-semibold text-gray-500">{half.totalPar}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-left font-medium text-gray-600">스코어</td>
                              {half.holes.map(h => {
                                const d = h.score - h.par
                                const cls =
                                  d <= -2 ? 'text-yellow-600 font-bold' :
                                  d === -1 ? 'text-primary font-bold' :
                                  d === 0 ? 'text-gray-700' :
                                  d === 1 ? 'text-orange-500' :
                                  'text-red-600 font-bold'
                                return <td key={h.hole} className={`py-1 ${cls}`}>{h.score}</td>
                              })}
                              <td className="py-1 font-bold text-gray-900">{half.totalScore}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
