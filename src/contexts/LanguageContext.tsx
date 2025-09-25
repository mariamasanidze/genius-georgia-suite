import React, { createContext, useContext, useState } from 'react';

type Language = 'ka' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  ka: {
    // Navigation
    'nav.features': 'თვისებები',
    'nav.useCases': 'გამოყენების შემთხვევები',
    'nav.pricing': 'ფასები',
    'nav.about': 'ჩვენს შესახებ',
    'nav.contact': 'კონტაქტი',
    'nav.login': 'შესვლა',
    'nav.register': 'რეგისტრაცია',
    'nav.dashboard': 'დაშბორდი',
    
    // Hero Section
    'hero.title': 'AI-ით შექმენი სოციალური მედია ერთ წუთში',
    'hero.subtitle': 'ქართული ბიზნესებისთვის განკუთვნილი ყველაზე მძლავრი AI პლატფორმა. შეთავაზებული კონტენტის ავტომატური წარმოება, გეგმვა და ანალიტიკა.',
    'hero.cta': 'დაიწყე უფასოდ',
    'hero.cta.secondary': 'ნახე დემო',
    
    // Features
    'features.title': 'ყველაფერი რაც გჭირდება',
    'features.subtitle': 'სოციალური მედიის მართვისთვის',
    'features.aiContent': 'AI კონტენტის გენერაცია',
    'features.aiContentDesc': 'ქართული კონტექსტის გათვალისწინებით',
    'features.scheduling': 'ავტომატური გამოქვეყნება',
    'features.schedulingDesc': 'ყველა პლატფორმაზე ერთდროულად',
    'features.analytics': 'ანალიტიკა და რეპორტები',
    'features.analyticsDesc': 'დეტალური ინსაიტები თქვენი აუდიტორიისთვის',
    'features.multiPlatform': 'მრავალპლატფორმული მხარდაჭერა',
    'features.multiPlatformDesc': 'Facebook, Instagram, TikTok და სხვა',
    
    // Dashboard
    'dashboard.welcome': 'კეთილი იყოს შენი მობრუნება',
    'dashboard.overview': 'მიმოხილვა',
    'dashboard.contentGenerator': 'კონტენტის გენერატორი',
    'dashboard.calendar': 'კალენდარი',
    'dashboard.analytics': 'ანალიტიკა',
    'dashboard.community': 'საზოგადოება',
    'dashboard.settings': 'პარამეტრები',
    'dashboard.billing': 'ბილინგი',
    
    // Common
    'common.loading': 'იტვირთება...',
    'common.save': 'შენახვა',
    'common.cancel': 'გაუქმება',
    'common.edit': 'რედაქტირება',
    'common.delete': 'წაშლა',
    'common.publish': 'გამოქვეყნება',
    'common.schedule': 'დაგეგმვა',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.useCases': 'Use Cases',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    
    // Hero Section
    'hero.title': 'Create Social Media with AI in One Minute',
    'hero.subtitle': 'The most powerful AI platform for Georgian businesses. Automated content creation, scheduling, and analytics in your language.',
    'hero.cta': 'Start Free Trial',
    'hero.cta.secondary': 'Watch Demo',
    
    // Features
    'features.title': 'Everything you need',
    'features.subtitle': 'for social media management',
    'features.aiContent': 'AI Content Generation',
    'features.aiContentDesc': 'With Georgian cultural context',
    'features.scheduling': 'Auto-Publishing',
    'features.schedulingDesc': 'Across all platforms simultaneously',
    'features.analytics': 'Analytics & Reports',
    'features.analyticsDesc': 'Detailed insights for your audience',
    'features.multiPlatform': 'Multi-Platform Support',
    'features.multiPlatformDesc': 'Facebook, Instagram, TikTok and more',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Overview',
    'dashboard.contentGenerator': 'Content Generator',
    'dashboard.calendar': 'Calendar',
    'dashboard.analytics': 'Analytics',
    'dashboard.community': 'Community',
    'dashboard.settings': 'Settings',
    'dashboard.billing': 'Billing',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.publish': 'Publish',
    'common.schedule': 'Schedule',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ka');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};