import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '더 골프',
  description: '골프 여행 플랫폼',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
