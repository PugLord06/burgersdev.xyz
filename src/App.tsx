import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WindowTitlebar from './components/WindowTitlebar';
import Sidebar from './components/Sidebar';
import MainViewport from './components/MainViewport';
import ChatBar from './components/ChatBar';
import BootScreen from './components/BootScreen';
import { useAIChat } from './hooks/useAIChat';
import { PROJECT_LOGS } from './data/developerData';

export default function App() {
  const [isBooted, setIsBooted] = useState(() => {
    // Only show boot screen once per session
    return sessionStorage.getItem('burgersdev-booted') === 'true';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const location = useLocation();
  const navigate = useNavigate();
  const { aiTyping, chatHistory, handleSendMessage } = useAIChat();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const handleCloseMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    projects: true,
    studios: true,
    cheating: true,
    chat: true,
    conversations: true
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('workspace-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Derive active ID from route for Sidebar and Titlebar
  let activeLogId = "settings";
  const path = location.pathname;
  
  if (path.startsWith('/project/')) {
    activeLogId = path.replace('/project/', '');
  } else if (path === '/resume') {
    activeLogId = 'resume';
  } else if (path === '/tasks') {
    activeLogId = 'tasks';
  } else if (path === '/ai-chat') {
    activeLogId = 'ai-chat';
  } else if (path === '/' || path === '/settings') {
    activeLogId = 'settings';
  }

  const handleToggleFolder = (folder: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  let activePathLabel = "burgersdev / Workspace";
  if (activeLogId === 'resume') {
    activePathLabel = "burgersdev / Resume.md";
  } else if (activeLogId === 'settings') {
    activePathLabel = "burgersdev / Settings";
  } else if (PROJECT_LOGS[activeLogId]) {
    activePathLabel = PROJECT_LOGS[activeLogId].path;
  }

  return (
    <>
      {!isBooted && (
        <BootScreen onBootComplete={() => {
          sessionStorage.setItem('burgersdev-booted', 'true');
          setIsBooted(true);
        }} />
      )}
      <div id="app-workspace-root" className={`h-screen w-screen bg-workspace-editor text-workspace-textSecondary flex flex-col font-sans overflow-hidden select-none transition-opacity duration-500 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        <WindowTitlebar 
          activePath={activePathLabel} 
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          onToggleMobileSidebar={handleToggleMobileSidebar}
        />

        <div className="flex-1 flex overflow-hidden relative">
          <Sidebar 
            activeLogId={activeLogId}
            onNewConversation={() => navigate('/settings')}
            openFolders={openFolders}
            onToggleFolder={handleToggleFolder}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={handleCloseMobileSidebar}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden relative border-t border-workspace-border">
            <MainViewport 
              chatHistory={chatHistory}
              isTyping={aiTyping}
            />
            
            <ChatBar 
              onSendMessage={handleSendMessage}
              onDirectAction={(action) => {
                if (action === 'resume') navigate('/resume');
                else if (action === 'game') navigate('/project/cheating-engine');
                else if (action === 'tech') navigate('/project/conv-typescript');
              }}
              disabled={aiTyping}
            />
          </div>
        </div>
      </div>
    </>
  );
}
