import { Link } from 'react-router-dom';
import type { ProjectLog } from '../data/developerData';
import { FileText, MessageSquare, GraduationCap } from 'lucide-react';

interface SidebarItemProps {
  log: ProjectLog;
  isActive: boolean;
  isConversation?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({ log, isActive, isConversation, onClick }: SidebarItemProps) {
  const Icon = isConversation 
    ? (log.id === 'conv-academic' ? GraduationCap : MessageSquare)
    : FileText;
    
  const activeClasses = isConversation 
    ? 'bg-workspace-chipHover text-workspace-textActive font-semibold border-l-2 border-l-purple-500 rounded-l-none'
    : 'bg-workspace-chipHover text-workspace-textActive font-semibold border-l-2 border-l-workspace-accent rounded-l-none';
    
  const inactiveClasses = 'text-workspace-textSecondary hover:text-workspace-textActive hover:bg-workspace-chipBg/50';

  const iconColor = isConversation 
    ? (isActive ? 'text-purple-400' : 'text-workspace-textMuted')
    : (isActive ? 'text-workspace-accent' : 'text-workspace-textMuted');

  return (
    <Link
      to={`/project/${log.id}`}
      id={`btn-sidebar-${isConversation ? 'conv' : 'log'}-${log.id}`}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors text-left group ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      <span className="flex items-center gap-2 truncate">
        <Icon className={`w-3.5 h-3.5 shrink-0 ${iconColor}`} />
        <span className="truncate">{log.title}</span>
      </span>
      {log.timeLabel && !isConversation && (
        <span className="text-[10px] text-workspace-textMuted font-mono shrink-0 ml-1.5">
          {log.timeLabel}
        </span>
      )}
    </Link>
  );
}
