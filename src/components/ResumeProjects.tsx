export default function ResumeProjects() {
  return (
    <div className="space-y-4">
      {/* Project 1 */}
      <div className="group/card bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-workspace-accent/50 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-workspace-accent/5 cursor-pointer">
        <div className="space-y-2">
          <div className="flex justify-between items-start text-sm font-bold text-workspace-textActive print:text-black">
            <span className="text-workspace-accent print:text-blue-800 text-lg">isitcheatingif.com <span className="text-workspace-textMuted text-sm font-normal ml-2">(Flagship Platform)</span></span>
            <span className="font-mono text-workspace-textMuted text-[11px] bg-workspace-chipBg px-2 py-1 rounded">May 2026</span>
          </div>
          <p className="text-sm text-workspace-textSecondary print:text-black/85 leading-relaxed">
            Designed and scaled a viral, procedural debate platform exploring interpersonal boundary ethics for <strong>500+ monthly active users</strong>.
          </p>
          <ul className="list-disc pl-5 text-xs text-workspace-textMuted print:text-black/70 space-y-1 mt-2">
            <li className="group-hover/card:text-workspace-textSecondary transition-colors">Implemented custom scenario evaluation logic and typewriter reveal animations.</li>
            <li className="group-hover/card:text-workspace-textSecondary transition-colors">Mitigated Hydration state mismatch conflicts in server-rendered templates.</li>
          </ul>
        </div>
      </div>

      {/* Project 2: Java & Spring Boot */}
      <div className="group/card bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-workspace-accent/50 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-workspace-accent/5 cursor-pointer">
        <div className="space-y-2">
          <div className="flex justify-between items-start text-sm font-bold text-workspace-textActive print:text-black">
            <span className="text-workspace-accent print:text-blue-800 text-lg">Java & Spring Boot Web Suite <span className="text-workspace-textMuted text-sm font-normal ml-2">(Enterprise Web App)</span></span>
            <span className="font-mono text-workspace-textMuted text-[11px] bg-workspace-chipBg px-2 py-1 rounded">2025 - 2026</span>
          </div>
          <p className="text-sm text-workspace-textSecondary print:text-black/85 leading-relaxed">
            Architected full-stack enterprise Java web applications using Spring Boot, Spring Security, and relational SQL databases.
          </p>
          <ul className="list-disc pl-5 text-xs text-workspace-textMuted print:text-black/70 space-y-1 mt-2">
            <li className="group-hover/card:text-workspace-textSecondary transition-colors">Implemented stateless JWT (JSON Web Token) authentication and role-based access control (RBAC).</li>
            <li className="group-hover/card:text-workspace-textSecondary transition-colors">Designed RESTful API endpoints with Dependency Injection, DTO layers, and Spring Data JPA.</li>
          </ul>
        </div>
      </div>

      {/* Project 3 */}
      <div className="group/card bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-workspace-accent/50 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-workspace-accent/5 cursor-pointer">
        <div className="space-y-2">
          <div className="flex justify-between items-start text-sm font-bold text-workspace-textActive print:text-black">
            <span className="text-workspace-accent print:text-blue-800 text-lg">isitstudios.com <span className="text-workspace-textMuted text-sm font-normal ml-2">(Indie Studio Portal)</span></span>
            <span className="font-mono text-workspace-textMuted text-[11px] bg-workspace-chipBg px-2 py-1 rounded">June 2026</span>
          </div>
          <p className="text-sm text-workspace-textSecondary print:text-black/85 leading-relaxed">
            An overarching portfolio hub representing collaborative indie game project modules. Builds asset pipelines and packages cross-compiled canvas templates.
          </p>
        </div>
      </div>

      {/* Project 4 */}
      <div className="group/card bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-workspace-accent/50 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-workspace-accent/5 cursor-pointer">
        <div className="space-y-2">
          <div className="flex justify-between items-start text-sm font-bold text-workspace-textActive print:text-black">
            <span className="text-workspace-accent print:text-blue-800 text-lg">burgerschat <span className="text-workspace-textMuted text-sm font-normal ml-2">(AI Assistant API)</span></span>
            <span className="font-mono text-workspace-textMuted text-[11px] bg-workspace-chipBg px-2 py-1 rounded">March 2026</span>
          </div>
          <p className="text-sm text-workspace-textSecondary print:text-black/85 leading-relaxed">
            Developed burgerschat, an interactive AI assistant service powered by Python and FastAPI to answer candidate portfolio and tech stack queries.
          </p>
        </div>
      </div>

      {/* Project 5 */}
      <div className="group/card bg-workspace-editor/30 hover:bg-workspace-editor/80 border border-workspace-border hover:border-workspace-accent/50 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-workspace-accent/5 cursor-pointer">
        <div className="space-y-2">
          <div className="flex justify-between items-start text-sm font-bold text-workspace-textActive print:text-black">
            <span className="text-workspace-accent print:text-blue-800 text-lg">burgersdev.xyz <span className="text-workspace-textMuted text-sm font-normal ml-2">(Interactive Portfolio)</span></span>
            <span className="font-mono text-workspace-textMuted text-[11px] bg-workspace-chipBg px-2 py-1 rounded">August 2026</span>
          </div>
          <p className="text-sm text-workspace-textSecondary print:text-black/85 leading-relaxed">
            Engineered a high-performance, interactive developer portfolio showcasing full-stack capabilities, modern UI/UX practices, and web design.
          </p>
          <ul className="list-disc pl-5 text-xs text-workspace-textMuted print:text-black/70 space-y-1 mt-2">
            <li className="group-hover/card:text-workspace-textSecondary transition-colors">Integrated a real-time AI Assistant chat powered by a custom Python FastAPI & Google Gemini RAG backend using Server-Sent Events (SSE).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
