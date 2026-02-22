import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bot, Database, Workflow } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import SourceReferencesCard from "@/components/SourceReferencesCard";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AssameseLLMChatbotGuide = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/assamese-llm-chatbot-guide", language);

  const stackRows = isAssamese
    ? [
        {
          layer: "Use-case layer",
          options: "education helpdesk, coaching FAQ, business support",
          note: "স্পষ্ট domain নাথাকিলে quality কমে",
        },
        {
          layer: "Knowledge layer",
          options: "Assamese FAQ docs, policy docs, local glossaries",
          note: "clean data + versioning বাধ্যতামূলক",
        },
        {
          layer: "Model layer",
          options: "hosted LLM APIs + Assamese prompt templates",
          note: "prompt guardrail আৰু fallback যোগ কৰক",
        },
        {
          layer: "Safety layer",
          options: "human escalation + blocked topics",
          note: "high-risk query human review-লৈ পাঠাওক",
        },
      ]
    : [
        {
          layer: "Use-case layer",
          options: "Education helpdesk, coaching FAQ, business support",
          note: "Without narrow scope, quality drops quickly",
        },
        {
          layer: "Knowledge layer",
          options: "Assamese FAQ docs, policy docs, local glossaries",
          note: "Clean data and versioning are essential",
        },
        {
          layer: "Model layer",
          options: "Hosted LLM APIs + Assamese prompt templates",
          note: "Add guardrails and fallback behavior",
        },
        {
          layer: "Safety layer",
          options: "Human escalation + blocked topics",
          note: "Route high-risk queries to human review",
        },
      ];

  const buildSteps = isAssamese
    ? [
        "একটা narrow use-case বাছনি কৰক (যেনে coaching center FAQ).",
        "৫০-২০০ high-quality Assamese Q&A dataset প্ৰস্তুত কৰক.",
        "prompt template + fallback response strategy লিখক.",
        "pilot group-ত test কৰি ভুল query log কৰক.",
        "weekly data update আৰু safety review কৰক.",
      ]
    : [
        "Choose a narrow use-case (for example, a coaching center FAQ bot).",
        "Prepare a 50-200 item high-quality Assamese Q&A dataset.",
        "Write prompt templates and fallback response strategy.",
        "Test with a pilot group and log failed queries.",
        "Run weekly data updates and safety review.",
      ];

  const pitfalls = isAssamese
    ? [
        "English FAQ-ৰ direct translation-এ context mismatch হয়",
        "dataset update নকৰিলে stale response হয়",
        "no escalation path থাকিলে trust কমে",
      ]
    : [
        "Direct translation from English FAQs often causes context mismatch",
        "Without dataset updates, responses become stale",
        "No escalation path reduces user trust",
      ];

  const quickAnswerItems = isAssamese
    ? [
        {
          query: "Assamese LLM",
          answer:
            "beginner-ৰ বাবে নিজে model train কৰাৰ প্ৰয়োজন নাই; hosted LLM + Assamese knowledge base + guardrail workflow যথেষ্ট।",
        },
        {
          query: "Assamese chatbot",
          answer:
            "small FAQ chatbot ৭-১৪ দিনত launch কৰিব পাৰি যদি use-case narrow ৰাখি curated Q&A-এ আৰম্ভ কৰে।",
        },
        {
          query: "AI for Assam",
          answer:
            "education helpdesk, local business support, আৰু service-query triage-এ immediate high-impact use-case।",
        },
      ]
    : [
        {
          query: "Assamese LLM",
          answer:
            "Beginners do not need to train a model from scratch; hosted LLM APIs plus Assamese knowledge and guardrails are enough.",
        },
        {
          query: "Assamese chatbot",
          answer:
            "A narrow FAQ chatbot can be launched in 7-14 days using curated Assamese Q&A and fallback rules.",
        },
        {
          query: "AI for Assam",
          answer:
            "Immediate use-cases include education helpdesks, local business support bots, and service-query triage.",
        },
      ];

  const faqs = isAssamese
    ? [
        {
          question: "Assamese LLM তৈয়াৰ কৰিবলৈ নিজে model train কৰিব লাগিবনে?",
          answer:
            "প্ৰথম ধাপত নালাগে। hosted model + Assamese knowledge base + prompt system-এ বহু practical use-case সমাধান কৰিব পাৰে।",
        },
        {
          question: "Assamese chatbot build কৰিবলৈ first stack কি হওঁক?",
          answer:
            "hosted model API + curated Assamese FAQ dataset + prompt template + fallback + human escalation-এ প্ৰথম version build কৰক।",
        },
        {
          question: "Assamese chatbot-ৰ বাবে কিমান data লাগে?",
          answer: "small domain FAQ bot-ৰ বাবে ৫০-২০০ curated Q&A-এ usable ফল দিব পাৰে।",
        },
        {
          question: "hallucination কমাব কেনেকৈ?",
          answer: "source-grounded answer, no-answer fallback, আৰু human escalation policy যোগ কৰক।",
        },
        {
          question: "Assam business-এ এইটো কেনেকৈ ব্যৱহাৰ কৰিব?",
          answer: "customer FAQ, office info, service query triage-ৰ বাবে immediate use-case আছে।",
        },
      ]
    : [
        {
          question: "Do I need to train my own model for an Assamese LLM assistant?",
          answer:
            "Not at first. Hosted models plus a high-quality Assamese knowledge base and prompt system can solve many practical use-cases.",
        },
        {
          question: "What is the best starter stack for an Assamese chatbot?",
          answer:
            "Use hosted LLM APIs, a curated Assamese FAQ dataset, structured prompts, fallback behavior, and human escalation.",
        },
        {
          question: "How much data is needed for an Assamese chatbot?",
          answer: "For a narrow FAQ bot, 50-200 curated Q&A items can already be useful.",
        },
        {
          question: "How do I reduce hallucinations?",
          answer: "Use source-grounded answers, no-answer fallback behavior, and human escalation rules.",
        },
        {
          question: "Where can Assam businesses use this immediately?",
          answer: "Customer FAQs, office information, and service-query triage are strong immediate use-cases.",
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
    name: isAssamese ? "Assamese chatbot build কৰাৰ practical ধাপ" : "Practical steps to build an Assamese chatbot",
    description: isAssamese
      ? "Assam-focused use-case-ৰ বাবে low-risk chatbot implementation workflow."
      : "Low-risk implementation workflow for Assam-focused chatbot use-cases.",
    totalTime: "P14D",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    step: buildSteps.map((step, index) => ({
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
        name: isAssamese ? "Assamese LLM guide" : "Assamese LLM guide",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  const sourceItems = [
    {
      label: "Hugging Face: NLP and model ecosystem",
      href: "https://huggingface.co/",
    },
    {
      label: "OpenAI docs: safety and moderation patterns",
      href: "https://platform.openai.com/docs/guides/safety-best-practices",
    },
    {
      label: "Google: Responsible AI practices",
      href: "https://ai.google/responsibility/",
    },
  ];

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "Assamese LLM আৰু Chatbot Guide | নমস্কাৰ AI" : "Assamese LLM and Chatbot Guide | Namaskar AI"}
        description={
          isAssamese
            ? "Assam-specific Assamese chatbot/LLM build guide: use-case scope, data, safety, আৰু implementation workflow."
            : "Practical guide to Assamese LLM/chatbot implementation for Assam use-cases: scope, data, safety, and deployment workflow."
        }
        path={canonicalPath}
        language={language}
        type="article"
        keywords={[
          "Assamese LLM",
          "Assamese chatbot",
          "AI for Assam",
          "build Assamese AI assistant",
        ]}
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
                <Bot className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "AI for Assam" : "AI for Assam"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "Assamese LLM আৰু Chatbot Guide" : "Assamese LLM and Chatbot Guide"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "হয়, Assamese chatbot দ্ৰুত build কৰিব পাৰি যদি আপুনি narrow use-case, clean Q&A data আৰু safety escalation-এ আৰম্ভ কৰে।"
                  : "Yes, you can launch a useful Assamese chatbot quickly if you start with a narrow use-case, clean Q&A data, and safety escalation rules."}
              </p>
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "দ্ৰুত উত্তৰ: Assamese LLM / chatbot" : "Fast answers: Assamese LLM and chatbot"}</h2>
              <div className="mt-3 space-y-2">
                {quickAnswerItems.map((item) => (
                  <div key={item.query} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                    <p className="font-semibold text-foreground">{item.query}</p>
                    <p className="mt-1 text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <Database className="h-4 w-4" />
                <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Stack blueprint" : "Stack blueprint"}</h2>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="px-3 py-2">{isAssamese ? "Layer" : "Layer"}</th>
                      <th className="px-3 py-2">{isAssamese ? "Options" : "Options"}</th>
                      <th className="px-3 py-2">{isAssamese ? "Critical note" : "Critical note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stackRows.map((row) => (
                      <tr key={row.layer} className="border-t border-border">
                        <td className="px-3 py-2 font-medium">{row.layer}</td>
                        <td className="px-3 py-2">{row.options}</td>
                        <td className="px-3 py-2">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <Workflow className="h-4 w-4" />
                <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Implementation steps" : "Implementation steps"}</h2>
              </div>
              <div className="space-y-2">
                {buildSteps.map((step, index) => (
                  <div key={step} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                    <span className="mr-2 font-semibold text-primary">{index + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "Common pitfalls" : "Common pitfalls"}</h2>
              <div className="mt-3 space-y-2 text-sm">
                {pitfalls.map((item) => (
                  <div key={item} className="rounded-md border border-border bg-muted/35 p-2.5">
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
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

            <SourceReferencesCard language={language} items={sourceItems} />

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "Related next reads" : "Related next reads"}</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/learning-assamese-with-ai", language)}>
                    {isAssamese ? "AI-এ অসমীয়া শিকা guide" : "Learning Assamese with AI guide"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/faq", language)}>
                    FAQ
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default AssameseLLMChatbotGuide;
