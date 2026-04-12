import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params

  const { data: event } = await supabase
    .from('events')
    .select('title, sport, date_time, city')
    .eq('id', id)
    .single()

  if (!event) {
    return { title: 'Событие не найдено — QADAM' }
  }

  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Almaty',
  }).format(new Date(event.date_time))

  const description = `${event.sport} · ${event.city} · ${formattedDate}`

  return {
    title: `${event.title} — QADAM`,
    description,
    openGraph: {
      title: event.title,
      description,
    },
    other: {
      'apple-itunes-app': `app-id=6761689038, app-argument=qadam://event/${id}`,
    },
  }
}

export default async function EventPage({ params }: { params: Params }) {
  const { id } = await params

  const { data: event } = await supabase
    .from('events')
    .select('id, title, sport, date_time, city, description')
    .eq('id', id)
    .single()

  if (!event) {
    notFound()
  }

  const { count: participantCount } = await supabase
    .from('event_participants')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', id)
    .eq('status', 'going')

  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Almaty',
  }).format(new Date(event.date_time))

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
          {event.title}
        </h1>

        <p
          style={{
            fontSize: '14px',
            fontWeight: '400',
            color: '#666',
            margin: '0 0 4px',
          }}
        >
          {event.sport} · {event.city} · {formattedDate}
        </p>

        <p
          style={{
            fontSize: '14px',
            fontWeight: '400',
            color: '#1A1A1A',
            margin: '0 0 16px',
          }}
        >
          {participantCount ?? 0} участников
        </p>

        {event.description ? (
          <p
            style={{
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#1A1A1A',
              margin: '0 0 24px',
            }}
          >
            {event.description}
          </p>
        ) : (
          <div style={{ marginBottom: '24px' }} />
        )}

        <a
          href={`qadam://event/${id}`}
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
