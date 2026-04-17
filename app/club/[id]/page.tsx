import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params

  const { data: club } = await supabase
    .from('clubs')
    .select('name, description, city')
    .eq('id', id)
    .single()

  if (!club) {
    return { title: 'Клуб не найден — QADAM' }
  }

  const description = club.description || `Спортивный клуб · ${club.city}`

  return {
    title: `${club.name} — QADAM`,
    description,
    openGraph: {
      title: club.name,
      description,
      images: [{ url: 'https://getqadam.kz/assets/img/og-banner.jpg', width: 1200, height: 630 }],
    },
    other: {
      'apple-itunes-app': `app-id=6761689038, app-argument=qadam://club/${id}`,
    },
  }
}

export default async function ClubPage({ params }: { params: Params }) {
  const { id } = await params

  const { data: club } = await supabase
    .from('clubs')
    .select('id, name, description, city')
    .eq('id', id)
    .single()

  if (!club) {
    notFound()
  }

  const { count: memberCount } = await supabase
    .from('club_members')
    .select('*', { count: 'exact', head: true })
    .eq('club_id', id)
    .eq('status', 'active')

  return (
    <div
      style={{
        backgroundColor: '#F6F6F2',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto',
          padding: '48px 32px 32px',
        }}
      >
        <p
          style={{
            color: '#D4E90E',
            fontSize: '13px',
            fontWeight: '700',
            lineHeight: '1.0',
            margin: '0 0 16px',
          }}
        >
          QADAM
        </p>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '1.2',
            color: '#1A1A1A',
            margin: '0 0 8px',
          }}
        >
          {club.name}
        </h1>

        <p
          style={{
            fontSize: '14px',
            fontWeight: '400',
            color: '#666',
            margin: '0 0 16px',
          }}
        >
          {memberCount ?? 0} участников
        </p>

        {club.description ? (
          <p
            style={{
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#1A1A1A',
              margin: '0 0 24px',
            }}
          >
            {club.description}
          </p>
        ) : (
          <div style={{ marginBottom: '24px' }} />
        )}

        <a
          href={`qadam://club/${id}`}
          style={{
            display: 'block',
            backgroundColor: '#D4E90E',
            color: '#1A1A1A',
            borderRadius: '50px',
            padding: '16px',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '16px',
            textDecoration: 'none',
          }}
        >
          Открыть в QADAM
        </a>

        <a
          href="https://apps.apple.com/kz/app/qadam/id6761689038"
          style={{
            display: 'block',
            backgroundColor: 'transparent',
            color: '#1A1A1A',
            border: '2px solid #1A1A1A',
            borderRadius: '50px',
            padding: '16px',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '16px',
            textDecoration: 'none',
            marginTop: '12px',
          }}
        >
          Скачать в App Store
        </a>
      </div>
    </div>
  )
}
