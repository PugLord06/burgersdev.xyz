import { useState } from 'react';
import { TEMPLATES } from '../data/geminiTemplates';

export function useGeminiSimulation(activeTemplate: keyof typeof TEMPLATES, model: string, temp: number, maxTokens: number) {
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);
    setOutput("");

    const logs = [
      `[API] Connecting to vertex.api.google.com/v1/models/${model.toLowerCase().replace(/\s+/g, '-')}`,
      `[CONFIG] Initialized client configuration (temp: ${temp}, maxTokens: ${maxTokens})`,
      `[INSTRUCT] Loading system instruction payload...`,
      `[PAYLOAD] Sending template: "${TEMPLATES[activeTemplate].name}"`,
      `[STREAM] Establishing Server-Sent Events (SSE) connection...`,
      `[COMPLETION] Receiving stream tokens:`
    ];

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < logs.length) {
        setConsoleLogs(prev => [...prev, logs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
        
        const text = TEMPLATES[activeTemplate].response;
        let charIdx = 0;
        const textInterval = setInterval(() => {
          if (charIdx < text.length) {
            setOutput(prev => prev + text[charIdx]);
            charIdx++;
          } else {
            clearInterval(textInterval);
            setIsRunning(false);
            setConsoleLogs(prev => [...prev, "[SUCCESS] Stream finished safely."]);
          }
        }, 15);
      }
    }, 400);
  };

  return { consoleLogs, output, isRunning, runSimulation, setOutput, setConsoleLogs };
}
