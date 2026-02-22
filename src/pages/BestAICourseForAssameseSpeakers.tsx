import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BarChart3, GraduationCap, CheckCircle2 } from "lucide-react";

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

const BestAICourseForAssameseSpeakers = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/best-ai-course-for-assamese-speakers", language);

  const courseRows = isAssamese
    ? [
        {
          model: "Self-paced free learning",
          cost: "₹0",
          mentorship: "নাই",
          timeline: "slow to medium",
          bestFor: "budget-sensitive beginner",
        },
        {
          model: "Structured paid modules",
          cost: "₹1,000-₹8,000",
          mentorship: "কিছু সীমিত support",
          timeline: "medium",
          bestFor: "career-focused learner",
        },
        {
          model: "Cohort + mentor",
          cost: "₹8,000+",
          mentorship: "strong",
          timeline: "fast",
          bestFor: "job/business urgency",
        },
      ]
    : [
        {
          model: "Self-paced free learning",
          cost: "₹0",
          mentorship: "No",
          timeline: "Slow to medium",
          bestFor: "Budget-sensitive beginners",
        },
        {
          model: "Structured paid modules",
          cost: "₹1,000-₹8,000",
          mentorship: "Limited support",
          timeline: "Medium",
          bestFor: "Career-focused learners",
        },
        {
          model: "Cohort + mentor",
          cost: "₹8,000+",
          mentorship: "Strong",
          timeline: "Fast",
          bestFor: "Job/business urgency",
        },
      ];

  const rubric = isAssamese
    ? [
        "Assamese-first ব্যাখ্যা আছে নে?",
        "practical assignment আছে নে?",
        "feedback cycle আছে নে?",
        "portfolio-ready output দিছে নে?",
      ]
    : [
        "Does it explain concepts in Assamese-first style?",
        "Does it include practical assignments?",
        "Is there a feedback cycle?",
        "Does it help create portfolio-ready output?",
      ];

  const pros = isAssamese
    ? [
        "Structured course-এ learning path স্পষ্ট হয়",
        "consistent practice-এ execution speed বাঢ়ে",
        "mentor feedback-এ ভুল তাড়াতাড়ি ধৰা পৰে",
      ]
    : [
        "Structured courses reduce confusion in the learning path",
        "Consistent practice improves execution speed",
        "Mentor feedback catches mistakes faster",
      ];

  const cons = isAssamese
    ? [
        "course কিনিলেও practice নকৰিলে লাভ নাই",
        "high-cost program সকলোৰে বাবে fit নহয়",
        "generic syllabus local use-case cover নকৰিব পাৰে",
      ]
    : [
        "Buying a course without practice gives poor results",
        "High-cost programs are not suitable for everyone",
        "Generic syllabi may miss local Assam use-cases",
      ];

  const quickRecommendations = isAssamese
    ? [
        {
          profile: "Student / beginner",
          recommendation: "Free + self-paced path-এ আৰম্ভ কৰক আৰু daily mini project maintain কৰক।",
        },
        {
          profile: "Job switch / career upgrade",
          recommendation: "Structured paid module + feedback cycle থকা course বাছনি কৰক।",
        },
        {
          profile: "Business owner / operator",
          recommendation: "Cohort বা mentor-supported fast execution track বাছনি কৰক।",
        },
      ]
    : [
        {
          profile: "Student or beginner",
          recommendation: "Start with free self-paced learning and maintain one daily mini project.",
        },
        {
          profile: "Job switch or career upgrade",
          recommendation: "Pick a structured paid course with a clear feedback cycle.",
        },
        {
          profile: "Business owner or operator",
          recommendation: "Choose a mentor-supported cohort track for faster execution.",
        },
      ];

  const faqs = isAssamese
    ? [
        {
          question: "best course মানে কি আটাইতকৈ দামী course?",
          answer: "নহয়। best course মানে আপোনাৰ goal + budget + সময়ৰ সৈতে best fit course।",
        },
        {
          question: "Assamese speaker-ৰ বাবে best AI course কেনেকৈ বাছনি কৰিম?",
          answer: "প্ৰথমে goal ঠিক কৰক, তাৰপিছত mentorship + assignment quality + budget score কৰি compare কৰক।",
        },
        {
          question: "Assamese speaker-ৰ বাবে English-only course ঠিক নে?",
          answer:
            "possible, কিন্তু আৰম্ভণিতে bilingual বা Assamese-first support থাকিলে progress বেছি তাড়াতাড়ি হয়।",
        },
        {
          question: "certificate-এ কি চাকৰি নিশ্চিত কৰে?",
          answer: "নাই। certificate সহ practical project, workflow proof আৰু communication skill লাগিব।",
        },
        {
          question: "কিমান দিনত course impact দেখা যায়?",
          answer: "daily practice থাকিলে সাধাৰণতে ৩-৬ সপ্তাহত visible productivity gain দেখা যায়।",
        },
      ]
    : [
        {
          question: "Is the best course always the most expensive one?",
          answer: "No. The best course is the one that fits your goal, budget, and available time.",
        },
        {
          question: "How do I choose the best AI course for Assamese speakers?",
          answer:
            "Define your goal first, then compare mentorship quality, assignment quality, and budget fit before deciding.",
        },
        {
          question: "Is an English-only course okay for Assamese speakers?",
          answer: "Possible, but bilingual or Assamese-first support usually improves early progress speed.",
        },
        {
          question: "Does a certificate guarantee a job?",
          answer: "No. You still need practical projects, workflow proof, and communication ability.",
        },
        {
          question: "How quickly can I see impact from a course?",
          answer: "With daily practice, many learners see visible productivity gains in 3-6 weeks.",
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

  const howToSteps = isAssamese
    ? [
        "goal define কৰক: চাকৰি, freelancing, নে business growth.",
        "course-ৰ sample lesson + curriculum compare কৰক.",
        "৪-point rubric-এ score কৰি decision লওক.",
      ]
    : [
        "Define your goal: job, freelancing, or business growth.",
        "Compare sample lessons and curriculum quality.",
        "Score each option using a 4-point rubric before deciding.",
      ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isAssamese ? "Assamese speaker-ৰ বাবে best AI course বাছনি" : "How to choose the best AI course for Assamese speakers",
    description: isAssamese
      ? "goal, budget আৰু support-ভিত্তিক course decision framework."
      : "A practical framework to choose an AI course by goal, budget, and support.",
    totalTime: "PT30M",
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
        name: isAssamese ? "best AI course" : "Best AI course",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  const sourceItems = [
    {
      label: "Google: Evaluating helpful content quality",
      href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    },
    {
      label: "OpenAI Docs: Getting started and prompting workflows",
      href: "https://platform.openai.com/docs/overview",
    },
    {
      label: "Namaskar AI learning roadmap pages",
      href: "https://www.namaskarai.in/learning-roadmaps",
    },
  ];

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "অসমীয়া শিক্ষাৰ্থীৰ বাবে Best AI Course | নমস্কাৰ AI" : "Best AI Course for Assamese Speakers | Namaskar AI"}
        description={
          isAssamese
            ? "Assamese speaker-সকলৰ বাবে AI course compare guide: free vs paid vs cohort, pros-cons, আৰু selection rubric."
            : "Comparison guide to choose the best AI course for Assamese speakers: free vs paid vs cohort, pros-cons, and selection rubric."
        }
        path={canonicalPath}
        language={language}
        type="article"
        keywords={[
          "best AI course for Assamese speakers",
          "Assamese AI course comparison",
          "AI course Assam",
          "learning AI in Assamese",
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
                <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "Course decision guide" : "Course decision guide"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "Best AI Course for Assamese Speakers" : "Best AI Course for Assamese Speakers"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "Best course মানে আটাইতকৈ দামী course নহয়; আপোনাৰ goal, support আৰু execution fit হোৱা course-টোই best."
                  : "The best course is not the most expensive one; it is the one that matches your goal, support needs, and execution style."}
              </p>
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">
                {isAssamese ? "দ্ৰুত উত্তৰ: best AI course selection" : "Fast answer: best AI course selection"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isAssamese
                  ? "Best AI course মানে আটাইতকৈ দামী option নহয়; আপোনাৰ goal, mentorship need, assignment quality আৰু budget fit-এ best হয়।"
                  : "The best AI course is not the most expensive option; it is the one that matches your goal, mentorship need, assignment quality, and budget."}
              </p>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {quickRecommendations.map((item) => (
                  <div key={item.profile} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                    <p className="font-semibold text-foreground">{item.profile}</p>
                    <p className="mt-1 text-muted-foreground">{item.recommendation}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <BarChart3 className="h-4 w-4" />
                <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Course model comparison" : "Course model comparison"}</h2>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="px-3 py-2">{isAssamese ? "Model" : "Model"}</th>
                      <th className="px-3 py-2">{isAssamese ? "খৰচ" : "Cost"}</th>
                      <th className="px-3 py-2">{isAssamese ? "Mentorship" : "Mentorship"}</th>
                      <th className="px-3 py-2">{isAssamese ? "গতি" : "Timeline speed"}</th>
                      <th className="px-3 py-2">{isAssamese ? "Fit" : "Best fit"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseRows.map((row) => (
                      <tr key={row.model} className="border-t border-border">
                        <td className="px-3 py-2 font-medium">{row.model}</td>
                        <td className="px-3 py-2">{row.cost}</td>
                        <td className="px-3 py-2">{row.mentorship}</td>
                        <td className="px-3 py-2">{row.timeline}</td>
                        <td className="px-3 py-2">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "৪-point selection rubric" : "4-point selection rubric"}</h2>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {rubric.map((item) => (
                  <div key={item} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-primary/15 bg-card/95 p-5">
                <h3 className="text-lg font-semibold text-primary">{isAssamese ? "Pros" : "Pros"}</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {pros.map((item) => (
                    <div key={item} className="flex items-start gap-2 rounded-md border border-border bg-muted/35 p-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-primary/15 bg-card/95 p-5">
                <h3 className="text-lg font-semibold text-destructive">{isAssamese ? "Cons" : "Cons"}</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {cons.map((item) => (
                    <div key={item} className="rounded-md border border-border bg-muted/35 p-2.5">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

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
              <h2 className="text-xl font-semibold">{isAssamese ? "Next action" : "Next action"}</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/learn-ai-in-assamese-30-days", language)}>
                    {isAssamese ? "৩০ দিনৰ plan খোলক" : "Open 30-day plan"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/ai-course-in-assamese", language)}>
                    {isAssamese ? "Course page" : "Course page"}
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

export default BestAICourseForAssameseSpeakers;
