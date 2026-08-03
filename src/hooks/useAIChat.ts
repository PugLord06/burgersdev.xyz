import { useState, useRef, useCallback, useEffect } from 'react';
import type { ChatMessage } from '../pages/AIChatView';
import { useNavigate } from 'react-router-dom';

export function useAIChat() {
  const [aiTyping, setAiTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const navigate = useNavigate();

  // Typewriter animation refs
  const targetTextRef = useRef('');
  const displayedLengthRef = useRef(0);
  const animFrameRef = useRef(0);
  const streamDoneRef = useRef(false);
  const redirectPathRef = useRef('');

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const updateLastAssistant = useCallback((content: string) => {
    setChatHistory(prev => {
      const newHistory = [...prev];
      for (let i = newHistory.length - 1; i >= 0; i--) {
        if (newHistory[i].role === 'assistant') {
          newHistory[i] = { ...newHistory[i], content };
          break;
        }
      }
      return newHistory;
    });
  }, []);

  const animateTypewriter = useCallback(() => {
    const target = targetTextRef.current;
    const displayed = displayedLengthRef.current;

    if (displayed < target.length) {
      // Adaptive speed: faster when further behind, gentle finish
      const remaining = target.length - displayed;
      const charsToAdd = Math.max(2, Math.min(10, Math.ceil(remaining * 0.06)));
      displayedLengthRef.current += charsToAdd;

      updateLastAssistant(target.substring(0, displayedLengthRef.current));
      animFrameRef.current = requestAnimationFrame(animateTypewriter);
    } else if (streamDoneRef.current) {
      // Stream finished and animation caught up — show final text
      animFrameRef.current = 0;
      updateLastAssistant(target);
      setAiTyping(false);

      if (redirectPathRef.current) {
        const path = redirectPathRef.current;
        redirectPathRef.current = '';
        setTimeout(() => navigate(path), 1200);
      }
    } else {
      // Caught up to buffer but stream is still going — wait for more
      animFrameRef.current = requestAnimationFrame(animateTypewriter);
    }
  }, [updateLastAssistant, navigate]);

  const handleSendMessage = async (message: string) => {
    if (aiTyping) return;

    setAiTyping(true);
    navigate('/ai-chat');

    // Reset typewriter state
    targetTextRef.current = '';
    displayedLengthRef.current = 0;
    streamDoneRef.current = false;
    redirectPathRef.current = '';
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }

    const msgLower = message.toLowerCase();

    if (msgLower.includes("resume") || msgLower.includes("cv")) {
      redirectPathRef.current = "/resume";
    } else if (msgLower.includes("game") || msgLower.includes("demo") || msgLower.includes("cheat")) {
      redirectPathRef.current = "/project/cheating-engine";
    } else if (msgLower.includes("tech") || msgLower.includes("stack") || msgLower.includes("skills")) {
      redirectPathRef.current = "/project/conv-typescript";
    } else if (msgLower.includes("academic") || msgLower.includes("gold") || msgLower.includes("eduvos")) {
      redirectPathRef.current = "/project/conv-academic";
    }

    // Add user message + empty assistant message atomically
    setChatHistory(prev => [
      ...prev,
      { role: 'user', content: message },
      { role: 'assistant', content: '' }
    ]);

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
              
              if (content) {
                // Buffer content for typewriter — don't update state directly
                targetTextRef.current += content;
                // Kick off animation if not already running
                if (!animFrameRef.current) {
                  animFrameRef.current = requestAnimationFrame(animateTypewriter);
                }
              }
            } catch (e) {
              console.error("Failed to parse SSE JSON chunk:", dataStr, e);
            }
          }
        }
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      const offlineMsg = "⚠️ **AI Backend Offline**\n\nThe AI server is currently unreachable. You can explore Michael's portfolio, resume, and projects directly using the navigation sidebar or chips below!";

      targetTextRef.current = offlineMsg;
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(animateTypewriter);
      }
    } finally {
      // Signal the animation loop that the stream is done —
      // it will set aiTyping=false once the typewriter catches up
      streamDoneRef.current = true;
    }
  };

  return { aiTyping, chatHistory, handleSendMessage };
}
