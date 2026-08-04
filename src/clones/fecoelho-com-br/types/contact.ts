export type ContactIconName =
  | "contact"
  | "whatsapp"
  | "linkedin"
  | "website"
  | "email";

export interface ContactAction {
  label: string;
  subtitle: string;
  href: string;
  icon: ContactIconName;
  arrow: "↓" | "↗";
  primary?: boolean;
  download?: boolean;
  external?: boolean;
}
