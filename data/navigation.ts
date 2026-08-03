import type { NavLink } from "@/types/portfolio";

export const navigation: NavLink[] = [
  { id: "hero", label: "Intro", href: "#hero", code: "00" },
  { id: "about", label: "About", href: "#about", code: "01" },
  { id: "experience", label: "Experience", href: "#experience", code: "02" },
  { id: "quote", label: "Approach", href: "#quote", code: "03" },
  { id: "services", label: "Expertise", href: "#services", code: "04" },
  { id: "work", label: "Work", href: "#work", code: "05" },
  { id: "research", label: "Research", href: "#research", code: "06" },
  { id: "contact", label: "Contact", href: "#contact", code: "07" },
];

export const footerNavigation: NavLink[] = navigation.filter(
  (link) => link.id !== "hero"
);
