import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Instagram, Mail, MessageCircle, Newspaper } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Contact = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/contact", language);

  const channels = [
    {
      icon: Mail,
      title: isAssamese ? "Email" : "Email",
      detail: "hello@namaskar.ai",
      href: "mailto:hello@namaskar.ai",
    },
    {
      icon: Instagram,
      title: isAssamese ? "Instagram" : "Instagram",
      detail: "@namaskar.ai",
      href: "https://instagram.com/namaskar.ai",
    },
    {
      icon: Newspaper,
      title: isAssamese ? "Press & Collaboration" : "Press & Collaboration",
      detail: isAssamese ? "media আৰু collaboration brief" : "Media and collaboration brief",
      href: toLocalePath("/press-collaboration", language),
      internal: true,
    },
  ];

  const faqItems = isAssamese
    ? [
        {
          question: "reply কিমান সময়ত পাম?",
          answer: "সাধাৰণতে ২৪-৪৮ ঘণ্টাৰ ভিতৰত response দিয়া হয়।",
        },
        {
          question: "collaboration pitch কিদৰে পঠাম?",
          answer: "email-ত topic, audience type, timeline, আৰু expected format উল্লেখ কৰি পঠাওক।",
        },
        {
          question: "course-related প্রশ্ন ক’ত পঠাম?",
          answer: "subject-ত 'Course Query' লিখি hello@namaskar.ai-লৈ পঠাওক।",
        },
      ]
    : [
        {
          question: "How fast can I expect a reply?",
          answer: "Most messages get a response within 24 to 48 hours.",
        },
        {
          question: "How should I send a collaboration pitch?",
          answer: "Email your topic, audience type, timeline, and expected format.",
        },
        {
          question: "Where should I send course-related questions?",
          answer: "Email hello@namaskar.ai with subject line 'Course Query'.",
        },
      ];

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: isAssamese ? "যোগাযোগ | নমস্কাৰ AI" : "Contact | Namaskar AI",
    description: isAssamese
      ? "Namaskar AI-ৰ সৈতে যোগাযোগ, collaboration pitch, আৰু support channel।"
      : "Contact channels, collaboration pitch workflow, and support details for Namaskar AI.",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    url: toAbsoluteSiteUrl(canonicalPath),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isAssamese ? "ঘৰ" : "Home",
        item: toAbsoluteSiteUrl(toLocalePath("/", language)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isAssamese ? "যোগাযোগ" : "Contact",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "যোগাযোগ | নমস্কাৰ AI" : "Contact | Namaskar AI"}
        description={
          isAssamese
            ? "Namaskar AI team-ৰ সৈতে contact, media collaboration, আৰু course support channel।"
            : "Contact the Namaskar AI team for support, media collaboration, and course queries."
        }
        path={canonicalPath}
        language={language}
        keywords={["Namaskar AI contact", "AI education Assam contact", "Namaskar AI support"]}
        structuredData={[contactPageSchema, faqSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell space-y-6">
          <Link
            to={toLocalePath("/", language)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home"}
          </Link>

          <Card className="platform-hero-card">
            <div className="relative z-10">
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "যোগাযোগ" : "Contact"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "support, collaboration, press brief, আৰু course query-ৰ বাবে তলৰ channel-এ message পঠাওক।"
                  : "Use the channels below for support, collaboration, press briefs, and course-related queries."}
              </p>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {channels.map((channel) => (
              <Card key={channel.title} className="border-primary/15 bg-card/95 p-5">
                <channel.icon className="mb-2 h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold">{channel.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{channel.detail}</p>
                <div className="mt-3">
                  {channel.internal ? (
                    <Button asChild variant="outline" className="w-full">
                      <Link to={channel.href}>
                        {isAssamese ? "খোলক" : "Open"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <a href={channel.href} target="_blank" rel="noreferrer">
                        {isAssamese ? "খোলক" : "Open"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <MessageCircle className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{isAssamese ? "FAQ" : "FAQ"}</h2>
            </div>
            <Accordion type="single" collapsible>
              {faqItems.map((faq, index) => (
                <AccordionItem key={faq.question} value={`contact-faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "Useful pages" : "Useful pages"}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button asChild variant="outline" className="justify-start">
                <Link to={toLocalePath("/editorial-policy", language)}>
                  {isAssamese ? "Editorial Policy" : "Editorial Policy"}
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to={toLocalePath("/about", language)}>
                  {isAssamese ? "আমাৰ বিষয়ে" : "About"}
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default Contact;
