import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, HelpCircle, MessageCircleQuestion } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

const FAQ = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";

  const sections: FaqSection[] = isAssamese
    ? [
        {
          title: "অসমীয়াত AI শিকা",
          items: [
            {
              question: "AI শিকিবলৈ coding জনা বাধ্যতামূলক নেকি?",
              answer:
                "নহয়। prompt-based practical workflow-এ আৰম্ভ কৰিব পাৰি, আৰু পিচত প্ৰয়োজনে technical skill যোগ কৰিব পাৰে।",
            },
            {
              question: "দৈনিক কিমান সময় দিলে ফল পাব?",
              answer:
                "দৈনিক ১০-২০ মিনিট যথেষ্ট। consistency আৰু weekly review থাকিলে ৩০ দিনত দৃশ্যমান উন্নতি দেখা যায়।",
            },
            {
              question: "অসমীয়াত output কেনেকৈ উন্নত কৰিম?",
              answer:
                "prompt-ত role, context, task, output format স্পষ্টকৈ লিখক। উদাহৰণ দিলে quality আৰু improve হয়।",
            },
          ],
        },
        {
          title: "ChatGPT আৰু Tool ব্যৱহাৰ",
          items: [
            {
              question: "ChatGPT free plan-এ practical কাম কৰিব পাৰিমনে?",
              answer:
                "হয়। beginner use-case যেনে summary, draft, revision plan, customer reply আদিৰ বাবে free plan যথেষ্ট।",
            },
            {
              question: "কোন AI tool-টো প্ৰথমে বাছনি কৰিম?",
              answer:
                "আপোনাৰ লক্ষ্যৰ ওপৰত নিৰ্ভৰ কৰে। study-ৰ বাবে summarization tool, business-ৰ বাবে writing + messaging tool, research-ৰ বাবে citation-friendly tool বাছনি কৰক।",
            },
            {
              question: "AI output কেতিয়াও 100% সঠিক ধৰা উচিত নেকি?",
              answer:
                "উচিত নহয়। practical decision লোৱাৰ আগতে fact verify কৰিব লাগে, বিশেষকৈ health, legal, finance ক্ষেত্ৰত।",
            },
          ],
        },
        {
          title: "Assam-specific ব্যৱহাৰ",
          items: [
            {
              question: "অসমৰ small business-এ AI কেনেকৈ আৰম্ভ কৰিব?",
              answer:
                "customer reply template, offer copy, WhatsApp follow-up, আৰু daily content draft-ৰ দৰে low-risk use-case-এ প্ৰথমে আৰম্ভ কৰক।",
            },
            {
              question: "student-সকলে AI ব্যৱহাৰ কৰিলে cheating নেকি?",
              answer:
                "নিয়ম মানি ব্যৱহাৰ কৰিলে নহয়। concept বুজা, revision, self-test, আৰু answer structure improve কৰাটো valid learning use-case।",
            },
            {
              question: "Assamese LLM বা chatbot build কৰিব পাৰিনে?",
              answer:
                "পাৰিব। কিন্তু ভাল ফলৰ বাবে domain data, clean FAQ set, safety policy, আৰু human review workflow লাগিব।",
            },
          ],
        },
      ]
    : [
        {
          title: "Learning AI in Assamese",
          items: [
            {
              question: "Do I need coding to start learning AI?",
              answer:
                "No. You can start with prompt-based practical workflows and add technical skills later if needed.",
            },
            {
              question: "How much daily time is enough?",
              answer:
                "A consistent 10 to 20 minutes per day is enough for visible progress within 30 days.",
            },
            {
              question: "How do I improve Assamese output quality?",
              answer:
                "Use clear role, context, task, and output-format instructions. Add one example whenever possible.",
            },
          ],
        },
        {
          title: "ChatGPT and AI tools",
          items: [
            {
              question: "Can I start with ChatGPT free plan?",
              answer:
                "Yes. For beginner tasks like summaries, drafts, revision plans, and customer replies, free plans are enough.",
            },
            {
              question: "How should I choose my first AI tool?",
              answer:
                "Choose by use-case. Study workflows need summarization tools, businesses need writing and communication tools, and research workflows need citation-friendly tools.",
            },
            {
              question: "Should I trust AI output without checking?",
              answer:
                "No. Always verify facts before making decisions, especially for medical, legal, or financial topics.",
            },
          ],
        },
        {
          title: "AI for Assam use-cases",
          items: [
            {
              question: "How can small businesses in Assam start with AI?",
              answer:
                "Start with low-risk workflows: customer reply templates, offer copy, WhatsApp follow-ups, and daily content drafts.",
            },
            {
              question: "Is AI usage by students always cheating?",
              answer:
                "No. Using AI for concept understanding, revision, self-tests, and better answer structure is valid when guidelines are followed.",
            },
            {
              question: "Can I build an Assamese chatbot or LLM-based assistant?",
              answer:
                "Yes, with good domain data, structured FAQs, safety rules, and human review steps.",
            },
          ],
        },
      ];

  const faqItems = sections.flatMap((section) => section.items);
  const canonicalPath = toLocalePath("/faq", language);
  const searchIntentAnswers = isAssamese
    ? [
        {
          query: "learn AI in Assamese",
          answer: "৩০ দিনৰ practical path, beginner guide, আৰু prompt workflow-এ আৰম্ভ কৰক।",
          to: toLocalePath("/learn-ai-in-assamese-30-days", language),
        },
        {
          query: "ChatGPT in Assamese",
          answer: "setup + daily use-case + safe usage checklist-ৰ বাবে dedicated guide use কৰক।",
          to: toLocalePath("/chatgpt-in-assamese", language),
        },
        {
          query: "best AI course for Assamese speakers",
          answer: "free vs paid vs cohort comparison আৰু rubric-এ score কৰি course বাছনি কৰক।",
          to: toLocalePath("/best-ai-course-for-assamese-speakers", language),
        },
        {
          query: "Assamese LLM / Assamese chatbot",
          answer: "narrow use-case + curated Q&A + safety escalation workflow-এ build আৰম্ভ কৰক।",
          to: toLocalePath("/assamese-llm-chatbot-guide", language),
        },
      ]
    : [
        {
          query: "learn AI in Assamese",
          answer: "Start with the 30-day practical path, beginner guide, and prompt workflow pages.",
          to: toLocalePath("/learn-ai-in-assamese-30-days", language),
        },
        {
          query: "ChatGPT in Assamese",
          answer: "Use the dedicated setup, daily use-case, and safe-usage guide.",
          to: toLocalePath("/chatgpt-in-assamese", language),
        },
        {
          query: "best AI course for Assamese speakers",
          answer: "Compare free, paid, and cohort options and score each with the selection rubric.",
          to: toLocalePath("/best-ai-course-for-assamese-speakers", language),
        },
        {
          query: "Assamese LLM or Assamese chatbot",
          answer: "Start with narrow scope, curated Q&A data, and a safety-escalation workflow.",
          to: toLocalePath("/assamese-llm-chatbot-guide", language),
        },
      ];

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
        name: "FAQ",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "AI FAQ | নমস্কাৰ AI" : "AI FAQ | Namaskar AI"}
        description={
          isAssamese
            ? "অসমীয়া আৰু ইংৰাজীত AI শিকাৰ সাধাৰণ প্ৰশ্ন, ChatGPT ব্যৱহাৰ, আৰু Assam-specific practical উত্তৰ।"
            : "Frequently asked questions about learning AI in Assamese, using ChatGPT, and practical AI use-cases for Assam."
        }
        path={canonicalPath}
        language={language}
        keywords={[
          "learn AI in Assamese FAQ",
          "Assamese AI questions",
          "ChatGPT in Assamese FAQ",
          "AI for Assam",
          "Namaskar AI FAQ",
        ]}
        structuredData={[faqSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell">
          <Link
            to={toLocalePath("/", language)}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home"}
          </Link>

          <Card className="platform-hero-card mb-6">
            <div className="relative z-10">
              <div className="platform-chip mb-2">
                <MessageCircleQuestion className="mr-1.5 h-3.5 w-3.5" />
                FAQ
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "AI FAQ (অসমীয়া + English)" : "AI FAQ (Assamese + English)"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "AI শিকাৰ আৰম্ভণিৰ পৰা advanced use-case লৈকে সঘনাই সোধা প্ৰশ্নৰ practical উত্তৰ।"
                  : "Practical answers to common questions from beginner AI learning to advanced local use-cases."}
              </p>
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">
                {isAssamese ? "দ্ৰুত উত্তৰ: high-intent search queries" : "Fast answers: high-intent search queries"}
              </h2>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {searchIntentAnswers.map((item) => (
                  <Button key={item.query} asChild variant="outline" className="h-auto justify-start p-3 text-left">
                    <Link to={item.to}>
                      <div>
                        <p className="text-sm font-semibold">{item.query}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.answer}</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </Card>

            {sections.map((section, sectionIndex) => (
              <Card key={section.title} className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <HelpCircle className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                </div>
                <Accordion type="single" collapsible>
                  {section.items.map((faq, itemIndex) => (
                    <AccordionItem key={faq.question} value={`faq-${sectionIndex}-${itemIndex}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            ))}

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "Long-form guides" : "Long-form guides"}</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/learn-ai-in-assamese-30-days", language)}>
                    {isAssamese ? "৩০ দিনত AI শিকক" : "Learn AI in 30 days"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/best-ai-course-for-assamese-speakers", language)}>
                    {isAssamese ? "Best AI Course তুলনা" : "Best AI Course comparison"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/learning-assamese-with-ai", language)}>
                    {isAssamese ? "AI-এ অসমীয়া শিকা" : "Learning Assamese with AI"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/assamese-llm-chatbot-guide", language)}>
                    {isAssamese ? "Assamese LLM guide" : "Assamese LLM guide"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/editorial-policy", language)}>
                    {isAssamese ? "Editorial Policy" : "Editorial Policy"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/press-collaboration", language)}>
                    {isAssamese ? "Press & Collaboration" : "Press & Collaboration"}
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

export default FAQ;
