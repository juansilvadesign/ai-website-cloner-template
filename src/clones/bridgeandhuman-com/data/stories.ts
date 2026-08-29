export type StoryAction = {
  label: string;
  href: string;
  mobileLabel?: string;
};

export type StoryMedia = {
  type: "video" | "image";
  src: string;
  poster?: string;
  overlay?: string;
  mobileSrc?: string;
  mobileGallery?: string[];
  alt: string;
  objectPosition?: string;
};

export type Story = {
  id: string;
  eyebrow: string;
  desktopTitle: string[];
  mobileTitle: string;
  description?: string;
  desktopMeta?: string[];
  mobileMeta?: string;
  ctaLabel: string;
  mobileCtaLabel?: string;
  ctaHref: string;
  media: StoryMedia;
  desktopActions: StoryAction[];
  mobileActions?: StoryAction[];
  closing?: boolean;
};

const calendly = "https://calendly.com/boby-bridgeandhuman/30-min-connect-call";
const portfolio = "https://drive.google.com/file/d/1EYKJWwLVyM82CxWL8b0EmNA6ivIAYd53/view?usp=sharing";

export const stories: Story[] = [
  {
    id: "craft",
    eyebrow: "We Craft",
    desktopTitle: ["Design That", "Connects."],
    mobileTitle: "Design That Connects.",
    description: "Bridge & Human is a design strategy house focused on purposeful, narrative-driven digital experiences. We partners with startups, NGOs, and companies to bridge strategy and execution — from story to interface.",
    ctaLabel: "Start A Conversation",
    mobileCtaLabel: "Schedule A Call",
    ctaHref: calendly,
    media: {
      type: "video",
      src: "/clones/bridgeandhuman-com/videos/hero-orchestra.mp4",
      poster: "/clones/bridgeandhuman-com/images/hero-orchestra-poster.png",
      alt: "Black-and-white orchestra performance",
      objectPosition: "center",
    },
    desktopActions: [
      { label: "Download Portfolio", href: portfolio },
      { label: "Our Sales Deck", href: "https://www.figma.com/deck/sFC77jUmEWxixPg51mMo0P" },
    ],
  },
  {
    id: "identity",
    eyebrow: "We Create",
    desktopTitle: ["Launch-ready", "Visual Identity."],
    mobileTitle: "Launch-ready Visual Identity",
    desktopMeta: ["SHIPPED", "6-8 WEEKS DELIVERY"],
    mobileMeta: "6-8 WEEKS DELIVERY",
    ctaLabel: "Create With Us",
    ctaHref: calendly,
    media: {
      type: "video",
      src: "/clones/bridgeandhuman-com/videos/launch-identity.mp4",
      poster: "/clones/bridgeandhuman-com/images/launch-identity-poster.jpg",
      overlay: "/clones/bridgeandhuman-com/images/launch-identity-logo.svg",
      mobileSrc: "/clones/bridgeandhuman-com/images/bitcoin-angels-one.jpg",
      mobileGallery: [
        "/clones/bridgeandhuman-com/images/bitcoin-angels-one.jpg",
        "/clones/bridgeandhuman-com/images/bitcoin-angels-two.jpg",
      ],
      alt: "Launch-ready visual identity work",
    },
    desktopActions: [
      { label: "Visual Guidelines", mobileLabel: "VISUAL GUIDELINE", href: "https://www.figma.com/design/HKdSDvmYQY7udbvCJQZovh/Bitcoin-Angel-Design?node-id=504-2126&t=vP5NpNGZBrueaSZU-1" },
      { label: "Website (3rd party)", mobileLabel: "WEBSITE", href: "https://www.bitcoin-angels.com/" },
    ],
    mobileActions: [
      { label: "VISUAL GUIDELINE", href: "https://www.figma.com/design/HKdSDvmYQY7udbvCJQZovh/Bitcoin-Angel-Design?node-id=504-2126&t=vP5NpNGZBrueaSZU-1" },
      { label: "WEBSITE", href: "https://www.bitcoin-angels.com/" },
    ],
  },
  {
    id: "commerce",
    eyebrow: "We Design",
    desktopTitle: ["Usability-approved", "E-Commerce UI."],
    mobileTitle: "Usability-approved E-Commerce UI",
    desktopMeta: ["SHIPPED (MOBILE FIRST)", "6-8 WEEKS DELIVERY"],
    mobileMeta: "4 WEEKS DELIVERY",
    ctaLabel: "Design With Us",
    ctaHref: calendly,
    media: {
      type: "image",
      src: "/clones/bridgeandhuman-com/images/ecommerce-background.png",
      overlay: "/clones/bridgeandhuman-com/images/ecommerce-desktop.png",
      mobileSrc: "/clones/bridgeandhuman-com/images/ecommerce-mobile.png",
      mobileGallery: [
        "/clones/bridgeandhuman-com/images/ecommerce-background.png",
        "/clones/bridgeandhuman-com/images/ecommerce-mobile.png",
      ],
      alt: "E-commerce interface concepts",
    },
    desktopActions: [
      { label: "Request Access", mobileLabel: "REQUEST DESIGN", href: "mailto:hello@bridgeandhuman.com" },
      { label: "Website (3rd party)", mobileLabel: "LIVE WEBSITE", href: "https://www.hijup.com/" },
    ],
    mobileActions: [
      { label: "REQUEST DESIGN", href: "mailto:hello@bridgeandhuman.com" },
      { label: "LIVE WEBSITE", href: "https://www.hijup.com/" },
    ],
  },
  {
    id: "onboarding",
    eyebrow: "We Design",
    desktopTitle: ["User-converting", "Onboarding Flow."],
    mobileTitle: "User-converting Onboarding Flow",
    desktopMeta: ["SHIPPED (2021-2025)", "2-3 WEEKS DELIVERY"],
    mobileMeta: "3-4 WEEKS DELIVERY",
    ctaLabel: "Design With Us",
    ctaHref: calendly,
    media: {
      type: "image",
      src: "/clones/bridgeandhuman-com/images/onboarding-background.png",
      overlay: "/clones/bridgeandhuman-com/images/onboarding-desktop.gif",
      mobileSrc: "/clones/bridgeandhuman-com/images/onboarding-mobile.gif",
      mobileGallery: [
        "/clones/bridgeandhuman-com/images/onboarding-background.png",
        "/clones/bridgeandhuman-com/images/onboarding-mobile.gif",
      ],
      alt: "Onboarding flow interface",
    },
    desktopActions: [
      { label: "Case Study", mobileLabel: "CASE STUDY", href: "https://www.figma.com/proto/jJJg0WAnmzEB868k2CfZiD/Design-Case-Study?node-id=0-1&t=V0qubLLO4SyhJkjo-1" },
      { label: "Live Website", mobileLabel: "COMPANY'S WEBSITE", href: "https://www.tokopedia.com/" },
    ],
    mobileActions: [
      { label: "CASE STUDY", href: "https://www.figma.com/proto/jJJg0WAnmzEB868k2CfZiD/Design-Case-Study?node-id=0-1&t=V0qubLLO4SyhJkjo-1" },
      { label: "COMPANY'S WEBSITE", href: "https://www.tokopedia.com/" },
    ],
  },
  {
    id: "haven",
    eyebrow: "We Build",
    desktopTitle: ["Research-based", "Digital Identity."],
    mobileTitle: "Research-based Digital Identity",
    desktopMeta: ["PUBLISHED", "2-3 WEEKS DELIVERY"],
    mobileMeta: "2-3 WEEKS DELIVERY",
    ctaLabel: "Build With Us",
    mobileCtaLabel: "Conduct With Us",
    ctaHref: calendly,
    media: {
      type: "image",
      src: "/clones/bridgeandhuman-com/images/haven-graphic.png",
      overlay: "/clones/bridgeandhuman-com/images/haven-screenshot.png",
      mobileGallery: [
        "/clones/bridgeandhuman-com/images/haven-graphic.png",
        "/clones/bridgeandhuman-com/images/haven-screenshot.png",
      ],
      alt: "Research-based digital identity work",
    },
    desktopActions: [{ label: "Visit Website", mobileLabel: "VISIT WEBSITE", href: "https://www.thehavenworks.com/" }],
    mobileActions: [{ label: "VISIT WEBSITE", href: "https://www.thehavenworks.com/" }],
  },
  {
    id: "whatsapp",
    eyebrow: "We Publish",
    desktopTitle: ["Community-first", "WhatsApp* UI Kit."],
    mobileTitle: "Community-first WhatsApp* UI Kit",
    desktopMeta: ["42K+ USER DOWNLOAD", "*NOT AFFILIATED WITH META"],
    mobileMeta: "36K+ USERS",
    ctaLabel: "Publish With Us",
    ctaHref: calendly,
    media: {
      type: "video",
      src: "/clones/bridgeandhuman-com/videos/publish-kit.mp4",
      poster: "/clones/bridgeandhuman-com/images/publish-kit-poster.png",
      alt: "WhatsApp user interface kit showcase",
    },
    desktopActions: [{ label: "View in Figma", mobileLabel: "VIEW IN FIGMA", href: "https://www.figma.com/community/file/899573184309913069/whatsapp-ui-kit-ios" }],
    mobileActions: [{ label: "VIEW IN FIGMA", href: "https://www.figma.com/community/file/899573184309913069/whatsapp-ui-kit-ios" }],
  },
  {
    id: "closing",
    eyebrow: "We Listen,",
    desktopTitle: ["We", "Don't", "Judge."],
    mobileTitle: "We Don't Judge.",
    description: "Founded and led by Boby Haryanto, Bridge & Human exists to bridge the gaps between ideas and executions. Whether looking for a long-term creative partner or simply translating your ideas into a launch-ready presentation, we help you connect the dots into a meaningful and fruitful story.",
    ctaLabel: "Partner With Us",
    ctaHref: calendly,
    media: {
      type: "video",
      src: "/clones/bridgeandhuman-com/videos/closing-story.mp4",
      poster: "/clones/bridgeandhuman-com/images/closing-story-poster.png",
      alt: "Creative studio closing film",
    },
    desktopActions: [
      { label: "Download Portfolio", href: portfolio },
      { label: "Send Inquiries", href: "mailto:hello@bridgeandhuman.com" },
    ],
    closing: true,
  },
];
