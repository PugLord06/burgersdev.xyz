import { Code2, Server, GraduationCap, Rocket, type LucideIcon } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  date: string;
  endDate?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  color: string;
  googleColorId?: string;
  tags?: string[];
}

// These are placeholder events. You can edit this file to add your actual past events,
// deployments, hackathons, and academic achievements.
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "evt-golden-key",
    date: "2024",
    title: "Accepted into Golden Key Society",
    description: "Invited to join the Golden Key International Honour Society, recognizing academic excellence within the top 15% tier at Eduvos.",
    icon: GraduationCap,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    tags: ["Academic", "Honours"]
  },
  {
    id: "evt-cheating-if",
    date: "Late 2024",
    title: "Deployed isitcheatingif.com",
    description: "Launched an AI-driven platform using Next.js and the Google Gemini API to analyze academic scenarios.",
    icon: Rocket,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    tags: ["Deployment", "AI"]
  },
  {
    id: "evt-burgerschat",
    date: "2023",
    title: "Built BurgersChat Architecture",
    description: "Developed a real-time messaging pipeline utilizing Socket.io, Node.js, and Redis for active room syncing.",
    icon: Server,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    tags: ["Backend", "Sockets"]
  },
  {
    id: "evt-eduvos-start",
    date: "2022",
    title: "Began Software Engineering at Eduvos",
    description: "Started the journey into formal software engineering, focusing on strict data modeling, algorithms, and full-stack pipelines.",
    icon: Code2,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    tags: ["Academic"]
  }
];
