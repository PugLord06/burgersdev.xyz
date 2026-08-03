import { useState } from 'react';
import { Award } from 'lucide-react';
import SocietyTab from '../components/SocietyTab';
import TranscriptTab from '../components/TranscriptTab';

export default function AcademicView() {
  const [activeTab, setActiveTab] = useState<'society' | 'transcript'>('society');

  return (
    <div id="academic-portal" className="p-6 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-workspace-border bg-gradient-to-r from-purple-950/40 via-workspace-editor to-blue-950/30 p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
              <Award className="w-3.5 h-3.5" /> Golden Key Society Invitee
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-workspace-textActive tracking-tight">Academic Standing & Credentials</h1>
            <p className="text-workspace-textSecondary max-w-xl text-sm leading-relaxed">
              Enrolled at Eduvos (Cape Town Campus). Maintaining an elite academic record, placing in the top 15% globally across his cohort.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-black/40 border border-workspace-border p-4 rounded-lg self-stretch md:self-auto justify-around">
            <div className="text-center px-4 border-r border-workspace-border">
              <div className="text-2xl font-bold text-purple-400">Top 15%</div>
              <div className="text-[10px] text-workspace-textMuted uppercase font-semibold">Academic Tier</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-blue-400">Distinction</div>
              <div className="text-[10px] text-workspace-textMuted uppercase font-semibold">Avg Standing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-workspace-border">
        <button
          id="btn-tab-society"
          onClick={() => setActiveTab('society')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'society'
              ? 'border-purple-500 text-workspace-textActive'
              : 'border-transparent text-workspace-textSecondary hover:text-workspace-textActive'
          }`}
        >
          🏆 Golden Key Invitation
        </button>
        <button
          id="btn-tab-transcript"
          onClick={() => setActiveTab('transcript')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'transcript'
              ? 'border-blue-500 text-workspace-textActive'
              : 'border-transparent text-workspace-textSecondary hover:text-workspace-textActive'
          }`}
        >
          🎓 Academic Record & Transcript
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'society' ? <SocietyTab /> : <TranscriptTab />}
    </div>
  );
}
