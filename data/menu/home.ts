import { formatMenuPrice, getMenuCategories, getMenuItems, menuCatalog } from './index';
import type { MenuItem, MenuLocale } from './types';

// Curated picks for the home page. Every value is an id from menu.json; names, prices and descriptions are read
// from the catalog, never duplicated here.
export const SIGNATURE_ITEM_ID = 'georgian-adjarian-khachapuri';
export const TRADITION_ITEM_ID = 'georgian-imeruli-khachapuri';
export const TEASER_CATEGORY_IDS = ['georgian', 'starters', 'meat', 'desserts'] as const;
export const TEASER_ITEMS_PER_CATEGORY = 2;
export const EXPLORER_ITEMS_PER_CATEGORY = 6;

/** Serializable, locale-resolved view of a menu item for client components. */
export type DishView = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  /** true when the source lists several price options (priceILS is null) */
  multiPrice: boolean;
  image: string | null;
};

export type CategoryView = { id: string; label: string; total: number; items: DishView[] };

export function toDishView(item: MenuItem, locale: MenuLocale): DishView {
  return {
    id: item.id,
    name: item.name[locale],
    description: item.description[locale],
    price: formatMenuPrice(item, locale),
    multiPrice: item.priceILS === null,
    image: item.image,
  };
}

export function getDish(id: string, locale: MenuLocale): DishView {
  const item = menuCatalog.items.find((i) => i.id === id);
  if (!item) throw new Error(`Menu item "${id}" is missing from menu.json`);
  return toDishView(item, locale);
}

export function getCategoryViews(locale: MenuLocale, limit: number, only?: readonly string[]): CategoryView[] {
  return getMenuCategories()
    .filter((c) => !only || only.includes(c.id))
    .map((c) => {
      const all = getMenuItems(c.id);
      return { id: c.id, label: c.name[locale], total: all.length, items: all.slice(0, limit).map((i) => toDishView(i, locale)) };
    });
}
