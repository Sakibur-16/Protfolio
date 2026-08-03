import type { SocialLink } from "@/types/portfolio";

// Replace the `href: null` entries with real URLs when available.
// Any link with a null or empty href is hidden automatically — see
// components/ui/SocialLinks.tsx.
export const socialLinks: SocialLink[] = [
  { id: "email", label: "Email", href: null, icon: "mail" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/srnrahman/", icon: "linkedin" },
  { id: "github", label: "GitHub", href: null, icon: "github" },
  { id: "scholar", label: "Google Scholar", href: null, icon: "scholar" },
  { id: "resume", label: "Résumé", href: null, icon: "file" },
];
