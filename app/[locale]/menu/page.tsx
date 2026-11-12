import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n';
import { SITE_NAME } from '@/lib/site';
import { SiteHeader } from '@/components/site-header';
import { MenuSection } from '@/components/menu-section';
import { SiteFooter } from '@/components/site-footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: `${t.home.fullMenuTitle} | ${SITE_NAME}`, description: t.menu.intro, alternates: { canonical: `/${locale}/menu` } };
}

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return (
    <>
      <SiteHeader locale={locale} t={t} />
      <main id="main-content" className="menu-page">
        <p className="menu-back section-shell"><Link href={`/${locale}`}>{t.home.backHome}</Link></p>
        <MenuSection locale={locale} t={t} />
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
