import { useState } from 'react';
import { Cpu, Layout, Server, Database, Code2, ArrowRight } from 'lucide-react';
import { TECH_ITEMS } from '../data/techItems';
import type { Tech } from '../data/techItems';

export default function TechStackView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'ai' | 'database'>('all');
  const [selectedTech, setSelectedTech] = useState<Tech | null>(TECH_ITEMS[0]);

  const filteredTechs = TECH_ITEMS.filter(
    tech => activeCategory === 'all' || tech.category === activeCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Layout className="w-4 h-4 text-sky-400" />;
      case 'backend': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'ai': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'database': return <Database className="w-4 h-4 text-amber-400" />;
      default: return <Code2 className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div id="tech-stack-container" className="p-6 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="border-b border-workspace-border pb-4 space-y-1">
        <h1 className="text-xl font-bold text-workspace-textActive tracking-tight flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-500" /> Technology Stack & Core Competencies
        </h1>
        <p className="text-xs text-workspace-textSecondary">
          An interactive index of Michael Burgers' engineering toolkits and practical project usecases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {(['all', 'frontend', 'backend', 'ai', 'database'] as const).map((cat) => (
              <button
                key={cat}
                id={`btn-tech-cat-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
                  activeCategory === cat
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                    : 'bg-workspace-sidebar border-workspace-border text-workspace-textSecondary hover:text-white hover:border-workspace-borderLight'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTechs.map((tech) => (
              <button
                key={tech.name}
                id={`btn-tech-item-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedTech(tech)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all duration-200 ${
                  selectedTech?.name === tech.name
                    ? 'bg-workspace-sidebar border-blue-500/50 blue-glow scale-[1.01]'
                    : 'bg-workspace-sidebar/50 border-workspace-border hover:border-workspace-borderLight hover:bg-workspace-sidebar'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(tech.category)}
                    <span className="text-sm font-semibold text-white">{tech.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-workspace-textMuted">{tech.level}%</span>
                </div>
                
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-workspace-sidebar border border-workspace-border rounded-xl p-5 space-y-5 h-fit relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

          {selectedTech ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2.5 pb-3 border-b border-workspace-border">
                {getCategoryIcon(selectedTech.category)}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{selectedTech.name}</h3>
                  <span className="text-[10px] text-workspace-textMuted uppercase font-semibold">Category: {selectedTech.category}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-workspace-textMuted uppercase font-bold tracking-widest block">Description</span>
                <p className="text-xs text-workspace-textSecondary leading-relaxed">
                  {selectedTech.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] text-workspace-textMuted uppercase font-bold tracking-widest block">Linked Project Integrations</span>
                <div className="space-y-1.5">
                  {selectedTech.projectsUsed.map(proj => (
                    <div 
                      key={proj} 
                      className="text-xs bg-black/30 border border-workspace-border px-3 py-2 rounded-lg text-white flex items-center justify-between font-mono hover:border-workspace-borderLight hover:bg-black/50 transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {proj}
                      </span>
                      <ArrowRight className="w-3 h-3 text-workspace-textMuted" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-workspace-border flex items-center justify-between text-xs">
                <span className="text-workspace-textSecondary font-medium">Confidence Level</span>
                <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{selectedTech.level}%</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-workspace-textMuted text-xs italic">
              Select a technology from the grid to inspect details and linked project modules.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
