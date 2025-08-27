import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";
import { Language } from "@/types/language";
import namaskarLogo from "@/assets/namaskar-logo.png";

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  t: any;
}

const Header = ({ currentLanguage, onLanguageChange, t }: HeaderProps) => {
  return (
    <header className="w-full bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <img 
                src={namaskarLogo} 
                alt="Namaskar AI" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-poppins font-bold">
                Namaskar
                <span className="text-primary ml-1">AI</span>
              </span>
            </div>
          </div>

          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-2 hover:bg-muted transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {currentLanguage === 'en' ? 'English' : 'অসমীয়া'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border border-border shadow-card">
              <DropdownMenuItem 
                onClick={() => onLanguageChange('en')}
                className={`cursor-pointer ${currentLanguage === 'en' ? 'bg-muted' : ''}`}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onLanguageChange('as')}
                className={`cursor-pointer ${currentLanguage === 'as' ? 'bg-muted' : ''}`}
              >
                অসমীয়া
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;