'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGO_SIZE, LOGO_SRC, SITE_NAME } from '@/lib/site';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { locales, type Dictionary, type Locale } from '@/lib/i18n';

export function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const nav = [
    { href: `/${locale}/menu`, label: t.nav.menu },
    { href: `/${locale}#story`, label: t.nav.story },
    { href: `/${locale}#experience`, label: t.nav.experience },
    { href: `/${locale}#visit`, label: t.nav.visit },
  ];
  return (
    <header className="site-header">
      <a className="brand" href={`/${locale}`} aria-label={`${SITE_NAME} – home`}><Image className="brand-logo" src={LOGO_SRC} alt={SITE_NAME} width={LOGO_SIZE.width} height={LOGO_SIZE.height} priority /></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <div className="language-pills" aria-label="Select language">
          {locales.map((lang) =>
            <Link href={`/${lang}`} hrefLang={lang} lang={lang} key={lang} className={lang === locale ? 'active' : ''} aria-current={lang === locale ? 'page' : undefined} onClick={() => setOpen(false)}>
              {lang.toUpperCase()}
            </Link>
          )}
        </div>
        <Link href={`/${locale}/menu`} className="header-menu">{t.nav.menu}</Link>
        <a href={`/${locale}#reserve`} className="header-book">{t.nav.reserve}<ArrowUpRight size={14} /></a>
        <button type="button" className="mobile-toggle" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={25} /> : <Menu size={25} />}</button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        {[...nav, { href: `/${locale}#reserve`, label: t.nav.reserve }].map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <div className="mobile-langs">{locales.map((lang) => <Link href={`/${lang}`} hrefLang={lang} lang={lang} key={lang} className={lang === locale ? 'active' : ''} aria-current={lang === locale ? 'page' : undefined}>{lang.toUpperCase()}</Link>)}</div>
      </nav>}
    </header>
  );
}
