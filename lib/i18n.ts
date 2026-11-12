export const locales = ['he', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const direction = (locale: Locale) => (locale === 'he' ? 'rtl' : 'ltr');

const translations = {
  he: {
    label: 'עברית',
    nav: { menu: 'התפריט', story: 'הסיפור שלנו', experience: 'החוויה', reserve: 'הזמנת מקום', visit: 'ביקור' },
    hero: {
      eyebrow: 'טעמים מגאורגיה, מהלב',
      titleFirst: 'אהבה מתחילה',
      titleAccent: 'סביב השולחן.',
      description: 'בצק שמכינים באהבה, גבינה שנמסה ברגע הנכון ואירוח שלא שוכחים.',
      menu: 'לגלות את התפריט', reserve: 'להזמין שולחן',
    },
    story6: {
      label: 'סיפור הכנת החצ׳פורי',
      fullMenu: 'כל התפריט',
      scenes: [
      { kicker: 'הסיפור שלנו', title: 'אירוח עם שורשים גאורגיים.', body: 'בגאורגיה, השולחן הוא הרבה יותר ממקום לאכול. הוא מקום שבו חברים הופכים למשפחה, סיפורים עוברים מדור לדור, וכל אורח תמיד מוזמן להישאר עוד קצת.' },
      { kicker: 'עבודת יד', title: 'הבצק מתעורר.', body: 'כל תנועה מלאה במסורת ובאהבה. בצק שמכינים באהבה.' },
      { kicker: 'מסורת גאורגית', title: 'החצ׳פורי נולד.', body: 'גבינה נדיבה, ביצה טרייה וצורת סירה מושלמת.' },
      { kicker: 'לגלות את התפריט', title: 'מהמטבח שלנו.', body: 'מסורות של דורות, חומרי גלם טובים ורגעים שכיף לחלוק.' },
      { kicker: 'ישר מהתנור', title: 'הזמן לטעום.', body: 'זהב, חום ואושר — הזמן לטעום.' },
      ],
    },
    visit: { title: 'ביקור אצלנו' },
    home: {
      signatureKicker: 'המנה המיוחדת', seeInMenu: 'לראות בתפריט', menuHighlights: 'מנות נבחרות',
      explore: { kicker: 'לגלות את התפריט', title: 'בחרו קטגוריה.', dishes: 'מנות', fullMenu: 'לתפריט המלא', category: 'קטגוריה בתפריט' },
      fullMenuTitle: 'התפריט המלא', backHome: 'חזרה לדף הבית',
    },
    marquee: 'יותר מאוכל · זו דרך לארח · ',
    menu: {
      eyebrow: 'מהמטבח שלנו', title: 'התפריט שלנו.',
      intro: 'מסורות של דורות, חומרי גלם טובים ורגעים שכיף לחלוק.',
      allergen: 'התפריט בטיוטה: מחירים, מרכיבים ואלרגנים יאושרו על ידי המסעדה לפני הפרסום.',
      categories: 'קטגוריות התפריט', extras: 'תוספות ואפשרויות', multiPrice: 'כמה אפשרויות מחיר',
      breakfastHours: 'שעות ארוחת בוקר', fishSides: 'תוספות לדגים',
    },
    story: {
      eyebrow: 'שורשים עמוקים', title: 'מסורת שאפשר להרגיש בכל ביס.',
      body: 'בגאורגיה, השולחן הוא הרבה יותר ממקום לאכול. הוא מקום שבו חברים הופכים למשפחה, סיפורים עוברים מדור לדור, וכל אורח תמיד מוזמן להישאר עוד קצת.',
      quote: '״אורח הוא מתנה.״', link: 'להכיר אותנו',
    },
    experience: { eyebrow: 'בואו להרגיש בבית', title: 'ערבים שנשארים איתכם.', body: 'רגעים חמים. שיחות ארוכות. לחם טרי שמגיע למרכז השולחן. בדיוק בשביל זה אנחנו כאן.', line1: 'טעמים אותנטיים', line2: 'אווירה חמה', line3: 'רגעים יחד' },
    reserve: {
      eyebrow: 'מקום סביב השולחן', title: 'מחכים לכם.',
      body: 'בקרוב תוכלו להזמין שולחן ישירות דרך האתר. בינתיים אפשר להכין ולשמור בקשת הזמנה.',
      name: 'שם מלא', guests: 'מספר סועדים', date: 'תאריך', time: 'שעה',
      create: 'להעתיק בקשת הזמנה', copied: 'הבקשה הועתקה! שלחו אותה למסעדה לאחר חיבור פרטי הקשר.',
      footnote: 'גרסת הדגמה: הבקשה מועתקת בלבד, ולא נשלחת למסעדה.',
      request: 'בקשת הזמנה',
    },
    footer: { desc: 'טעמים גאורגיים. נשמה גדולה. שולחן אחד לכולם.', address: 'ישראל · פרטי המיקום יתווספו', hours: 'שעות פתיחה יתווספו', credits: 'נוצר באהבה, מוגש בחום.' },
  },
  ru: {
    label: 'Русский',
    nav: { menu: 'Меню', story: 'Наша история', experience: 'Атмосфера', reserve: 'Забронировать', visit: 'Контакты' },
    hero: {
      eyebrow: 'Грузия, приготовленная с любовью',
      titleFirst: 'Любовь начинается',
      titleAccent: 'за одним столом.',
      description: 'Тесто, замешанное с душой. Сыр, который тает в нужный момент. Гостеприимство, которое невозможно забыть.',
      menu: 'Открыть меню', reserve: 'Забронировать стол',
    },
    story6: {
      label: 'История приготовления хачапури',
      fullMenu: 'Всё меню',
      scenes: [
      { kicker: 'Наша история', title: 'Гостеприимство с грузинскими корнями.', body: 'В Грузии стол — это гораздо больше, чем место для еды. Здесь друзья становятся семьёй, истории переходят из поколения в поколение, а гостю всегда рады ещё немного дольше.' },
      { kicker: 'Сделано вручную', title: 'Тесто оживает.', body: 'Каждое движение наполнено традицией. Тесто, замешанное с душой.' },
      { kicker: 'Грузинские традиции', title: 'Рождается хачапури.', body: 'Много сыра, свежий желток и идеальная лодочка.' },
      { kicker: 'Откройте меню', title: 'Из нашей кухни.', body: 'Традиции поколений, свежие ингредиенты и блюда, которыми хочется делиться.' },
      { kicker: 'Прямо из печи', title: 'Пора пробовать.', body: 'Золотистое, горячее, счастливое. Пора пробовать.' },
      ],
    },
    visit: { title: 'Приходите к нам' },
    home: {
      signatureKicker: 'Фирменное блюдо', seeInMenu: 'Смотреть в меню', menuHighlights: 'Избранное',
      explore: { kicker: 'Откройте меню', title: 'Выберите раздел.', dishes: 'блюд', fullMenu: 'Полное меню', category: 'Раздел меню' },
      fullMenuTitle: 'Полное меню', backHome: 'На главную',
    },
    marquee: 'Не просто еда · искусство гостеприимства · ',
    menu: {
      eyebrow: 'Из нашей кухни', title: 'Наше меню.',
      intro: 'Традиции поколений, свежие ингредиенты и блюда, которыми хочется делиться.',
      allergen: 'Черновик меню: цены, состав и аллергены будут подтверждены рестораном до публикации.',
      categories: 'Категории меню', extras: 'Добавки и опции', multiPrice: 'Несколько вариантов цены',
      breakfastHours: 'Часы завтраков', fishSides: 'Гарниры к рыбе',
    },
    story: {
      eyebrow: 'Корни и традиции', title: 'История, которую чувствуешь в каждом кусочке.',
      body: 'В Грузии стол — это гораздо больше, чем место для еды. Здесь друзья становятся семьёй, истории переходят из поколения в поколение, а гостю всегда рады ещё немного дольше.',
      quote: '«Гость — это подарок».', link: 'Наша история',
    },
    experience: { eyebrow: 'Почувствуйте себя дома', title: 'Вечера, которые остаются с вами.', body: 'Тёплые встречи. Долгие разговоры. Горячий хлеб посреди стола. Именно ради этого мы здесь.', line1: 'Настоящие вкусы', line2: 'Тёплая атмосфера', line3: 'Время вместе' },
    reserve: {
      eyebrow: 'Место за столом', title: 'Мы вас ждём.',
      body: 'Скоро здесь появится онлайн-бронирование. Пока вы можете составить и скопировать запрос на столик.',
      name: 'Ваше имя', guests: 'Количество гостей', date: 'Дата', time: 'Время',
      create: 'Скопировать запрос', copied: 'Запрос скопирован! Отправьте его ресторану после добавления контактов.',
      footnote: 'Демо-версия: запрос копируется, но не отправляется в ресторан.',
      request: 'Запрос на бронирование',
    },
    footer: { desc: 'Грузинский вкус. Большая душа. Один стол для всех.', address: 'Израиль · адрес будет добавлен', hours: 'Время работы будет добавлено', credits: 'Сделано с любовью, подаётся с теплом.' },
  },
  en: {
    label: 'English',
    nav: { menu: 'Our menu', story: 'Our story', experience: 'The experience', reserve: 'Book a table', visit: 'Visit' },
    hero: {
      eyebrow: 'Georgia, made with love',
      titleFirst: 'Love begins',
      titleAccent: 'around the table.',
      description: 'Dough made with soul. Cheese melting at just the right moment. Hospitality you never forget.',
      menu: 'Explore the menu', reserve: 'Book a table',
    },
    story6: {
      label: 'Khachapuri preparation story',
      fullMenu: 'Full menu',
      scenes: [
      { kicker: 'Our story', title: 'Hospitality with Georgian roots.', body: 'In Georgia, the table is more than a place to eat. It is where friends become family, stories are passed down and every guest is always welcome to stay a little longer.' },
      { kicker: 'Made by hand', title: 'The dough comes alive.', body: 'Every movement carries a little tradition. Dough made with soul.' },
      { kicker: 'Georgian traditions', title: 'Khachapuri is born.', body: 'Generous cheese, a golden yolk and a perfect little boat.' },
      { kicker: 'Explore the menu', title: 'From our kitchen.', body: 'Generations of tradition, good ingredients and dishes made for sharing.' },
      { kicker: 'Fresh from the oven', title: 'Time for the first bite.', body: 'Golden, warm, glorious. Time for the first bite.' },
      ],
    },
    visit: { title: 'Visit us' },
    home: {
      signatureKicker: 'Signature dish', seeInMenu: 'See it in the menu', menuHighlights: 'Highlights',
      explore: { kicker: 'Explore our menu', title: 'Pick a category.', dishes: 'dishes', fullMenu: 'View full menu', category: 'Menu category' },
      fullMenuTitle: 'Full menu', backHome: 'Back to home',
    },
    marquee: 'More than food · the art of hospitality · ',
    menu: {
      eyebrow: 'From our kitchen', title: 'Our menu.',
      intro: 'Generations of tradition, good ingredients and dishes made for sharing.',
      allergen: 'Draft menu: prices, ingredients and allergens are to be confirmed by the restaurant before publication.',
      categories: 'Menu categories', extras: 'Add-ons & options', multiPrice: 'Multiple price options',
      breakfastHours: 'Breakfast hours', fishSides: 'Fish sides',
    },
    story: {
      eyebrow: 'Deep roots', title: 'Tradition you can taste in every bite.',
      body: 'In Georgia, the table is more than a place to eat. It is where friends become family, stories are passed down and every guest is always welcome to stay a little longer.',
      quote: '“A guest is a gift.”', link: 'Meet our story',
    },
    experience: { eyebrow: 'Make yourself at home', title: 'Evenings that stay with you.', body: 'Warm moments. Long conversations. Fresh bread at the center of the table. This is exactly why we are here.', line1: 'Authentic flavors', line2: 'Warm atmosphere', line3: 'Moments together' },
    reserve: {
      eyebrow: 'A place at the table', title: 'Come hungry. Leave happy.',
      body: 'Direct booking is coming soon. For now, you can prepare and copy a table request.',
      name: 'Your name', guests: 'Guests', date: 'Date', time: 'Time',
      create: 'Copy booking request', copied: 'Request copied! Share it with the restaurant once contact details are added.',
      footnote: 'Demo mode: this copies the request but does not send it to the restaurant.',
      request: 'Table reservation request',
    },
    footer: { desc: 'Georgian flavors. Big soul. One table for everyone.', address: 'Israel · address to be added', hours: 'Opening hours to be added', credits: 'Made with love, served with warmth.' },
  },
} as const;

export function getDictionary(locale: Locale) {
  return translations[locale];
}
export type Dictionary = ReturnType<typeof getDictionary>;
