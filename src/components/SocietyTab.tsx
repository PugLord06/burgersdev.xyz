import { Award, BookOpen, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function SocietyTab() {
  return (
    <div id="panel-society" className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-workspace-sidebar border border-workspace-border p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Golden Key International Honour Society</h2>
              <p className="text-xs text-workspace-textMuted">Official invitation received based on GPA rankings</p>
            </div>
          </div>
          
          <div className="text-sm text-workspace-textSecondary space-y-3 leading-relaxed">
            <p>
              Golden Key is the world’s largest collegiate honor society. Membership is by invitation only and is limited to the top 15% of college and university sophomores, juniors, and seniors, as well as top-performing graduate students, based on academic performance.
            </p>
            <p>
              As a 3rd-year software engineering student at Eduvos, Michael Burgers was accepted in 2025 due to his cumulative grades placing him in the top percentile of his university network.
            </p>
          </div>

          <div className="pt-4 border-t border-workspace-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Global Recognition</span>
                <span className="text-workspace-textMuted">Affiliated with 400+ universities worldwide.</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Leadership & Growth</span>
                <span className="text-workspace-textMuted">Exclusive access to international scholarships and networks.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Institution Card */}
        <div className="bg-workspace-sidebar border border-workspace-border p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Eduvos (formerly Pearson Institute)</h2>
              <p className="text-xs text-workspace-textMuted">Bachelor of Science in Information Technology (Software Engineering)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-black/20 border border-workspace-border rounded-lg">
              <div className="text-workspace-textMuted font-medium mb-1">Campus</div>
              <div className="text-white flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-workspace-textMuted" /> Cape Town, ZA
              </div>
            </div>
            <div className="p-3 bg-black/20 border border-workspace-border rounded-lg">
              <div className="text-white flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-workspace-textMuted" /> 2024 - 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphical Invitation Representation */}
      <div className="bg-gradient-to-b from-purple-950/20 to-black border-2 border-purple-500/20 p-6 rounded-xl flex flex-col justify-between text-center relative overflow-hidden h-full">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
        
        <div className="space-y-4 my-auto py-6">
          <GraduationCap className="w-16 h-16 text-purple-400 mx-auto stroke-[1.5]" />
          <div className="space-y-1">
            <div className="text-xs tracking-widest text-purple-400 font-bold uppercase">Certificate of Invitation</div>
            <div className="text-xl font-bold text-white font-serif italic">Golden Key</div>
            <div className="text-[10px] text-workspace-textMuted uppercase tracking-wider">International Honour Society</div>
          </div>
          <div className="border-y border-workspace-border py-4 text-xs text-workspace-textSecondary leading-relaxed italic">
            "Recognizing outstanding academic achievement and fostering leadership, career development and community service."
          </div>
          <div className="text-[11px] text-workspace-textMuted">
            Recipient: <span className="text-white font-semibold block not-italic mt-0.5">Michael Burgers</span>
          </div>
        </div>
        
        <div className="text-[10px] text-purple-400/80 font-mono tracking-widest uppercase">
          SECTOR 15 - ACADEMIC TOP TIER
        </div>
      </div>
    </div>
  );
}
