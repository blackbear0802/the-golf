import { Suspense } from 'react'
import SearchClient from '@/components/features/SearchClient'

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; deal?: string }
}) {
  return (
    <Suspense>
      <SearchClient
        initialQ={searchParams.q ?? ''}
        initialDeal={searchParams.deal === 'true'}
      />
    </Suspense>
  )
}
