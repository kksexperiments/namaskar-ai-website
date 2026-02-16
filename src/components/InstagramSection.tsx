// Kept for backward compatibility: the homepage imports `InstagramSection`.
// This now renders the Facebook-based Latest Videos section (no Instagram embeds).
import LatestVideosSection from "@/components/LatestVideosSection";
import { Content } from "@/types/language";

interface InstagramSectionProps {
  t: Content;
}

const InstagramSection = ({ t }: InstagramSectionProps) => {
  return <LatestVideosSection t={t} />;
};

export default InstagramSection;

