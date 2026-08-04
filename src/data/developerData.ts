export interface ProjectLog {
  id: string;
  title: string;
  path: string;
  category: "projects" | "conversations";
  parentName: string;
  timeLabel?: string;
  breadcrumbs: string[];
  compileLogs?: string[];
  compileTimeSec?: number;
}

export const DEVELOPER_PROFILE = {
  name: "Michael Burgers",
  handle: "burgersdev",
  age: 20,
  nationality: "South African",
  location: "Cape Town, South Africa",
  roles: ["Full-Stack Software Engineer", "Founder, Is It Studios", "AI Policy Contributor"],
  education: "3rd-Year BScIT Student Specializing in Software Engineering at Eduvos",
  credentials: "Top 15% Academic Tier (Golden Key Honour Society invitee) | Hollywoodbets & Hollywood Foundation Bursary Recipient",
  github: "PugLord06",
  githubUrl: "https://github.com/PugLord06",
  email: "michaelburgers06@gmail.com",
  studio: "Is It Studios (isitstudios.com)",
  flagship: "isitcheatingif.com",
  ecommerce: "lekkerfinds.co.za",
  portfolio: "burgersdev.xyz",
  portfolioUrl: "https://burgersdev.xyz"
};

export const PROJECT_LOGS: Record<string, ProjectLog> = {
  "cheating-engine": {
    id: "cheating-engine",
    title: "engine.ts",
    path: "src/engine/engine.ts",
    category: "projects",
    parentName: "isitcheatingif.com",
    timeLabel: "2026-05-12T14:30:00Z",
    breadcrumbs: ["src", "engine", "engine.ts"],
    compileLogs: [
      "Building procedural dilemma classifier...",
      "Integrating vote analytics engine...",
      "Compiled 14 scenario modules cleanly."
    ],
    compileTimeSec: 1.2
  },
  "cheating-hydration": {
    id: "cheating-hydration",
    title: "hydrationFix.tsx",
    path: "src/components/hydrationFix.tsx",
    category: "projects",
    parentName: "isitcheatingif.com",
    timeLabel: "2026-05-14T09:15:00Z",
    breadcrumbs: ["src", "components", "hydrationFix.tsx"],
    compileLogs: [
      "Resolving Next.js SSR hydration mismatches...",
      "Hydration state synchronized across server & client."
    ],
    compileTimeSec: 0.8
  },
  "cheating-adsense": {
    id: "cheating-adsense",
    title: "adsenseConfig.ts",
    path: "src/config/adsenseConfig.ts",
    category: "projects",
    parentName: "isitcheatingif.com",
    timeLabel: "2026-05-20T16:45:00Z",
    breadcrumbs: ["src", "config", "adsenseConfig.ts"],
    compileLogs: [
      "Optimizing ad placement layout constraints...",
      "AdSense compliance verification passed."
    ],
    compileTimeSec: 0.6
  },
  "cheating-discord": {
    id: "cheating-discord",
    title: "tftDiscordBot.py",
    path: "src/bots/tftDiscordBot.py",
    category: "projects",
    parentName: "isitcheatingif.com",
    timeLabel: "2026-04-10T11:00:00Z",
    breadcrumbs: ["src", "bots", "tftDiscordBot.py"],
    compileLogs: [
      "Connecting Riot Games API endpoints...",
      "Verified Riot Games developer API key compliance.",
      "TFT statistics calculation engine active."
    ],
    compileTimeSec: 0.9
  },
  "conv-typescript": {
    id: "conv-typescript",
    title: "Tech Stack & Architecture",
    path: "conversations/tech-stack",
    category: "conversations",
    parentName: "Conversations",
    timeLabel: "Active Stack",
    breadcrumbs: ["conversations", "tech-stack"]
  },
  "conv-gemini": {
    id: "conv-gemini",
    title: "AI & Prompt Engineering",
    path: "conversations/ai-integration",
    category: "conversations",
    parentName: "Conversations",
    timeLabel: "AI Module",
    breadcrumbs: ["conversations", "ai-integration"]
  },
  "conv-academic": {
    id: "conv-academic",
    title: "Academic & Policy Impact",
    path: "conversations/academic-credentials",
    category: "conversations",
    parentName: "Conversations",
    timeLabel: "Eduvos / DCDT",
    breadcrumbs: ["conversations", "academic-credentials"]
  }
};
