import { Sparkles, RefreshCw } from 'lucide-react';
import type { Scenario } from '../data/gameScenarios';

interface GameDemoCardProps {
  activeScenario: Scenario;
  hasVoted: boolean;
  voteType: 'yes' | 'no' | null;
  streamedText: string;
  streamedReason: string;
  onVote: (type: 'yes' | 'no') => void;
  onNext: () => void;
}

export default function GameDemoCard({
  activeScenario,
  hasVoted,
  voteType,
  streamedText,
  streamedReason,
  onVote,
  onNext
}: GameDemoCardProps) {
  return (
    <div className="bg-gradient-to-b from-workspace-sidebar to-black border border-workspace-border rounded-xl p-6 relative overflow-hidden space-y-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

      {/* Card Title */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-widest text-blue-400 font-bold font-mono">
          Dilemma #{activeScenario.id === 99 ? 'Custom' : activeScenario.id}
        </span>
        <h2 className="text-lg font-medium text-white leading-relaxed font-heading">
          Is it cheating if... <span className="text-gray-300 font-semibold">{activeScenario.text}</span>
        </h2>
      </div>

      {/* Action Buttons */}
      {!hasVoted ? (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            id="btn-vote-yes"
            onClick={() => onVote('yes')}
            className="py-3 px-4 bg-red-950/20 hover:bg-red-950/40 border border-red-500/30 hover:border-red-500/60 text-red-400 font-semibold rounded-lg text-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer"
          >
            💔 Yes, absolutely.
          </button>
          <button
            id="btn-vote-no"
            onClick={() => onVote('no')}
            className="py-3 px-4 bg-green-950/20 hover:bg-green-950/40 border border-green-500/30 hover:border-green-500/60 text-green-400 font-semibold rounded-lg text-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer"
          >
            🤷 No, they're overreacting.
          </button>
        </div>
      ) : (
        <div className="space-y-6 pt-2 animate-fadeIn">
          {/* Voted Percentages chart */}
          <div className="space-y-2 bg-black/40 border border-workspace-border p-4 rounded-lg">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-red-400">IT'S CHEATING ({activeScenario.yesPercent}%)</span>
              <span className="text-green-400">IT'S FINE ({100 - activeScenario.yesPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-workspace-border rounded-full overflow-hidden flex">
              <div className="bg-red-500 transition-all duration-500" style={{ width: `${activeScenario.yesPercent}%` }}></div>
              <div className="bg-green-500 transition-all duration-500 flex-1"></div>
            </div>
            <div className="text-[10px] text-workspace-textMuted text-center italic">
              You voted: <strong className="text-white uppercase">{voteType}</strong>. Consensus matches your sentiment.
            </div>
          </div>

          {/* AI Verdict Box */}
          <div className="bg-blue-950/20 border border-blue-500/20 p-4 rounded-lg space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Arbitrator Verdict:
            </div>
            <div className="font-mono text-sm font-bold text-white">
              {streamedText || <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse"></span>}
            </div>
            {streamedReason && (
              <p className="text-xs text-workspace-textSecondary leading-relaxed border-t border-workspace-border/50 pt-2 animate-fadeIn">
                {streamedReason}
              </p>
            )}
          </div>

          {/* Next Dilemma Trigger */}
          <button
            id="btn-next-dilemma"
            onClick={onNext}
            className="w-full py-2.5 px-4 bg-workspace-chipBg hover:bg-workspace-chipHover border border-workspace-border text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Load Next Dilemma Scenario
          </button>
        </div>
      )}
    </div>
  );
}
