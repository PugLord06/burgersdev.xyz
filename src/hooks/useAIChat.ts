import { useState } from 'react';
import type { ChatMessage } from '../pages/AIChatView';
import { useNavigate } from 'react-router-dom';

export function useAIChat() {
  const [aiTyping, setAiTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const navigate = useNavigate();

  const handleSendMessage = async (message: string) => {
    if (aiTyping) return;
    
    setAiTyping(true);
    navigate('/ai-chat');
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);

    const msgLower = message.toLowerCase();
    let redirectPath = "";

    if (msgLower.includes("resume") || msgLower.includes("cv")) {
      redirectPath = "/resume";
    } else if (msgLower.includes("game") || msgLower.includes("demo") || msgLower.includes("cheat")) {
      redirectPath = "/project/cheating-engine";
    } else if (msgLower.includes("tech") || msgLower.includes("stack") || msgLower.includes("skills")) {
      redirectPath = "/project/conv-typescript";
    } else if (msgLower.includes("academic") || msgLower.includes("gold") || msgLower.includes("eduvos")) {
      redirectPath = "/project/conv-academic";
    }

    setChatHistory(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message })
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (!dataStr) continue;
            try {
              const dataJson = JSON.parse(dataStr);
              const content = dataJson.content || '';
              setChatHistory(prev => {
                const newHistory = [...prev];
                const lastIdx = newHistory.length - 1;
                newHistory[lastIdx] = {
                  ...newHistory[lastIdx],
                  content: newHistory[lastIdx].content + content
                };
                return newHistory;
              });
            } catch (e) {
              console.error("Failed to parse SSE JSON chunk:", dataStr, e);
            }
          }
        }
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      const offlineMsg = "⚠️ **AI Backend Offline**\n\nThe AI server is currently unreachable. You can explore Michael's portfolio, resume, and projects directly using the navigation sidebar or chips below!";
      
      setChatHistory(prev => {
        const newHistory = [...prev];
        const lastIdx = newHistory.length - 1;
        if (lastIdx >= 0 && newHistory[lastIdx].role === 'assistant') {
          newHistory[lastIdx] = {
            ...newHistory[lastIdx],
            content: offlineMsg
          };
        }
        return newHistory;
      });
    } finally {
      setAiTyping(false);
      if (redirectPath) {
        setTimeout(() => {
          navigate(redirectPath);
        }, 1200);
      }
    }
  };

  return { aiTyping, chatHistory, handleSendMessage };
}
