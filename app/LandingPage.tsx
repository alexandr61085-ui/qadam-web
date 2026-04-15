'use client'

import { useEffect, useRef, useState } from 'react'
import './landing.css'

const APP_STORE_URL = 'https://apps.apple.com/kz/app/qadam/id6761689038'

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      headerRef.current?.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* HEADER */}
      <header id="header" ref={headerRef}>
        <nav className="nav container" aria-label="Основная навигация">
          <a href="/" className="nav-logo" aria-label="QADAM — на главную">
            <img src="/assets/img/app-icon.png" width={28} height={28} alt="" aria-hidden="true" style={{ borderRadius: 7, display: 'block' }} />
            QADAM
          </a>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            <li><a href="#how" onClick={() => setMenuOpen(false)}>Как работает</a></li>
            <li><a href="#features" onClick={() => setMenuOpen(false)}>Возможности</a></li>
            <li><a href="/privacy.html" onClick={() => setMenuOpen(false)}>Конфиденциальность</a></li>
            <li><a href="/terms.html" onClick={() => setMenuOpen(false)}>Условия</a></li>
            <li><a href="/support.html" onClick={() => setMenuOpen(false)}>Поддержка и контакты</a></li>
          </ul>
          <button
            className="nav-mobile-toggle"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M3 5h16M3 11h16M3 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" aria-label="Главный экран">
          <div className="hero-bg-grid" aria-hidden="true" />
          <div className="hero-bg-glow" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge" aria-label="Новое приложение">
                <div className="hero-badge-dot" aria-hidden="true" />
                Доступно в App Store и Google Play
              </div>
              <h1 className="hero-title">
                Найди свой<br /><span>спорт</span><br />рядом
              </h1>
              <p className="hero-subtitle">
                Бег, футбол, йога, хайкинг — находи события и команды рядом с тобой.
              </p>
              <div className="hero-actions">
                <a href={APP_STORE_URL} className="btn-store" aria-label="Скачать в App Store">
                  <svg className="btn-store-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <rect width="28" height="28" rx="8" fill="#1A1A1A" />
                    <path d="M18.4 14.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.8 3-.8 1.4 0 1.8.8 3 .7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.4-.9-2.4-3.3zm-2.3-6.1c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.7-.9 1.7-.8 2.6.9.1 1.9-.5 2.5-1.2z" fill="white" />
                  </svg>
                  <div className="btn-store-text">
                    <span className="btn-store-sub">Загрузить в</span>
                    <span className="btn-store-name">App Store</span>
                  </div>
                </a>
                <a href="#" className="btn-store" aria-label="Скачать в Google Play">
                  <svg className="btn-store-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <rect width="28" height="28" rx="8" fill="#1A1A1A" />
                    <path d="M7 6.2v15.6c0 .6.7 1 1.2.6l11.1-7.8c.4-.3.4-.9 0-1.2L8.2 5.6C7.7 5.2 7 5.6 7 6.2z" fill="#D4E90E" />
                    <path d="M7 6.2l8 8-8 7.6V6.2z" fill="url(#g1)" />
                    <defs>
                      <linearGradient id="g1" x1="7" y1="6.2" x2="7" y2="21.8" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4FC3F7" />
                        <stop offset="1" stopColor="#1976D2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="btn-store-text">
                    <span className="btn-store-sub">Загрузить в</span>
                    <span className="btn-store-name">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="hero-phone-wrap" aria-hidden="true">
              <div className="phone-mockup">
                <div className="phone-frame">
                  <div className="phone-screen">
                    <img src="/assets/img/hero-screen.png" alt="" style={{ display: 'block', width: '100%' }} fetchPriority="high" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" aria-labelledby="how-title">
          <div className="container">
            <div className="fade-up">
              <span className="section-label">Как это работает</span>
              <h2 className="section-title" id="how-title">Три шага к<br />первой тренировке</h2>
              <p className="section-sub">Никаких сложностей. Скачай, найди и присоединяйся.</p>
            </div>
            <div className="steps-grid">
              <div className="step-card fade-up">
                <div className="step-number" aria-hidden="true">01</div>
                <div className="step-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.7 2 6 4.7 6 8c0 5.3 6 14 6 14s6-8.7 6-14c0-3.3-2.7-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" fill="#D4E90E" />
                  </svg>
                </div>
                <h3 className="step-title">Выбери город и спорт</h3>
                <p className="step-text">Укажи свой город и любимые виды спорта. QADAM подберёт актуальные события рядом с тобой.</p>
              </div>
              <div className="step-card fade-up">
                <div className="step-number" aria-hidden="true">02</div>
                <div className="step-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="3" stroke="#D4E90E" strokeWidth="1.8" />
                    <path d="M8 2v4M16 2v4M3 10h18" stroke="#D4E90E" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="9" cy="15" r="1.5" fill="#D4E90E" />
                    <circle cx="15" cy="15" r="1.5" fill="#D4E90E" />
                  </svg>
                </div>
                <h3 className="step-title">Запишись на событие</h3>
                <p className="step-text">Просматривай расписание, читай описания, смотри состав участников и бронируй место одним нажатием.</p>
              </div>
              <div className="step-card fade-up">
                <div className="step-number" aria-hidden="true">03</div>
                <div className="step-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="7" r="3.5" stroke="#D4E90E" strokeWidth="1.8" />
                    <circle cx="16" cy="7" r="3.5" stroke="#D4E90E" strokeWidth="1.8" />
                    <path d="M2 20c0-3.9 3.1-7 7-7M15 13c3.9 0 7 3.1 7 7" stroke="#D4E90E" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="step-title">Тренируйся и общайся</h3>
                <p className="step-text">Встречайся с единомышленниками, вступай в клубы, обменивайся сообщениями в чате события.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" aria-labelledby="features-title">
          <div className="container">
            <div className="features-header fade-up">
              <span className="section-label">Возможности</span>
              <h2 className="section-title" id="features-title">Всё для активного образа жизни</h2>
              <p className="section-sub">Мощные инструменты для тех, кто хочет двигаться больше и встречать новых людей.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card fade-up" role="article">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.7 2 6 4.7 6 8c0 5.3 6 14 6 14s6-8.7 6-14c0-3.3-2.7-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" fill="#D4E90E" />
                  </svg>
                </div>
                <h3 className="feature-title">События рядом</h3>
                <p className="feature-text">Карта и лента событий с фильтрами по спорту, уровню, дате и расстоянию. Никогда не пропустишь что-то интересное.</p>
              </div>
              <div className="feature-card fade-up" role="article">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#D4E90E" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4" stroke="#D4E90E" strokeWidth="1.8" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#D4E90E" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="feature-title">Спортивные клубы</h3>
                <p className="feature-text">Вступай в клубы по интересам или создавай свои. Организуй регулярные тренировки для своего сообщества.</p>
              </div>
              <div className="feature-card fade-up" role="article">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#D4E90E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="feature-title">Умные уведомления</h3>
                <p className="feature-text">Push-напоминания о событиях, объявления организатора, новые участники — всегда в курсе, без лишнего шума.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SCREENSHOTS */}
        <section id="screenshots" aria-labelledby="screenshots-title">
          <div className="container">
            <div className="fade-up" style={{ textAlign: 'center' }}>
              <span className="section-label" style={{ background: 'rgba(212,233,14,.12)' }}>Интерфейс</span>
              <h2 className="section-title" id="screenshots-title">Красиво и удобно</h2>
              <p className="section-sub" style={{ margin: '0 auto' }}>Чистый дизайн, быстрая навигация. Всё под рукой за пару нажатий.</p>
            </div>
            <div className="screens-row" role="list" aria-label="Скриншоты приложения">
              <div className="screen-item side fade-up" role="listitem">
                <div className="screen-frame">
                  <div className="screen-img" style={{ padding: 0, background: 'none', overflow: 'hidden' }}>
                    <img src="/assets/img/screen-events.png" alt="Лента событий" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                </div>
                <p className="screen-caption">Лента событий</p>
              </div>
              <div className="screen-item main fade-up" role="listitem">
                <div className="screen-frame">
                  <div className="screen-img" style={{ padding: 0, background: 'none', overflow: 'hidden' }}>
                    <img src="/assets/img/screen-event-detail.png" alt="Детали события" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                </div>
                <p className="screen-caption">Детали события</p>
              </div>
              <div className="screen-item side fade-up" role="listitem">
                <div className="screen-frame">
                  <div className="screen-img" style={{ padding: 0, background: 'none', overflow: 'hidden' }}>
                    <img src="/assets/img/screen-profile.png" alt="Профиль" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                </div>
                <p className="screen-caption">Профиль</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" aria-labelledby="cta-title">
          <div className="cta-bg" aria-hidden="true" />
          <div className="cta-inner fade-up">
            <h2 className="cta-title" id="cta-title">Первая тренировка — сегодня</h2>
            <div className="cta-buttons">
              <a href={APP_STORE_URL} className="btn-cta-dark" aria-label="Скачать QADAM в App Store">
                <svg className="btn-store-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <rect width="28" height="28" rx="8" fill="#2A2A2A" />
                  <path d="M18.4 14.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.8 3-.8 1.4 0 1.8.8 3 .7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.4-.9-2.4-3.3zm-2.3-6.1c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.7-.9 1.7-.8 2.6.9.1 1.9-.5 2.5-1.2z" fill="white" />
                </svg>
                <div className="btn-store-text">
                  <span className="btn-store-sub">Загрузить в</span>
                  <span className="btn-store-name">App Store</span>
                </div>
              </a>
              <a href="#" className="btn-cta-dark" aria-label="Скачать QADAM в Google Play">
                <svg className="btn-store-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <rect width="28" height="28" rx="8" fill="#2A2A2A" />
                  <path d="M7 6.2v15.6c0 .6.7 1 1.2.6l11.1-7.8c.4-.3.4-.9 0-1.2L8.2 5.6C7.7 5.2 7 5.6 7 6.2z" fill="#D4E90E" />
                </svg>
                <div className="btn-store-text">
                  <span className="btn-store-sub">Загрузить в</span>
                  <span className="btn-store-name">Google Play</span>
                </div>
              </a>
            </div>
            <p className="cta-note">Бесплатно. Без подписок. iOS и Android.</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="footer">
        <div className="container">
          <div className="footer-bottom">
            <div className="footer-brand-name">
              <img src="/assets/img/app-icon.png" width={24} height={24} alt="" aria-hidden="true" style={{ borderRadius: 6, display: 'block' }} />
              QADAM
            </div>
            <p className="footer-copy">&copy; 2026 QADAM. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
