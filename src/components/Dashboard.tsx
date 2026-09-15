import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  Search, 
  X, 
  MapPin, 
  ShieldAlert, 
  Clock, 
  Star, 
  Compass, 
  Sparkles, 
  ArrowRight,
  Send,
  MessageCircleQuestion,
  ChevronRight
} from 'lucide-react';
import { 
  BurgundyBow, 
  PinkDiscoBall, 
  PinkScrunchie, 
  SparkleStar, 
  CategoryPillIcon, 
  RibbonGarland,
  AegisShieldSticker,
  GirlPowerSticker,
  StaySafeHeartSticker,
  CutePepperSpraySticker,
  HeartSunglassesSticker,
  PinkTicketSticker
} from './PopGraphics';

interface DashboardProps {
  onSelectTab: (tab: ActiveTab) => void;
  onSelectNearbyCategory: (category: string) => void;
  onSearchDestination: (query: string) => void;
  isTripActive: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectTab,
  onSelectNearbyCategory,
  onSearchDestination,
  isTripActive,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchDestination(searchQuery.trim());
      onSelectTab('safemaps');
    }
  };

  const handleQuickQuestion = (q: string) => {
    setAiQuestion(q);
    setIsAnswering(true);
    setTimeout(() => {
      setIsAnswering(false);
      if (q.includes('college') || q.includes('safest')) {
        setAiAnswer('✨ Safest route to college: Take the Boulevard road via Metro Gate 1. It has 98% working LED lights, 2 police kiosks, and 24/7 student eateries! Avoid the dark underpass route.');
      } else if (q.includes('pharmacy') || q.includes('medicine')) {
        setAiAnswer('💊 Apollo 24/7 Pharmacy is just 280m away with safe night window service and security guard on duty.');
      } else if (q.includes('washroom') || q.includes('toilet')) {
        setAiAnswer('🌸 Clean Pink Toilet for women is available 200m away next to Metro Gate 1 in a bright plaza.');
      } else {
        setAiAnswer('💖 All clear! This area has high active police patrolling and vibrant street lights. Stay on main thoroughfares!');
      }
    }, 600);
  };

  const mainFeatures = [
    {
      id: 'safemaps' as ActiveTab,
      name: 'Safe Maps',
      subtitle: 'Safety-Aware Navigation & Heatmaps',
      icon: '🗺️',
      color: 'from-pink-500 to-rose-500',
      badge: 'Heatmaps',
      badgeColor: 'bg-emerald-500',
      highlight: 'Avoid dark alleys & check live streetlights',
    },
    {
      id: 'sos' as ActiveTab,
      name: 'SOS & Trusted Contacts',
      subtitle: 'Instant Alert Broadcast & Hotlines',
      icon: '🚨',
      color: 'from-red-500 to-pink-600',
      badge: 'Emergency',
      badgeColor: 'bg-red-500',
      highlight: 'One-tap Police 112, Helpline 1091 & location share',
    },
    {
      id: 'checkin' as ActiveTab,
      name: 'Are You Safe?',
      subtitle: 'Periodic 15-20 Min Journey Check-In',
      icon: '⏱️',
      color: 'from-fuchsia-500 to-pink-500',
      badge: isTripActive ? 'ACTIVE TRIP' : 'Auto-Alert',
      badgeColor: isTripActive ? 'bg-emerald-500' : 'bg-purple-500',
      highlight: 'Automatic alert to friends if you miss a check-in',
    },
    {
      id: 'reviews' as ActiveTab,
      name: 'Reviews',
      subtitle: 'Area Safety Ratings by Women',
      icon: '⭐',
      color: 'from-pink-400 to-purple-500',
      badge: 'Verified',
      badgeColor: 'bg-pink-500',
      highlight: 'Crowd, lighting & rickshaw fares rated by travelers',
    },
    {
      id: 'nearbyservices' as ActiveTab,
      name: 'Nearby Services',
      subtitle: 'Police, Clean Washrooms, 24/7 Meds',
      icon: '🏥',
      color: 'from-rose-400 to-pink-500',
      badge: '8 Categories',
      badgeColor: 'bg-rose-500',
      highlight: 'Safe havens, metro hubs & women-staffed places',
    },
  ];

  const quickCategories: {
    category: 'police' | 'bus' | 'washroom' | 'hospital' | 'pharmacy' | 'metro' | 'petrol' | 'hotel';
    label: string;
  }[] = [
    { category: 'police', label: 'Police Station' },
    { category: 'bus', label: 'Bus Station' },
    { category: 'washroom', label: 'Washroom' },
    { category: 'hospital', label: 'Hospital' },
    { category: 'pharmacy', label: 'Pharmacy' },
    { category: 'metro', label: 'Metro Station' },
    { category: 'petrol', label: 'Petrol Pump' },
    { category: 'hotel', label: 'Hotels' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gingham overflow-hidden pb-20 pt-3 px-3 sm:px-6">
      {/* Corner Satin Bows matching Screenshot 1 */}
      <BurgundyBow className="absolute top-2 left-2 z-10 rotate-[-12deg]" size={64} />
      <BurgundyBow className="absolute bottom-24 right-2 z-10 rotate-[14deg]" size={68} />

      {/* Floating Pink Scrunchies / Flower Rosettes */}
      <div className="absolute top-16 right-36 hidden sm:block animate-float">
        <PinkScrunchie size={46} />
      </div>
      <div className="absolute top-36 left-48 hidden md:block animate-float" style={{ animationDelay: '1.5s' }}>
        <PinkScrunchie size={42} />
      </div>
      <div className="absolute bottom-40 right-20 hidden lg:block animate-float" style={{ animationDelay: '2.5s' }}>
        <PinkScrunchie size={38} />
      </div>

      {/* Floating Sparkle Stars */}
      <SparkleStar className="absolute top-12 left-1/3 animate-sparkle" size={24} color="#FF1493" />
      <SparkleStar className="absolute top-24 right-1/4 animate-sparkle" size={20} color="#FF69B4" />
      <SparkleStar className="absolute top-44 left-16 animate-sparkle" size={22} color="#D946EF" />
      <SparkleStar className="absolute bottom-60 right-1/3 animate-sparkle" size={26} color="#EC4899" />
      <SparkleStar className="absolute bottom-32 left-1/4 animate-sparkle" size={18} color="#FF2E93" />

      {/* Floating Pop Stickers */}
      <div className="absolute top-6 left-1/4 hidden md:block rotate-[-8deg] hover:rotate-0 transition-transform cursor-pointer">
        <AegisShieldSticker size={64} />
      </div>
      <div className="absolute top-8 right-24 hidden sm:block rotate-[10deg] hover:rotate-0 transition-transform cursor-pointer">
        <GirlPowerSticker size={68} />
      </div>
      <div className="absolute bottom-48 left-6 hidden lg:block rotate-[-12deg] hover:rotate-0 transition-transform cursor-pointer">
        <CutePepperSpraySticker size={64} />
      </div>
      <div className="absolute bottom-32 right-12 hidden md:block rotate-[8deg] hover:rotate-0 transition-transform cursor-pointer">
        <StaySafeHeartSticker size={58} />
      </div>
      <div className="absolute top-48 right-6 hidden xl:block rotate-[-6deg] hover:scale-110 transition-transform cursor-pointer">
        <HeartSunglassesSticker size={64} />
      </div>
      <div className="absolute bottom-16 left-28 hidden lg:block rotate-[6deg] hover:rotate-0 transition-transform cursor-pointer">
        <PinkTicketSticker size={74} />
      </div>

      {/* Floating Disco Balls matching Screenshot 1 */}
      <div className="absolute top-36 left-4 sm:left-14 animate-disco z-0 pointer-events-none">
        <PinkDiscoBall size={105} />
      </div>
      <div className="absolute top-20 right-4 sm:right-16 animate-disco z-0 pointer-events-none" style={{ animationDelay: '1.2s' }}>
        <PinkDiscoBall size={115} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-6 sm:space-y-7">
        {/* Brand Banner with Tagline */}
        <div className="flex flex-col items-center justify-center text-center pt-1 pb-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/95 border-2 border-pink-300 rounded-full shadow-sm">
            <span className="text-base">🛡️</span>
            <span className="font-heading font-black text-pink-600 tracking-wider text-sm sm:text-base">AEGIS</span>
            <span className="text-pink-300">•</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 italic">
              for every woman who refuses to live in fear
            </span>
            <span className="text-pink-500 animate-sparkle">✨</span>
          </div>
        </div>

        {/* Top Search & Location Header matching Screenshot 1 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          {/* Main Search Input Pill */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 relative flex items-center bg-white border-2 border-pink-300 rounded-full shadow-md hover:shadow-lg focus-within:border-pink-500 transition-all px-4 py-2 sm:py-2.5"
          >
            <Search className="w-5 h-5 text-pink-500 mr-2.5 shrink-0" />
            <input
              id="input-dashboard-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where are you going?"
              className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-medium text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-pink-600 p-1 mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="ml-2 px-3.5 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm rounded-full hover:opacity-95 shadow-xs"
            >
              Go
            </button>
          </form>

          {/* Automatic Location Detected Badge */}
          <div className="flex items-center justify-center gap-2 bg-white/95 border-2 border-pink-300 rounded-full px-4 py-2 sm:py-2.5 shadow-sm">
            <span className="text-red-500 font-bold animate-bounce">📍</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              Automatic Location Detected
            </span>
          </div>
        </div>

        {/* Center Prompt Card matching Screenshot 1: "What do you want to know? 💬" */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-300 rounded-2xl p-5 sm:p-6 shadow-md text-center max-w-2xl mx-auto space-y-3 relative">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 font-heading">
              What do you want to know?
            </h2>
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
              <MessageCircleQuestion className="w-5 h-5" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600">
            Ask about street lighting, route crowd density, late-night auto stands, or quick emergency help!
          </p>

          {/* Instant Quick Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {[
              'Safest route to college? 🎓',
              'Well-lit roads home tonight? 💡',
              'Find 24/7 pharmacy 💊',
              'Clean pink washroom nearby 🌸',
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(prompt)}
                className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 text-xs font-semibold rounded-full transition-all active:scale-95 shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Interactive Answer Box */}
          {aiAnswer && (
            <div className="mt-3 p-3.5 bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-300 rounded-xl text-left text-xs sm:text-sm text-slate-700 font-medium relative animate-fadeIn">
              <div className="flex items-start gap-2">
                <span className="text-pink-500 font-bold text-base">🌸</span>
                <div className="flex-1">{aiAnswer}</div>
                <button
                  onClick={() => setAiAnswer(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 5 Main Clickable Logo-Style Feature Hero Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-pink-900 flex items-center gap-1.5 font-heading">
              <span>Safety Features & Navigation</span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </h3>
            <span className="text-xs text-pink-600 font-semibold">Tap to launch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {mainFeatures.map((feat) => (
              <div
                key={feat.id}
                id={`card-feature-${feat.id}`}
                onClick={() => {
                  if (feat.id === 'nearbyservices') {
                    onSelectNearbyCategory('police');
                  } else {
                    onSelectTab(feat.id);
                  }
                }}
                className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-4 border-2 border-pink-300 shadow-sm hover:shadow-xl hover:border-pink-500 transition-all cursor-pointer transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Background soft pink gradient aura */}
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-pink-100 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-60 pointer-events-none" />

                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-50 border border-pink-200 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    <span>{feat.icon}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full text-white ${feat.badgeColor} shadow-xs`}
                  >
                    {feat.badge}
                  </span>
                </div>

                <div className="mt-3 relative z-10">
                  <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-pink-600 transition-colors flex items-center justify-between">
                    <span>{feat.name}</span>
                    <ArrowRight className="w-4 h-4 text-pink-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-xs font-semibold text-pink-600 mt-0.5">{feat.subtitle}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {feat.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pink Shelf matching Screenshot 1: "Nearby Services" with category circles & garland ribbons */}
        <div className="relative bg-rose-200/90 backdrop-blur-md border-2 border-pink-300 rounded-2xl p-4 sm:p-5 shadow-lg mt-6">
          {/* Header with Title and 'view more' */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex flex-col">
              <h3 className="font-heading text-base sm:text-lg font-bold text-slate-800 relative inline-block">
                Nearby Services
                <span className="block h-0.5 bg-slate-800 w-16 mt-0.5 rounded-full" />
              </h3>
            </div>
            <button
              id="btn-view-more-services"
              onClick={() => onSelectNearbyCategory('police')}
              className="text-xs font-bold text-slate-800 hover:text-pink-700 flex items-center gap-1 transition-colors group"
            >
              <span>view more</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 8 Category Circular Badges matching Screenshot 1 */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-2 pt-1 pb-2">
            {quickCategories.map((item) => (
              <button
                key={item.category}
                id={`quick-cat-${item.category}`}
                onClick={() => onSelectNearbyCategory(item.category)}
                className="flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="transform group-hover:scale-110 transition-transform">
                  <CategoryPillIcon category={item.category} size={48} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 mt-1.5 leading-tight line-clamp-1 group-hover:text-pink-800">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Ribbon Garland matching Screenshot 1 */}
          <div className="mt-2 pt-1">
            <RibbonGarland />
          </div>
        </div>
      </div>
    </div>
  );
};
