import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiRedis,
  SiJest,
  SiEslint,
  SiPrettier,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiPython,
  SiN8N,
  SiClaude,
  SiGithubcopilot,
  SiCursor,
  SiJavascript,
  SiRedux,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiMui,
  SiMysql,
  SiPostman,
  SiWindsurf,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";
import { HiOutlineChartBar } from "react-icons/hi2";

type Entry = { match: RegExp; Icon: IconType; color: string; url: string };

// order matters: more specific patterns must come before broader ones
// (e.g. "GitHub Actions" before the generic "GitHub" match)
const ENTRIES: Entry[] = [
  { match: /next\.js|react/i, Icon: SiNextdotjs, color: "#4a4642", url: "https://nextjs.org" },
  {
    match: /javascript/i,
    Icon: SiJavascript,
    color: "#B8A200",
    url: "https://developer.mozilla.org/docs/Web/JavaScript",
  },
  { match: /typescript/i, Icon: SiTypescript, color: "#3178C6", url: "https://www.typescriptlang.org" },
  { match: /redux/i, Icon: SiRedux, color: "#764ABC", url: "https://redux.js.org" },
  { match: /html/i, Icon: SiHtml5, color: "#E34F26", url: "https://developer.mozilla.org/docs/Web/HTML" },
  { match: /tailwind/i, Icon: SiTailwindcss, color: "#06B6D4", url: "https://tailwindcss.com" },
  { match: /css/i, Icon: SiCss, color: "#1572B6", url: "https://developer.mozilla.org/docs/Web/CSS" },
  { match: /bootstrap/i, Icon: SiBootstrap, color: "#7952B3", url: "https://getbootstrap.com" },
  { match: /^mui$/i, Icon: SiMui, color: "#007FFF", url: "https://mui.com" },
  { match: /shadcn/i, Icon: SiShadcnui, color: "#4a4642", url: "https://ui.shadcn.com" },
  { match: /node\.?js/i, Icon: SiNodedotjs, color: "#339933", url: "https://nodejs.org" },
  { match: /express/i, Icon: SiExpress, color: "#4a4642", url: "https://expressjs.com" },
  { match: /mongo/i, Icon: SiMongodb, color: "#47A248", url: "https://www.mongodb.com" },
  { match: /mysql/i, Icon: SiMysql, color: "#4479A1", url: "https://www.mysql.com" },
  { match: /redis/i, Icon: SiRedis, color: "#DC382D", url: "https://redis.io" },
  { match: /jest/i, Icon: SiJest, color: "#C21325", url: "https://jestjs.io" },
  { match: /eslint/i, Icon: SiEslint, color: "#4B32C3", url: "https://eslint.org" },
  { match: /prettier/i, Icon: SiPrettier, color: "#F7B93E", url: "https://prettier.io" },
  {
    match: /actions/i,
    Icon: SiGithubactions,
    color: "#2088FF",
    url: "https://github.com/features/actions",
  },
  { match: /postman/i, Icon: SiPostman, color: "#FF6C37", url: "https://www.postman.com" },
  { match: /git|github/i, Icon: SiGithub, color: "#4a4642", url: "https://github.com" },
  { match: /aws|ses/i, Icon: FaAws, color: "#FF9900", url: "https://aws.amazon.com" },
  { match: /gcp|google cloud/i, Icon: SiGooglecloud, color: "#4285F4", url: "https://cloud.google.com" },
  { match: /python/i, Icon: SiPython, color: "#3776AB", url: "https://www.python.org" },
  { match: /n8n/i, Icon: SiN8N, color: "#EA4B71", url: "https://n8n.io" },
  { match: /apexcharts/i, Icon: HiOutlineChartBar, color: "#008FFB", url: "https://apexcharts.com" },
  { match: /claude/i, Icon: SiClaude, color: "#D97757", url: "https://claude.com/claude-code" },
  {
    match: /copilot/i,
    Icon: SiGithubcopilot,
    color: "#4a4642",
    url: "https://github.com/features/copilot",
  },
  { match: /codex|chatgpt/i, Icon: RiOpenaiFill, color: "#4a4642", url: "https://openai.com" },
  { match: /windsurf/i, Icon: SiWindsurf, color: "#0B6E6E", url: "https://windsurf.com" },
  { match: /cursor/i, Icon: SiCursor, color: "#4a4642", url: "https://cursor.com" },
];

// Tag chip with a brand icon and link when the tag matches a known tool.
const TechChip = ({ tag }: { tag: string }) => {
  const entry = ENTRIES.find((e) => e.match.test(tag));

  const inner = (
    <>
      {entry ? <entry.Icon style={{ color: entry.color }} className="h-3 w-3 shrink-0" /> : <span className="dot" />}
      {tag}
    </>
  );

  if (!entry) {
    return <span className="tag-chip">{inner}</span>;
  }

  return (
    <a href={entry.url} target="_blank" rel="noopener noreferrer" className="tag-chip">
      {inner}
    </a>
  );
};

export default TechChip;
