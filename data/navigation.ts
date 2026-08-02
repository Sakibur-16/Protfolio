import type { NavLink } from "@/types/portfolio";

export const navigation: NavLink[] = [
  { id: "hero", label: "Intro", href: "#hero", code: "00" },
  { id: "about", label: "About", href: "#about", code: "01" },
  { id: "quote", label: "Approach", href: "#quote", code: "02" },
  { id: "services", label: "Services", href: "#services", code: "03" },
  { id: "work", label: "Work", href: "#work", code: "04" },
  { id: "contact", label: "Contact", href: "#contact", code: "05" },
];

export const footerNavigation: NavLink[] = navigation.filter(
  (link) => link.id !== "hero"
);
