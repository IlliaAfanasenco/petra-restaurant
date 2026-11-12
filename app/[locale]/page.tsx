import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n';
import { SiteHeader } from '@/components/site-header';
import { PetraStory } from '@/components/story/petra-story';
import { MenuExplorer } from '@/components/menu/menu-explorer';
import { VisitSection } from '@/components/visit-section';
import { ReservationSection } from '@/components/reservation-section';
import { SiteFooter } from '@/components/site-footer';
import { EXPLORER_ITEMS_PER_CATEGORY, SIGNATURE_ITEM_ID, TEASER_CATEGORY_IDS, TEASER_ITEMS_PER_CATEGORY, TRADITION_ITEM_ID, getCategoryViews, getDish } from '@/data/menu/home';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return (
    <>
      <SiteHeader locale={locale} t={t} />
      <main id="main-content">
        <PetraStory
          locale={locale}
          t={t}
          signature={getDish(SIGNATURE_ITEM_ID, locale)}
          tradition={getDish(TRADITION_ITEM_ID, locale)}
          teaser={getCategoryViews(locale, TEASER_ITEMS_PER_CATEGORY, TEASER_CATEGORY_IDS)}
        />
        <MenuExplorer categories={getCategoryViews(locale, EXPLORER_ITEMS_PER_CATEGORY)} menuHref={`/${locale}/menu`} t={t} />
        <ReservationSection t={t} />
        <VisitSection locale={locale} t={t} />
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
