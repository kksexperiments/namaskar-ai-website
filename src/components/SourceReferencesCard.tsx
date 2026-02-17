import { ExternalLink, Library } from "lucide-react";

import { Language } from "@/types/language";
import { Card } from "@/components/ui/card";

interface SourceItem {
  label: string;
  href: string;
  note?: string;
}

interface SourceReferencesCardProps {
  language: Language;
  titleAs?: string;
  titleEn?: string;
  items: SourceItem[];
}

const SourceReferencesCard = ({
  language,
  titleAs = "উৎস আৰু references",
  titleEn = "Sources and References",
  items,
}: SourceReferencesCardProps) => {
  const isAssamese = language === "as";

  return (
    <Card className="border-primary/15 bg-card/95 p-5">
      <div className="mb-3 inline-flex items-center gap-2 text-primary">
        <Library className="h-4 w-4" />
        <h2 className="text-xl font-semibold text-foreground">{isAssamese ? titleAs : titleEn}</h2>
      </div>

      <div className="space-y-3 text-sm">
        {items.map((item) => (
          <div key={item.href} className="rounded-lg border border-border bg-muted/35 p-3">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              {item.label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            {item.note ? <p className="mt-1 text-muted-foreground">{item.note}</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SourceReferencesCard;
