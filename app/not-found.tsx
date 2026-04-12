export default function NotFound() {
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
            margin: '0 0 24px',
          }}
        >
          QADAM
        </p>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1A1A1A',
            margin: '0 0 24px',
          }}
        >
          Страница не найдена
        </h1>

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
          }}
        >
          Скачать QADAM
        </a>
      </div>
    </div>
  )
}
