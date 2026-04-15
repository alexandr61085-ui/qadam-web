import type { Metadata } from 'next'
import LandingPage from './LandingPage'

export const metadata: Metadata = {
  title: 'QADAM — Найди свой спорт рядом',
  description: 'QADAM — найди спортивные события и партнёров рядом с тобой в Казахстане. Бег, футбол, баскетбол, йога и ещё 20+ видов спорта.',
  openGraph: {
    title: 'QADAM — Найди свой спорт рядом',
    description: 'Спортивные события и партнёры в Астане и Алматы',
    url: 'https://getqadam.kz/',
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: 'https://getqadam.kz/assets/img/app-icon.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'QADAM — Найди свой спорт рядом',
    description: 'Спортивные события и партнёры в Астане и Алматы',
    images: ['https://getqadam.kz/assets/img/app-icon.png'],
  },
  alternates: {
    canonical: 'https://getqadam.kz/',
  },
  icons: {
    icon: '/assets/img/app-icon.png',
  },
  other: {
    'theme-color': '#1A1A1A',
  },
}

export default function Home() {
  return <LandingPage />
}
