import { Terminal } from 'lucide-react';

interface GeminiOutputNodeProps {
  systemInstruction: string;
  consoleLogs: string[];
  output: string;
  isRunning: boolean;
}

export default function GeminiOutputNode({
  systemInstruction,
  consoleLogs,
  output,
  isRunning
}: GeminiOutputNodeProps) {
  return (
    <div className="md:col-span-3 space-y-4 flex flex-col">
      {/* System Instruction Box */}
      <div className="bg-black/30 border border-workspace-border p-4 rounded-xl space-y-1.5">
        <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Loaded System Instructions</div>
        <p className="text-xs text-white font-mono leading-relaxed bg-black/40 p-2.5 rounded-lg border border-workspace-border">
          {systemInstruction}
        </p>
      </div>

      {/* Output Node Panel */}
      <div className="bg-workspace-editor border border-workspace-border rounded-xl flex-1 flex flex-col overflow-hidden min-h-[300px]">
        {/* Terminal logs header */}
        <div className="bg-workspace-sidebar border-b border-workspace-border px-4 py-2 flex items-center justify-between text-[10px] text-workspace-textMuted font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Compiler Node Logs</span>
          <span className="text-green-500 font-mono">ONLINE</span>
        </div>
        
        {/* Console Log Area */}
        <div className="p-4 font-mono text-[11px] text-workspace-textSecondary space-y-1 overflow-y-auto max-h-40 bg-black/40 border-b border-workspace-border flex-shrink-0">
          {consoleLogs.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-workspace-textMuted">[{idx + 1}]</span> {log}
            </div>
          ))}
          {consoleLogs.length === 0 && (
            <div className="text-workspace-textMuted italic">Terminal idle. Run the pipeline to view connection cycles.</div>
          )}
        </div>

        {/* Generated Text Area */}
        <div className="p-4 flex-1 overflow-y-auto bg-workspace-editor space-y-2">
          <span className="text-[10px] text-workspace-textMuted font-bold uppercase tracking-wider block">Generated Token Output</span>
          <div className="text-xs text-white leading-relaxed font-mono whitespace-pre-wrap">
            {output || (isRunning ? <span className="inline-block w-2 h-4 bg-indigo-400 animate-pulse"></span> : <span className="text-workspace-textMuted italic">No output generated yet. Run pipeline above.</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
