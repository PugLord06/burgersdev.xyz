import { ACADEMIC_GRADES } from '../data/academicGrades';

export default function TranscriptTab() {
  return (
    <div id="panel-transcript" className="bg-workspace-sidebar border border-workspace-border rounded-xl overflow-hidden space-y-4">
      <div className="p-5 border-b border-workspace-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-workspace-textActive">Official Academic Transcript</h2>
          <p className="text-xs text-workspace-textMuted">Third Year modules performance records (Current Term)</p>
        </div>
        <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs font-semibold">
          Status: Active Distinction
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-workspace-border bg-black/20 text-workspace-textMuted text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Module Code</th>
              <th className="px-6 py-3 font-semibold">Module Subject</th>
              <th className="px-6 py-3 font-semibold text-right">Result Grade</th>
              <th className="px-6 py-3 font-semibold text-right">Standing Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-workspace-border/50">
            {ACADEMIC_GRADES.map((mod, idx) => (
              <tr key={idx} className="hover:bg-workspace-editor/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-semibold text-blue-400">{mod.code}</td>
                <td className="px-6 py-4 text-white font-medium">{mod.name}</td>
                <td className="px-6 py-4 text-right font-mono font-bold text-white">{mod.grade}</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1 text-xs text-green-400 bg-green-400/5 px-2 py-0.5 rounded border border-green-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> {mod.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-black/20 text-xs text-workspace-textSecondary border-t border-workspace-border flex items-center justify-between">
        <span>Eduvos Student ID: #EDV-2024-8891-MB</span>
        <span>Last Updated: June 2026</span>
      </div>
    </div>
  );
}
