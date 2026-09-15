import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  MapPin, 
  ShieldAlert, 
  Clock, 
  Star, 
  Compass, 
  Home, 
  Volume2, 
  VolumeX, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { BurgundyBow } from './PopGraphics';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isTripActive: boolean;
  onQuickSOS: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  isTripActive,
  onQuickSOS,
}) => {
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  // High-frequency safety siren synthesizer
  const toggleSiren = () => {
    if (sirenPlaying) {
      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch {
          // Ignore if already stopped
        }
      }
      setSirenPlaying(false);
      setOscillator(null);
    } else {
      try {
        const ctx = audioCtx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        if (!audioCtx) setAudioCtx(ctx);
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);

        // Siren frequency modulation (police / high alert wobble)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 4; // 4Hz wobble
        lfoGain.gain.value = 350;
        lfo.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        setOscillator(osc);
        setSirenPlaying(true);
      } catch (err) {
        console.warn('Audio siren could not start:', err);
      }
    }
  };

  const navItems: { id: ActiveTab; label: string; shortLabel: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'safemaps',
      label: 'Safe Maps',
      shortLabel: 'Map',
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: 'sos',
      label: 'SOS & Contacts',
      shortLabel: 'SOS',
      icon: <ShieldAlert className="w-5 h-5" />,
      badge: 'SOS',
    },
    {
      id: 'checkin',
      label: 'Are You Safe?',
      shortLabel: 'Safety',
      icon: <Clock className="w-5 h-5" />,
      badge: isTripActive ? 'ACTIVE' : undefined,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      shortLabel: 'Reviews',
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: 'nearbyservices',
      label: 'Nearby Services',
      shortLabel: 'Services',
      icon: <Compass className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-pink-200 px-4 py-2.5 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left Brand / Back Button */}
          <div className="flex items-center gap-2">
            {activeTab !== 'dashboard' ? (
              <button
                id="btn-back-to-dashboard"
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 hover:bg-pink-200 active:scale-95 text-pink-700 font-semibold text-xs sm:text-sm rounded-full transition-all border border-pink-300 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                id="btn-brand-home"
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 group text-left"
              >
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-pink-400">
                  <span className="text-xl">🌸</span>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-heading text-lg sm:text-xl font-black bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent tracking-tight">
                      AEGIS
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-sparkle" />
                  </div>
                  <p className="text-[10px] text-pink-600 font-semibold hidden sm:block leading-none italic">
                    for every woman who refuses to live in fear
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Center Location Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-pink-50/90 border border-pink-200 rounded-full text-xs text-pink-700 font-medium shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Kashmere Gate, Delhi (GPS Active)</span>
          </div>

          {/* Right Actions: Alarm Siren & Quick SOS */}
          <div className="flex items-center gap-2">
            {/* Loud Safety Siren Button */}
            <button
              id="btn-safety-siren"
              onClick={toggleSiren}
              title={sirenPlaying ? 'Stop Siren' : 'Trigger Loud Siren / Alarm'}
              className={`px-2.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                sirenPlaying
                  ? 'bg-red-600 text-white border-red-700 animate-pulse'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200'
              }`}
            >
              {sirenPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{sirenPlaying ? 'STOP SIREN' : 'Siren'}</span>
            </button>

            {/* Quick Emergency SOS Pill */}
            <button
              id="btn-quick-sos-top"
              onClick={onQuickSOS}
              className="px-3.5 py-1.5 bg-gradient-to-r from-red-500 via-rose-600 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5 border border-red-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span>EMERGENCY SOS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Left Side Icon Bar (Fixed) */}
      <aside className="hidden lg:flex fixed left-0 top-[57px] bottom-0 w-20 flex-col items-center py-6 bg-white/95 backdrop-blur-md border-r-2 border-pink-200 shadow-sm z-30 justify-between">
        {/* Top Logo / Home Button */}
        <div className="flex flex-col items-center gap-5 w-full">
          <button
            id="nav-side-home"
            onClick={() => setActiveTab('dashboard')}
            className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all group relative ${
              activeTab === 'dashboard'
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-300 scale-105'
                : 'text-pink-600 hover:bg-pink-100/70 hover:scale-105'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold mt-1">Home</span>
            {activeTab === 'dashboard' && (
              <span className="absolute -right-1 top-1 text-xs">✨</span>
            )}
          </button>

          <div className="w-10 h-0.5 bg-pink-100 rounded-full" />

          {/* 5 Primary Feature Icons */}
          <nav className="flex flex-col items-center gap-3 w-full px-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-side-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all relative group ${
                    isActive
                      ? 'bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-300/60 scale-105 ring-2 ring-pink-300'
                      : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50 hover:scale-102'
                  }`}
                >
                  <div className="relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 px-1 py-0.2 bg-red-500 text-white text-[9px] font-extrabold rounded-full animate-pulse border border-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-bold mt-1 tracking-tight text-center leading-tight line-clamp-1">
                    {item.shortLabel}
                  </span>

                  {/* Tooltip on hover */}
                  <span className="absolute left-16 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Decorative Bow */}
        <div className="flex flex-col items-center pb-2">
          <BurgundyBow size={36} />
          <span className="text-[9px] text-pink-500 font-black mt-1 tracking-wider">AEGIS</span>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Fixed) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-pink-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        <button
          id="nav-mobile-home"
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            activeTab === 'dashboard' ? 'text-pink-600 font-bold scale-105' : 'text-slate-500 hover:text-pink-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-mobile-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                isActive
                  ? 'text-pink-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-pink-500'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-red-500 text-white text-[8px] font-black rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 whitespace-nowrap font-medium">
                {item.shortLabel}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
