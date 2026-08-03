import React, { useState } from 'react';
import { Plus, Send, ChevronUp } from 'lucide-react';

interface ChatBarProps {
  onSendMessage: (message: string) => void;
  onDirectAction?: (action: string) => void;
  disabled?: boolean;
}

export default function ChatBar({ onSendMessage, onDirectAction, disabled = false }: ChatBarProps) {
  const [inputValue, setInputValue] = useState("");

  const chips = [
    { label: "🚀 Open Resume.md", action: "resume" },
    { label: "🧠 Run Game Demo", action: "game" },
    { label: "💻 Inspect Tech Stack", action: "tech" }
  ];

  // Simulates typewriter effect
  const handleChipClick = (action: string) => {
    if (disabled) return;
    if (onDirectAction) {
      onDirectAction(action);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || disabled) return;
    
    onSendMessage(inputValue.trim());
    setInputValue("");
  };

  return (
    <div 
      id="chat-control-dock"
      className="p-4 bg-transparent border-t border-transparent flex flex-col items-center gap-3 shrink-0 relative w-full z-10"
    >
      {/* Floating Suggestion Chips */}
      <div 
        id="suggestion-chips-container" 
        className="flex items-center justify-start sm:justify-center gap-2 max-w-full overflow-x-auto px-4 pb-1"
      >
        {chips.map((chip, idx) => (
          <button
            key={idx}
            id={`btn-chip-${idx}`}
            onClick={() => handleChipClick(chip.action)}
            disabled={disabled}
            className="px-3 py-1.5 bg-workspace-chipBg hover:bg-workspace-chipHover border border-workspace-border text-workspace-textActive rounded-full text-xs font-medium transition-colors shrink-0 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Floating Capsule/Pill Input */}
      <form 
        id="chat-input-form"
        onSubmit={handleFormSubmit}
        className="w-full max-w-2xl bg-workspace-pillBg border border-workspace-border rounded-full p-1.5 flex items-center gap-2 shadow-xl focus-within:border-workspace-accent transition-colors"
      >
        {/* Left: Gray "+" button */}
        <button
          id="btn-upload-file"
          type="button"
          aria-label="Upload File"
          className="w-8 h-8 rounded-full bg-workspace-chipBg hover:bg-workspace-chipHover border border-workspace-border flex items-center justify-center text-workspace-textMuted hover:text-workspace-textActive transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Middle Status Dropdown */}
        <div 
          id="chat-model-indicator"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-workspace-chipBg border border-workspace-border rounded-full text-[10px] text-workspace-textSecondary select-none shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="font-semibold">Gemini 3.5 Flash (High)</span>
          <ChevronUp className="w-3 h-3 text-workspace-textMuted" />
        </div>

        {/* Center: Input text box */}
        <input
          id="chat-query-input"
          type="text"
          placeholder="Ask burgersdev anything or run commands..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-workspace-textActive placeholder:text-workspace-textMuted focus:outline-none px-2 min-w-0 disabled:opacity-50"
        />

        {/* Right: Submission Button */}
        <button
          id="btn-send-chat"
          type="submit"
          aria-label="Send Query"
          disabled={!inputValue.trim() || disabled}
          className="w-8 h-8 rounded-full bg-workspace-accent hover:bg-workspace-accentDark disabled:bg-workspace-border text-white flex items-center justify-center transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
