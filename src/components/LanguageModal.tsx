import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { content, Language } from "@/types/language";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (language: Language) => void;
  currentLanguage: Language;
}

const LanguageModal = ({ isOpen, onClose, onSelectLanguage, currentLanguage }: LanguageModalProps) => {
  const modalCopy = content[currentLanguage].modal;

  const handleLanguageSelect = (lang: Language) => {
    onSelectLanguage(lang);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl bg-gradient-card border-0 shadow-elegant animate-bounce-in">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-2xl font-poppins font-bold gradient-text">
            {modalCopy.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {modalCopy.subtitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            variant={currentLanguage === 'en' ? 'default' : 'outline'}
            size="lg"
            onClick={() => handleLanguageSelect('en')}
            className="flex-1 h-16 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            {modalCopy.english}
          </Button>
          
          <Button
            variant={currentLanguage === 'as' ? 'default' : 'outline'}
            size="lg"
            onClick={() => handleLanguageSelect('as')}
            className="flex-1 h-16 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            {modalCopy.assamese}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          {currentLanguage === "as"
            ? "এইটো আপুনি যিকোনো সময়ে ভাষা মেনুৰ পৰা সলনি কৰিব পাৰিব।"
            : "You can change this anytime from the language menu"}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageModal;
