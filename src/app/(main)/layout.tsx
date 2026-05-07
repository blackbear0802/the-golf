import Header from '@/components/layout/Header'
import DealStrip from '@/components/layout/DealStrip'
import Footer from '@/components/layout/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <DealStrip />
      <main>{children}</main>
      <Footer />
    </>
  )
}
