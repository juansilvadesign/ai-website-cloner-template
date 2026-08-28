export type CaseTone = "red" | "blue" | "ink";

export interface CaseMetric {
  value: string;
  label: string;
  tone: CaseTone;
}

export interface CaseSection {
  heading?: string;
  paragraphs: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  screens?: Array<{
    label: string;
    caption: string;
    src: string;
  }>;
}

export interface CaseStudy {
  slug: "smytten" | "billbuster" | "combo";
  kicker: string;
  client: string;
  chips: string[];
  title: string;
  subtitle: string;
  meta: Array<{ label: string; value: string }>;
  metrics: CaseMetric[];
  cover?: { src: string; alt: string };
  sections: CaseSection[];
  next: "smytten" | "billbuster" | "combo";
}

const asset = (name: string) => `/clones/helloparul-in/images/${name}`;

export const caseStudies: CaseStudy[] = [
  {
    slug: "smytten",
    kicker: "Case study 01",
    client: "Smytten",
    chips: ["Conversion", "AI summaries", "Trust signals"],
    title: "Building trust through AI-powered review summaries",
    subtitle: "Users were spending time on product pages, especially around reviews, but many were exiting before making a purchase. The work reduced the friction between reading opinions and feeling ready to buy.",
    meta: [
      { label: "Role", value: "UX Designer" },
      { label: "Company", value: "Smytten" },
      { label: "Focus", value: "Conversion & trust" },
      { label: "Platform", value: "iOS · Android" },
    ],
    metrics: [
      { value: "+5 pts", label: "PDP → cart conversion", tone: "red" },
      { value: "↑↑", label: "review participation", tone: "blue" },
      { value: "−fatigue", label: "faster decisions", tone: "ink" },
    ],
    cover: {
      src: asset("smytten-hero-cover.png"),
      alt: "Smytten review summary product interface",
    },
    sections: [
      {
        heading: "Brief",
        paragraphs: [
          "At Smytten, the Product Detail Page plays a critical role in the conversion journey. Users discover products, evaluate trust signals, compare opinions, and decide whether to move forward with a purchase.",
          "For skincare and beauty, product descriptions alone rarely give enough confidence. Reviews were one of the strongest trust indicators in the journey, yet many products did not have enough meaningful reviews.",
        ],
      },
      {
        heading: "Understanding the problem",
        paragraphs: [
          "Funnel analysis, session recordings, and review-page interaction tracking showed that users actively opened reviews before purchasing, but sparse feedback created hesitation and uncertainty.",
          "Low trust was increasing friction inside the conversion funnel.",
        ],
        image: {
          src: asset("smytten-session-insights.png"),
          alt: "Session recording insights for the product review journey",
        },
      },
      {
        heading: "Phase 1 — Solving the trust gap",
        paragraphs: [
          "We introduced a reward-based review system where users received 5–10 Smytten Bucks for submitting product reviews after delivery. The experience was designed to feel lightweight, rewarding, and frictionless.",
          "Review participation started increasing across products, helping users discover more authentic product experiences before purchasing.",
        ],
        image: {
          src: asset("smytten-phase1-reviews.png"),
          alt: "Reward-based review flow on Smytten",
        },
      },
      {
        heading: "A new UX problem emerged",
        paragraphs: [
          "As review volume increased, users were spending excessive time scrolling, comparing opinions, filtering sentiments manually, and trying to understand whether a product was right for them.",
          "The issue was no longer a lack of information. It was too much information to process.",
        ],
        image: {
          src: asset("smytten-phase-one.png"),
          alt: "Review section research and design exploration",
        },
      },
      {
        heading: "The solution — AI-powered review summaries",
        paragraphs: [
          "Instead of asking users to search for answers, the interface summarizes collective sentiment directly in the review section. It offers a short AI-generated summary, quick sentiment chips, and contextual good-fit / not-ideal-for indicators.",
          "The goal was not to replace reviews. It was to help users understand them faster and make a more confident decision.",
        ],
        image: {
          src: asset("smytten-ai-summary-wireframe.png"),
          alt: "AI summary wireframe for a product review section",
        },
      },
    ],
    next: "billbuster",
  },
  {
    slug: "billbuster",
    kicker: "Case study 02",
    client: "Smytten",
    chips: ["Gamification", "Reward systems", "Cart value"],
    title: "Bill Buster: The ₹150 Users Didn't Know They Were Leaving Behind",
    subtitle: "Increasing cart value through real-time reward progress.",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Timeline", value: "6 weeks" },
      { label: "Team", value: "1 PM · 2 Eng · me" },
      { label: "Platform", value: "iOS · Android" },
    ],
    metrics: [
      { value: "19%→26%", label: "offer completion", tone: "blue" },
      { value: "₹150", label: "gap made visible", tone: "red" },
      { value: "+motivate", label: "user to buy more", tone: "ink" },
    ],
    cover: {
      src: asset("billbuster-hero.png"),
      alt: "Bill Buster reward unlocked screen on Smytten",
    },
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Bill Buster was a cart-value incentive feature on the Smytten app. When a user crosses ₹500 in their cart, an offer unlocks — a discount or reward, redeemable in the journey.",
          "The mechanism already existed. What it lacked was a reason for users to notice it.",
        ],
      },
      {
        heading: "The discovery",
        paragraphs: [
          "An offer unlocked at ₹500, while average cart value sat at ₹350. A large share of orders was closing out inside that ₹150 gap. Users were not choosing to skip the offer; they simply did not know it existed.",
        ],
        image: {
          src: asset("billbuster-why.png"),
          alt: "Original static cart discount banner",
        },
      },
      {
        heading: "The fix",
        paragraphs: [
          "A sticky progress bar appeared when the first product was added to cart and updated in real time. It made the gap visible through every moment of the shopping session.",
        ],
        screens: [
          {
            label: "Before adding anything",
            caption: "A quiet line of text about the reward. No pressure yet.",
            src: asset("billbuster-before.png"),
          },
          {
            label: "After the first add-to-cart",
            caption: "The bar appears at the bottom and shows exactly how much more is needed.",
            src: asset("billbuster-after.png"),
          },
          {
            label: "Once ₹500 is crossed",
            caption: "A popup confirms the offer is unlocked and provides a clear path to continue.",
            src: asset("billbuster-unlocked.png"),
          },
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "Offer completion rose from 19% to 26%, with improved visibility and engagement around active rewards.",
          "The lesson: the reward was never the problem. Timing and visibility were.",
        ],
      },
    ],
    next: "combo",
  },
  {
    slug: "combo",
    kicker: "Case study 03",
    client: "Smytten",
    chips: ["Discovery", "Decision design", "Activation"],
    title: "Combo Generator — Guided Trial Selection for Smytten",
    subtitle: "Smytten's catalog has 300+ trial products. Users come to explore, not search for something specific — that makes discovery a decision-design problem.",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Company", value: "Smytten" },
      { label: "Focus", value: "Discovery & activation" },
      { label: "Platform", value: "iOS · Android" },
    ],
    metrics: [
      { value: "22–28%", label: "proceeded to checkout", tone: "red" },
      { value: "14–18%", label: "lift in selection completion", tone: "blue" },
      { value: "2 ways", label: "to correct a wrong guess", tone: "ink" },
    ],
    cover: {
      src: asset("combo-05-curated.webp"),
      alt: "Curated Combo Generator product selection",
    },
    sections: [
      {
        heading: "Business problem",
        paragraphs: [
          "Unguided discovery was capping activation, not just engagement. A user who does not complete a trial selection never reaches cart, checkout, or a repeat trial.",
          "The premise was not to add more filters, but to remove decisions until confidence was reached.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "The flow asks one or two lightweight preference questions, then pre-commits to a complete ready-to-act-on set. Users can shuffle the whole selection or replace a single item without restarting.",
          "This turns an unbounded choice space into a bounded, correctable one.",
        ],
      },
      {
        heading: "Screens — the 7-step flow",
        paragraphs: [],
        screens: [
          { label: "1. Entry point — Build your combo", caption: "A clear entry point cuts aimless browsing before it starts.", src: asset("combo-01-entry.webp") },
          { label: "2. Choose categories", caption: "Category chips narrow 300+ products to a focused set.", src: asset("combo-02-categories.webp") },
          { label: "3. Choose brands (optional)", caption: "An optional lever, never a required one.", src: asset("combo-03-brands.webp") },
          { label: "4. Generating the combo", caption: "A short loading state sets the expectation that a curated result is coming.", src: asset("combo-04-generating.webp") },
          { label: "5. Curated combo view", caption: "Eight recommended products matched to the user's choices.", src: asset("combo-05-curated.webp") },
          { label: "6. Shuffle & replace", caption: "Two correction mechanisms at different granularity.", src: asset("combo-06-shuffle.webp") },
          { label: "7. Add to cart & completion", caption: "One CTA adds the whole combo to cart.", src: asset("combo-07-cart.webp") },
        ],
      },
      {
        heading: "Impact",
        paragraphs: [
          "22–28% of Combo Generator users proceeded to checkout, and trial-selection completion increased by 14–18%.",
        ],
      },
    ],
    next: "smytten",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
