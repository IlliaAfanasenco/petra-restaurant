'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CategoryView } from '@/data/menu/home';
import type { Dictionary } from '@/lib/i18n';

type Props = { categories: CategoryView[]; menuHref: string; t: Dictionary };

/** Compact home-page menu browser: category tabs switch in place (no navigation); a link leads to the full catalog. */
export function MenuExplorer({ categories, menuHref, t }: Props) {
  const uid = useId();
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  if (!active) return null;

  const onKey = (e: KeyboardEvent, i: number) => {
    const rtl = document.documentElement.dir === 'rtl';
    const step = e.key === 'ArrowRight' ? (rtl ? -1 : 1) : e.key === 'ArrowLeft' ? (rtl ? 1 : -1) : 0;
    if (!step && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? categories.length - 1 : (i + step + categories.length) % categories.length;
    setActiveId(categories[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="explore" className="explorer section-shell" aria-labelledby="explore-title">
      <div className="explorer-head">
        <div>
          <span className="section-kicker">{t.home.explore.kicker}</span>
          <h2 id="explore-title">{t.home.explore.title}</h2>
        </div>
        <Link href={`${menuHref}#menu-${active.id}`} className="story-btn story-btn-outline">{t.home.explore.fullMenu}<ArrowUpRight size={17} /></Link>
      </div>

      <div className="explorer-tabs" role="tablist" aria-label={t.home.explore.category}>
        {categories.map((c, i) => (
          <button key={c.id} type="button" role="tab" id={`${uid}-tab-${c.id}`} aria-selected={c.id === active.id} aria-controls={`${uid}-panel`}
            tabIndex={c.id === active.id ? 0 : -1} ref={(el) => { tabs.current[i] = el; }} onClick={() => setActiveId(c.id)} onKeyDown={(e) => onKey(e, i)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="explorer-panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${active.id}`} key={active.id}>
        <ul className="explorer-grid">
          {active.items.map((d) => (
            <li key={d.id} className="explorer-card">
              {d.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="explorer-img" src={d.image} alt="" loading="lazy" />
              )}
              <div className="explorer-card-head">
                <h3>{d.name}</h3>
                <span className="explorer-price" dir="ltr">{d.price}</span>
              </div>
              {d.description && <p>{d.description}</p>}
              {d.multiPrice && <small>{t.menu.multiPrice}</small>}
            </li>
          ))}
        </ul>
        <p className="explorer-more">
          <Link href={`${menuHref}#menu-${active.id}`}>{active.label} · {active.total} {t.home.explore.dishes}<ArrowUpRight size={15} /></Link>
        </p>
      </div>
    </section>
  );
}
