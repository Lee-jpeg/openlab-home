import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OPENLAB',
  description: '병원 마케팅 전문 에이전시',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
} 