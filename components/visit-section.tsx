import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';

// Practical info comes only from approved Petra data. Address, hours and phone are not yet supplied,
// so the existing "to be added" placeholders are shown instead of invented details.
export function VisitSection({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="visit" className="visit-section section-shell" aria-labelledby="visit-title">
      <h2 id="visit-title">{t.visit.title}</h2>
      <ul className="visit-info">
        <li>{t.footer.address}</li>
        <li>{t.footer.hours}</li>
      </ul>
      <div className="story-actions">
        <Link href={`/${locale}/menu`} className="story-btn story-btn-outline">{t.nav.menu}<ArrowUpRight size={17} /></Link>
        <a href="#reserve" className="story-btn story-btn-solid">{t.nav.reserve}<ArrowUpRight size={17} /></a>
      </div>
    </section>
  );
}
