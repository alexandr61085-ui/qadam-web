import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const alt = 'QADAM — Спортивное событие'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Params = Promise<{ id: string }>

export default async function OGImage({ params }: { params: Params }) {
  const { id } = await params

  const [fontData, fontBoldData] = await Promise.all([
    fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/cyrillic-400-normal.ttf'
    ).then((res) => res.arrayBuffer()),
    fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/cyrillic-700-normal.ttf'
    ).then((res) => res.arrayBuffer()),
  ])

  const { data: event } = await supabase
    .from('events')
    .select('title, sport, date_time, city')
    .eq('id', id)
    .single()

  const title = event?.title ?? 'Спортивное событие'

  const formattedDate = event?.date_time
    ? new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        timeZone: 'Asia/Almaty',
      }).format(new Date(event.date_time))
    : null

  const metaRow = [event?.sport, event?.city, formattedDate]
    .filter(Boolean)
    .join(' · ')

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A1A1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
        }}
      >
        <div
          style={{
            color: '#D4E90E',
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 16,
            display: 'flex',
          }}
        >
          QADAM
        </div>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 24,
            display: 'flex',
          }}
        >
          {title}
        </div>
        {metaRow ? (
          <div
            style={{
              color: '#D4E90E',
              fontSize: 28,
              fontWeight: 400,
              display: 'flex',
            }}
          >
            {metaRow}
          </div>
        ) : null}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: fontData, style: 'normal', weight: 400 as const },
        { name: 'Inter', data: fontBoldData, style: 'normal', weight: 700 as const },
      ],
    }
  )
}
