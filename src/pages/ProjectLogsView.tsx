import { useState } from 'react';
import type { ProjectLog } from '../data/developerData';
import { Copy, Check, FileCode, ChevronRight, ChevronDown } from 'lucide-react';
import GameDemoView from './GameDemoView';
import { GET_LOG_DETAILS } from '../data/logDetails';

interface ProjectLogsViewProps {
  log: ProjectLog;
}

export default function ProjectLogsView({ log }: ProjectLogsViewProps) {
  const [copied, setCopied] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);

  if (log.id === 'cheating-engine') {
    return <GameDemoView />;
  }

  const details = GET_LOG_DETAILS[log.id] || {
    userMsg: "Review this component.",
    assistantMsg: "Here is the code setup:",
    fileLabel: "app.ts",
    codeTitle: "Source Code",
    language: "typescript",
    code: "// No code available for this log yet."
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(details.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="project-logs-container" className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 animate-fadeIn pb-32">
      <div className="flex items-center gap-3 border-b border-workspace-border pb-4">
        <div className="w-10 h-10 rounded-lg bg-workspace-accent/20 flex items-center justify-center border border-workspace-accent/30 shrink-0">
          <FileCode className="w-5 h-5 text-workspace-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{log.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-workspace-accent/10 text-workspace-accent border border-workspace-accent/20">
              {log.category === 'projects' ? 'Project' : 'Conversation'}
            </span>
            <span className="text-xs text-workspace-textMuted font-mono">{log.timeLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.3)]">
          <span className="text-white text-xs font-bold">U</span>
        </div>
        <div className="bg-workspace-sidebar border border-workspace-border rounded-2xl rounded-tl-none p-4 text-sm text-workspace-textSecondary shadow-sm">
          {details.userMsg}
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4">
        <div className="w-8 h-8 rounded-full bg-workspace-bg border border-workspace-border flex items-center justify-center shrink-0">
          <span className="text-workspace-textMuted text-xs font-bold">AI</span>
        </div>
        <div className="flex-1 space-y-4">
          <div className="bg-[#1e1e1e] border border-workspace-border rounded-2xl rounded-tr-none p-4 text-sm text-workspace-textSecondary shadow-sm">
            {details.assistantMsg}
          </div>

          <div className="bg-[#1e1e1e] border border-workspace-border rounded-xl overflow-hidden shadow-lg group">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-workspace-border">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-workspace-accent" />
                <span className="text-xs font-mono text-workspace-textSecondary font-bold">{details.fileLabel}</span>
                <span className="text-[10px] text-workspace-textMuted ml-2 hidden sm:inline-block">- {details.codeTitle}</span>
              </div>
              <button 
                onClick={handleCopy}
                className="p-1.5 hover:bg-workspace-chipHover rounded-md transition-colors text-workspace-textMuted hover:text-white"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            
            <div className="p-4 overflow-x-auto custom-scrollbar">
              <pre className="text-sm font-mono text-[#d4d4d4] leading-relaxed">
                <code>{details.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-workspace-border rounded-xl bg-workspace-sidebar overflow-hidden">
        <div 
          onClick={() => setExplorerOpen(!explorerOpen)}
          className="flex items-center gap-2 px-4 py-3 bg-black/20 hover:bg-black/30 cursor-pointer transition-colors border-b border-workspace-border"
        >
          {explorerOpen ? <ChevronDown className="w-4 h-4 text-workspace-textMuted" /> : <ChevronRight className="w-4 h-4 text-workspace-textMuted" />}
          <span className="text-xs font-bold text-white uppercase tracking-wider">Related Repository Context</span>
        </div>
        
        {explorerOpen && (
          <div className="p-4 flex gap-6">
            <div className="flex-1">
              <h4 className="text-xs font-bold text-workspace-textSecondary mb-2">Recent Commits</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs">
                  <span className="text-emerald-400 font-mono mt-0.5">8f3a2c</span>
                  <span className="text-workspace-textMuted">Implemented {details.fileLabel} architecture</span>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <span className="text-emerald-400 font-mono mt-0.5">2d9e11</span>
                  <span className="text-workspace-textMuted">Resolved dependency conflicts for production</span>
                </li>
              </ul>
            </div>
            
            <div className="hidden sm:block w-px bg-workspace-border"></div>
            
            <div className="flex-1 hidden sm:block">
              <h4 className="text-xs font-bold text-workspace-textSecondary mb-2">Build Status</h4>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-workspace-textMuted">Production Sync Active</span>
              </div>
              <p className="text-[10px] text-workspace-textMuted mt-2 leading-relaxed">
                All components pass automated vitest checks. Ready for deployment pipeline integration.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
