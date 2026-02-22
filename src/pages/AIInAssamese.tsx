import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Compass, Route, Sparkles } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AIInAssamese = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/ai-in-assamese", language);

  const tocItems = [
    { id: "fast-answers", label: isAssamese ? "দ্ৰুত উত্তৰ" : "Fast answers" },
    { id: "who", label: isAssamese ? "এই পৃষ্ঠা কাকৰ বাবে" : "Who this is for" },
    { id: "start", label: isAssamese ? "৩০ মিনিটে আৰম্ভ কৰক" : "30-minute start" },
    { id: "terms", label: isAssamese ? "মূল শব্দসমূহ" : "Core terms" },
    { id: "next", label: isAssamese ? "আগলৈ কি শিকিব" : "What to learn next" },
    { id: "faq", label: "FAQ" },
  ];

  const fastAnswers = isAssamese
    ? [
        {
          query: "AI শিকিবলৈ কেনেকৈ আৰম্ভ কৰিম?",
          answer:
            "প্ৰথমে এটা goal বাছনি কৰক, তাৰপিছত এটা prompt pack run কৰক, আৰু দৈনিক ১০-১৫ মিনিট practice-এ আৰম্ভ কৰক।",
        },
        {
          query: "learn AI in Assamese",
          answer:
            "Namaskar AI-ত আপুনি Assamese + English-ত beginner guide, ৩০ দিনৰ plan, আৰু practical prompt workflow-এ আৰম্ভ কৰিব পাৰে।",
        },
        {
          query: "learning AI in Assamese",
          answer:
            "দৈনিক short routine, weekly review, আৰু use-case ভিত্তিক learning path-এ Assamese learner-ৰ বাবে fastest path।",
        },
        {
          query: "Assamese AI tutorial",
          answer:
            "tutorial-ত role + context + task + output format formula follow কৰিলে প্ৰথম সপ্তাহৰ ভিতৰতে visible output quality improve হয়।",
        },
      ]
    : [
        {
          query: "How do I start learning AI in Assamese?",
          answer:
            "Pick one goal, run one prompt pack workflow, and practice 10-15 minutes daily to build momentum.",
        },
        {
          query: "learn AI in Assamese",
          answer:
            "On Namaskar AI, start with Assamese plus English beginner guides, the 30-day plan, and practical prompt workflows.",
        },
        {
          query: "learning AI in Assamese",
          answer:
            "A short daily routine, weekly review, and use-case-specific path is the fastest route for Assamese learners.",
        },
        {
          query: "Assamese AI tutorial",
          answer:
            "Use the role, context, task, output-format structure to improve output quality within the first week.",
        },
      ];

  const quickStartSteps = isAssamese
    ? [
        "প্ৰথমে /prompt-packs ত গৈ আপোনাৰ ক্ষেত্ৰ বাছনি কৰক।",
        "এটা prompt কপি কৰি ChatGPT বা অন্য AI tool-ত run কৰক।",
        "output-টো নিজ পৰিস্থিতি অনুসৰি সংশোধন কৰক আৰু পুনৰ run কৰক।",
      ]
    : [
        "Open /prompt-packs and choose a category that matches your goal.",
        "Copy one prompt and run it in ChatGPT or another AI tool.",
        "Refine the output with your own context and run it again.",
      ];

  const terms = isAssamese
    ? [
        { title: "Role", body: "AI-ক কোৱা হয় আপুনি তাক কোন ৰূপত কাম কৰাব বিচাৰে (যেনে শিক্ষক, career coach)।" },
        { title: "Context", body: "আপোনাৰ বাস্তৱ তথ্য: লক্ষ্য, সীমাবদ্ধতা, ভাষা, audience।" },
        { title: "Task", body: "AI-এ কি উৎপাদন কৰিব লাগে তাৰ স্পষ্ট নিৰ্দেশ।" },
        { title: "Output format", body: "final উত্তৰ কিদৰে দিব (সূচী, bullets, short summary, script ইত্যাদি)।" },
      ]
    : [
        { title: "Role", body: "Tell AI who it should act as (for example: teacher, career coach)." },
        { title: "Context", body: "Share your real details: goal, constraints, language, audience." },
        { title: "Task", body: "Give a direct instruction for what AI must produce." },
        { title: "Output format", body: "Specify the output style: checklist, bullets, summary, script, and so on." },
      ];

  const relatedLinks = [
    {
      title: isAssamese ? "AI Prompt Packs" : "AI Prompt Packs",
      description: isAssamese ? "copy-ready prompt-এৰে আৰম্ভ কৰক" : "Start with copy-ready prompts",
      to: toLocalePath("/prompt-packs", language),
    },
    {
      title: isAssamese ? "AI Tools" : "AI Tools",
      description: isAssamese ? "কোন কামত কোন tool" : "Pick tools by practical use-case",
      to: toLocalePath("/ai-tools", language),
    },
    {
      title: isAssamese ? "Learning Roadmaps" : "Learning Roadmaps",
      description: isAssamese ? "ধাপে ধাপে শিকাৰ পথ" : "Follow a structured path",
      to: toLocalePath("/learning-roadmaps", language),
    },
    {
      title: isAssamese ? "AI News" : "AI News",
      description: isAssamese ? "শেহতীয়া update আৰু guide" : "Track updates and explainers",
      to: toLocalePath("/news", language),
    },
  ];

  const faqs = isAssamese
    ? [
        {
          question: "AI শিকিবলৈ coding জানিব লাগিবনে?",
          answer: "নালাগে। এই platform-ত আপুনি non-technical prompt-based পদ্ধতিৰে আৰম্ভ কৰিব পাৰে।",
        },
        {
          question: "AI শিকিবলৈ কেনেকৈ আৰম্ভ কৰিম?",
          answer: "goal বাছনি কৰক, এটা prompt run কৰক, result refine কৰক, আৰু দৈনিক ১০-১৫ মিনিট নিয়মিত practice কৰক।",
        },
        {
          question: "অসমীয়াত ভাল output পামনে?",
          answer: "পাম। role + context + clear instruction দিলে Assamese output বহুত উন্নত হয়।",
        },
        {
          question: "দৈনিক কিমান সময় দিব?",
          answer: "১০-১৫ মিনিটৰ অভ্যাস যথেষ্ট। consistency-ই আটাইতকৈ ডাঙৰ factor।",
        },
      ]
    : [
        {
          question: "Do I need coding to learn AI?",
          answer: "No. You can start with prompt-based workflows and practical tasks.",
        },
        {
          question: "How do I start learning AI in Assamese?",
          answer:
            "Pick one use-case, run one prompt workflow, refine the output once, and repeat daily for 10-15 minutes.",
        },
        {
          question: "Can I get strong output in Assamese?",
          answer: "Yes. Use role, context, and explicit output instructions for better Assamese responses.",
        },
        {
          question: "How much daily time is enough?",
          answer: "A consistent 10 to 15 minutes per day is enough to build momentum.",
        },
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isAssamese ? "অসমীয়াত AI শিকাৰ ৩০ মিনিটৰ আৰম্ভণি" : "30-minute start for learning AI in Assamese",
    description: isAssamese
      ? "Assamese-first শিক্ষাৰ্থীৰ বাবে practical আৰম্ভণি ধাপসমূহ।"
      : "Practical first steps for Assamese-first AI learners.",
    totalTime: "PT30M",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    step: quickStartSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: isAssamese ? `ধাপ ${index + 1}` : `Step ${index + 1}`,
      text: step,
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
        name: isAssamese ? "অসমীয়াত AI" : "AI in Assamese",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "অসমীয়াত AI | নমস্কাৰ AI" : "AI in Assamese | Namaskar AI"}
        description={
          isAssamese
            ? "অসমীয়া ভাষাত AI শিকাৰ beginner guide: আৰম্ভণিৰ পদক্ষেপ, মূল শব্দ, practical পথ আৰু পৰৱৰ্তী শিকণ সম্পদ।"
            : "Beginner guide to learning AI in Assamese with core terms, practical first steps, and next learning resources."
        }
        path={canonicalPath}
        language={language}
        keywords={["AI in Assamese", "learn AI Assam", "Assamese AI beginner guide", "Namaskar AI"]}
        structuredData={[faqSchema, howToSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell">
          <Link to={toLocalePath("/", language)} className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home"}
          </Link>

          <Card className="platform-hero-card mb-6">
            <div className="relative z-10">
              <div className="platform-chip mb-2">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "Beginner Guide" : "Beginner Guide"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "অসমীয়াত AI শিকাৰ সম্পূৰ্ণ আৰম্ভণি" : "Complete Beginner Start: AI in Assamese"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "আপুনি আজিয়েই আৰম্ভ কৰিব পাৰে। সৰল ধাপ, বাস্তৱ উদাহৰণ, আৰু আপোনাৰ দৈনিক প্ৰয়োজন অনুসৰি practical workflow।"
                  : "Start today with clear steps, practical examples, and workflows that fit everyday goals."}
              </p>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <Card className="h-fit border-primary/15 bg-card/95 p-4 lg:sticky lg:top-24">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
                <Compass className="h-4 w-4 text-primary" />
                {isAssamese ? "Table of Contents" : "Table of Contents"}
              </div>
              <div className="space-y-2 text-sm">
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    {item.label}
                  </a>
                ))}
              </div>
            </Card>

            <div className="space-y-5">
              <Card id="fast-answers" className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">{isAssamese ? "দ্ৰুত উত্তৰ: common search queries" : "Fast answers: common search queries"}</h2>
                <div className="mt-3 space-y-2">
                  {fastAnswers.map((item) => (
                    <div key={item.query} className="rounded-lg border border-border bg-muted/35 p-3 text-sm leading-relaxed">
                      <p className="font-semibold text-foreground">{item.query}</p>
                      <p className="mt-1 text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="who" className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">{isAssamese ? "এই পৃষ্ঠা কাকৰ বাবে" : "Who this page is for"}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {isAssamese
                    ? "যদি আপুনি AI-ক কঠিন বা technical বুলি ভাবি আছিল, এই গাইড আপোনাৰ বাবে। ছাত্ৰ-ছাত্ৰী, early-career professional, শিক্ষক, সৰু ব্যৱসায়ী আৰু অভিভাৱকসকলৰ বাস্তৱ পৰিস্থিতি ধৰি এই পৃষ্ঠা সাজি তোলা হৈছে।"
                    : "If AI feels technical or overwhelming, this guide is for you. It is designed for students, early-career professionals, teachers, parents, and small business owners."}
                </p>
              </Card>

              <Card id="start" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <Route className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "৩০ মিনিটে আৰম্ভ কৰক" : "Start in 30 minutes"}</h2>
                </div>
                <div className="space-y-2">
                  {quickStartSteps.map((step, index) => (
                    <div key={step} className="rounded-lg border border-border bg-muted/35 p-3 text-sm leading-relaxed">
                      <span className="mr-2 font-semibold text-primary">{index + 1}.</span>
                      {step}
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="terms" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <BookOpen className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "মূল শব্দসমূহ" : "Core terms you should know"}</h2>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {terms.map((term) => (
                    <div key={term.title} className="rounded-lg border border-border bg-muted/35 p-3">
                      <h3 className="text-sm font-semibold">{term.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{term.body}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="next" className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">{isAssamese ? "আগলৈ কি শিকিব" : "What to learn next"}</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {relatedLinks.map((link) => (
                    <Button key={link.to} asChild variant="outline" className="h-auto justify-start p-3 text-left">
                      <Link to={link.to}>
                        <div>
                          <div className="text-sm font-semibold">{link.title}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{link.description}</div>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </Card>

              <Card id="faq" className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">FAQ</h2>
                <Accordion type="single" collapsible className="mt-3">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default AIInAssamese;
