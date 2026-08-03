import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/developerData';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function SettingsView() {
  const handleThemeChange = (themeColor: string) => {
    localStorage.setItem('workspace-theme', themeColor);
    document.documentElement.setAttribute('data-theme', themeColor);
  };

  return (
    <div id="settings-view" className="p-6 max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div className="border-b border-workspace-border pb-4 space-y-1">
        <h1 className="text-xl font-bold text-workspace-textActive tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-gray-400" /> Settings & Workspace Info
        </h1>
        <p className="text-xs text-workspace-textSecondary">Global IDE variables and profile diagnostic configurations.</p>
      </div>

      <div className="bg-workspace-sidebar border border-workspace-border rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-black/30 border border-workspace-border rounded-lg">
            <span className="text-workspace-textMuted block mb-1">Developer</span>
            <span className="text-white font-bold">{DEVELOPER_PROFILE.name}</span>
          </div>
          <div className="p-3.5 bg-black/30 border border-workspace-border rounded-lg">
            <span className="text-workspace-textMuted block mb-1">Region Node</span>
            <span className="text-white font-bold">{DEVELOPER_PROFILE.location}</span>
          </div>
          <div className="p-3.5 bg-black/30 border border-workspace-border rounded-lg col-span-2">
            <span className="text-workspace-textMuted block mb-1">Academic Status</span>
            <span className="text-white font-bold">{DEVELOPER_PROFILE.education}</span>
          </div>
        </div>

        <div className="border-t border-workspace-border/50 pt-4 space-y-3">
          <h3 className="text-xs font-bold text-workspace-textActive uppercase tracking-wider">Theme Colors Diagnostics</h3>
          
          <div className="flex flex-col gap-3">
            <div className="text-xs text-workspace-textMuted mb-1">Accent Color Selection</div>
            <div className="flex gap-3">
              <button 
                onClick={() => handleThemeChange('blue')}
                className="w-8 h-8 rounded-full bg-blue-500 hover:ring-2 hover:ring-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                title="Blue"
              />
              <button 
                onClick={() => handleThemeChange('emerald')}
                className="w-8 h-8 rounded-full bg-emerald-500 hover:ring-2 hover:ring-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                title="Emerald"
              />
              <button 
                onClick={() => handleThemeChange('purple')}
                className="w-8 h-8 rounded-full bg-purple-500 hover:ring-2 hover:ring-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                title="Purple"
              />
              <button 
                onClick={() => handleThemeChange('rose')}
                className="w-8 h-8 rounded-full bg-rose-500 hover:ring-2 hover:ring-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                title="Rose"
              />
              <button 
                onClick={() => handleThemeChange('amber')}
                className="w-8 h-8 rounded-full bg-amber-500 hover:ring-2 hover:ring-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                title="Amber"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-workspace-border/50 pt-4">
          <div className="p-4 bg-black/20 rounded-lg border border-workspace-border/50 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Status
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-workspace-textSecondary">
                <span>Kernel Version</span>
                <span className="font-mono bg-black/50 px-2 py-0.5 rounded text-workspace-textMuted">v4.1.9</span>
              </div>
              <div className="flex justify-between items-center text-workspace-textSecondary">
                <span>Uptime</span>
                <span className="font-mono bg-black/50 px-2 py-0.5 rounded text-workspace-textMuted">99.99%</span>
              </div>
              <div className="flex justify-between items-center text-workspace-textSecondary">
                <span>Active Network Connections</span>
                <span className="font-mono bg-black/50 px-2 py-0.5 rounded text-workspace-textMuted text-emerald-400 font-bold">Secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <a 
            href={DEVELOPER_PROFILE.githubUrl} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-workspace-bg border border-workspace-border rounded-lg hover:border-workspace-textMuted hover:text-white transition-colors text-workspace-textSecondary text-sm font-bold shadow-inner"
          >
            <GithubIcon />
            Initialize Remote Connection (GitHub)
          </a>
        </div>
      </div>
    </div>
  );
}
