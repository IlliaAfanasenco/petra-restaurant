import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { DishView } from '@/data/menu/home';

/** Compact dish plate: real name / description / price from the menu catalog (photo only when the data has one). */
export function StoryDish({ dish, href, cta, size = 'lg', lead }: { dish: DishView; href: string; cta: string; size?: 'sm' | 'lg'; lead?: boolean }) {
  return (
    <article className="story-dish" data-size={size} data-lead={lead || undefined}>
      {dish.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="story-dish-img" src={dish.image} alt="" loading="lazy" />
      )}
      <div className="story-dish-head">
        {!lead && <h3 className="story-dish-name">{dish.name}</h3>}
        <span className="story-dish-price" dir="ltr">{dish.price}</span>
      </div>
      {dish.description && <p className="story-dish-desc">{dish.description}</p>}
      <Link href={href} className="story-link">{cta}<ArrowUpRight size={15} /></Link>
    </article>
  );
}
