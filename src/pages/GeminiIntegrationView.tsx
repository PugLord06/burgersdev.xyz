import { useState } from 'react';
import { Play, Sparkles, Sliders, Check } from 'lucide-react';
import { TEMPLATES } from '../data/geminiTemplates';
import GeminiOutputNode from '../components/GeminiOutputNode';
import { useGeminiSimulation } from '../hooks/useGeminiSimulation';

export default function GeminiIntegrationView() {
  const [activeTemplate, setActiveTemplate] = useState<keyof typeof TEMPLATES>("dilemma");
  const [model, setModel] = useState("Gemini 3.5 Flash (High)");
  const [temp, setTemp] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(256);

  const { consoleLogs, output, isRunning, runSimulation, setOutput, setConsoleLogs } = useGeminiSimulation(
    activeTemplate, model, temp, maxTokens
  );

  return (
    <div id="gemini-sandbox" className="p-6 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="border-b border-workspace-border pb-4 space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" /> Google Gemini API Integrations
        </h1>
        <p className="text-xs text-workspace-textSecondary">
          Mock sandbox simulating Gemini model adjustments, prompt loading, and token stream responses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 bg-workspace-sidebar border border-workspace-border rounded-xl p-5 space-y-5 h-fit">
          <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider pb-3 border-b border-workspace-border">
            <Sliders className="w-4 h-4 text-workspace-textMuted" /> Parameters Panel
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-workspace-textMuted font-bold uppercase tracking-wider block">Model</label>
            <select
              id="gemini-model-select"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-black/40 border border-workspace-border rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
            >
              <option>Gemini 3.5 Flash (High)</option>
              <option>Gemini 3.5 Pro (Low Latency)</option>
              <option>Gemini 1.5 Pro (Ultra Context)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-workspace-textMuted font-bold uppercase tracking-wider block">System Template</label>
            <div className="space-y-1.5">
              {Object.entries(TEMPLATES).map(([key, t]) => (
                <button
                  key={key}
                  id={`btn-template-${key}`}
                  onClick={() => {
                    if (!isRunning) {
                      setActiveTemplate(key as keyof typeof TEMPLATES);
                      setOutput("");
                      setConsoleLogs([]);
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs border font-semibold flex items-center justify-between transition-colors ${
                    activeTemplate === key
                      ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                      : 'bg-black/20 border-workspace-border text-workspace-textSecondary hover:text-white'
                  }`}
                >
                  <span>{t.name}</span>
                  {activeTemplate === key && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-workspace-textMuted uppercase tracking-wider">
              <span>Temperature</span>
              <span className="text-white font-mono">{temp}</span>
            </div>
            <input
              id="slider-temp"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temp}
              onChange={(e) => setTemp(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full h-1 bg-workspace-border rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-workspace-textMuted uppercase tracking-wider">
              <span>Max Tokens</span>
              <span className="text-white font-mono">{maxTokens}</span>
            </div>
            <input
              id="slider-max-tokens"
              type="range"
              min="64"
              max="1024"
              step="64"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full h-1 bg-workspace-border rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <button
            id="btn-run-simulation"
            onClick={runSimulation}
            disabled={isRunning}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-workspace-border text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5" /> Run Prompt Pipeline
          </button>
        </div>

        <GeminiOutputNode 
          systemInstruction={TEMPLATES[activeTemplate].system}
          consoleLogs={consoleLogs}
          output={output}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
}
