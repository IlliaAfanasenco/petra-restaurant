import Link from 'next/link';
import Image from 'next/image';
import { LOGO_SIZE, LOGO_SRC, SITE_NAME } from '@/lib/site';
import { locales, type Dictionary, type Locale } from '@/lib/i18n';

export function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  return <footer className="site-footer">
    <div className="footer-top"><div><Link href={`/${locale}`} className="footer-brand" aria-label={`${SITE_NAME} – home`}><Image className="footer-logo" src={LOGO_SRC} alt={SITE_NAME} width={LOGO_SIZE.width} height={LOGO_SIZE.height} /></Link><p>{t.footer.desc}</p></div><div className="footer-info"><span>{t.footer.address}</span><span>{t.footer.hours}</span></div></div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} {SITE_NAME}. {t.footer.credits}</span>
      <div>{locales.map((lang) => (
        <Link key={lang} href={`/${lang}`} hrefLang={lang} lang={lang} className={lang === locale ? 'active' : ''} aria-current={lang === locale ? 'page' : undefined}>
          {lang.toUpperCase()}
        </Link>
      ))}</div>
      <a href="#top">↑ BACK TO TOP</a>
    </div>
  </footer>;
}
