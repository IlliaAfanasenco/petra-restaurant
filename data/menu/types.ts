export type MenuLocale = "he" | "ru" | "en";
export type LocalizedText = Record<MenuLocale, string>;
export type NullableLocalizedText = Record<MenuLocale, string | null>;

export interface MenuCategory {
  id: string;
  name: LocalizedText;
  sortOrder: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: LocalizedText;
  description: NullableLocalizedText;
  priceILS: number | null;
  priceDisplay: string;
  isNewOnSource: boolean;
  image: string | null;
  review: string[];
}

export interface MenuExtraOption {
  name: LocalizedText;
  priceILS: number;
}

export interface MenuExtraGroup {
  id: string;
  categoryId: string;
  title: LocalizedText;
  note?: LocalizedText;
  options: MenuExtraOption[];
}

export interface MenuCatalog {
  catalogName: string;
  status: string;
  currency: "ILS";
  locales: MenuLocale[];
  categories: MenuCategory[];
  items: MenuItem[];
  extras: MenuExtraGroup[];
  reference: { restaurant: string; url: string; verifiedDate: string; notes: string };
  sourceNotes: {
    fishSideOptions: LocalizedText;
    breakfastHours: LocalizedText;
    deliveryMinimum: { weekdaysILS: number; weekendsILS: number };
    orderCutoff: string;
    disclaimer: string;
  };
}
