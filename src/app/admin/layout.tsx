import AdminNav from '@/components/features/AdminNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  )
}
