import { 
  User, Terminal, Code2, Award, Rocket, Sparkles, Download, 
  Calendar, ShieldCheck, Flame, Globe2, FileText, Gamepad2, ShoppingBag 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEVELOPER_PROFILE } from '../data/developerData';

export default function AboutView() {
  return (
    <div id="about-me-container" className="p-6 max-w-4xl mx-auto space-y-10 animate-fadeIn pb-32">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-workspace-border bg-gradient-to-r from-blue-950/50 via-workspace-editor to-purple-950/50 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-workspace-accent/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-workspace-accent/10 border border-workspace-accent/30 text-xs font-semibold text-workspace-accent">
              <User className="w-3.5 h-3.5" /> ABOUT_ME.md — Official Story
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-400">
              <Globe2 className="w-3.5 h-3.5" /> 🇿🇦 Cape Town, South Africa
            </span>
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-workspace-textActive tracking-tight">
              {DEVELOPER_PROFILE.name}
            </h1>
            <p className="text-sm md:text-base font-semibold text-workspace-accent mt-1">
              20-Year-Old Software Engineer &bull; Founder of Is It Studios &bull; AI Policy Contributor
            </p>
          </div>

          <p className="text-workspace-textSecondary text-sm md:text-base leading-relaxed max-w-3xl">
            A third-year BScIT student specializing in Software Engineering at Eduvos, and a disciplined visionary dedicated to pushing the boundaries of digital innovation. From coding my first webpage at age 10 to shaping South Africa's National AI Policy and building web platforms, I am on a quest to elevate the standard of technological innovation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="/Michael_Burgers_Resume.pdf"
              download="Michael_Burgers_Resume.pdf"
              className="px-5 py-2.5 bg-workspace-accent hover:bg-workspace-accentDark text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-workspace-accent/20"
            >
              <Download className="w-4 h-4" /> Download Resume (PDF)
            </a>
            <Link
              to="/tasks"
              className="px-5 py-2.5 bg-workspace-sidebar hover:bg-workspace-chipHover border border-workspace-border text-workspace-textActive text-xs font-semibold rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-workspace-accent" /> Book a Session
            </Link>
          </div>
        </div>
      </div>

      {/* Origin Story & Timeline */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-workspace-textActive flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" /> The Journey &amp; Milestones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Milestone 1: Age 9 & 10 */}
          <div className="bg-workspace-sidebar/80 border border-workspace-border hover:border-blue-500/40 p-5 rounded-2xl space-y-3 transition-colors shadow-sm relative group">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 font-bold">Ages 9 &ndash; 10</span>
              <Code2 className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-sm font-bold text-workspace-textActive">The Initial Spark</h3>
            <p className="text-xs text-workspace-textMuted leading-relaxed">
              My journey into computing began at age 9. By age 10, I had crafted my first webpage. That initial spark evolved into a total dedication to technology.
            </p>
          </div>

          {/* Milestone 2: Age 14 */}
          <div className="bg-workspace-sidebar/80 border border-workspace-border hover:border-purple-500/40 p-5 rounded-2xl space-y-3 transition-colors shadow-sm relative group">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 font-bold">Age 14</span>
              <Terminal className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-workspace-textActive">Anarchy Gaming Management</h3>
            <p className="text-xs text-workspace-textMuted leading-relaxed">
              Managed online game servers and customer support for Anarchy Gaming, forging an unrelenting commitment to quality, uptime, and virtual platform systems management.
            </p>
          </div>

          {/* Milestone 3: Present */}
          <div className="bg-workspace-sidebar/80 border border-workspace-border hover:border-emerald-500/40 p-5 rounded-2xl space-y-3 transition-colors shadow-sm relative group">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">Present (Age 20)</span>
              <Rocket className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-workspace-textActive">Software Engineer &amp; Founder</h3>
            <p className="text-xs text-workspace-textMuted leading-relaxed">
              Architecting full-stack web platforms, scaling cloud infrastructure across Vercel, Oracle Cloud (OCI), Railway &amp; Render, and shaping national AI policy.
            </p>
          </div>
        </div>
      </div>

      {/* Featured National Policy Contribution Highlight */}
      <div className="bg-gradient-to-r from-purple-950/40 via-workspace-sidebar to-blue-950/40 border border-purple-500/30 rounded-2xl p-6 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <FileText className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-workspace-textActive">National AI Policy Governance Contribution</h3>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">DCDT South Africa</span>
            </div>

            <p className="text-xs text-workspace-textSecondary leading-relaxed">
              Directly contributed formal policy feedback to the Department of Communications and Digital Technologies on the <strong>Draft South Africa National Artificial Intelligence Policy</strong> to help establish governance, ethical framework, and technological standards for AI across South Africa.
            </p>
          </div>
        </div>
      </div>

      {/* Ventures & Published Works */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-workspace-textActive flex items-center gap-2">
          <Rocket className="w-5 h-5 text-workspace-accent" /> Creator &amp; Entrepreneur Ventures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Venture 1: Is It Studios & isitcheatingif.com */}
          <div className="p-5 bg-workspace-sidebar border border-workspace-border hover:border-workspace-accent/40 rounded-2xl space-y-3 transition-colors">
            <div className="flex justify-between items-center text-workspace-accent">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-[10px] font-mono bg-workspace-accent/10 px-2 py-0.5 rounded">Is It Studios</span>
            </div>
            <h4 className="text-sm font-bold text-workspace-textActive">isitcheatingif.com</h4>
            <p className="text-xs text-workspace-textMuted leading-relaxed">
              Founded independent studio Is It Studios and published flagship viral procedural debate platform serving <strong>500+ monthly active users</strong>.
            </p>
          </div>

          {/* Venture 2: Riot Games Approved Discord Bot */}
          <div className="p-5 bg-workspace-sidebar border border-workspace-border hover:border-workspace-accent/40 rounded-2xl space-y-3 transition-colors">
            <div className="flex justify-between items-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">Riot Approved</span>
            </div>
            <h4 className="text-sm font-bold text-workspace-textActive">TFT Discord Stats Tracker</h4>
            <p className="text-xs text-workspace-textMuted leading-relaxed">
              Engineered a Riot Games-approved Discord statistics tracker for Teamfight Tactics (TFT) calculating real-time match analytics and leaderboard ranks.
            </p>
          </div>

          {/* Venture 3: LekkerFinds */}
          <div className="p-5 bg-workspace-sidebar border border-workspace-border hover:border-workspace-accent/40 rounded-2xl space-y-3 transition-colors">
            <div className="flex justify-between items-center text-purple-400">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">E-Commerce</span>
            </div>
            <h4 className="text-sm font-bold text-workspace-textActive">
              Lekker<span className="text-[#5B21B6] font-extrabold">Finds</span>.co.za
            </h4>
            <p className="text-xs text-workspace-textMuted leading-relaxed">
              Edited Shopify templates using Liquid language and configured custom domain DNS setup for <strong>lekkerfinds.co.za</strong>.
            </p>
          </div>

        </div>
      </div>

      {/* Academic Honors & Bursary */}
      <div className="bg-workspace-sidebar border border-workspace-border rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-workspace-textActive flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" /> Academic Recognition &amp; Bursary Awards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-workspace-editor/50 border border-workspace-border rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🏆</span>
              <h4 className="text-xs font-bold text-workspace-textActive">Hollywoodbets Bursary Recipient</h4>
            </div>
            <p className="text-xs text-workspace-textMuted leading-relaxed">
              Proud recipient of the prestigious <strong>Hollywoodbets and Hollywood Foundation bursary</strong> in recognition of academic distinction and leadership drive.
            </p>
          </div>

          <div className="p-4 bg-workspace-editor/50 border border-workspace-border rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">⭐</span>
              <h4 className="text-xs font-bold text-workspace-textActive">Top 15% Academic Tier &amp; YES Summit</h4>
            </div>
            <p className="text-xs text-workspace-textMuted leading-relaxed">
              Maintained top 15% academic standing at Eduvos, invited into the Golden Key International Honour Society, and attended global youth leadership events like the <strong>YES Summit</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Full Story Paragraph Block */}
      <div className="bg-workspace-editor/40 border border-workspace-border rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-workspace-textActive flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-workspace-accent" /> Official Biography
        </h3>

        <div className="text-xs text-workspace-textSecondary leading-relaxed space-y-3 font-sans">
          <p>
            I am a 20-year-old South African software engineer, a third-year BScIT student specializing in Software Engineering at Eduvos, and a disciplined visionary dedicated to pushing the boundaries of digital innovation. My journey into computing began at age 9, and by 10, I had crafted my first webpage. That initial spark evolved into a total dedication to technology. By 14, I was managing online game servers and customer service for Anarchy Gaming, an experience that forged an unrelenting commitment to quality and systems management on virtual platforms.
          </p>
          <p>
            Today, my technical foundation is built on modern full-stack development, specializing in React, Next.js, and TypeScript, backed by deep proficiency in JavaScript, Java, Python, NodeJS, and MySQL. I routinely architect codebases, manage Git repositories, and deploy scalable cloud infrastructure across platforms like Vercel, Oracle Cloud, Railway, and Render.
          </p>
          <p>
            As the tech landscape evolves, so do my capabilities. I am deeply invested in AI and prompt engineering, actively leveraging advanced artificial intelligence to architect smarter applications, streamline complex development workflows, and design next-generation solutions. This technical focus on AI parallels my commitment to industry governance; I recently submitted formal policy feedback to the Department of Communications and Digital Technologies on the Draft South Africa National Artificial Intelligence Policy to help shape the future of tech in our country.
          </p>
          <p>
            I am not just a developer—I am an entrepreneur and creator. I founded the independent game studio Is It Studios, publishing our flagship web-based multiplayer platform, isitcheatingif.com. My portfolio also includes engineering a Riot Games-approved Discord statistics tracker for Teamfight Tactics and managing Shopify stores using Liquid templates and custom domain integrations like lekkerfinds.co.za.
          </p>
          <p>
            Recognized for my academic drive, I rank in the top 15% of my university cohort and am proud to be a Hollywoodbets and Hollywood Foundation bursary recipient. From attending global events like the YES Summit to building full-stack platforms from the ground up, I am on a quest to make a distinctive impact in the software engineering space. I invite collaboration and exploration—let's collectively elevate the standard of technological innovation.
          </p>
        </div>
      </div>

    </div>
  );
}
