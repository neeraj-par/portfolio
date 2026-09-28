export const profile = {
  name: "Neeraj Kumar",
  role: "Full Stack Developer, MERN",
  location: "Karachi, PK",
  email: "neeraj.dsu@gmail.com",
  github: "https://github.com/neeraj-kumarr",
  linkedin: "https://www.linkedin.com/in/neerajkumar20",
  mapsUrl: "https://maps.app.goo.gl/SDpDpJNBP9jzn9T68",
  resumeUrl: "/resume.pdf",
  // Name the browser saves the resume under, independent of the file in public/.
  resumeFileName: "Neeraj_Kumar_Resume.pdf",
};

// Public site URL for metadata. Vercel injects the production host; NEXT_PUBLIC_SITE_URL overrides it for a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Start of the role, used to compute years of experience so the hero never goes stale.
const CAREER_START = new Date(2024, 5, 1);

// Whole years of experience since CAREER_START.
export const experienceYears = (now: Date = new Date()) => {
  const months = (now.getFullYear() - CAREER_START.getFullYear()) * 12 + now.getMonth() - CAREER_START.getMonth();
  return Math.max(0, Math.floor(months / 12));
};

export const summary =
  "Full stack developer with proven experience building web applications and data platforms using React.js, Node.js and Express.js. Skilled in developing secure REST APIs, automated data pipelines, real-time portalsand RBAC admin platforms. Adept at designing reusable components, integrating APIs, optimizing performance, and collaborating with clients and product teams to deliver impactful solutions.";

export const heroNote =
  "Over two years deep in React, Node and Express at Pakistan Agriculture Research, building RBAC platforms, secure APIs and portalspeople actually rely on. This page is my running notebook, not a highlight reel.";

export type Project = {
  title: string;
  date: string;
  status: "Live" | "Internal";
  description: string;
  points: string[];
  tags: string[];
  liveUrl?: string;
  videoId?: string;
  // Internal tools have private code and data, so the modal explains that and offers a walkthrough instead of a link.
  internal?: boolean;
  flow?: { caption: string; steps: string[] };
};

export const projects: Project[] = [
  {
    title: "Agri Data Portal",
    date: "Jun 2024 to Present",
    status: "Live",
    description:
      "Dynamic, role-aware data APIs and a revamped React landing page. Mixpanel and ApexCharts turn raw agricultural data into something people actually read. Organic traffic up 40%.",
    points: [
      "Built backend APIs for dynamic filtering of data queries and role-based content, using Node.js and MongoDB.",
      "Revamped the landing page with a modern React UI, increasing organic traffic by 40%.",
      "Integrated Mixpanel for behavioural analytics and ApexCharts for real-time market data visualisations.",
    ],
    tags: ["Node.js", "MongoDB", "ApexCharts", "Mixpanel"],
    liveUrl: "https://par.com.pk",
    videoId: "zIICfTfNGG0",
  },
  {
    title: "Admin Portal",
    date: "Jun 2025 to Present",
    status: "Internal",
    description:
      "RBAC admin portal backed by secure Node/Express APIs. Python scrapers and node-cron replaced manual data entry outright. Team efficiency up 50%.",
    points: [
      "Built an RBAC admin portal to manage data and operations, improving team efficiency by 50%.",
      "Designed and integrated secure APIs for data management using MongoDB and Node.js/Express.js.",
      "Automated data collection with Python scrapers and node-cron, removing manual entry.",
    ],
    tags: ["Express.js", "Python", "RBAC"],
    internal: true,
    flow: {
      caption: "Four role levels control data access across the platform",
      steps: ["user", "admin", "super_admin", "administrator"],
    },
  },
  {
    title: "News Bulletin Automation",
    date: "Jan 2026 to Feb 2026",
    status: "Internal",
    description:
      "Multi-source news pipeline that condenses articles 60 to 70% into publication-ready bulletins, delivered on schedule through Amazon SES.",
    points: [
      "Built an automated pipeline that collects articles from multiple sources and summarises the key facts.",
      "Condensed content by 60 to 70% into publication-ready bulletins with consistent formatting and metadata.",
      "Integrated Amazon SES for scheduled, automated delivery while keeping editorial accuracy.",
    ],
    tags: ["Node.js", "Amazon SES", "n8n"],
    internal: true,
    flow: {
      caption: "How a bulletin gets made",
      steps: ["Multiple news sources", "Key facts summarised", "Formatted with metadata", "Amazon SES, scheduled"],
    },
  },
];

export type ToolCategory = {
  title: string;
  description: string;
  tags: string[];
  icon: "brackets" | "database" | "shield" | "gear" | "spark";
};

export const toolkit: ToolCategory[] = [
  {
    title: "Frontend Development",
    description: "Building responsive, accessible interfaces with modern component-driven frameworks.",
    tags: [
      "JavaScript",
      "TypeScript",
      "React / Next.js",
      "Redux",
      "Context API",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "MUI",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    icon: "brackets",
  },
  {
    title: "Backend & Databases",
    description: "Designing secure APIs and data layers that hold up under real traffic.",
    tags: ["Node.js", "Express.js", "RESTful APIs", "MongoDB", "MySQL", "Redis"],
    icon: "database",
  },
  {
    title: "Testing & Quality",
    description: "Keeping code predictable with linting, formatting and test coverage.",
    tags: ["Jest", "ESLint", "Prettier"],
    icon: "shield",
  },
  {
    title: "Tools & DevOps",
    description: "Shipping through Git workflows, CI/CD pipelines and cloud deployments.",
    tags: ["Git / GitHub", "Postman", "GitHub Actions", "VPS Deployment", "AWS / GCP"],
    icon: "gear",
  },
  {
    title: "AI-Assisted Development",
    description: "Pairing with AI tooling to move faster without cutting corners.",
    tags: ["Claude Code", "Codex", "Copilot", "ChatGPT", "Cursor", "Windsurf"],
    icon: "spark",
  },
];

export const roleHeader = {
  role: "Full Stack Developer (MERN)",
  org: "Pakistan Agriculture Research",
  date: "Jun 2024 to Present · Karachi, PK",
  summary:
    "Owns the RBAC platform end to end: built a four-tier access system from scratch (user, admin, super_admin, administrator), layered in JWT auth with httpOnly cookies and Redis-backed session invalidation, and cut API response times by 40% along the way. Runs CI/CD through GitHub Actions and VPS deployment, with a Git review workflow that's cut deployment issues in half.",
  highlights: [
    "Turned Figma designs into responsive, accessible React UIs, cutting development time by 30%.",
    "Runs product demos, gathers requirements and works with product and design teams.",
  ],
  softSkills: "Client communication · Problem solving · Teamwork · Requirement gathering",
};

export type TimelineItem = {
  title: string;
  date: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    title: "Agri Data Portal",
    date: "Jun 2024 to Present",
    description:
      "Backend APIs for dynamic, role-aware data queries, paired with a revamped landing page that lifted organic traffic by 40%. Mixpanel and ApexCharts turned raw agricultural data into something people actually read.",
  },
  {
    title: "Admin Portal",
    date: "Jun 2025 to Present",
    description:
      "An RBAC admin portal that lifted team efficiency by 50%, backed by secure Node/Express APIs and Python scrapers that replaced manual data entry outright.",
  },
  {
    title: "News Bulletin Automation",
    date: "Jan 2026 to Feb 2026",
    description:
      "A pipeline that pulls from multiple sources, condenses it 60 to 70% into publication-ready bulletins, and ships them out on schedule through Amazon SES.",
  },
];

export const education = {
  school: "DHA Suffa University, Karachi",
  degree: "B.S. Computer Science",
  date: "Sep 2019 to Feb 2024",
  note: "Foundation in data structures, algorithms and full stack web development.",
};
