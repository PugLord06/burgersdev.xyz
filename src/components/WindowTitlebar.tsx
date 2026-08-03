import { useState } from 'react';
import { ChevronLeft, ChevronRight, GitFork, Minimize2, Square, X, Sun, Moon, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEVELOPER_PROFILE } from '../data/developerData';

interface WindowTitlebarProps {
  activePath: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onToggleMobileSidebar?: () => void;
}

export default function WindowTitlebar({ activePath, isDarkMode, onToggleTheme, onToggleMobileSidebar }: WindowTitlebarProps) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleMinimize = () => {
    showToast("⚡ [IDE] Workspace minimized to active session state");
  };

  const handleMaximize = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        showToast("🖥️ [IDE] Entered Fullscreen Workspace mode");
      }).catch(() => {
        showToast("🖥️ Fullscreen toggled");
      });
    } else {
      document.exitFullscreen().then(() => {
        showToast("🖥️ [IDE] Exited Fullscreen mode");
      });
    }
  };

  const handleClose = () => {
    showToast("💾 [IDE] Session saved — Workspace state persisted!");
  };

  return (
    <header 
      id="window-titlebar" 
      className="bg-workspace-sidebar border-b border-workspace-border h-11 px-4 flex items-center justify-between select-none shrink-0 transition-colors duration-300 relative z-30"
    >
      {/* Toast Banner */}
      {toastMessage && (
        <div className="absolute top-12 right-4 bg-workspace-sidebar border border-workspace-accent/40 text-workspace-textActive text-xs px-3.5 py-2 rounded-lg shadow-xl animate-fadeIn font-mono flex items-center gap-2 z-50">
          <span className="w-2 h-2 rounded-full bg-workspace-accent animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Area - Application Menu */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Mobile Sidebar Toggle Button */}
        <button
          id="btn-toggle-mobile-sidebar"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Mobile Menu"
          className="p-1 text-workspace-textMuted hover:text-workspace-textActive rounded hover:bg-workspace-chipBg transition-colors md:hidden"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Brand Menu */}
        <div className="flex items-center gap-4 text-xs font-semibold text-workspace-textActive">
          <span className="text-workspace-textActive hover:opacity-80 cursor-pointer font-bold transition-colors">
            {DEVELOPER_PROFILE.handle}
          </span>
          <span className="text-workspace-textSecondary hover:text-workspace-textActive cursor-pointer font-medium transition-colors hidden sm:inline">File</span>
          <span className="text-workspace-textSecondary hover:text-workspace-textActive cursor-pointer font-medium transition-colors hidden sm:inline">Edit</span>
          <span className="text-workspace-textSecondary hover:text-workspace-textActive cursor-pointer font-medium transition-colors hidden sm:inline">View</span>
          <span className="text-workspace-textSecondary hover:text-workspace-textActive cursor-pointer font-medium transition-colors hidden md:inline">Window</span>
          <span className="text-workspace-textSecondary hover:text-workspace-textActive cursor-pointer font-medium transition-colors hidden md:inline">Help</span>
        </div>

        {/* Back / Forward Controls */}
        <div className="flex items-center gap-1 border-l border-workspace-border pl-4">
          <button 
            id="btn-window-back" 
            aria-label="Go Back"
            onClick={() => navigate(-1)}
            className="p-1 text-workspace-textMuted hover:text-workspace-textActive rounded hover:bg-workspace-chipBg/50 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button 
            id="btn-window-forward" 
            aria-label="Go Forward"
            onClick={() => navigate(1)}
            className="p-1 text-workspace-textMuted hover:text-workspace-textActive rounded hover:bg-workspace-chipBg/50 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Middle Area - Currently Open Route Info */}
      <div className="text-[10px] text-workspace-textMuted font-mono truncate max-w-xs md:max-w-md hidden lg:block">
        {activePath}
      </div>

      {/* Right Area - Git Link Widget & OS Window Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-1.5 text-workspace-textMuted hover:text-workspace-textActive rounded hover:bg-workspace-chipBg transition-colors"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Sleek Github Branch button */}
        <a 
          id="btn-open-github"
          href={DEVELOPER_PROFILE.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 bg-workspace-chipBg hover:bg-workspace-chipHover border border-workspace-border text-workspace-textActive text-[11px] font-semibold rounded transition-colors group cursor-pointer"
        >
          <GitFork className="w-3 h-3 text-workspace-accent group-hover:scale-105 transition-transform" />
          <span>Open GitHub</span>
        </a>

        {/* Interactive OS Window controls */}
        <div className="flex items-center gap-1 border-l border-workspace-border pl-3 text-workspace-textMuted">
          <button 
            id="btn-win-min" 
            aria-label="Minimize Window"
            onClick={handleMinimize}
            className="p-1 hover:text-workspace-textActive rounded hover:bg-workspace-chipBg transition-colors cursor-pointer"
            title="Minimize IDE Workspace"
          >
            <Minimize2 className="w-3 h-3" />
          </button>
          <button 
            id="btn-win-max" 
            aria-label="Maximize Fullscreen"
            onClick={handleMaximize}
            className="p-1 hover:text-workspace-textActive rounded hover:bg-workspace-chipBg transition-colors cursor-pointer"
            title="Toggle Fullscreen Mode"
          >
            <Square className="w-2.5 h-2.5" />
          </button>
          <button 
            id="btn-win-close" 
            aria-label="Close Session"
            onClick={handleClose}
            className="p-1 hover:text-red-400 rounded hover:bg-red-950/20 transition-colors cursor-pointer"
            title="Close / Persist Workspace Session"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
}
