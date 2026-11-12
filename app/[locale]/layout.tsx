import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { direction, getDictionary, isLocale, locales } from '@/lib/i18n';
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';
import { fontVariables } from '../fonts';
import '../globals.css';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: `${SITE_NAME} | ${t.hero.eyebrow}`,
    description: t.hero.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { he: '/he', ru: '/ru', en: '/en', 'x-default': '/he' },
    },
    openGraph: { title: SITE_NAME, siteName: SITE_NAME, url: `/${locale}`, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }], description: t.hero.description, type: 'website', locale: locale === 'he' ? 'he_IL' : locale === 'ru' ? 'ru_RU' : 'en_US' },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={direction(locale)} data-scroll-behavior="smooth" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
