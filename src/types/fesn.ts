/** Content structures observed on https://carteirinha.fesn.org.br. */

export type IconName =
  | "circle-check"
  | "wallet"
  | "shield-check"
  | "lock"
  | "chevron-down"
  | "mail"
  | "message-circle"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "globe"
  | "search-x";

/** A benefit card in the three-up grid on /vendas. */
export interface BenefitCard {
  icon: IconName;
  title: string;
  body: string;
}

/** A numbered card in the "Como tirar sua carteirinha" grid. */
export interface StepCard {
  eyebrow: string;
  title: string;
  body: string;
}

/** One row of the /vendas FAQ accordion. */
export interface FaqItem {
  question: string;
  answer: string;
}

/** A pill link in the hero's secondary navigation row. */
export interface PillLink {
  label: string;
  href: string;
}

/** A checked feature in the hero's two-column feature list. */
export interface HeroFeature {
  label: string;
}

/** A labelled link in a footer column. */
export interface FooterLink {
  label: string;
  href: string;
  icon?: IconName;
  external?: boolean;
}

/** A titled group of links in the footer. */
export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

/**
 * The student credential rendered by /student-card.
 *
 * The clone ships MOCK values only — the live target resolves these from a
 * lookup keyed on CPF, and the real payload is personally identifying.
 */
export interface StudentCard {
  name: string;
  cieCode: string;
  institution: string;
  course: string;
  courseType: string;
  cpf: string;
  birthDate: string;
  validUntil: string;
  year: string;
  photoSrc: string;
  qrSrc: string;
}
