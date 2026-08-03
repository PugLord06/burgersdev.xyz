import { useState, useEffect, useRef } from 'react';

const BOOT_LINES = [
  { text: 'burgersdev BIOS v4.1.9 — System Initializing...', delay: 0, type: 'header' },
  { text: 'Copyright (c) 2024-2026 burgersdev. All rights reserved.', delay: 600, type: 'dim' },
  { text: '', delay: 400, type: 'blank' },
  { text: '> POST: Running power-on self tests...', delay: 800, type: 'system' },
  { text: '  Memory check .... 16384 MB OK', delay: 700, type: 'dim' },
  { text: '  CPU cores ....... 8 threads detected', delay: 500, type: 'dim' },
  { text: '  GPU ............. RTX Ready', delay: 500, type: 'dim' },
  { text: '', delay: 400, type: 'blank' },
  { text: '> Mounting workspace filesystem............', delay: 900, type: 'check', result: 'OK' },
  { text: '> Loading kernel modules...................', delay: 800, type: 'check', result: 'OK' },
  { text: '> Initializing secure environment..........', delay: 700, type: 'check', result: 'PASS' },
  { text: '> Authenticating developer identity........', delay: 1000, type: 'check', result: 'VERIFIED' },
  { text: '', delay: 300, type: 'blank' },
  { text: '── Runtime Stack ──────────────────────────────', delay: 600, type: 'divider' },
  { text: '', delay: 200, type: 'blank' },
  { text: '> Loading React v19.2.6 runtime............', delay: 800, type: 'check', result: 'OK' },
  { text: '> Compiling TypeScript engine..............', delay: 900, type: 'check', result: 'OK' },
  { text: '> Injecting TailwindCSS design tokens......', delay: 700, type: 'check', result: 'OK' },
  { text: '> Binding Vite HMR dev server..............', delay: 600, type: 'check', result: 'OK' },
  { text: '', delay: 300, type: 'blank' },
  { text: '── External Services ──────────────────────────', delay: 600, type: 'divider' },
  { text: '', delay: 200, type: 'blank' },
  { text: '> Connecting to GitHub remote..............', delay: 1000, type: 'check', result: 'LINKED' },
  { text: '> Syncing Google Calendar API..............', delay: 900, type: 'check', result: 'LIVE' },
  { text: '> Initializing Cal.com booking engine......', delay: 800, type: 'check', result: 'READY' },
  { text: '> Loading Gemini AI modules................', delay: 1000, type: 'check', result: 'ACTIVE' },
  { text: '> Starting dev server on port 3000........', delay: 700, type: 'check', result: 'LISTENING' },
  { text: '', delay: 400, type: 'blank' },
  { text: '── Build Output ──────────────────────────────', delay: 500, type: 'divider' },
  { text: '', delay: 200, type: 'blank' },
  { text: '  dist/index.html         2.88 kB  gzip: 1.19 kB', delay: 400, type: 'dim' },
  { text: '  dist/assets/index.css  67.86 kB  gzip: 11.69 kB', delay: 350, type: 'dim' },
  { text: '  dist/assets/index.js  473.91 kB  gzip: 142.96 kB', delay: 350, type: 'dim' },
  { text: '', delay: 300, type: 'blank' },
  { text: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%', delay: 1200, type: 'progress' },
  { text: '', delay: 400, type: 'blank' },
  { text: '✓ Built in 2.60s — 0 errors, 0 warnings.', delay: 600, type: 'success' },
  { text: '', delay: 300, type: 'blank' },
  { text: 'Welcome, Michael.', delay: 800, type: 'welcome' },
  { text: 'burgersdev workspace ready. Launching...', delay: 600, type: 'welcome' },
];

interface BootScreenProps {
  onBootComplete: () => void;
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Line-by-line reveal
  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      // All lines shown — pause for dramatic effect, then fade out
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(onBootComplete, 900);
      }, 1000);
      return;
    }

    const currentLine = BOOT_LINES[visibleLines];
    const timeout = setTimeout(() => {
      setVisibleLines(v => v + 1);

      // Auto-scroll terminal
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, currentLine.delay);

    return () => clearTimeout(timeout);
  }, [visibleLines, onBootComplete]);

  // Animate progress bar when it becomes visible
  useEffect(() => {
    const progressLineIndex = BOOT_LINES.findIndex(l => l.type === 'progress');
    if (visibleLines > progressLineIndex && progressLineIndex !== -1) {
      // Animate from 0 to 100 quickly
      let w = 0;
      const interval = setInterval(() => {
        w += 2;
        if (w > 100) {
          w = 100;
          clearInterval(interval);
        }
        setProgressWidth(w);
      }, 25);
      return () => clearInterval(interval);
    }
  }, [visibleLines]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'header': return 'text-blue-400 font-bold';
      case 'dim': return 'text-slate-600';
      case 'system': return 'text-cyan-400';
      case 'divider': return 'text-slate-600 font-bold';
      case 'check': return 'text-slate-400';
      case 'progress': return 'text-blue-500 font-bold';
      case 'success': return 'text-emerald-400 font-bold';
      case 'welcome': return 'text-white font-bold';
      default: return 'text-slate-500';
    }
  };

  const getResultColor = (result?: string) => {
    switch (result) {
      case 'PASS': return 'text-emerald-400';
      case 'OK': return 'text-emerald-400';
      case 'VERIFIED': return 'text-emerald-300';
      case 'LINKED': return 'text-sky-400';
      case 'LIVE': return 'text-green-400';
      case 'READY': return 'text-purple-400';
      case 'ACTIVE': return 'text-amber-400';
      case 'LISTENING': return 'text-cyan-400';
      default: return 'text-emerald-400';
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#0a0a0f] flex flex-col items-center justify-center transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)',
        backgroundSize: '100% 2px'
      }} />

      {/* Subtle CRT glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)'
      }} />

      {/* Terminal Window */}
      <div className="w-full max-w-2xl mx-4 relative">
        {/* Terminal Title Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#12121a] border border-[#1e293b] border-b-0 rounded-t-lg">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[11px] text-slate-500 font-mono ml-2">burgersdev@workspace ~ /portfolio-ide</span>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="bg-[#0e0e16] border border-[#1e293b] border-t-0 rounded-b-lg p-5 font-mono text-sm min-h-[350px] max-h-[450px] overflow-y-auto"
          style={{ textShadow: '0 0 8px rgba(59,130,246,0.15)' }}
        >
          {BOOT_LINES.slice(0, visibleLines).map((line, idx) => (
            <div key={idx} className={`leading-7 animate-fadeIn ${getLineColor(line.type)}`}>
              {line.type === 'progress' ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-[#1a1a2e] rounded-full overflow-hidden border border-[#1e293b]">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full transition-all duration-100 relative"
                      style={{ width: `${progressWidth}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </div>
                  </div>
                  <span className="text-blue-400 text-xs font-bold w-10 text-right">{progressWidth}%</span>
                </div>
              ) : line.type === 'check' ? (
                <span>
                  {line.text} <span className={`${getResultColor(line.result)}`}>[{line.result}]</span>
                </span>
              ) : line.type === 'blank' ? (
                <br />
              ) : (
                <span>{line.text}</span>
              )}
            </div>
          ))}

          {/* Blinking cursor */}
          {!isFadingOut && (
            <span className={`inline-block w-2 h-4 bg-blue-400 ml-0.5 translate-y-0.5 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
          )}
        </div>
      </div>

      {/* Skip hint */}
      <button 
        onClick={() => { setIsFadingOut(true); setTimeout(onBootComplete, 300); }}
        className="mt-6 text-[11px] text-slate-600 hover:text-slate-400 font-mono transition-colors cursor-pointer"
      >
        Press to skip ›
      </button>
    </div>
  );
}
