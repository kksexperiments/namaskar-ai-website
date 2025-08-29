export type Language = 'en' | 'as';

export interface Content {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  newsletter: {
    headline: string;
    description: string;
    placeholder: string;
    button: string;
    success: string;
    error: string;
  };
  community: {
    headline: string;
    description: string;
    whatsapp: {
      title: string;
      description: string;
      button: string;
    };
    telegram: {
      title: string;
      description: string;
      button: string;
    };
  };
  instagram: {
    headline: string;
    description: string;
    button: string;
  };
  resources: {
    headline: string;
    description: string;
    cta: string;
  };
  footer: {
    copyright: string;
    contact: string;
  };
  nav: {
    language: string;
    home: string;
  };
  modal: {
    title: string;
    subtitle: string;
    english: string;
    assamese: string;
    continue: string;
  };
}

export const content: Record<Language, Content> = {
  en: {
    hero: {
      headline: "Learn AI in Your Language",
      subheadline: "Join thousands learning AI tools and techniques with practical guidance in English and Assamese",
      primaryCta: "Explore Free Resources",
      secondaryCta: "Join Community"
    },
    newsletter: {
      headline: "Get Weekly AI Tips & Resources",
      description: "Receive practical AI tutorials, tool recommendations, and exclusive resources delivered to your inbox every week.",
      placeholder: "Enter your email address",
      button: "Subscribe Now",
      success: "Thank you! Welcome to the Namaskar AI community.",
      error: "Please enter a valid email address."
    },
    community: {
      headline: "Get Exclusive Resources",
      description: "Access premium content, advanced tutorials, and exclusive AI resources available only to community members.",
      whatsapp: {
        title: "WhatsApp Community",
        description: "Get exclusive resources and premium content",
        button: "Join WhatsApp Group"
      },
      telegram: {
        title: "Telegram Channel", 
        description: "Daily exclusive tips and premium resources",
        button: "Follow on Telegram"
      }
    },
    instagram: {
      headline: "Latest Content",
      description: "Follow for daily tips and tutorials",
      button: "Follow on Instagram"
    },
    resources: {
      headline: "Free AI Resources",
      description: "Access curated prompt packs, cheat sheets, and tutorials to accelerate your AI learning journey.",
      cta: "Get Free Resources"
    },
    footer: {
      copyright: "© 2024 Namaskar AI. All rights reserved.",
      contact: "Contact: hello@namaskar.ai"
    },
    nav: {
      language: "Language",
      home: "Home"
    },
    modal: {
      title: "Choose Your Language",
      subtitle: "Select your preferred language for the best experience",
      english: "English",
      assamese: "অসমীয়া",
      continue: "Continue"
    }
  },
  as: {
    hero: {
      headline: "আপোনাৰ ভাষাত AI শিকক",
      subheadline: "হাজাৰ হাজাৰ লোকৰ সৈতে AI টুলছ আৰু কৌশল শিকক ইংৰাজী আৰু অসমীয়া ভাষাত",
      primaryCta: "বিনামূলীয়া সম্পদ অন্বেষণ কৰক",
      secondaryCta: "সমাজ যোগ দিয়ক"
    },
    newsletter: {
      headline: "সাপ্তাহিক AI টিপছ আৰু সম্পদ পাওক",
      description: "ব্যৱহাৰিক AI টিউটৰিয়েল, টুল সুপাৰিশ, আৰু একচেটিয়া সম্পদ প্ৰতি সপ্তাহত আপোনাৰ ইনবক্সত পাওক।",
      placeholder: "আপোনাৰ ইমেইল ঠিকনা দিয়ক",
      button: "এতিয়াই সাবস্ক্ৰাইব কৰক",
      success: "ধন্যবাদ! নমস্কাৰ AI সমাজত স্বাগতম।",
      error: "অনুগ্ৰহ কৰি এটা বৈধ ইমেইল ঠিকনা দিয়ক।"
    },
    community: {
      headline: "একচেটিয়া সম্পদ পাওক",
      description: "প্ৰিমিয়াম বিষয়বস্তু, উন্নত টিউটৰিয়েল, আৰু একচেটিয়া AI সম্পদসমূহ পাওক যি কেৱল সমাজৰ সদস্যসকলৰ বাবে উপলব্ধ।",
      whatsapp: {
        title: "WhatsApp সমাজ",
        description: "একচেটিয়া সম্পদ আৰু প্ৰিমিয়াম বিষয়বস্তু পাওক",
        button: "WhatsApp গ্ৰুপত যোগ দিয়ক"
      },
      telegram: {
        title: "Telegram চেনেল",
        description: "দৈনিক একচেটিয়া টিপছ আৰু প্ৰিমিয়াম সম্পদ",
        button: "Telegram ত অনুসৰণ কৰক"
      }
    },
    instagram: {
      headline: "শেহতীয়া বিষয়বস্তু",
      description: "দৈনিক টিপছ আৰু টিউটৰিয়েলৰ বাবে অনুসৰণ কৰক",
      button: "Instagram ত অনুসৰণ কৰক"
    },
    resources: {
      headline: "বিনামূলীয়া AI সম্পদ",
      description: "আপোনাৰ AI শিক্ষাৰ যাত্ৰা ত্বৰান্বিত কৰিবলৈ কিউৰেটেড প্ৰমপ্ট পেক, চিট শ্বিট, আৰু টিউটৰিয়েল প্ৰৱেশ কৰক।",
      cta: "বিনামূলীয়া সম্পদ পাওক"
    },
    footer: {
      copyright: "© ২০২৪ নমস্কাৰ AI। সকলো অধিকাৰ সংৰক্ষিত।",
      contact: "যোগাযোগ: hello@namaskar.ai"
    },
    nav: {
      language: "ভাষা",
      home: "ঘৰ"
    },
    modal: {
      title: "আপোনাৰ ভাষা বাছনি কৰক",
      subtitle: "উত্তম অভিজ্ঞতাৰ বাবে আপোনাৰ পছন্দৰ ভাষা নিৰ্বাচন কৰক",
      english: "English",
      assamese: "অসমীয়া",
      continue: "অব্যাহত ৰাখক"
    }
  }
};