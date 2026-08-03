import { Mail, MapPin, Award, Briefcase, FileCode, Printer, Download, ChevronRight } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/developerData';
import ResumeProjects from '../components/ResumeProjects';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ResumeView() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="resume-container" className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn print:bg-white print:text-black print:p-0 h-full overflow-y-auto custom-scrollbar pb-32">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-workspace-border pb-6 print:hidden gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <h1 className="text-2xl font-bold text-workspace-textActive tracking-tight">Developer_Profile.json</h1>
          </div>
          <p className="text-sm text-workspace-textSecondary flex items-center gap-1 font-mono">
            <ChevronRight className="w-4 h-4 text-workspace-accent" /> 
            <span>System.out.println("Welcome to my portfolio");</span>
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <a
            href="/Michael_Burgers_Resume.pdf"
            download="Michael_Burgers_Resume.pdf"
            className="px-4 py-2 bg-workspace-accent hover:bg-workspace-accentDark text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Resume (PDF)
          </a>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-workspace-chipBg hover:bg-workspace-chipHover border border-workspace-border text-workspace-textActive text-xs font-semibold rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Document
          </button>
        </div>
      </div>

      {/* Main Interactive Dashboard */}
      <div className="glass-panel rounded-2xl p-6 md:p-10 space-y-10 print:border-none print:bg-white print:p-0 relative overflow-hidden group">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-workspace-accent/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-workspace-accent/20 transition-colors duration-700"></div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 pb-8 border-b border-workspace-border relative z-10 print:border-black/10">
          <div className="space-y-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-workspace-accent to-purple-500 tracking-tight mb-2 print:text-black print:bg-none">
                {DEVELOPER_PROFILE.name}
              </h2>
              <div className="flex flex-wrap gap-2 text-sm font-semibold">
                {DEVELOPER_PROFILE.roles.map((role, idx) => (
                  <span key={idx} className="bg-workspace-accent/10 border border-workspace-accent/20 text-workspace-accent px-3 py-1 rounded-full print:border-black/10 print:text-blue-800">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <p className="max-w-xl text-sm text-workspace-textSecondary leading-relaxed">
              Passionate software engineer building viral applications and exploring the bleeding edge of AI integrations, full-stack React architectures, and game development.
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="bg-workspace-editor/50 border border-workspace-border p-5 rounded-xl text-sm text-workspace-textSecondary space-y-3 font-mono w-full lg:w-auto shadow-sm print:shadow-none hover:border-workspace-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-workspace-accent print:text-black" /> 
              <span className="hover:text-workspace-textActive transition-colors">{DEVELOPER_PROFILE.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-workspace-accent print:text-black" /> 
              <span className="hover:text-workspace-textActive transition-colors">{DEVELOPER_PROFILE.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <GithubIcon className="text-workspace-accent print:text-black" /> 
              <a href={DEVELOPER_PROFILE.githubUrl} target="_blank" rel="noreferrer" className="hover:text-workspace-textActive transition-colors underline decoration-workspace-border underline-offset-4">
                github.com/{DEVELOPER_PROFILE.github}
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Left Column (Projects & Experience) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-workspace-textActive print:text-black uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-workspace-accent" /> Key Projects
              </h3>
              
              <ResumeProjects />
            </div>
          </div>

          {/* Right Column (Skills & Academics) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Academic standing */}
            <div className="space-y-4 print:break-before-page">
              <h3 className="text-lg font-bold text-workspace-textActive print:text-black uppercase tracking-wider flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" /> Education
              </h3>
              <div className="bg-gradient-to-br from-workspace-editor/80 to-purple-900/10 hover:to-purple-900/20 border border-workspace-border hover:border-purple-500/30 p-5 rounded-xl print:border-black/10 print:bg-transparent space-y-3 transition-colors duration-300">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-workspace-textActive print:text-black">{DEVELOPER_PROFILE.education}</h4>
                  <p className="text-xs text-workspace-textSecondary print:text-black/80">Eduvos Cape Town Campus</p>
                  <p className="text-xs text-workspace-textSecondary print:text-black/80">Major: Software Engineering</p>
                </div>
                <div className="pt-2 border-t border-workspace-border/50">
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded inline-block mb-2">2024 - 2026</span>
                  <p className="text-xs text-workspace-textActive print:text-purple-800 font-medium flex items-start gap-2 leading-relaxed">
                    <span className="text-purple-400">🏆</span> {DEVELOPER_PROFILE.credentials}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-workspace-textActive print:text-black uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" /> Tech Stack
              </h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="p-4 bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-emerald-500/30 rounded-xl transition-colors duration-300 group/skill cursor-default">
                  <div className="font-bold text-workspace-textActive print:text-black mb-1 group-hover/skill:text-emerald-400 transition-colors">Languages</div>
                  <div className="text-workspace-textSecondary print:text-black/80 font-mono text-xs">Java, TypeScript, JavaScript, Python, PHP, Kotlin, SQL (MySQL, Postgres, Oracle PL/SQL), Bash, HTML5, CSS3/Sass, MATLAB, R</div>
                </div>
                <div className="p-4 bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-emerald-500/30 rounded-xl transition-colors duration-300 group/skill cursor-default">
                  <div className="font-bold text-workspace-textActive print:text-black mb-1 group-hover/skill:text-emerald-400 transition-colors">Frontend & Mobile</div>
                  <div className="text-workspace-textSecondary print:text-black/80 font-mono text-xs">React, Next.js, React Native (Mobile), TailwindCSS, Vite, Webpack</div>
                </div>
                <div className="p-4 bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-emerald-500/30 rounded-xl transition-colors duration-300 group/skill cursor-default">
                  <div className="font-bold text-workspace-textActive print:text-black mb-1 group-hover/skill:text-emerald-400 transition-colors">Backend & Security</div>
                  <div className="text-workspace-textSecondary print:text-black/80 font-mono text-xs">Spring Boot, Spring Security (JWT), Node.js, Express, FastAPI, REST APIs, WebSockets</div>
                </div>
                <div className="p-4 bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-emerald-500/30 rounded-xl transition-colors duration-300 group/skill cursor-default">
                  <div className="font-bold text-workspace-textActive print:text-black mb-1 group-hover/skill:text-emerald-400 transition-colors">Cloud & Infrastructure</div>
                  <div className="text-workspace-textSecondary print:text-black/80 font-mono text-xs">Google Cloud Platform (GCP - Expert), Oracle Cloud (OCI - VM Setup, Port Security, Network Routes), Domain & DNS Management (A, CNAME, TXT Records, SSL), Docker, Vercel, Render, Linux Admin</div>
                </div>
                <div className="p-4 bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-emerald-500/30 rounded-xl transition-colors duration-300 group/skill cursor-default">
                  <div className="font-bold text-workspace-textActive print:text-black mb-1 group-hover/skill:text-emerald-400 transition-colors">Databases & Storage</div>
                  <div className="text-workspace-textSecondary print:text-black/80 font-mono text-xs">MySQL, SQLite, MongoDB (NoSQL), Firebase</div>
                </div>
                <div className="p-4 bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-emerald-500/30 rounded-xl transition-colors duration-300 group/skill cursor-default">
                  <div className="font-bold text-workspace-textActive print:text-black mb-1 group-hover/skill:text-emerald-400 transition-colors">Engineering & Testing</div>
                  <div className="text-workspace-textSecondary print:text-black/80 font-mono text-xs">OOP, SOLID Principles, Data Structures & Algorithms, System Architecture, Git/GitHub, CI/CD, JUnit, Jest, Vitest, Postman</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
