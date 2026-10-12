import type { SocialLink } from "@/types/portfolio";

// Any link with a null or empty href is hidden automatically; see
// components/ui/SocialLinks.tsx.
export const socialLinks: SocialLink[] = [
  { id: "email", label: "sakibursrrahman@gmail.com", href: "mailto:sakibursrrahman@gmail.com", icon: "mail" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/srnrahman/", icon: "linkedin" },
  { id: "github", label: "GitHub", href: "https://github.com/Sakibur-16", icon: "github" },
  { id: "scholar", label: "Google Scholar", href: "https://scholar.google.com/citations?user=M7TDa2gAAAAJ&hl=en", icon: "scholar" },
  { id: "resume", label: "CV (PDF)", href: "/Sakibur_Rahman_CV.pdf", icon: "file" },
];
