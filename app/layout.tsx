import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QADAM',
  description: 'Спортивные события и партнёры в Казахстане',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
