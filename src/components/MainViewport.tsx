import React from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import { PROJECT_LOGS } from '../data/developerData';
import { ChevronRight, Folder } from 'lucide-react';
import ResumeView from '../pages/ResumeView';
import AcademicView from '../pages/AcademicView';
import TechStackView from '../pages/TechStackView';
import GeminiIntegrationView from '../pages/GeminiIntegrationView';
import ScheduledTasksView from '../pages/ScheduledTasksView';
import ProjectLogsView from '../pages/ProjectLogsView';
import AIChatView from '../pages/AIChatView';
import SettingsView from '../pages/SettingsView';
import AboutView from '../pages/AboutView';
import NotFoundView from '../pages/NotFoundView';
import type { ChatMessage } from '../pages/AIChatView';

interface MainViewportProps {
  chatHistory: ChatMessage[];
  isTyping: boolean;
}

// Wrapper for Project Logs to grab ID from URL
function ProjectLogWrapper() {
  const { id } = useParams<{ id: string }>();
  const log = id ? PROJECT_LOGS[id] : null;

  if (!log) return <SettingsView />;

  switch (log.id) {
    case 'conv-academic':
      return <AcademicView />;
    case 'conv-gemini':
      return <GeminiIntegrationView />;
    case 'conv-typescript':
      return <TechStackView />;
    default:
      return <ProjectLogsView log={log} />;
  }
}

export default function MainViewport({ chatHistory, isTyping }: MainViewportProps) {
  const location = useLocation();
  const path = location.pathname;

  let breadcrumbNodes = ["burgersdev"];
  if (path === '/resume') {
    breadcrumbNodes = ["burgersdev", "Personal", "Resume.md"];
  } else if (path === '/about') {
    breadcrumbNodes = ["burgersdev", "Personal", "ABOUT_ME.md"];
  } else if (path === '/tasks') {
    breadcrumbNodes = ["burgersdev", "Core", "ScheduledTasks.ts"];
  } else if (path === '/ai-chat') {
    breadcrumbNodes = ["burgersdev", "AI", "Terminal"];
  } else if (path.startsWith('/project/')) {
    const activeLogId = path.replace('/project/', '');
    const currentLog = PROJECT_LOGS[activeLogId];
    if (currentLog) {
      if (currentLog.category === 'projects') breadcrumbNodes = ["burgersdev", "Projects", currentLog.title];
      else breadcrumbNodes = ["burgersdev", "Conversations", currentLog.title];
    } else {
      breadcrumbNodes = ["burgersdev", "Workspace"];
    }
  } else {
    breadcrumbNodes = ["burgersdev", "Workspace"];
  }

  return (
    <main id="main-viewport" className="flex-1 bg-workspace-editor flex flex-col overflow-hidden">
      {/* Breadcrumbs Row */}
      <div id="breadcrumb-navigation" className="h-10 bg-workspace-editor border-b border-workspace-border px-4 flex items-center gap-1.5 shrink-0 select-none text-[11px]">
        <Folder className="w-3.5 h-3.5 text-workspace-textMuted shrink-0" />
        
        {breadcrumbNodes.map((node, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-3 h-3 text-workspace-textMuted shrink-0" />}
            <span 
              className={`truncate max-w-[150px] ${
                index === breadcrumbNodes.length - 1 
                  ? 'text-workspace-textActive font-medium' 
                  : 'text-workspace-textSecondary'
              }`}
            >
              {node}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Editor Panel Scroll View */}
      <div id="viewport-scroll-area" className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<SettingsView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/resume" element={<ResumeView />} />
          <Route path="/tasks" element={<ScheduledTasksView />} />
          <Route path="/ai-chat" element={<AIChatView chatHistory={chatHistory} isTyping={isTyping} />} />
          <Route path="/project/:id" element={<ProjectLogWrapper />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </div>
    </main>
  );
}
