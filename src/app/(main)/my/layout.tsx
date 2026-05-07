import MyNav from '@/components/features/MyNav'

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
      <div className="flex gap-8">
        <MyNav />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
