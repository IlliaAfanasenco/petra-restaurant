import menuData from "./menu.json";
import type { MenuCatalog, MenuLocale } from "./types";

export const menuCatalog = menuData as MenuCatalog;

export function getMenuCategories() {
  return [...menuCatalog.categories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getMenuItems(categoryId: string) {
  return menuCatalog.items.filter(item => item.categoryId === categoryId);
}

export function formatMenuPrice(item: MenuCatalog["items"][number], locale: MenuLocale) {
  // Preserve the original slash-separated price label for variants
  return item.priceILS === null ? `${item.priceDisplay} ₪` :
    new Intl.NumberFormat(locale === "he" ? "he-IL" : locale === "ru" ? "ru-RU" : "en-IL", {
      style: "currency", currency: "ILS", maximumFractionDigits: 0,
    }).format(item.priceILS);
}

export function getMenuDirection(locale: MenuLocale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}
