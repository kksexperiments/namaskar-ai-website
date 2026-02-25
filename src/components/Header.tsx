import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Globe, ChevronDown, Sparkles, Menu, Users, Palette, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Content, Language } from "@/types/language";
import { useAuth } from "@/hooks/useAuth";
import namaskarLogo from "@/assets/namaskar-logo.png";
import { useEffect, useState } from "react";
import { toLocalePath } from "@/lib/locale";
import { SITE_THEMES, SiteTheme, getStoredSiteTheme, setStoredSiteTheme } from "@/lib/siteTheme";

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  t: Content;
}

const Header = ({ currentLanguage, onLanguageChange, t }: HeaderProps) => {
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<SiteTheme>("saffron-dawn");
  const homePath = toLocalePath("/", currentLanguage);
  const adminPath = toLocalePath("/admin", currentLanguage);
  const adminLabel = currentLanguage === "as" ? "এডমিন পেনেল" : "Admin Panel";
  const welcomeLabel = currentLanguage === "as" ? "স্বাগতম" : "Welcome";
  const openMenuLabel = currentLanguage === "as" ? "মেনু" : "Menu";
  const mobileMenuTitle = currentLanguage === "as" ? "মেনু" : "Navigation";
  const mobileMenuBody =
    currentLanguage === "as"
      ? "দ্ৰুতভাৱে পেজ বাছনি কৰক আৰু শিকাৰ যাত্ৰা আগবঢ়াওক।"
      : "Move quickly between learning pages.";
  const primaryLinks = [
    {
      to: toLocalePath("/prompt-packs", currentLanguage),
      label: currentLanguage === "as" ? "প্ৰম্প্ট পেক" : "Prompt Packs",
    },
    {
      to: toLocalePath("/ai-tools", currentLanguage),
      label: currentLanguage === "as" ? "AI টুলছ" : "AI Tools",
    },
    {
      to: toLocalePath("/learning-roadmaps", currentLanguage),
      label: currentLanguage === "as" ? "AI Course" : "AI Course",
    },
    {
      to: toLocalePath("/news", currentLanguage),
      label: currentLanguage === "as" ? "খবৰ" : "Updates",
    },
  ];
  const moreLabel = currentLanguage === "as" ? "অধিক" : "More";
  const moreLinks = [
    { to: toLocalePath("/faq", currentLanguage), label: "FAQ" },
    { to: toLocalePath("/about", currentLanguage), label: currentLanguage === "as" ? "আমাৰ বিষয়ে" : "About" },
    { to: toLocalePath("/contact", currentLanguage), label: currentLanguage === "as" ? "যোগাযোগ" : "Contact" },
    { to: toLocalePath("/press-collaboration", currentLanguage), label: currentLanguage === "as" ? "Press" : "Press" },
  ];
  const shortcutLabel =
    currentLanguage === "as"
      ? "আজিৰ দ্ৰুত আৰম্ভণি: ১০ মিনিটত ১টা প্ৰম্প্ট কপি কৰি চেষ্টা কৰক।"
      : "Today’s quick start: copy and run 1 prompt in 10 minutes.";
  const communityPath = `${homePath}#community`;
  const themeLabel = currentLanguage === "as" ? "থিম" : "Theme";
  const themeHint = currentLanguage === "as" ? "চেহেৰা সলনি কৰক" : "Switch look";
  const defaultThemeLabel = currentLanguage === "as" ? SITE_THEMES[0].labelAs : SITE_THEMES[0].labelEn;
  const selectedThemeLabel =
    SITE_THEMES.find((theme) => theme.id === activeTheme)?.[
      currentLanguage === "as" ? "labelAs" : "labelEn"
    ] ?? defaultThemeLabel;

  useEffect(() => {
    setActiveTheme(getStoredSiteTheme());
  }, []);

  const handleThemeChange = (theme: SiteTheme) => {
    setStoredSiteTheme(theme);
    setActiveTheme(theme);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/15 bg-[linear-gradient(135deg,hsl(var(--card)/0.95),hsl(var(--accent)/0.08),hsl(var(--primary)/0.12))] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={homePath} className="flex items-center space-x-3">
              <img
                src={namaskarLogo}
                alt="Namaskar AI"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-poppins font-bold">
                Namaskar
                <span className="text-primary ml-1">AI</span>
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {primaryLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-primary/10">
                  {link.label}
                </Button>
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-primary/10">
                  {moreLabel}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border border-border shadow-card">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side - Auth & Language */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden" aria-label={openMenuLabel}>
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="border-primary/20 bg-[linear-gradient(160deg,hsl(var(--card)),hsl(var(--accent)/0.1),hsl(var(--primary)/0.08))]"
              >
                <SheetHeader>
                  <SheetTitle>{mobileMenuTitle}</SheetTitle>
                  <SheetDescription>{mobileMenuBody}</SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-2">
                  <SheetClose asChild>
                    <Link to={communityPath} className="block">
                      <Button className="w-full justify-start bg-gradient-primary text-white">
                        {t.hero.secondaryCta}
                      </Button>
                    </Link>
                  </SheetClose>

                  {primaryLinks.map((link) => (
                    <SheetClose asChild key={`mobile-primary-${link.to}`}>
                      <Link to={link.to} className="block">
                        <Button variant="outline" className="w-full justify-start">
                          {link.label}
                        </Button>
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="pt-3">
                    <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {moreLabel}
                    </p>
                    <div className="space-y-2">
                      {moreLinks.map((link) => (
                        <SheetClose asChild key={`mobile-more-${link.to}`}>
                          <Link to={link.to} className="block">
                            <Button variant="outline" className="w-full justify-start">
                              {link.label}
                            </Button>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {themeLabel}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {SITE_THEMES.map((theme) => (
                        <Button
                          key={theme.id}
                          type="button"
                          variant={activeTheme === theme.id ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => handleThemeChange(theme.id)}
                        >
                          {activeTheme === theme.id ? <Check className="mr-2 h-4 w-4" /> : null}
                          {currentLanguage === "as" ? theme.labelAs : theme.labelEn}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-primary/20 bg-card/80 p-3 text-xs text-muted-foreground">
                  {shortcutLabel}
                </div>
              </SheetContent>
            </Sheet>

            {/* Admin Link */}
            {user && isAdmin && (
              <Link to={adminPath}>
                <Button variant="outline" size="sm">
                  {adminLabel}
                </Button>
              </Link>
            )}

            {/* Admin-only: don't show auth entry points publicly */}
            {user && isAdmin ? (
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {welcomeLabel}, {user.email?.split("@")[0]}
              </span>
            ) : null}

            {/* Join Community CTA */}
            <Link to={communityPath} className="hidden sm:inline-flex">
              <Button
                size="sm"
                data-magnetic="true"
                className="magnetic-cta heritage-primary-cta bg-gradient-primary text-white shadow-button"
              >
                {t.hero.secondaryCta}
              </Button>
            </Link>
            <Link to={communityPath} className="sm:hidden">
              <Button
                size="icon"
                aria-label={t.hero.secondaryCta}
                data-magnetic="true"
                className="magnetic-cta heritage-primary-cta bg-gradient-primary text-white shadow-button"
              >
                <Users className="h-4 w-4" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label={themeLabel}
                  variant="ghost"
                  size="sm"
                  className="hidden items-center space-x-2 hover:bg-muted transition-colors md:inline-flex"
                >
                  <Palette className="w-4 h-4" />
                  <span className="hidden lg:inline">{selectedThemeLabel}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border border-border shadow-card min-w-[180px]">
                <div className="px-2 pb-1 pt-1 text-xs text-muted-foreground">{themeHint}</div>
                {SITE_THEMES.map((theme) => (
                  <DropdownMenuItem
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className="cursor-pointer"
                  >
                    <span className="flex w-full items-center justify-between">
                      <span>{currentLanguage === "as" ? theme.labelAs : theme.labelEn}</span>
                      {activeTheme === theme.id ? <Check className="h-4 w-4 text-primary" /> : null}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label={t.nav.language}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 hover:bg-muted transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {currentLanguage === "en" ? "English" : "অসমীয়া"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border border-border shadow-card">
                <DropdownMenuItem
                  onClick={() => onLanguageChange("en")}
                  className={`cursor-pointer ${currentLanguage === "en" ? "bg-muted" : ""}`}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLanguageChange("as")}
                  className={`cursor-pointer ${currentLanguage === "as" ? "bg-muted" : ""}`}
                >
                  অসমীয়া
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="hidden border-t border-primary/10 bg-card/60 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-1.5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>{shortcutLabel}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
