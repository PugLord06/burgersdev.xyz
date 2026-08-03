import { Link } from 'react-router-dom';
import { 
  Plus, MessageSquare, Calendar, ChevronDown, ChevronRight, 
  Folder, FolderOpen, Settings, Bot, User, Zap 
} from 'lucide-react';
import { PROJECT_LOGS } from '../data/developerData';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  activeLogId: string;
  onNewConversation: () => void;
  openFolders: Record<string, boolean>;
  onToggleFolder: (folder: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  activeLogId,
  onNewConversation,
  openFolders,
  onToggleFolder,
  isMobileOpen = false,
  onCloseMobile
}: SidebarProps) {
  
  const isitcheatingLogs = [
    PROJECT_LOGS["cheating-engine"],
    PROJECT_LOGS["cheating-hydration"],
    PROJECT_LOGS["cheating-adsense"],
    PROJECT_LOGS["cheating-discord"]
  ];

  const conversationItems = [
    PROJECT_LOGS["conv-typescript"],
    PROJECT_LOGS["conv-gemini"],
    PROJECT_LOGS["conv-academic"]
  ];

  return (
    <>
      {isMobileOpen && (
        <div 
          id="sidebar-mobile-backdrop"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside 
        id="sidebar-navigation" 
        className={`fixed md:relative z-40 inset-y-0 left-0 w-72 bg-workspace-sidebar border-r border-workspace-border flex flex-col justify-between select-none shrink-0 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          <button
            onClick={onNewConversation}
            className="w-full py-2 px-3 bg-workspace-pillBg hover:bg-workspace-chipHover border border-workspace-border rounded-lg text-workspace-textActive text-xs font-semibold flex items-center justify-between transition-all group"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-3.5 h-3.5 text-workspace-accent group-hover:rotate-90 transition-transform duration-200" />
              <span>New Conversation</span>
            </span>
            <span className="text-[10px] text-workspace-textMuted font-mono border border-workspace-border/50 px-1.5 py-0.5 rounded">Ctrl N</span>
          </button>

          <div className="space-y-1">
            <Link 
              to="/about"
              onClick={onCloseMobile}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeLogId === 'about' ? 'text-workspace-textActive bg-workspace-chipHover border border-workspace-border' : 'text-workspace-textSecondary hover:text-workspace-textActive hover:bg-workspace-chipBg/50'
              }`}
            >
              <User className={`w-4 h-4 ${activeLogId === 'about' ? 'text-workspace-accent' : 'text-workspace-textMuted'}`} />
              <span>ABOUT_ME.md</span>
            </Link>
            <Link 
              to="/ai-chat"
              onClick={onCloseMobile}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeLogId === 'ai-chat' ? 'text-workspace-textActive bg-workspace-chipHover border border-workspace-border' : 'text-workspace-textSecondary hover:text-workspace-textActive hover:bg-workspace-chipBg/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bot className={`w-4 h-4 ${activeLogId === 'ai-chat' ? 'text-workspace-accent' : 'text-workspace-textMuted'}`} />
                <span>AI Assistant</span>
              </div>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/40">
                <Zap className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                WIP
              </span>
            </Link>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-workspace-textSecondary hover:text-workspace-textActive transition-colors">
              <MessageSquare className="w-4 h-4 text-workspace-textMuted" />
              <span>Conversation History</span>
            </button>
            <Link 
              to="/tasks"
              onClick={onCloseMobile}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeLogId === 'tasks' ? 'text-workspace-textActive bg-workspace-chipHover border border-workspace-border' : 'text-workspace-textSecondary hover:text-workspace-textActive hover:bg-workspace-chipBg/50'
              }`}
            >
              <Calendar className={`w-4 h-4 ${activeLogId === 'tasks' ? 'text-workspace-accent' : 'text-workspace-textMuted'}`} />
              <span>Scheduled Tasks & Availability</span>
            </Link>
          </div>

          <div className="space-y-2">
            <div onClick={() => onToggleFolder('projects')} className="flex items-center justify-between text-[10px] font-bold text-workspace-textMuted uppercase tracking-wider px-2 cursor-pointer hover:text-workspace-textActive transition-colors">
              <span>Projects</span>
              {openFolders['projects'] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </div>

            {openFolders['projects'] && (
              <div className="pl-1 space-y-3">
                <div className="space-y-1">
                  <button onClick={() => onToggleFolder('cheating')} className="w-full flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-workspace-textActive hover:text-workspace-textActive/80 text-left">
                    {openFolders['cheating'] ? (
                      <><ChevronDown className="w-3.5 h-3.5 text-workspace-textMuted" /><FolderOpen className="w-3.5 h-3.5 text-workspace-accent" /></>
                    ) : (
                      <><ChevronRight className="w-3.5 h-3.5 text-workspace-textMuted" /><Folder className="w-3.5 h-3.5 text-workspace-accent" /></>
                    )}
                    <span className="truncate">isitcheatingif.com</span>
                  </button>
                  {openFolders['cheating'] && (
                    <div className="pl-5 space-y-0.5 border-l border-workspace-border/50 ml-3.5">
                      {isitcheatingLogs.map(log => <SidebarItem key={log.id} log={log} isActive={activeLogId === log.id} onClick={onCloseMobile} />)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <div onClick={() => onToggleFolder('conversations')} className="flex items-center justify-between text-[10px] font-bold text-workspace-textMuted uppercase tracking-wider px-2 cursor-pointer hover:text-workspace-textActive transition-colors">
              <span>Conversations</span>
              {openFolders['conversations'] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </div>
            {openFolders['conversations'] && (
              <div className="pl-1 space-y-0.5">
                {conversationItems.map(conv => <SidebarItem key={conv.id} log={conv} isActive={activeLogId === conv.id} isConversation onClick={onCloseMobile} />)}
              </div>
            )}
          </div>
        </div>

        <div className="p-3 border-t border-workspace-border bg-workspace-sidebar">
          <Link to="/settings" onClick={onCloseMobile} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${activeLogId === 'settings' ? 'bg-workspace-chipHover text-workspace-textActive' : 'text-workspace-textSecondary hover:text-workspace-textActive hover:bg-workspace-chipBg/50'}`}>
            <Settings className="w-4 h-4 text-workspace-textMuted" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
