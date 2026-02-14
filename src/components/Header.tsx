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
import { Globe, ChevronDown, User, Sparkles, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Content, Language } from "@/types/language";
import { useAuth } from "@/hooks/useAuth";
import namaskarLogo from "@/assets/namaskar-logo.png";
import { useState } from "react";

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  t: Content;
}

const Header = ({ currentLanguage, onLanguageChange, t }: HeaderProps) => {
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const adminLabel = currentLanguage === "as" ? "এডমিন পেনেল" : "Admin Panel";
  const signInLabel = currentLanguage === "as" ? "চাইন ইন" : "Sign In";
  const welcomeLabel = currentLanguage === "as" ? "স্বাগতম" : "Welcome";
  const openMenuLabel = currentLanguage === "as" ? "মেনু" : "Menu";
  const mobileMenuTitle = currentLanguage === "as" ? "মেনু" : "Navigation";
  const mobileMenuBody =
    currentLanguage === "as"
      ? "দ্ৰুতভাৱে পেজ বাছনি কৰক আৰু শিকাৰ যাত্ৰা আগবঢ়াওক।"
      : "Move quickly between learning pages.";
  const navLinks = [
    {
      to: "/prompt-packs",
      label: currentLanguage === "as" ? "প্ৰম্প্ট পেক" : "Prompt Packs",
    },
    {
      to: "/ai-tools",
      label: currentLanguage === "as" ? "AI টুলছ" : "AI Tools",
    },
    {
      to: "/learning-roadmaps",
      label: currentLanguage === "as" ? "ৰোডমেপ" : "Roadmaps",
    },
    {
      to: "/news",
      label: currentLanguage === "as" ? "খবৰ" : "News",
    },
  ];
  const shortcutLabel =
    currentLanguage === "as"
      ? "আজিৰ দ্ৰুত আৰম্ভণি: ১০ মিনিটত ১টা প্ৰম্প্ট কপি কৰি চেষ্টা কৰক।"
      : "Today’s quick start: copy and run 1 prompt in 10 minutes.";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/15 bg-[linear-gradient(135deg,hsl(var(--card)/0.95),hsl(var(--accent)/0.08),hsl(var(--primary)/0.12))] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
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
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-primary/10">
                  {link.label}
                </Button>
              </Link>
            ))}
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
                  {navLinks.map((link) => (
                    <SheetClose asChild key={`mobile-${link.to}`}>
                      <Link to={link.to} className="block">
                        <Button variant="outline" className="w-full justify-start">
                          {link.label}
                        </Button>
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-primary/20 bg-card/80 p-3 text-xs text-muted-foreground">
                  {shortcutLabel}
                </div>
              </SheetContent>
            </Sheet>

            {/* Admin Link */}
            {user && isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  {adminLabel}
                </Button>
              </Link>
            )}

            {/* Auth Button */}
            {!user ? (
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{signInLabel}</span>
                </Button>
              </Link>
            ) : (
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {welcomeLabel}, {user.email?.split("@")[0]}
              </span>
            )}

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
