import type { NavLink } from "@/types/portfolio";

export const navigation: NavLink[] = [
  { id: "about", label: "About", href: "#about", code: "01" },
  { id: "experience", label: "Experience", href: "#experience", code: "02" },
  { id: "work", label: "Work", href: "#work", code: "03" },
  { id: "services", label: "Expertise", href: "#services", code: "04" },
  { id: "research", label: "Research", href: "#research", code: "05" },
  { id: "contact", label: "Contact", href: "#contact", code: "06" },
];

export const footerNavigation: NavLink[] = navigation;
