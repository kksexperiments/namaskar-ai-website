import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, HeartHandshake, Target, Users } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/about", language);

  const principles = isAssamese
    ? [
        "Assamese-first clarity: first explanation সহজ ভাষাত।",
        "Practical-first learning: theoryৰ আগে বাস্তৱ workflow।",
        "Safety and trust: fact-check আৰু responsible AI usage।",
        "Community impact: Assam-ৰ learner আৰু small business use-case focus।",
      ]
    : [
        "Assamese-first clarity: explain in simple language first.",
        "Practical-first learning: workflow before theory overload.",
        "Safety and trust: fact-checking and responsible AI usage.",
        "Community impact: focus on Assam learners and small businesses.",
      ];

  const audience = isAssamese
    ? ["Students and aspirers", "Working professionals", "Teachers and parents", "Small business owners"]
    : ["Students and aspirers", "Working professionals", "Teachers and parents", "Small business owners"];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: isAssamese ? "আমাৰ বিষয়ে | নমস্কাৰ AI" : "About Us | Namaskar AI",
    description: isAssamese
      ? "Namaskar AI-ৰ mission, learning philosophy, আৰু Assam-focused AI education commitment।"
      : "Mission, learning philosophy, and Assam-focused AI education commitment of Namaskar AI.",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    url: toAbsoluteSiteUrl(canonicalPath),
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Namaskar AI",
    url: toAbsoluteSiteUrl(toLocalePath("/", language)),
    areaServed: ["Assam", "India"],
    knowsAbout: ["AI education", "ChatGPT workflows", "Assamese language learning", "Regional language AI"],
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
        name: isAssamese ? "আমাৰ বিষয়ে" : "About",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "আমাৰ বিষয়ে | নমস্কাৰ AI" : "About Us | Namaskar AI"}
        description={
          isAssamese
            ? "Namaskar AI কেনেকৈ Assamese speaker-সকলৰ বাবে practical AI education আগবঢ়ায়, ইয়াত চাওক।"
            : "Learn how Namaskar AI delivers practical AI education for Assamese speakers."
        }
        path={canonicalPath}
        language={language}
        keywords={["about Namaskar AI", "AI education Assam", "Assamese AI learning platform"]}
        structuredData={[aboutSchema, organizationSchema, breadcrumbSchema]}
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
                {isAssamese ? "নমস্কাৰ AI-ৰ বিষয়ে" : "About Namaskar AI"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "Namaskar AI-ৰ লক্ষ্য হৈছে Assamese speaker-সকলক practical, safe, আৰু measurable AI skill-এ empower কৰা।"
                  : "Namaskar AI exists to help Assamese speakers build practical, safe, and measurable AI skills."}
              </p>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-primary/15 bg-card/95 p-5">
              <Target className="mb-2 h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold">{isAssamese ? "Mission" : "Mission"}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isAssamese
                  ? "AI literacy-এ Assam-ৰ students, professionals, আৰু businesses-ৰ বাবে বাস্তৱ ফল সৃষ্টি কৰা।"
                  : "Create real outcomes for Assam students, professionals, and businesses through AI literacy."}
              </p>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <Users className="mb-2 h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold">{isAssamese ? "Audience" : "Audience"}</h2>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <HeartHandshake className="mb-2 h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold">{isAssamese ? "Approach" : "Approach"}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isAssamese
                  ? "Direct answer + step-by-step workflow + reusable templates."
                  : "Direct answers, step-by-step workflows, and reusable templates."}
              </p>
            </Card>
          </div>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <BadgeCheck className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{isAssamese ? "Our Principles" : "Our Principles"}</h2>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {principles.map((item) => (
                <div key={item} className="rounded-lg border border-border bg-muted/35 p-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "Explore next" : "Explore next"}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button asChild variant="outline" className="justify-start">
                <Link to={toLocalePath("/ai-course-in-assamese", language)}>
                  {isAssamese ? "AI Course page" : "AI Course page"}
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to={toLocalePath("/contact", language)}>
                  {isAssamese ? "যোগাযোগ" : "Contact"}
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

export default About;
