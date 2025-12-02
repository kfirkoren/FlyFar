import { TripType, Package, Destination, Hotel, FaqItem } from './types';

export const PACKAGES: Package[] = [
  {
    id: '1',
    title: 'ירח דבש רומנטי',
    description: 'חופשה מפנקת לזוגות אוהבים באיים האקזוטיים של תאילנד.',
    priceStart: 2500,
    duration: '12 ימים',
    type: TripType.COUPLES,
    image: 'https://picsum.photos/id/10/800/600',
    highlights: ['מלונות יוקרה 5 כוכבים', 'שייט פרטי בשקיעה', 'ספא זוגי']
  },
  {
    id: '2',
    title: 'תאילנד למשפחות',
    description: 'טיול חוויתי המותאם לילדים והורים כאחד, משלב אטרקציות ומנוחה.',
    priceStart: 1800,
    duration: '14 ימים',
    type: TripType.FAMILIES,
    image: 'https://picsum.photos/id/11/800/600',
    highlights: ['פארקי מים', 'שמורות פילים', 'ריזורטים ידידותיים לילדים']
  },
  {
    id: '3',
    title: 'פול מון ואדרנלין',
    description: 'לחבר’ה צעירים שמחפשים מסיבות, חופים והרפתקאות.',
    priceStart: 1200,
    duration: '10 ימים',
    type: TripType.YOUNG,
    image: 'https://picsum.photos/id/15/800/600',
    highlights: ['מסיבות פול מון בקופנגן', 'צלילה בקוטאו', 'טיולי ג’יפים בצפון']
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'bkk',
    name: 'בנגקוק',
    description: 'עיר הבירה התוססת. שווקים, מקדשים וחיי לילה סוערים.',
    image: 'https://picsum.photos/id/48/800/600',
    season: 'כל השנה (חם ולח)'
  },
  {
    id: 'north',
    name: 'צפון תאילנד (צ’יאנג מאי)',
    description: 'הרים ירוקים, שבטים מקומיים, מקדשים עתיקים ואווירה רגועה.',
    image: 'https://picsum.photos/id/28/800/600',
    season: 'נובמבר - פברואר'
  },
  {
    id: 'phuket',
    name: 'פוקט',
    description: 'האי הגדול ביותר. חופים מדהימים, חיי לילה וחיי פאר.',
    image: 'https://picsum.photos/id/54/800/600',
    season: 'נובמבר - אפריל'
  },
  {
    id: 'samui',
    name: 'קוסמוי',
    description: 'אי טרופי עם ריזורטים מפנקים, חופים לבנים ועצי קוקוס.',
    image: 'https://picsum.photos/id/57/800/600',
    season: 'ינואר - אוגוסט'
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Sri Panwa Phuket',
    stars: 5,
    area: 'פוקט',
    priceLevel: 'יוקרה',
    image: 'https://picsum.photos/id/164/800/600',
    tags: ['ירח דבש', 'נוף לים', 'בריכה פרטית']
  },
  {
    id: 'h2',
    name: 'Sala Samui',
    stars: 5,
    area: 'קוסמוי',
    priceLevel: 'גבוה',
    image: 'https://picsum.photos/id/204/800/600',
    tags: ['עיצוב מודרני', 'חוף פרטי', 'ספא']
  },
  {
    id: 'h3',
    name: 'Amari Watergate',
    stars: 4,
    area: 'בנגקוק',
    priceLevel: 'בינוני',
    image: 'https://picsum.photos/id/435/800/600',
    tags: ['מרכז העיר', 'קניות', 'משפחות']
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'מתי הזמן הכי טוב לטוס לתאילנד?',
    answer: 'באופן כללי, העונה היבשה והנעימה היא בין נובמבר לפברואר. עם זאת, לאיים במפרץ תאילנד (כמו קוסמוי) מומלץ להגיע גם בקיץ (יולי-אוגוסט).'
  },
  {
    question: 'האם צריך ויזה לישראלים?',
    answer: 'ישראלים מקבלים פטור מויזה לשהייה של עד 30 יום בכניסה אווירית (החוקים משתנים מדי פעם, מומלץ להתעדכן מול השגרירות).'
  },
  {
    question: 'האם נדרשים חיסונים?',
    answer: 'מומלץ להתייעץ עם מרפאת מטיילים כחודש לפני הנסיעה. בדרך כלל מומלצים חיסונים כמו צהבת A ו-B וטיפוס הבטן.'
  }
];

export const CONTACT_PHONE = "050-1234567";
export const CONTACT_WHATSAPP = "972501234567"; // No dashes for link
export const CONTACT_EMAIL = "info@thaitrip.co.il";
