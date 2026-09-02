export type CaseStudy = {
  slug: "case1" | "case2" | "case3";
  number: string;
  title: string;
  subtitle: string;
  statement: string;
  client: string;
  duration: string;
  role: string;
  brief: string;
  context: string;
  outcome: string;
  heroImage: string;
  media: string[];
  mediaAlt: string[];
  nextSlug: "case1" | "case2" | "case3";
};

const asset = (path: string) => `/clones/marcos-arruda-com/${path}`;
const route = (path = "") => `/marcos-arruda-com/${path}`;

export const siteRoute = route;

export const homeProjects = [
  {
    number: "01",
    title: "MANIFEST",
    description: "Innovating how people use and access clothes, supporting a more sustainable consumption.",
    href: route("case1/"),
  },
  {
    number: "02",
    title: "FIT POINTS",
    description: "Encouraging people to improve their fitness performance by using a habit-based design approach.",
    href: route("case3/"),
  },
  {
    number: "03",
    title: "VIBRANT STREETS",
    description: "Creating a friendly and vibrant city street environment for walkers, runners and cyclists.",
    href: route("case2/"),
  },
  {
    number: "04",
    title: "EMPLOYEE EXPERIENCE",
    description: "A collection of employee experience design projects for leading global organisations.",
    href: "https://drive.google.com/file/d/1Pqk4lMZf8UyWgPzP2w5a1DcNqW1z5oK_/view",
  },
];

export const companyMarks = [
  { src: asset("images/logo-tidy.png"), alt: "Tidy" },
  { src: asset("images/logo-pvh.png"), alt: "PVH" },
  { src: asset("images/logo-adidas.png"), alt: "Adidas" },
  { src: asset("images/logo-jacobs.jpg"), alt: "Jacobs" },
  { src: asset("images/logo-city.png"), alt: "Manchester City" },
  { src: asset("images/logo-local-digital.png"), alt: "Local Digital" },
];

export const about = {
  portrait: asset("images/about-portrait.jpg"),
  introduction:
    "Creative Professional, holding a Bachelor's Degree in Social Media Studies, a PgCert in Digital Graphics and Experimental Typography from London College of Communication, and a MA in Digital Experience Design from Hyper Island UK & Teesside University. Innovative, resourceful and multi-skilled individual who is passionate about human-centered design processes.",
  paragraphs: [
    "I have a strong need to have all areas of my life aligned with my values. My ability to think imaginatively and come up with new ideas helps me be flexible and respond very well to changes. Sharing the lessons of my experience to support and guide others is a focus for me. I love behavioural design, digital business transformation and collaboration with extraordinary and creative minds.",
    "My solid academic background and expertise in UX Design, UX Research, Service Design, Employee Experience, Interaction Design, Branding, Visual Design, Marketing and Advertising can help your organisation create new products, services, systems and experiences.",
  ],
};

export const caseStudies: Record<CaseStudy["slug"], CaseStudy> = {
  case1: {
    slug: "case1",
    number: "01",
    title: "MANIFEST",
    subtitle: "We need to rethink the way we consume clothes.",
    statement: "Innovating how people use and access clothes, supporting a more sustainable consumption.",
    client: "Area 52 — PVH Corp.",
    duration: "8 Weeks",
    role: "UX Research, Service Design, Experience Strategy",
    brief: "Create a compelling service that changes the relationship between people and the clothes they own.",
    context:
      "Area 52 is the innovation lab of PVH — the global fashion company behind Tommy Hilfiger, Calvin Klein, Warner's, Olga by Warner's and True&Co. The team asked how fashion could move beyond a linear cycle of buy, use and dispose.",
    outcome:
      "Manifest turns access into the product: a circular clothing service designed around discovery, care, return and re-use. The proposal pairs research-led service touchpoints with an intentionally visible circular system.",
    heroImage: asset("images/case1-hero.jpg"),
    media: [asset("images/case1-research-1.png"), asset("images/case1-research-2.png"), asset("images/case1-research-3.png")],
    mediaAlt: ["Manifest research board", "Manifest journey artefact", "Manifest interface exploration"],
    nextSlug: "case2",
  },
  case2: {
    slug: "case2",
    number: "03",
    title: "VIBRANT STREETS",
    subtitle: "Street life is where a city becomes a shared experience.",
    statement: "Creating a friendly and vibrant city street environment for walkers, runners and cyclists.",
    client: "Middlesbrough Council — Hyper Island",
    duration: "6 Weeks",
    role: "Service Design, Field Research, Experience Design",
    brief: "Make a busy urban route safer, more useful and more inviting for people moving through it every day.",
    context:
      "The project began with street observation and conversations with local walkers, runners, cyclists, businesses and residents. The research focused on the small friction points that decide whether a street feels welcoming or merely passable.",
    outcome:
      "Vibrant Streets combines clear movement cues, moments of rest and a community-led activation framework. It gives the street a social purpose as well as a transport function.",
    heroImage: asset("images/case2-hero.jpg"),
    media: [asset("images/case2-field-1.jpeg"), asset("images/case2-field-2.jpeg"), asset("images/case2-field-3.jpg"), asset("images/case2-field-4.jpg"), asset("images/case2-field-5.png")],
    mediaAlt: ["Street research", "Field study", "Vibrant Streets concept", "Street activation", "Vibrant Streets system"],
    nextSlug: "case3",
  },
  case3: {
    slug: "case3",
    number: "02",
    title: "FIT POINTS",
    subtitle: "Making a habit of feeling stronger.",
    statement: "Encouraging people to improve their fitness performance by using a habit-based design approach.",
    client: "Self-initiated — Hyper Island",
    duration: "5 Weeks",
    role: "Product Design, Behavioural Design, Visual Design",
    brief: "Design a motivating digital fitness experience that rewards repeatable progress instead of one-off intensity.",
    context:
      "Fit Points explores how small, visible wins can help people keep going. The work considers the gap between a good intention and the routines that make it sustainable.",
    outcome:
      "The concept uses a flexible points economy, personal milestones and simple mobile feedback to make movement feel cumulative, social and achievable.",
    heroImage: asset("images/case3-hero.jpg"),
    media: [asset("images/case3-ui-1.jpg"), asset("images/case3-ui-2.jpg"), asset("images/case3-ui-3.png"), asset("images/case3-ui-4.png"), asset("images/case3-ui-5.png")],
    mediaAlt: ["Fit Points product screen", "Fit Points mobile journey", "Fit Points interface detail", "Fit Points reward system", "Fit Points design system"],
    nextSlug: "case1",
  },
};

export type GalleryKey = "portfolio" | "motion" | "branding";

export const galleries: Record<GalleryKey, { eyebrow: string; title: string; description: string; images: string[]; labels: string[] }> = {
  portfolio: {
    eyebrow: "PROJECTS",
    title: "Visual Design / Digital Design",
    description: "A selection of visual identities, digital products, editorial systems and experimental image work.",
    images: Array.from({ length: 12 }, (_, index) => asset(`images/portfolio-${String(index + 1).padStart(2, "0")}.${[2, 3, 8].includes(index + 1) ? "gif" : "jpg"}`)),
    labels: ["Blend", "Digital Identity", "Campaign", "Editorial", "Culture", "Interaction", "Visual System", "Motion", "Experience", "Archive", "Type", "Experiment"],
  },
  motion: {
    eyebrow: "MOTION & MULTIMEDIA",
    title: "Moving Image / Digital Experiments",
    description: "A small archive of motion studies, art direction and multimedia experiments.",
    images: Array.from({ length: 12 }, (_, index) => asset(`images/motion-${String(index + 1).padStart(2, "0")}.jpg`)),
    labels: ["Motion Study", "Visual Loop", "Moving Type", "Product Film", "Campaign", "Experiment", "Sequence", "Editorial Motion", "Animation", "Multimedia", "Study", "Archive"],
  },
  branding: {
    eyebrow: "BRANDING",
    title: "Branding / Art Direction",
    description: "Identity systems and visual directions developed across culture, retail and digital experiences.",
    images: Array.from({ length: 12 }, (_, index) => asset(`images/branding-${String(index + 1).padStart(2, "0")}.${index === 9 ? "png" : "jpg"}`)),
    labels: ["Identity One", "Identity Two", "Identity Three", "Identity Four", "Identity Five", "Identity Six", "Identity Seven", "Identity Eight", "Identity Nine", "Identity Ten", "Identity Eleven", "Identity Twelve"],
  },
};

export type DetailProject = { slug: string; title: string; date: string; client: string };

export const detailProjects: DetailProject[] = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
].map((name, index) => ({
  slug: `project-name-${name}`,
  title: `Project Name ${name[0].toUpperCase()}${name.slice(1)}`,
  date: `${2020 + (index % 5)}`,
  client: "Independent project",
}));

export const detailProjectFor = (slug: string) => detailProjects.find((project) => project.slug === slug);

export const contact = {
  email: "hello@marcos-arruda.com",
  linkedin: "https://www.linkedin.com/in/marcos-arruda/",
  instagram: "https://www.instagram.com/marcosarruda/",
};
