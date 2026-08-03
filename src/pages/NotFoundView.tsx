import { AlertTriangle, Home, FileText, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFoundView() {
  const location = useLocation();

  return (
    <div id="not-found-container" className="p-6 max-w-3xl mx-auto space-y-6 animate-fadeIn pb-32">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-workspace-border pb-4">
        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-workspace-textActive tracking-tight font-mono">
            404: FILE_NOT_FOUND.md
          </h1>
          <p className="text-xs text-workspace-textSecondary mt-0.5">
            The path <code className="text-red-400 bg-red-950/30 px-1.5 py-0.5 rounded font-mono">{location.pathname}</code> could not be resolved.
          </p>
        </div>
      </div>

      {/* Terminal Diagnostic Box */}
      <div className="bg-[#0e0e16] border border-workspace-border rounded-xl p-5 font-mono text-xs space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-workspace-textMuted border-b border-workspace-border/60 pb-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span>Diagnostic Log — Workspace Router</span>
        </div>

        <div className="space-y-1.5 leading-relaxed">
          <div className="text-red-400">[ERROR 404] Target path unresolved: {location.pathname}</div>
          <div className="text-workspace-textMuted">[TRACE] Checked /src/pages, /src/data, /src/components</div>
          <div className="text-workspace-textMuted">[STATUS] 0 matching routes found in HashRouter registry</div>
          <div className="text-amber-400 font-semibold">[SUGGESTION] Select a valid workspace file from the sidebar</div>
        </div>
      </div>

      {/* Quick Navigation Action Cards */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-workspace-textActive uppercase tracking-wider">
          Suggested Navigation Targets
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/settings"
            className="p-4 bg-workspace-sidebar border border-workspace-border hover:border-workspace-accent rounded-xl text-left transition-all group flex flex-col justify-between gap-3"
          >
            <Home className="w-5 h-5 text-workspace-accent group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-workspace-textActive">Workspace Home</div>
              <div className="text-[10px] text-workspace-textMuted mt-0.5">Return to IDE root</div>
            </div>
          </Link>

          <Link
            to="/resume"
            className="p-4 bg-workspace-sidebar border border-workspace-border hover:border-workspace-accent rounded-xl text-left transition-all group flex flex-col justify-between gap-3"
          >
            <FileText className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-workspace-textActive">Developer Resume</div>
              <div className="text-[10px] text-workspace-textMuted mt-0.5">View Developer_Profile.json</div>
            </div>
          </Link>

          <Link
            to="/tasks"
            className="p-4 bg-workspace-sidebar border border-workspace-border hover:border-workspace-accent rounded-xl text-left transition-all group flex flex-col justify-between gap-3"
          >
            <Calendar className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-workspace-textActive">Book a Session</div>
              <div className="text-[10px] text-workspace-textMuted mt-0.5">Cal.com calendar sync</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
