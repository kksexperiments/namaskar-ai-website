import { Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Handshake, Mic, Newspaper } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PressAndCollaboration = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/press-collaboration", language);

  const topics = isAssamese
    ? [
        "Assamese-first AI learning strategy",
        "AI adoption for Assam small businesses",
        "ChatGPT আৰু prompt literacy for students",
        "regional-language content workflow with AI",
        "safe AI usage basics for families and parents",
      ]
    : [
        "Assamese-first AI learning strategy",
        "AI adoption for Assam small businesses",
        "ChatGPT and prompt literacy for students",
        "Regional-language content workflows with AI",
        "Safe AI usage basics for families and parents",
      ];

  const guestPostIdeas = isAssamese
    ? [
        "How Assam learners can start AI in 10 minutes daily",
        "Prompt mistakes Assamese beginners make (and fixes)",
        "Free vs paid AI course path for regional-language learners",
        "AI for teachers in Assam: revision and lesson workflows",
        "Assam business WhatsApp + AI response system starter",
      ]
    : [
        "How Assam learners can start AI in 10 minutes daily",
        "Prompt mistakes Assamese beginners make and quick fixes",
        "Free vs paid AI course path for regional-language learners",
        "AI for teachers in Assam: revision and lesson workflows",
        "Assam business WhatsApp plus AI response system starter",
      ];

  const quoteWorkflow = isAssamese
    ? [
        "Topic + publication নাম share কৰক (email/DM).",
        "deadline আৰু quote format উল্লেখ কৰক.",
        "Namaskar AI concise Assamese + English input দিব.",
        "publish-ৰ পিছত link share কৰিলে আমি amplify কৰিম.",
      ]
    : [
        "Share your topic and publication name (email or DM).",
        "Mention your deadline and quote format.",
        "Namaskar AI shares concise Assamese and English input.",
        "After publishing, send the link and we will amplify it.",
      ];

  const faqItems = isAssamese
    ? [
        {
          question: "guest article collaboration possible নেকি?",
          answer: "হয়। regional AI শিক্ষা, prompt literacy, আৰু Assam-focused AI use-case topic-ত collaboration possible.",
        },
        {
          question: "podcast/YouTube interview দিবনে?",
          answer: "topic fit আৰু timeline match হ’লে হয়। short practical segment-ত focus থকা format preferred.",
        },
        {
          question: "media kit-ত কি include থাকে?",
          answer: "platform overview, audience focus, priority topics, quote request workflow, আৰু contact channel।",
        },
      ]
    : [
        {
          question: "Do you support guest article collaborations?",
          answer:
            "Yes. We collaborate on regional AI education, prompt literacy, and Assam-focused practical use-cases.",
        },
        {
          question: "Do you do podcast or YouTube interviews?",
          answer:
            "Yes, when topic fit and timeline match. We prefer practical short segments with actionable guidance.",
        },
        {
          question: "What does your media kit include?",
          answer: "Platform overview, audience focus, priority topics, quote workflow, and contact channels.",
        },
      ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isAssamese ? "Press & Collaboration | নমস্কাৰ AI" : "Press & Collaboration | Namaskar AI",
    description: isAssamese
      ? "Assamese AI education বিষয়ত media, podcast, YouTube আৰু education publication collaboration তথ্য।"
      : "Media, podcast, YouTube, and education-publication collaboration information for Assamese AI education topics.",
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
        name: isAssamese ? "Press & Collaboration" : "Press & Collaboration",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "Press & Collaboration | নমস্কাৰ AI" : "Press & Collaboration | Namaskar AI"}
        description={
          isAssamese
            ? "media, YouTube, podcast আৰু education publication-ৰ বাবে Assamese AI বিষয়ত Namaskar AI collaboration তথ্য।"
            : "Collaboration page for media, YouTube, podcast, and education publications covering Assamese AI topics."
        }
        path={canonicalPath}
        language={language}
        keywords={[
          "Assam AI media collaboration",
          "Namaskar AI press kit",
          "Assamese AI expert quote",
          "regional language AI collaboration",
        ]}
        structuredData={[pageSchema, faqSchema, breadcrumbSchema]}
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
                {isAssamese ? "Press & Collaboration" : "Press & Collaboration"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "Assam-এ AI literacy advance কৰিবলৈ media, podcast, YouTube আৰু education partner-ৰ সৈতে practical collaboration।"
                  : "Practical collaborations with media, podcasts, YouTube channels, and education partners to expand AI literacy in Assam."}
              </p>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-2 inline-flex items-center gap-2 text-primary">
                <BadgeCheck className="h-4 w-4" />
                <h2 className="text-base font-semibold">{isAssamese ? "Focus" : "Focus"}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {isAssamese
                  ? "Assamese + English practical AI learning for students, professionals, and small businesses."
                  : "Assamese plus English practical AI learning for students, professionals, and small businesses."}
              </p>
            </Card>
            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-2 inline-flex items-center gap-2 text-primary">
                <Newspaper className="h-4 w-4" />
                <h2 className="text-base font-semibold">{isAssamese ? "Media Use" : "Media Use"}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {isAssamese
                  ? "regional AI adoption, beginner workflow, and Assam-specific implementation angles."
                  : "Regional AI adoption, beginner workflows, and Assam-specific implementation angles."}
              </p>
            </Card>
            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-2 inline-flex items-center gap-2 text-primary">
                <Mic className="h-4 w-4" />
                <h2 className="text-base font-semibold">{isAssamese ? "Format" : "Format"}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {isAssamese
                  ? "quote, guest post, short interview, workshop snippet."
                  : "Quote, guest post, short interview, or workshop snippet."}
              </p>
            </Card>
          </div>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "Priority Topics" : "Priority Topics"}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <Handshake className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{isAssamese ? "Guest Post Ideas" : "Guest Post Ideas"}</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {guestPostIdeas.map((idea) => (
                <div key={idea} className="rounded-lg border border-primary/10 bg-background/40 p-3 text-sm text-muted-foreground">
                  {idea}
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "Quote Request Workflow" : "Quote Request Workflow"}</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              {quoteWorkflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">FAQ</h2>
            <Accordion type="single" collapsible className="mt-3">
              {faqItems.map((faq, index) => (
                <AccordionItem key={faq.question} value={`press-faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="mailto:hello@namaskar.ai">hello@namaskar.ai</a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://instagram.com/namaskar.ai" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default PressAndCollaboration;
