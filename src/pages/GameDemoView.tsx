import { useState } from 'react';
import { Send, BarChart2 } from 'lucide-react';
import { SCENARIOS } from '../data/gameScenarios';
import type { Scenario } from '../data/gameScenarios';
import GameDemoCard from '../components/GameDemoCard';

export default function GameDemoView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteType, setVoteType] = useState<'yes' | 'no' | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [customScenario, setCustomScenario] = useState<Scenario | null>(null);
  const [aiStreaming, setAiStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [streamedReason, setStreamedReason] = useState("");

  const activeScenario = customScenario || SCENARIOS[currentIndex];

  const handleVote = (type: 'yes' | 'no') => {
    if (hasVoted) return;
    setVoteType(type);
    setHasVoted(true);
    
    setAiStreaming(true);
    setStreamedText("");
    setStreamedReason("");
    
    const verdict = activeScenario.aiVerdict;
    const reasoning = activeScenario.reasoning;
    
    let verdictCharIdx = 0;
    const verdictInterval = setInterval(() => {
      if (verdictCharIdx < verdict.length) {
        setStreamedText(prev => prev + verdict[verdictCharIdx]);
        verdictCharIdx++;
      } else {
        clearInterval(verdictInterval);
        
        let reasonCharIdx = 0;
        const reasonInterval = setInterval(() => {
          if (reasonCharIdx < reasoning.length) {
            setStreamedReason(prev => prev + reasoning[reasonCharIdx]);
            reasonCharIdx++;
          } else {
            clearInterval(reasonInterval);
            setAiStreaming(false);
          }
        }, 15);
      }
    }, 25);
  };

  const handleNext = () => {
    setHasVoted(false);
    setVoteType(null);
    setCustomScenario(null);
    setStreamedText("");
    setStreamedReason("");
    setCurrentIndex((prev) => (prev + 1) % SCENARIOS.length);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const isYesMotive = customInput.toLowerCase().includes("hide") || 
                        customInput.toLowerCase().includes("delete") || 
                        customInput.toLowerCase().includes("secret") || 
                        customInput.toLowerCase().includes("ex") || 
                        customInput.toLowerCase().includes("sleep");

    const custom: Scenario = {
      id: 99,
      text: customInput,
      yesPercent: isYesMotive ? 81 : 35,
      aiVerdict: isYesMotive ? "💔 CONCEALMENT DETECTED (Cheating)" : "🤷 RATIONALLY ACCEPTABLE (Not Cheating)",
      reasoning: isYesMotive 
        ? "This scenario involves intentional partition of awareness or secret validation. Transparency has been compromised to safeguard self-interest, violating trust."
        : "While this behavior might irritate your partner, it lacks clear deceitful intent or emotional betrayal. Open communication should resolve any friction easily."
    };

    setCustomScenario(custom);
    setCustomInput("");
    setHasVoted(false);
    setVoteType(null);
    setStreamedText("");
    setStreamedReason("");
  };

  return (
    <div id="game-sandbox" className="p-6 max-w-2xl mx-auto space-y-6 animate-fadeIn">
      {/* Game Header */}
      <div className="flex items-center justify-between border-b border-workspace-border pb-4">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-heading">
            <span className="text-blue-500">isit</span>cheatingif.com
          </div>
          <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Game Demo
          </span>
        </div>
        <div className="text-xs text-workspace-textMuted flex items-center gap-1">
          <BarChart2 className="w-3.5 h-3.5" /> 330+ votes cast
        </div>
      </div>

      <p className="text-xs text-workspace-textSecondary leading-relaxed bg-workspace-sidebar border border-workspace-border p-3.5 rounded-lg">
        🔒 This is an interactive demo of <strong>isitcheatingif.com</strong>, Michael's debate game. We use a custom API integration to judge scenarios. Pick a choice card below or type your own question.
      </p>

      <GameDemoCard 
        activeScenario={activeScenario}
        hasVoted={hasVoted}
        voteType={voteType}
        streamedText={streamedText}
        streamedReason={streamedReason}
        onVote={handleVote}
        onNext={handleNext}
      />

      <form id="custom-scenario-form" onSubmit={handleCustomSubmit} className="space-y-2">
        <label htmlFor="custom-dilemma-input" className="block text-xs font-semibold text-white uppercase tracking-wider font-heading">
          💡 Test your own scenario:
        </label>
        <div className="flex gap-2">
          <input
            id="custom-dilemma-input"
            type="text"
            placeholder="Is it cheating if your partner..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={aiStreaming}
            className="flex-1 bg-workspace-sidebar border border-workspace-border focus:border-blue-500 focus:outline-none rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-workspace-textMuted disabled:opacity-50"
          />
          <button
            id="btn-submit-dilemma"
            type="submit"
            disabled={aiStreaming || !customInput.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-workspace-border text-white p-2.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
