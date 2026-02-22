import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageSquareText, Settings, ShieldCheck, Sparkles } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ChatGPTInAssamese = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/chatgpt-in-assamese", language);

  const tocItems = [
    { id: "setup", label: isAssamese ? "Setup গাইড" : "Setup guide" },
    { id: "use-cases", label: isAssamese ? "দৈনিক use-cases" : "Daily use-cases" },
    { id: "safe", label: isAssamese ? "Safe usage নিয়ম" : "Safe usage rules" },
    { id: "next", label: isAssamese ? "পৰৱৰ্তী সম্পদ" : "Next resources" },
    { id: "faq", label: "FAQ" },
  ];

  const setupSteps = isAssamese
    ? [
        "chatgpt.com খোলক আৰু account create/sign in কৰক।",
        "Language preference Assamese/English mixed style-ত ৰাখক।",
        "প্ৰথম prompt-ত role + context + task + output format লিখক।",
      ]
    : [
        "Open chatgpt.com and create/sign in to your account.",
        "Use Assamese-first or mixed Assamese-English instructions.",
        "Structure your first prompt with role + context + task + output format.",
      ];

  const useCases = isAssamese
    ? [
        "Career: CV rewrite, interview question practice, cover letter draft",
        "Students: chapter summary, revision quiz, exam answer practice",
        "Business: customer reply templates, offer copy, product description",
        "Parents/Teachers: child-safe AI rules, lesson planning, homework guidance",
      ]
    : [
        "Career: CV rewrites, interview practice, cover letter drafts",
        "Students: chapter summaries, revision quizzes, answer practice",
        "Business: customer reply templates, offer copy, product descriptions",
        "Parents/Teachers: child-safe AI rules, lesson plans, homework guidance",
      ];

  const safetyRules = isAssamese
    ? [
        "OTP, bank details, password, sensitive ID document কেতিয়াও share নকৰিব।",
        "AI output-টো final truth ধৰি নলওক, verify কৰি লওক।",
        "public postingৰ আগতে ব্যক্তিগত তথ্য remove কৰক।",
      ]
    : [
        "Never share OTP, bank data, passwords, or sensitive identity documents.",
        "Do not treat AI output as final truth; verify before using.",
        "Remove personal data before sharing AI output publicly.",
      ];

  const faqs = isAssamese
    ? [
        {
          question: "ChatGPT free plan-এ শুৰু কৰিব পাৰিমনে?",
          answer: "হয়, free plan-এ আৰম্ভ কৰিব পাৰে। শিকাৰ বাবে এইটো যথেষ্ট।",
        },
        {
          question: "অসমীয়াত prompt দিলে কি ভাল ফল পাব?",
          answer: "হয়। আপুনি context আৰু output format স্পষ্ট লিখিলে ফল বহুত উন্নত হয়।",
        },
        {
          question: "একেটা prompt পুনৰ লিখিব লাগেনে?",
          answer: "হয়। iteration-এ result ভাল হয়। প্ৰথম output-ৰ ওপৰত feedback দি refine কৰক।",
        },
      ]
    : [
        {
          question: "Can I start with the free ChatGPT plan?",
          answer: "Yes. The free plan is enough for practical beginner learning.",
        },
        {
          question: "Does Assamese prompting work well?",
          answer: "Yes, especially when you provide clear context and output format.",
        },
        {
          question: "Should I rewrite prompts multiple times?",
          answer: "Yes. Iteration improves quality. Refine based on each output.",
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
    name: isAssamese ? "অসমীয়াত ChatGPT ব্যৱহাৰ আৰম্ভণি" : "How to start using ChatGPT in Assamese",
    description: isAssamese
      ? "Assamese-first prompt workflow-এ ChatGPT ব্যৱহাৰ কৰাৰ ধাপসমূহ।"
      : "Step-by-step beginner setup and prompting workflow for ChatGPT in Assamese.",
    totalTime: "PT20M",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    step: setupSteps.map((step, index) => ({
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
        name: isAssamese ? "অসমীয়াত ChatGPT" : "ChatGPT in Assamese",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  const internalLinks = [
    { label: isAssamese ? "AI Prompt Packs" : "AI Prompt Packs", to: toLocalePath("/prompt-packs", language) },
    { label: isAssamese ? "AI Tools" : "AI Tools", to: toLocalePath("/ai-tools", language) },
    { label: isAssamese ? "Learning Roadmaps" : "Learning Roadmaps", to: toLocalePath("/learning-roadmaps", language) },
    { label: isAssamese ? "AI News" : "AI News", to: toLocalePath("/news", language) },
  ];

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "অসমীয়াত ChatGPT | নমস্কাৰ AI" : "ChatGPT in Assamese | Namaskar AI"}
        description={
          isAssamese
            ? "অসমীয়াত ChatGPT setup, দৈনিক ব্যৱহাৰ, practical use-case আৰু safe usage নিয়মৰ সম্পূৰ্ণ গাইড।"
            : "Practical guide to using ChatGPT in Assamese: setup, daily workflows, use-cases, and safety rules."
        }
        path={canonicalPath}
        language={language}
        keywords={["ChatGPT in Assamese", "Assamese ChatGPT guide", "learn ChatGPT Assam", "Namaskar AI"]}
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
                {isAssamese ? "Practical Guide" : "Practical Guide"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "অসমীয়াত ChatGPT ব্যৱহাৰ" : "Using ChatGPT in Assamese"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "Account setupৰ পৰা daily use-case লৈকে step-by-step guide। আপোনাৰ ক্ষেত্ৰ অনুসৰি তৎক্ষণাত ব্যৱহাৰযোগ্য পদ্ধতি।"
                  : "Step-by-step guide from account setup to daily use-cases with immediately usable workflows."}
              </p>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <Card className="h-fit border-primary/15 bg-card/95 p-4 lg:sticky lg:top-24">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
                <MessageSquareText className="h-4 w-4 text-primary" />
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
              <Card id="setup" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <Settings className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Setup গাইড" : "Setup guide"}</h2>
                </div>
                <div className="space-y-2">
                  {setupSteps.map((step, index) => (
                    <div key={step} className="rounded-lg border border-border bg-muted/35 p-3 text-sm leading-relaxed">
                      <span className="mr-2 font-semibold text-primary">{index + 1}.</span>
                      {step}
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="use-cases" className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">{isAssamese ? "দৈনিক use-cases" : "Daily use-cases"}</h2>
                <div className="mt-3 space-y-2">
                  {useCases.map((item) => (
                    <div key={item} className="rounded-lg border border-border bg-muted/35 p-3 text-sm leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="safe" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Safe usage নিয়ম" : "Safe usage rules"}</h2>
                </div>
                <div className="space-y-2">
                  {safetyRules.map((rule) => (
                    <div key={rule} className="flex items-start gap-2 rounded-lg border border-border bg-muted/35 p-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="next" className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">{isAssamese ? "পৰৱৰ্তী সম্পদ" : "Next resources"}</h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {internalLinks.map((item) => (
                    <Button key={item.to} asChild variant="outline" className="justify-start">
                      <Link to={item.to}>
                        {item.label}
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

export default ChatGPTInAssamese;
