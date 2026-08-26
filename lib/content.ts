export const profile = {
  name: "Neeraj Kumar",
  role: "Full Stack Developer, MERN",
  location: "Karachi, PK",
  email: "neeraj.dsu@gmail.com",
  github: "https://github.com/neeraj-kumarr",
  linkedin: "https://www.linkedin.com/in/neerajkumar20",
  mapsUrl: "https://maps.app.goo.gl/SDpDpJNBP9jzn9T68",
  resumeUrl: "/resume.pdf",
};

export const summary =
  "Full stack developer with proven experience building web applications and data platforms using React.js, Node.js and Express.js. Skilled in developing secure REST APIs, automated data pipelines, real-time dashboards and RBAC admin platforms. Adept at designing reusable components, integrating APIs, optimizing performance, and collaborating with clients and product teams to deliver impactful solutions.";

export const heroNote =
  "Two years deep in React, Node and Express at Pakistan Agriculture Research, building RBAC platforms, secure APIs and dashboards people actually rely on. This page is my running notebook, not a highlight reel.";

export type Project = {
  title: string;
  date: string;
  status: "Live" | "Shipped";
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Agri Data Dashboard",
    date: "Jun 2024 to Present",
    status: "Live",
    description:
      "Dynamic, role-aware data APIs and a revamped React landing page. Mixpanel and ApexCharts turn raw agricultural data into something people actually read. Organic traffic up 40%.",
    tags: ["Node.js", "MongoDB", "ApexCharts"],
  },
  {
    title: "PAR Admin Panel",
    date: "Jun 2024 to Present",
    status: "Live",
    description:
      "RBAC admin panel backed by secure Node/Express APIs. Python scrapers and node-cron replaced manual data entry outright. Team efficiency up 50%.",
    tags: ["Express.js", "Python", "RBAC"],
  },
  {
    title: "News Bulletin Automation",
    date: "Jan 2026 to Feb 2026",
    status: "Shipped",
    description:
      "Multi-source news pipeline that condenses articles 60 to 70% into publication-ready bulletins, delivered on schedule through Amazon SES.",
    tags: ["Node.js", "Amazon SES", "n8n"],
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
    tags: ["React / Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    icon: "brackets",
  },
  {
    title: "Backend & Databases",
    description: "Designing secure APIs and data layers that hold up under real traffic.",
    tags: ["Node.js", "Express.js", "MongoDB", "Redis"],
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
    tags: ["Git / GitHub", "GitHub Actions", "AWS / GCP"],
    icon: "gear",
  },
  {
    title: "AI-Assisted Development",
    description: "Pairing with AI tooling to move faster without cutting corners.",
    tags: ["Claude Code", "Copilot", "Cursor"],
    icon: "spark",
  },
];

export const roleHeader = {
  role: "Full Stack Developer",
  org: "Pakistan Agriculture Research",
  date: "Jun 2024 to Present · Karachi, PK",
  summary:
    "Owns the RBAC platform end to end: built a four-tier access system from scratch, layered in JWT auth with Redis-backed session control, and cut API response times by 40% along the way. Runs CI/CD through GitHub Actions and VPS deployment, with a Git review workflow that's cut deployment issues in half.",
};

export type TimelineItem = {
  title: string;
  date: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    title: "Agri Data Dashboard",
    date: "Jun 2024 to Present",
    description:
      "Backend APIs for dynamic, role-aware data queries, paired with a revamped landing page that lifted organic traffic by 40%. Mixpanel and ApexCharts turned raw agricultural data into something people actually read.",
  },
  {
    title: "PAR Admin Panel",
    date: "Jun 2024 to Present",
    description:
      "An RBAC admin panel that lifted team efficiency by 50%, backed by secure Node/Express APIs and Python scrapers that replaced manual data entry outright.",
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
