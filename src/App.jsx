import { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Users, Activity, Download, Copy, RefreshCw, 
  Search, SlidersHorizontal, ArrowUpDown,
  Mail, Phone, MapPin, Calendar, Github, Twitter, 
  Instagram, Info, X, ExternalLink, ShieldCheck, Heart, Zap,
  FileText, Trash2, Moon, Sun, Briefcase, GraduationCap,
  Globe, Languages, Star, Fingerprint, Lock, Shield, UserCheck,
  CheckCircle2, Circle, BarChart3, PieChart, Filter, Database,
  Cpu, HardDrive, Share2, Hexagon, Terminal, Radar, LayoutGrid,
  Wallet, Stethoscope, Brain, CreditCard, Crosshair, Award,
  Dna, Boxes, Compass
} from 'lucide-react';
import axios from 'axios';

// --- COMPONENTS ---

const NeuralDNA = ({ score }) => (
  <div className="flex gap-1 h-8 items-end">
    {[...Array(20)].map((_, i) => {
      const active = (i / 20) * 100 < score;
      return (
        <div 
          key={i} 
          className={`w-1 rounded-full transition-all duration-1000 ${active ? 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)] animate-neural-pulse' : 'bg-slate-800'}`}
          style={{ height: `${10 + Math.sin(i * 0.4) * 80}%`, animationDelay: `${i * 0.05}s` }}
        ></div>
      );
    })}
  </div>
);

const BentoBox = ({ title, icon: Icon, children, className = "", color = "sky" }) => {
  const colorMap = {
    sky: "border-sky-500/10 hover:border-sky-500/30 text-sky-400 bg-sky-500/5",
    emerald: "border-emerald-500/10 hover:border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    indigo: "border-indigo-500/10 hover:border-indigo-500/30 text-indigo-400 bg-indigo-500/5",
    rose: "border-rose-500/10 hover:border-rose-500/30 text-rose-400 bg-rose-500/5",
    amber: "border-amber-500/10 hover:border-amber-500/30 text-amber-400 bg-amber-500/5"
  };

  return (
    <div className={`glass-card p-5 rounded-3xl border group transition-all duration-500 relative overflow-hidden ${className} ${colorMap[color] || colorMap.sky}`}>
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 transition-transform group-hover:scale-105 duration-500`}>
          <Icon className="w-4 h-4" />
        </div>
        <h4 className="text-slate-100 text-[10px] font-bold uppercase tracking-widest italic">{title}</h4>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const ProfileModal = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700/50 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-[0_0_80px_rgba(14,165,233,0.1)] relative animate-in zoom-in-95 duration-300">
        
        {/* Decorative Circuitry */}
        <div className="absolute inset-0 circuit-bg opacity-[0.03] pointer-events-none"></div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] rounded-full transition-all z-10 border border-slate-700/50 group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>

        <div className="p-6 md:p-10 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10 border-b border-slate-800/80 pb-10">
            <div className="relative shrink-0 group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <img src={profile.avatar_url} alt={profile.username} className="relative w-32 h-32 md:w-40 md:h-40 rounded-[1.5rem] bg-slate-950 border-2 border-slate-800 shadow-xl object-cover" />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 p-2.5 rounded-xl border-[4px] border-slate-900 shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-50 tracking-tight italic uppercase">{profile.display_name}</h2>
                  <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-[10px] font-bold rounded-lg border border-sky-500/20 uppercase tracking-widest shadow-inner">
                    {profile.alias}
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <p className="text-sky-500 font-mono text-xl font-bold tracking-tight">@{profile.username}</p>
                  <div className="h-1.5 w-1.5 bg-slate-700 rounded-full"></div>
                  <p className="text-slate-500 font-mono text-sm uppercase tracking-widest font-semibold">{profile.gender}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Mail, label: profile.email },
                  { icon: Phone, label: profile.phone },
                  { icon: MapPin, label: `${profile.city}, ${profile.country}` },
                  { icon: Calendar, label: `${profile.dob} (${profile.age} yrs)` }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center md:justify-start gap-3 group transition-all">
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/30 transition-all">
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors tracking-tight truncate w-full">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <Dna className="w-4 h-4 text-sky-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural DNA Integrity</span>
                  </div>
                  <span className="text-lg font-bold text-sky-400 font-mono italic">{profile.trust_score}%</span>
                </div>
                <NeuralDNA score={profile.trust_score} />
              </div>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Medical Data */}
            <BentoBox title="Medical Diagnostics" icon={Stethoscope} color="rose" className="lg:row-span-1">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Blood Type</p>
                    <p className="text-sm font-bold text-rose-400 italic">{profile.medical.blood_type}</p>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Heart Rate</p>
                    <p className="text-sm font-bold text-rose-400 italic">{profile.medical.heart_rate} <span className="text-[10px] not-italic text-slate-500">BPM</span></p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">Neural Stability</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-950 rounded-full h-1 border border-slate-800/50 overflow-hidden">
                      <div className="h-full bg-rose-500/50 w-[75%] shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
                    </div>
                    <span className="text-[10px] font-bold text-rose-400">{profile.medical.neural_stability}</span>
                  </div>
                </div>
              </div>
            </BentoBox>

            {/* Financial Data */}
            <BentoBox title="Financial Profile" icon={Wallet} color="emerald" className="lg:row-span-1">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Balance</p>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold rounded border border-emerald-500/20">{profile.financial.tier}</span>
                </div>
                <p className="text-xl font-bold text-slate-50 italic tracking-tight">
                  {profile.financial.balance} <span className="text-emerald-500 text-[10px] uppercase not-italic tracking-widest ml-1">{profile.financial.currency}</span>
                </p>
                <div className="pt-3 border-t border-slate-800/50 flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-emerald-500/50" />
                  <p className="text-[10px] font-medium text-slate-400 truncate">{profile.financial.bank}</p>
                </div>
              </div>
            </BentoBox>

            {/* Citizenship & Record */}
            <BentoBox title="Citizenship" icon={Award} color="sky" className="lg:row-span-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
                  <ShieldCheck className="w-6 h-6 text-sky-500/40" />
                  <div>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">Clearance</p>
                    <p className="text-xs font-bold text-sky-400 italic">{profile.citizenship.clearance}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Status</p>
                    <p className="text-[10px] font-medium text-slate-300 uppercase italic truncate">{profile.citizenship.status}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Record</p>
                    <p className={`text-[10px] font-medium uppercase italic truncate ${profile.citizenship.record === 'Clean' ? 'text-emerald-500' : 'text-rose-500'}`}>{profile.citizenship.record}</p>
                  </div>
                </div>
              </div>
            </BentoBox>

            {/* Psycho-Analysis */}
            <BentoBox title="Cognitive Evaluation" icon={Brain} color="indigo" className="lg:row-span-1">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Behavioral Alignment</p>
                  <p className="text-sm font-bold text-indigo-400 italic uppercase tracking-tight">{profile.psychological.alignment}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/50">
                  <div>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Core Drive</p>
                    <p className="text-[10px] font-medium text-slate-300 italic uppercase truncate">{profile.psychological.core_drive}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Stress Tol.</p>
                    <p className="text-[10px] font-medium text-indigo-300 italic uppercase truncate">{profile.psychological.stress_tolerance}</p>
                  </div>
                </div>
              </div>
            </BentoBox>

            {/* Equipment & Transport */}
            <BentoBox title="Hardware Loadout" icon={Boxes} color="amber" className="lg:row-span-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4 text-amber-500/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">Primary Tool</p>
                    <p className="text-[11px] font-medium text-slate-100 uppercase italic truncate">{profile.equipment.handheld}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 text-amber-500/50" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">Transport</p>
                    <p className="text-[11px] font-medium text-slate-100 uppercase italic truncate">{profile.equipment.transport}</p>
                  </div>
                </div>
              </div>
            </BentoBox>

            {/* Bio Manifest (Large Box) */}
            <BentoBox title="Identity Manifest" icon={Fingerprint} color="sky" className="lg:col-span-1">
              <p className="text-sm text-slate-300 leading-relaxed italic font-serif tracking-tight">
                "{profile.bio}"
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.personality_traits.map((trait, i) => (
                  <span key={i} className="text-[9px] font-bold text-sky-500 px-2 py-1 bg-sky-500/5 border border-sky-500/20 rounded-md uppercase tracking-widest">{trait}</span>
                ))}
              </div>
            </BentoBox>

          </div>

          {/* Experience & Education Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-800/80">
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 shadow-sm">
                  <Briefcase className="w-4 h-4 text-amber-500" />
                </div>
                <h4 className="text-slate-100 text-xs font-bold uppercase tracking-widest italic">Work History</h4>
              </div>
              <div className="space-y-4">
                {profile.experience?.map((exp, i) => (
                  <div key={i} className="glass-card p-4 rounded-xl border border-slate-800/40 hover:border-amber-500/30 transition-all border-l-4 border-l-amber-500/20 hover:border-l-amber-500">
                    <p className="text-amber-500 font-bold text-sm mb-1 uppercase tracking-tight">{exp.role}</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{exp.company} // {exp.years} Epochs</p>
                    <p className="text-slate-500 text-xs mt-3 border-t border-slate-800/60 pt-3 leading-relaxed italic">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 shadow-sm">
                  <GraduationCap className="w-4 h-4 text-emerald-500" />
                </div>
                <h4 className="text-slate-100 text-xs font-bold uppercase tracking-widest italic">Academic Nodes</h4>
              </div>
              <div className="glass-card p-5 rounded-xl border border-slate-800/40 border-l-4 border-l-emerald-500/20 hover:border-l-emerald-500 transition-all">
                <p className="text-emerald-400 font-bold text-sm mb-1 uppercase tracking-tight">{profile.education?.degree}</p>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">{profile.education?.institution}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold rounded-lg border border-emerald-500/20 uppercase tracking-widest">
                  <Award className="w-3 h-3" /> CLASS_{profile.education?.year}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsDashboard = ({ profiles }) => {
  const stats = useMemo(() => {
    if (!profiles.length) return null;
    const avgAge = Math.round(profiles.reduce((acc, p) => acc + p.age, 0) / profiles.length);
    const avgTrust = Math.round(profiles.reduce((acc, p) => acc + p.trust_score, 0) / profiles.length);
    const topSkills = Object.entries(
      profiles.flatMap(p => p.skills).reduce((acc, s) => {
        acc[s] = (acc[s] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1]).slice(0, 3);

    return { avgAge, avgTrust, topSkills };
  }, [profiles]);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="glass-card p-5 rounded-2xl flex items-center gap-4 border-sky-500/10 hover:border-sky-500/30 transition-all group overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 group-hover:scale-110 transition-transform">
          <Activity className="w-5 h-5 text-sky-400" />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Avg Neural Age</p>
          <p className="text-xl font-bold text-slate-50 italic">{stats.avgAge} <span className="text-sky-500 text-[10px] uppercase not-italic tracking-widest ml-1">Cycles</span></p>
        </div>
      </div>
      <div className="glass-card p-5 rounded-2xl flex items-center gap-4 border-emerald-500/10 hover:border-emerald-500/30 transition-all group overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Fleet Integrity</p>
          <p className="text-xl font-bold text-slate-50 italic">{stats.avgTrust}<span className="text-emerald-500 text-sm ml-0.5">%</span></p>
        </div>
      </div>
      <div className="glass-card p-5 rounded-2xl flex items-center gap-4 border-indigo-500/10 hover:border-indigo-500/30 transition-all group overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
          <Zap className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="relative z-10 flex-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Specialization</p>
          <div className="flex gap-1.5 flex-wrap">
            {stats.topSkills.map(([skill]) => (
              <span key={skill} className="text-[9px] font-medium text-indigo-300 px-1.5 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/20 uppercase">
                {skill.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="glass-card rounded-3xl p-6 border border-slate-800 animate-pulse">
    <div className="flex items-start gap-5">
      <div className="w-20 h-20 rounded-2xl bg-slate-800 shrink-0"></div>
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-slate-800 rounded-lg w-2/3"></div>
        <div className="h-4 bg-slate-800 rounded-md w-1/2"></div>
        <div className="h-16 bg-slate-800 rounded-xl w-full mt-4"></div>
      </div>
    </div>
  </div>
);

const ProfileCard = ({ profile, onOpen, isSelected, onToggleSelect }) => (
  <div 
    className={`glass-card hover:bg-slate-900/80 transition-all duration-300 rounded-3xl p-6 border ${isSelected ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-[0_0_20px_rgba(14,165,233,0.15)]' : 'border-slate-800/60 hover:border-sky-500/30'} group relative overflow-hidden flex flex-col h-full shadow-lg`}
  >
    <div className="absolute top-0 right-0 p-5 flex items-center gap-2.5 z-20">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect(profile.id);
        }}
        className={`p-1.5 rounded-lg border transition-all duration-300 ${isSelected ? 'bg-sky-500 border-sky-400 text-slate-950 scale-105 shadow-[0_0_10px_rgba(14,165,233,0.4)]' : 'bg-slate-950/80 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600'}`}
      >
        {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
      </button>
      <button 
        onClick={() => onOpen(profile)}
        className="p-1.5 bg-slate-950/80 hover:bg-sky-500 rounded-lg border border-slate-800 hover:border-sky-400 text-slate-500 hover:text-slate-950 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 shadow-lg"
      >
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
    
    <div className="flex gap-5 items-start mb-5 cursor-pointer relative z-10" onClick={() => onOpen(profile)}>
      <div className="relative shrink-0">
        <div className="absolute -inset-1.5 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
        <img src={profile.avatar_url} alt={profile.username} className="relative w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-sky-500/50 transition-all duration-300 object-cover shadow-md" />
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-md border-[2px] border-slate-900 flex items-center justify-center">
          <ShieldCheck className="w-3 h-3" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0 pt-1 space-y-1.5">
        <h3 className="text-xl font-bold text-slate-100 truncate group-hover:text-sky-400 transition-colors tracking-tight italic uppercase">{profile.display_name}</h3>
        <p className="text-xs text-sky-500 font-mono font-medium tracking-widest uppercase opacity-90">@{profile.username}</p>
        
        <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <MapPin className="w-3 h-3 text-sky-500/50" />
          <span className="truncate">{profile.city}, {profile.country}</span>
        </div>
      </div>
    </div>

    <div className="flex-1 cursor-pointer relative z-10" onClick={() => onOpen(profile)}>
      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed italic font-serif group-hover:text-slate-300 transition-colors">
        "{profile.bio}"
      </p>
    </div>
    
    <div className="mt-5 flex flex-wrap gap-2 relative z-10">
      {profile.skills?.slice(0, 3).map((skill, i) => (
        <span key={i} className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 bg-slate-950/80 border border-slate-800 group-hover:text-sky-400 group-hover:border-sky-500/40 group-hover:bg-sky-500/5 transition-all rounded-md">
          {skill}
        </span>
      ))}
      {(profile.skills?.length > 3) && (
        <span className="text-[9px] font-bold text-slate-600 self-center ml-1 uppercase">+{profile.skills.length - 3}</span>
      )}
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('neurogrid_profiles');
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('neurogrid_theme') || 'cyberpunk');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(12);
  const [apiStatus, setApiStatus] = useState('checking');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest'); 
  const [filterGender, setFilterGender] = useState('all');

  useEffect(() => localStorage.setItem('neurogrid_profiles', JSON.stringify(profiles)), [profiles]);
  useEffect(() => localStorage.setItem('neurogrid_theme', theme), [theme]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const checkStatus = async () => {
      try { await axios.get('/api/health'); setApiStatus('online'); }
      catch { setApiStatus('offline'); }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const generateProfiles = async () => {
    if (count < 1 || count > 1000) { toast.error('Count range error: [1-1000]'); return; }
    setLoading(true);
    setSearchQuery('');
    setSelectedIds(new Set());
    try {
      const res = await axios.get(`/api/profiles?count=${count}`);
      setProfiles(res.data.data);
      toast.success(`Matrix Loaded: ${res.data.count} units`);
    } catch (error) {
      toast.error('Synthesis Interrupt: Connection severed');
    } finally { setLoading(false); }
  };

  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectAll = () => {
    if (selectedIds.size === filteredProfiles.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredProfiles.map(p => p.id)));
  };

  const deleteSelected = () => {
    if (!selectedIds.size) return;
    setProfiles(profiles.filter(p => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
    toast.success(`${selectedIds.size} Records Purged`);
  };

  const downloadSelected = (format = 'json') => {
    const targets = selectedIds.size > 0 
      ? profiles.filter(p => selectedIds.has(p.id)) 
      : profiles;
    
    if (!targets.length) return;

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(targets, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neural_export_${Date.now()}.json`;
      a.click();
    } else {
      const headers = ['id', 'username', 'display_name', 'email', 'phone', 'age', 'country', 'city', 'trust_score'];
      const csv = [headers.join(','), ...targets.map(p => headers.map(h => `"${p[h] || ''}"`).join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neural_export_${Date.now()}.csv`;
      a.click();
    }
    toast.success(`Exporting ${targets.length} units`);
  };

  const filteredProfiles = useMemo(() => {
    let result = [...profiles];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(p => 
        p.display_name.toLowerCase().includes(q) ||
        p.username.toLowerCase().includes(q) ||
        p.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (filterGender !== 'all') {
      result = result.filter(p => p.gender.toLowerCase() === filterGender.toLowerCase());
    }
    if (sortBy === 'a-z') result.sort((a, b) => a.display_name.localeCompare(b.display_name));
    else if (sortBy === 'z-a') result.sort((a, b) => b.display_name.localeCompare(a.display_name));
    else if (sortBy === 'trust') result.sort((a, b) => b.trust_score - a.trust_score);
    return result;
  }, [profiles, debouncedSearch, sortBy, filterGender]);

  return (
    <div className="min-h-screen p-4 md:p-10 font-sans selection:bg-sky-500/30 bg-slate-950 text-slate-200 overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent z-50"></div>
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-sky-500/10 blur-[120px] rounded-full animate-neural-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-neural-pulse delay-1000"></div>
        <div className="absolute top-0 left-0 w-full h-full circuit-bg opacity-10"></div>
      </div>

      <Toaster position="top-right" toastOptions={{
        style: { 
          background: 'rgba(15, 23, 42, 0.9)', 
          backdropFilter: 'blur(12px)',
          color: '#f8fafc', 
          border: '1px solid rgba(14, 165, 233, 0.2)', 
          borderRadius: '1rem', 
          padding: '1rem', 
          fontWeight: 'bold',
          fontSize: '13px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }
      }}/>
      
      <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 border-b border-slate-900 pb-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="p-4 bg-sky-500 rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                <Users className="w-8 h-8 text-slate-950 relative z-10" />
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic flex items-center justify-center md:justify-start gap-3">
                  Neuro<span className="text-sky-500">Grid</span>
                  <Hexagon className="w-6 h-6 text-sky-500/40 animate-spin-slow" />
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="h-1 w-12 bg-sky-500/50 rounded-full"></div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] italic">Identity Forge v4.0</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-4 px-5 py-2.5 bg-slate-900/50 rounded-xl border border-slate-800/80 backdrop-blur-md">
              <div className="relative">
                <Radar className={`w-5 h-5 ${apiStatus === 'online' ? 'text-emerald-400 animate-pulse' : 'text-rose-500'}`} />
                {apiStatus === 'online' && <div className="absolute inset-0 bg-emerald-400/30 blur-md rounded-full"></div>}
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-none">Status</p>
                <p className={`text-[10px] font-bold uppercase tracking-widest leading-none ${apiStatus === 'online' ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {apiStatus === 'online' ? 'ONLINE' : 'OFFLINE'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setTheme(t => t === 'cyberpunk' ? 'modern' : 'cyberpunk')}
              className="p-3 bg-slate-900/50 hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors text-slate-400 hover:text-sky-400 backdrop-blur-md"
            >
              {theme === 'cyberpunk' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-6 md:p-8 rounded-3xl space-y-8 sticky top-6">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-sky-500" /> Settings
                  </label>
                  <span className="px-2 py-1 bg-slate-950 rounded border border-slate-800 text-[9px] font-mono text-sky-500">AUTO</span>
                </div>
                
                <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800/60">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium text-slate-400">Generation Load</span>
                    <span className="text-xl font-bold text-sky-400 font-mono">{count}</span>
                  </div>
                  <input 
                    type="range" 
                    value={count} 
                    onChange={e => setCount(Number(e.target.value))}
                    min="1" max="100"
                    className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-sky-500"
                  />
                  <div className="flex justify-between mt-3 text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                    <span>1 Unit</span>
                    <span>100 Units</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={generateProfiles}
                disabled={loading || apiStatus === 'offline'}
                className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 text-slate-950 font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] flex items-center justify-center gap-3"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
                <span className="text-lg uppercase tracking-tight">{loading ? 'Working...' : 'Generate'}</span>
              </button>

              {profiles.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-slate-800/60">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Batch Tools</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => downloadSelected('json')} className="flex items-center justify-center gap-2 py-3 bg-slate-800/50 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors border border-slate-700">
                      <Download className="w-4 h-4" /> JSON
                    </button>
                    <button onClick={() => downloadSelected('csv')} className="flex items-center justify-center gap-2 py-3 bg-slate-800/50 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors border border-slate-700">
                      <FileText className="w-4 h-4" /> CSV
                    </button>
                  </div>
                  <button onClick={deleteSelected} className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold rounded-xl transition-colors border border-rose-500/20">
                    <Trash2 className="w-4 h-4" /> Clear Selected ({selectedIds.size || profiles.length})
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8 space-y-8">
            <StatsDashboard profiles={profiles} />

            {profiles.length > 0 ? (
              <>
                <div className="flex flex-col md:flex-row gap-4 glass-card p-4 rounded-2xl border border-slate-800/60 shadow-lg">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input 
                      type="text" 
                      placeholder="Search entities..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-200 focus:outline-none focus:border-sky-500/50 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="relative">
                      <select 
                        value={filterGender} 
                        onChange={e => setFilterGender(e.target.value)}
                        className="appearance-none bg-slate-950/80 border border-slate-800/80 rounded-xl pl-4 pr-10 py-3 text-xs font-medium text-slate-400 focus:outline-none focus:border-sky-500/50 cursor-pointer min-w-[120px]"
                      >
                        <option value="all">All Genders</option>
                        <option value="masculine">Masculine</option>
                        <option value="feminine">Feminine</option>
                        <option value="android">Synthetic</option>
                      </select>
                      <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select 
                        value={sortBy} 
                        onChange={e => setSortBy(e.target.value)}
                        className="appearance-none bg-slate-950/80 border border-slate-800/80 rounded-xl pl-4 pr-10 py-3 text-xs font-medium text-slate-400 focus:outline-none focus:border-sky-500/50 cursor-pointer min-w-[120px]"
                      >
                        <option value="newest">Latest</option>
                        <option value="trust">Trust Score</option>
                        <option value="a-z">Name A-Z</option>
                      </select>
                      <ArrowUpDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center px-2">
                  <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                    Showing {filteredProfiles.length} of {profiles.length}
                  </p>
                  <button 
                    onClick={selectAll}
                    className="text-[11px] font-bold text-sky-500 uppercase tracking-widest hover:text-sky-400 transition-colors flex items-center gap-2"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    {selectedIds.size === filteredProfiles.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loading ? (
                    [...Array(6)].map((_, i) => <SkeletonLoader key={i} />)
                  ) : filteredProfiles.length > 0 ? (
                    filteredProfiles.map(p => (
                      <ProfileCard 
                        key={p.id} 
                        profile={p} 
                        isSelected={selectedIds.has(p.id)}
                        onToggleSelect={toggleSelect}
                        onOpen={setSelectedProfile} 
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 glass-card rounded-3xl border-2 border-slate-800/40 border-dashed">
                      <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-400 tracking-tight">No results</h3>
                      <p className="text-slate-500 mt-2 text-sm">Adjust filters or search query.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center glass-card rounded-3xl border border-slate-800/50 p-12 text-center">
                <Cpu className="w-16 h-16 text-slate-700 mb-6" />
                <h2 className="text-2xl font-bold text-slate-300 mb-2">Database Empty</h2>
                <p className="max-w-sm text-slate-500 text-sm leading-relaxed mb-8">
                  Configure the generation load in the sidebar and click generate to populate the matrix.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="max-w-6xl mx-auto mt-20 pb-10 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">© 2026 NeuroGrid Systems</p>
        <div className="flex gap-6">
          {['Docs', 'API', 'Status'].map(link => (
            <a key={link} href="#" className="text-[10px] font-bold text-slate-600 hover:text-sky-500 transition-colors uppercase tracking-widest">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
