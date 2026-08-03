import { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatViewProps {
  chatHistory: ChatMessage[];
  isTyping: boolean;
}

export default function AIChatView({ chatHistory, isTyping }: AIChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  return (
    <div className="flex flex-col h-full bg-workspace-editor overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="border-b border-workspace-border p-4 shrink-0 bg-[#0e0e11]/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
          <Bot className="w-6 h-6 text-blue-400" /> Assistant
        </h1>
        <p className="text-xs text-workspace-textSecondary mt-1">
          Ask me anything about Michael's experience, tech stack, or projects.
        </p>
      </div>

      {/* Chat Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 scroll-smooth"
      >
        {chatHistory.length === 0 ? (
          <div className="h-full flex items-center justify-center text-workspace-textMuted text-sm">
            Send a message below to start chatting.
          </div>
        ) : (
          chatHistory.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-4 max-w-3xl mx-auto ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Assistant Avatar */}
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
              )}

              {/* Message Bubble */}
              <div 
                className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                  msg.role === 'user' 
                    ? 'bg-workspace-border text-white rounded-br-sm' 
                    : 'bg-[#1c1c21] text-workspace-textSecondary border border-workspace-border rounded-bl-sm prose prose-invert prose-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  <div className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</div>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none text-workspace-textSecondary">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-workspace-sidebar border border-workspace-border flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-workspace-textMuted" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-4 max-w-3xl mx-auto justify-start">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div className="px-4 py-4 rounded-2xl bg-[#1c1c21] border border-workspace-border rounded-bl-sm flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-workspace-textMuted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-workspace-textMuted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-workspace-textMuted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
