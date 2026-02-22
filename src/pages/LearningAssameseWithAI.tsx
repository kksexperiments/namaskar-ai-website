import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Languages, Mic, ShieldCheck } from "lucide-react";

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

const LearningAssameseWithAI = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/learning-assamese-with-ai", language);

  const methodRows = isAssamese
    ? [
        {
          goal: "Vocabulary build",
          aiTask: "দৈনিক ১০টা নতুন শব্দ + বাক্য উদাহৰণ",
          humanStep: "নিজে পঢ়ি ২টা বাক্য লিখক",
        },
        {
          goal: "Speaking confidence",
          aiTask: "role-play dialogue generate",
          humanStep: "মুখেৰে repeat কৰি voice note record",
        },
        {
          goal: "Grammar correction",
          aiTask: "অসমীয়া বাক্য error-check",
          humanStep: "সংশোধিত বাক্য নিজে পুনৰ লিখক",
        },
        {
          goal: "Reading comprehension",
          aiTask: "short passage + quiz",
          humanStep: "উত্তৰ compare কৰি ভুল নোট কৰক",
        },
      ]
    : [
        {
          goal: "Vocabulary building",
          aiTask: "Generate 10 daily words with example sentences",
          humanStep: "Read and write 2 original sentences",
        },
        {
          goal: "Speaking confidence",
          aiTask: "Create role-play dialogue",
          humanStep: "Repeat aloud and record voice notes",
        },
        {
          goal: "Grammar correction",
          aiTask: "Check Assamese sentence errors",
          humanStep: "Rewrite corrected sentences manually",
        },
        {
          goal: "Reading comprehension",
          aiTask: "Generate short passage and quiz",
          humanStep: "Compare answers and log mistakes",
        },
      ];

  const howToSteps = isAssamese
    ? [
        "আজি কি শিকিব ঠিক কৰক: শব্দ, কথা, grammar, বা reading.",
        "AI-ক স্পষ্ট instruction দিয়ক: level + topic + output format.",
        "AI output পঢ়ি/কথা কৈ practical repeat কৰক.",
        "দিনশেষে ৫ মিনিট review note লিখক।",
      ]
    : [
        "Set today’s target: vocabulary, speaking, grammar, or reading.",
        "Give AI clear instructions with level, topic, and output format.",
        "Practice actively by reading/speaking from the output.",
        "Write a 5-minute review note at the end of the session.",
      ];

  const safeRules = isAssamese
    ? [
        "শিশুৰ learning-ত parental oversight ৰাখক।",
        "AI-generated বাক্য verify নকৰাকৈ final ধৰি নলওক।",
        "personal তথ্য share নকৰাকৈ practice mode ৰাখক।",
      ]
    : [
        "Keep parental oversight for children’s learning sessions.",
        "Do not treat AI-generated language as always correct; verify before memorizing.",
        "Avoid sharing personal data during practice prompts.",
      ];

  const faqs = isAssamese
    ? [
        {
          question: "AI-এ অসমীয়া শিকাব পাৰেনে?",
          answer: "পাৰে, বিশেষকৈ vocabulary, speaking drill, আৰু correction loop-ত ভাল সহায় কৰে।",
        },
        {
          question: "শিশুৰ বাবে AI language learning safe নে?",
          answer: "parent supervision থাকিলে safety আৰু quality দুয়ো উন্নত হয়।",
        },
        {
          question: "AI-এ ভুল Assamese দিলে কি কৰিম?",
          answer: "trusted source-ৰ সৈতে মিলাই verify কৰক আৰু refined prompt-এ পুনৰ generate কৰক।",
        },
        {
          question: "দৈনিক কিমান সময় দিব?",
          answer: "১৫-২০ মিনিটৰ consistent अभ्यास language improvement-ৰ বাবে যথেষ্ট।",
        },
      ]
    : [
        {
          question: "Can AI help me learn Assamese?",
          answer: "Yes, especially for vocabulary practice, speaking drills, and correction loops.",
        },
        {
          question: "Is AI language learning safe for children?",
          answer: "Yes with parental supervision, clear boundaries, and curated prompts.",
        },
        {
          question: "What if AI gives incorrect Assamese?",
          answer: "Verify with trusted resources and rerun with improved prompts.",
        },
        {
          question: "How much time should I spend daily?",
          answer: "A consistent 15-20 minutes daily is enough for strong progress.",
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
    name: isAssamese ? "AI-ৰ সহায়ত অসমীয়া শিকাৰ routine" : "Daily routine to learn Assamese with AI",
    description: isAssamese
      ? "AI + active practice model-এ Assamese language learning."
      : "Assamese language learning framework using AI plus active practice.",
    totalTime: "PT20M",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    step: howToSteps.map((step, index) => ({
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
        name: isAssamese ? "AI-এ অসমীয়া শিকা" : "Learning Assamese with AI",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  const sourceItems = [
    {
      label: "UNESCO: AI and education resources",
      href: "https://www.unesco.org/en/digital-education/artificial-intelligence",
    },
    {
      label: "OpenAI docs: text generation and instruction design",
      href: "https://platform.openai.com/docs/guides/text",
    },
    {
      label: "Namaskar AI practical language-learning context",
      href: "https://www.namaskarai.in/faq",
    },
  ];

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "AI-ৰ সহায়ত অসমীয়া শিকক | নমস্কাৰ AI" : "Learning Assamese with AI | Namaskar AI"}
        description={
          isAssamese
            ? "AI-ৰ সহায়ত অসমীয়া শিকাৰ practical guide: vocabulary, speaking, grammar correction, আৰু safe learning workflow."
            : "Practical guide to learning Assamese with AI through vocabulary drills, speaking practice, grammar correction, and safe workflows."
        }
        path={canonicalPath}
        language={language}
        type="article"
        keywords={[
          "learning Assamese with AI",
          "AI for learning Assamese language",
          "Assamese language AI tutor",
          "Assamese speaking practice AI",
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
                <Languages className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "Language learning" : "Language learning"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "AI-ৰ সহায়ত অসমীয়া শিকক" : "Learning Assamese with AI"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "হয়, AI-এ Assamese language learning ত্বৰান্বিত কৰিব পাৰে যদি আপুনি AI output-ৰ লগত active speaking আৰু writing practice যোগ কৰে।"
                  : "Yes, AI can speed up Assamese learning when you combine generated lessons with active speaking and writing practice."}
              </p>
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "AI-assisted learning methods" : "AI-assisted learning methods"}</h2>
              <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="px-3 py-2">{isAssamese ? "Goal" : "Goal"}</th>
                      <th className="px-3 py-2">{isAssamese ? "AI task" : "AI task"}</th>
                      <th className="px-3 py-2">{isAssamese ? "Human practice" : "Human practice"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {methodRows.map((row) => (
                      <tr key={row.goal} className="border-t border-border">
                        <td className="px-3 py-2 font-medium">{row.goal}</td>
                        <td className="px-3 py-2">{row.aiTask}</td>
                        <td className="px-3 py-2">{row.humanStep}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "২০ মিনিটৰ daily routine" : "20-minute daily routine"}</h2>
              <div className="mt-3 space-y-2">
                {howToSteps.map((step, index) => (
                  <div key={step} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                    <span className="mr-2 font-semibold text-primary">{index + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <ShieldCheck className="h-4 w-4" />
                <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Safe learning rules" : "Safe learning rules"}</h2>
              </div>
              <div className="space-y-2 text-sm">
                {safeRules.map((rule) => (
                  <div key={rule} className="rounded-md border border-border bg-muted/35 p-2.5">
                    {rule}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <Mic className="h-4 w-4" />
                <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Practice booster" : "Practice booster"}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {isAssamese
                  ? "Rule: AI output generate কৰাৰ পিছত কমেও ৫টা বাক্য মুখেৰে কওক। Passive reading-তকৈ active speaking-এ language retention বহুত উন্নত কৰে।"
                  : "Rule: after generating AI content, speak at least 5 sentences aloud. Active speaking improves retention far more than passive reading."}
              </p>
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
              <h2 className="text-xl font-semibold">{isAssamese ? "Related guides" : "Related guides"}</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/chatgpt-in-assamese", language)}>
                    {isAssamese ? "অসমীয়াত ChatGPT guide" : "ChatGPT in Assamese guide"}
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

export default LearningAssameseWithAI;
