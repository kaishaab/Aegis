import React, { useState } from 'react';
import { 
  TransportMode, 
  TimeOfDay, 
  RouteOption, 
  SafetyZone 
} from '../types';
import { 
  MOCK_ROUTES, 
  SAFETY_ZONES, 
  CAUTION_ALERTS 
} from '../data/mockData';
import { 
  Search, 
  X, 
  Car, 
  Train, 
  Bike, 
  Bus, 
  Footprints, 
  ShieldCheck, 
  AlertTriangle, 
  Sun, 
  Moon, 
  Layers, 
  Lightbulb, 
  DollarSign, 
  Clock, 
  ChevronRight, 
  Info,
  Navigation as NavIcon,
  Sparkles,
  Sliders
} from 'lucide-react';
import { 
  BurgundyBow, 
  Y2KFlipPhone, 
  SparkleStar, 
  PinkScrunchie,
  AegisShieldSticker,
  StaySafeHeartSticker,
  PinkTicketSticker
} from './PopGraphics';

interface SafeMapsProps {
  initialSearch?: string;
  onStartTrip: (destination: string, route: RouteOption) => void;
}

export const SafeMaps: React.FC<SafeMapsProps> = ({ 
  initialSearch = 'Kashmere Gate, Delhi', 
  onStartTrip 
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [fromQuery, setFromQuery] = useState('My Current Location (Civil Lines)');
  const [selectedMode, setSelectedMode] = useState<TransportMode>('car');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('now');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('r_safe');
  
  // Layer toggles
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showStreetlights, setShowStreetlights] = useState(true);
  const [showCautionPins, setShowCautionPins] = useState(true);
  const [activeZoneDetail, setActiveZoneDetail] = useState<SafetyZone | null>(null);

  const destinationRoutes = MOCK_ROUTES['Kashmere Gate, Delhi'] || [];
  const selectedRoute = destinationRoutes.find(r => r.id === selectedRouteId) || destinationRoutes[1];

  // Dynamic safety score adjustment based on time of day
  const getTimeMultiplier = () => {
    switch (timeOfDay) {
      case 'now': return 1.0; // Daytime baseline
      case 'night': return 0.85; // 9 PM: lower light penalties
      case 'latenight': return 0.70; // 1 AM: higher isolation penalties
    }
  };

  const currentSafetyScore = (selectedRoute.safetyScore * getTimeMultiplier()).toFixed(1);

  const transportModes: { id: TransportMode; label: string; time: string; icon: React.ReactNode }[] = [
    { id: 'car', label: 'Car/Cab', time: '1 hr 10 mins', icon: <Car className="w-5 h-5" /> },
    { id: 'metro', label: 'Metro', time: '1 hr 30 mins', icon: <Train className="w-5 h-5" /> },
    { id: 'bike', label: 'Scooter', time: '1 hr 40 mins', icon: <Bike className="w-5 h-5" /> },
    { id: 'bus', label: 'Bus', time: '2 hr 10 mins', icon: <Bus className="w-5 h-5" /> },
    { id: 'walk', label: 'Walking', time: '5+ hrs', icon: <Footprints className="w-5 h-5" /> },
  ];

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gingham pb-24 px-3 sm:px-6 pt-3">
      {/* Decorative floating accents */}
      <BurgundyBow className="absolute top-2 right-2 rotate-[12deg] z-10" size={54} />
      <SparkleStar className="absolute top-16 right-1/4 animate-sparkle" size={22} color="#FF2E93" />
      <SparkleStar className="absolute bottom-1/3 left-4 animate-sparkle" size={20} color="#FF69B4" />
      <div className="absolute top-2 left-2 hidden lg:block rotate-[-10deg] pointer-events-none">
        <AegisShieldSticker size={58} />
      </div>
      <div className="absolute bottom-20 right-6 hidden xl:block rotate-[12deg] pointer-events-none">
        <StaySafeHeartSticker size={54} />
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Top Search Card matching Screenshot 2 */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-2xl p-3 sm:p-4 shadow-md space-y-2">
          {/* Destination Search Input Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 flex items-center bg-pink-50/60 border-2 border-pink-300 rounded-full px-3.5 py-1.5 focus-within:border-pink-500 focus-within:bg-white transition-all shadow-inner">
              <Search className="w-4 h-4 text-pink-600 mr-2 shrink-0" />
              <input
                id="input-safemap-destination"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination (e.g. Kashmere Gate, Delhi)"
                className="w-full bg-transparent border-none outline-none text-slate-800 font-semibold text-xs sm:text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-pink-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Time of Day Toggle */}
            <div className="flex items-center bg-pink-100 p-0.5 rounded-full border border-pink-300 shrink-0">
              <button
                id="btn-time-now"
                onClick={() => setTimeOfDay('now')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  timeOfDay === 'now'
                    ? 'bg-amber-400 text-slate-900 shadow-xs'
                    : 'text-pink-700 hover:text-pink-900'
                }`}
                title="Daytime (Good visibility)"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Day</span>
              </button>
              <button
                id="btn-time-night"
                onClick={() => setTimeOfDay('night')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  timeOfDay === 'night'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-pink-700 hover:text-pink-900'
                }`}
                title="Night 9 PM (Lighting active)"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">9 PM</span>
              </button>
              <button
                id="btn-time-latenight"
                onClick={() => setTimeOfDay('latenight')}
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  timeOfDay === 'latenight'
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-pink-700 hover:text-pink-900'
                }`}
                title="Late Night 1 AM (Sparse crowd)"
              >
                <span>1 AM</span>
              </button>
            </div>
          </div>

          {/* Quick Route Origin Indicator */}
          <div className="flex items-center justify-between px-1 text-[11px] text-pink-700 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>From: <strong className="text-slate-800">{fromQuery}</strong></span>
            </div>
            <span className="text-pink-500 italic">Safety heatmaps active</span>
          </div>
        </div>

        {/* Illustrated Vector Map Canvas Component (Matching Screenshot 2) */}
        <div className="relative bg-[#A3D9A5] border-4 border-white rounded-3xl shadow-xl overflow-hidden min-h-[380px] sm:min-h-[440px]">
          {/* SVG Map Canvas */}
          <svg
            viewBox="0 0 460 420"
            className="w-full h-full object-cover select-none"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Park & Grass patterns */}
              <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9BD4A3" />
                <stop offset="100%" stopColor="#81C784" />
              </linearGradient>
              <linearGradient id="parkCircle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A5D6A7" />
                <stop offset="100%" stopColor="#81C784" />
              </linearGradient>
              {/* River Gradient */}
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64B5F6" />
                <stop offset="50%" stopColor="#42A5F5" />
                <stop offset="100%" stopColor="#2196F3" />
              </linearGradient>
              {/* Street Road Gradient */}
              <linearGradient id="roadFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
            </defs>

            {/* Base Grassland Background */}
            <rect x="0" y="0" width="460" height="420" fill="url(#grassGrad)" />

            {/* Stylized rounded park groves (matching Screenshot 2 green blobs) */}
            <circle cx="100" cy="80" r="60" fill="#75BA7A" opacity="0.4" />
            <circle cx="120" cy="220" r="50" fill="#75BA7A" opacity="0.35" />
            <circle cx="340" cy="90" r="70" fill="#75BA7A" opacity="0.3" />
            <circle cx="280" cy="330" r="65" fill="#75BA7A" opacity="0.35" />

            {/* Winding Blue River (Yamuna river curve matching Screenshot 2) */}
            <path
              d="M-20 340 C80 320 90 190 120 150 C160 90 280 80 300 130 C330 200 300 280 340 330 C380 380 440 370 480 360"
              fill="none"
              stroke="url(#riverGrad)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
            {/* River highlight ripple */}
            <path
              d="M-10 340 C80 320 90 190 120 150 C160 90 280 80 300 130 C330 200 300 280 340 330 C380 380 440 370 480 360"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="3"
              strokeDasharray="14 10"
              opacity="0.75"
            />

            {/* Road Network (matching Screenshot 2 dark grey thoroughfares) */}
            {/* Avenue 1 */}
            <path
              d="M40 0 L140 100 L210 110 L320 220 L440 230"
              fill="none"
              stroke="#475569"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Avenue 2 (North-South arterial) */}
            <path
              d="M200 0 L180 160 L240 220 L280 310 L320 420"
              fill="none"
              stroke="#475569"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Diagonal Bypass */}
            <path
              d="M0 120 L140 100 L180 160 L140 270 L80 420"
              fill="none"
              stroke="#475569"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ring Cross Road */}
            <path
              d="M140 270 L280 310 L440 320"
              fill="none"
              stroke="#475569"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* University Branch Loop */}
            <path
              d="M210 110 L270 160 L310 240 L320 420"
              fill="none"
              stroke="#475569"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* White Dashed Road Lane Markings */}
            <g stroke="#FFFFFF" strokeWidth="1.8" strokeDasharray="6 6" fill="none" opacity="0.85">
              <path d="M40 0 L140 100 L210 110 L320 220 L440 230" />
              <path d="M200 0 L180 160 L240 220 L280 310 L320 420" />
              <path d="M0 120 L140 100 L180 160 L140 270 L80 420" />
              <path d="M140 270 L280 310 L440 320" />
              <path d="M210 110 L270 160 L310 240 L320 420" />
            </g>

            {/* SAFETY HEATMAP ZONES (semi-transparent overlays requested in prompt) */}
            {showHeatmap && (
              <g id="safety-heatmaps" className="transition-opacity duration-300">
                {SAFETY_ZONES.map((zone) => {
                  let fillColor = '#10B981'; // bright green
                  if (zone.level === 'safe') fillColor = '#34D399'; // light green
                  if (zone.level === 'neutral') fillColor = '#FBBF24'; // yellow
                  if (zone.level === 'moderate_unsafe') fillColor = '#F97316'; // orange/red
                  if (zone.level === 'very_unsafe') fillColor = '#DC2626'; // dark red

                  // Adjusted if late night
                  if (timeOfDay === 'latenight' && (zone.level === 'moderate_unsafe' || zone.level === 'neutral')) {
                    fillColor = '#B91C1C';
                  }

                  const pathString = `M ${zone.shapeCoords.map(pt => pt.join(' ')).join(' L ')} Z`;

                  return (
                    <path
                      key={zone.id}
                      d={pathString}
                      fill={fillColor}
                      fillOpacity="0.32"
                      stroke={fillColor}
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      className="cursor-pointer hover:fill-opacity-50 transition-all"
                      onClick={() => setActiveZoneDetail(zone)}
                    />
                  );
                })}
              </g>
            )}

            {/* ACTIVE ROUTE OVERLAYS */}
            {/* Fastest Route (Green/Teal line) */}
            <path
              d="M 140 100 L 180 160 L 240 220 L 280 310 L 320 370"
              fill="none"
              stroke="#00C897"
              strokeWidth={selectedRouteId === 'r_fast' ? '9' : '5'}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={selectedRouteId === 'r_fast' ? 0.95 : 0.4}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedRouteId('r_fast')}
            />

            {/* Safest Route (Hot Pink with bright glow & sparkles matching prompt!) */}
            <path
              d="M 140 100 L 210 110 L 270 160 L 310 240 L 320 370"
              fill="none"
              stroke="#FF2E93"
              strokeWidth={selectedRouteId === 'r_safe' ? '10' : '5'}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={selectedRouteId === 'r_safe' ? 0.98 : 0.4}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedRouteId('r_safe')}
            />
            {selectedRouteId === 'r_safe' && (
              <path
                d="M 140 100 L 210 110 L 270 160 L 310 240 L 320 370"
                fill="none"
                stroke="#FFE4EC"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
            )}

            {/* STREETLIGHT ICONS (along safely lit corridors) */}
            {showStreetlights && (
              <g>
                {[
                  [165, 105],
                  [210, 110],
                  [240, 135],
                  [270, 160],
                  [290, 200],
                  [310, 240],
                  [315, 300],
                  [320, 360],
                ].map(([x, y], idx) => (
                  <g key={idx} transform={`translate(${x - 8}, ${y - 8})`}>
                    <circle cx="8" cy="8" r="7" fill="#FEF08A" opacity="0.85" />
                    <circle cx="8" cy="8" r="4" fill="#FACC15" />
                    <circle cx="8" cy="8" r="1.5" fill="#FFF" />
                  </g>
                ))}
              </g>
            )}

            {/* START PIN (Civil Lines - Red/Orange Pin matching Screenshot 2) */}
            <g transform="translate(140, 100)">
              <ellipse cx="0" cy="3" rx="6" ry="3" fill="#000000" opacity="0.25" />
              <path
                d="M0 -22 C-9 -22 -14 -15 -14 -7 C-14 3 0 10 0 10 C0 10 14 3 14 -7 C14 -15 9 -22 0 -22 Z"
                fill="#EF4444"
                stroke="#B91C1C"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="-10" r="4.5" fill="#FFFFFF" />
            </g>

            {/* DESTINATION PIN (Kashmere Gate - Hot Pink Pin matching Screenshot 2) */}
            <g transform="translate(320, 370)">
              <ellipse cx="0" cy="3" rx="8" ry="4" fill="#000000" opacity="0.3" />
              <path
                d="M0 -26 C-11 -26 -16 -18 -16 -9 C-16 4 0 12 0 12 C0 12 16 4 16 -9 C16 -18 11 -26 0 -26 Z"
                fill="#FF2E93"
                stroke="#9D174D"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="-12" r="5" fill="#FFFFFF" />
              <text x="0" y="-8.5" textAnchor="middle" fontSize="9" fill="#FF2E93" fontWeight="bold">🌸</text>
            </g>

            {/* CAUTION PINS matching Screenshot 2 */}
            {showCautionPins && (
              <g>
                {/* Rainwater alert pin */}
                <g transform="translate(305, 335)" className="cursor-pointer animate-bounce">
                  <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
                  <text x="0" y="4" textAnchor="middle" fontSize="12">🌧️</text>
                </g>
                {/* Monkey attack alert pin */}
                <g transform="translate(230, 140)" className="cursor-pointer animate-pulse">
                  <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
                  <text x="0" y="4" textAnchor="middle" fontSize="12">🐒</text>
                </g>
              </g>
            )}
          </svg>

          {/* Map Layer Controls Floating Island (Top Right) */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-pink-300 p-2 shadow-md flex flex-col gap-1.5 text-[11px] font-bold text-slate-700">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
                showHeatmap ? 'bg-pink-500 text-white' : 'hover:bg-pink-100 text-slate-600'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Safety Heatmap</span>
            </button>
            <button
              onClick={() => setShowStreetlights(!showStreetlights)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
                showStreetlights ? 'bg-amber-400 text-slate-900' : 'hover:bg-pink-100 text-slate-600'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Streetlights</span>
            </button>
            <button
              onClick={() => setShowCautionPins(!showCautionPins)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
                showCautionPins ? 'bg-rose-500 text-white' : 'hover:bg-pink-100 text-slate-600'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Cautions</span>
            </button>
          </div>

          {/* Heatmap Legend Floating Bar (Bottom Left) */}
          {showHeatmap && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md rounded-xl border border-pink-200 px-3 py-1.5 shadow-sm text-[10px] font-semibold text-slate-700 flex items-center gap-2">
              <span className="text-pink-600 font-bold">Zones:</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="hidden sm:inline">Very Safe</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                <span className="hidden sm:inline">Safe</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="hidden sm:inline">Neutral</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span className="hidden sm:inline">Caution</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <span className="hidden sm:inline">Unsafe</span>
              </div>
            </div>
          )}

          {/* Zone Detail Modal / Card if clicked */}
          {activeZoneDetail && (
            <div className="absolute inset-x-4 bottom-4 bg-white/98 rounded-2xl border-2 border-pink-400 p-4 shadow-2xl z-20 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 font-heading">
                      {activeZoneDetail.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase text-white bg-pink-600">
                      {activeZoneDetail.level.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{activeZoneDetail.description}</p>
                </div>
                <button
                  onClick={() => setActiveZoneDetail(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-pink-100 text-[11px]">
                <div className="text-slate-600">
                  <span className="block text-slate-400 text-[10px]">Streetlights</span>
                  <strong className="text-emerald-600">{activeZoneDetail.streetLightPct}% active</strong>
                </div>
                <div className="text-slate-600">
                  <span className="block text-slate-400 text-[10px]">Crowd</span>
                  <strong className="text-slate-800">{activeZoneDetail.crowdScore}</strong>
                </div>
                <div className="text-slate-600">
                  <span className="block text-slate-400 text-[10px]">Police Post</span>
                  <strong className="text-pink-600">{activeZoneDetail.policeProximity}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transport Mode Switcher matching Screenshot 2 */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-2xl p-2 shadow-md">
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {transportModes.map((m) => {
              const isSelected = selectedMode === m.id;
              return (
                <button
                  key={m.id}
                  id={`mode-${m.id}`}
                  onClick={() => setSelectedMode(m.id)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-gradient-to-b from-pink-500 to-rose-500 text-white shadow-md font-bold'
                      : 'text-slate-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <div className="mb-0.5">{m.icon}</div>
                  <span className="text-[10px] sm:text-xs font-semibold">{m.time}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Destination Header & Star Rating matching Screenshot 2 */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-2xl p-4 sm:p-5 shadow-md relative overflow-hidden">
          {/* Flip phone decoration matching Screenshot 2 on the right */}
          <div className="absolute right-2 bottom-1 hidden sm:block pointer-events-none opacity-90 transform rotate-12 scale-90">
            <Y2KFlipPhone size={85} />
          </div>

          <div className="max-w-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800">
                {searchQuery}
              </h3>
              {/* Star Rating Badge */}
              <div className="flex items-center gap-1.5 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
                <div className="flex text-pink-500 text-sm">
                  {'★'.repeat(Math.round(selectedRoute.safetyScore / 2))}
                  {'☆'.repeat(5 - Math.round(selectedRoute.safetyScore / 2))}
                </div>
                <span className="text-xs font-bold text-pink-600">
                  {(selectedRoute.safetyScore / 2).toFixed(1)}/5 stars Safety
                </span>
              </div>
            </div>

            {/* Route Options Cards (Fastest vs Safest) matching Screenshot 2 */}
            <div className="space-y-2.5 pt-1">
              {/* Fastest Route Option */}
              <div
                id="route-opt-fast"
                onClick={() => setSelectedRouteId('r_fast')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRouteId === 'r_fast'
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-emerald-300 bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base sm:text-lg font-bold text-emerald-700">
                      1 hr 10 mins
                    </span>
                    <p className="text-xs text-slate-600 font-medium">
                      Fastest route, avoiding traffic
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Safety Score: 6.8/10
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1">₹140 - ₹180</span>
                  </div>
                </div>
              </div>

              {/* Safest Route Option (Signature Hot Pink) */}
              <div
                id="route-opt-safe"
                onClick={() => setSelectedRouteId('r_safe')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRouteId === 'r_safe'
                    ? 'border-pink-500 bg-pink-50 shadow-md ring-2 ring-pink-200'
                    : 'border-slate-200 hover:border-pink-300 bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base sm:text-lg font-bold text-pink-600">
                        1 hr 25 mins
                      </span>
                      <span className="text-xs">💖</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Safest route, 100% LED lighting, CCTV & active crowd
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs">
                      Safety Score: {currentSafetyScore}/10
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1">₹160 - ₹210</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar: Start Trip Navigation with Periodic Check-In Link */}
            <div className="pt-2 flex items-center gap-3">
              <button
                id="btn-start-navigation"
                onClick={() => onStartTrip(searchQuery, selectedRoute)}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <NavIcon className="w-4 h-4 fill-white" />
                <span>Start Journey & Activate Check-In</span>
              </button>
            </div>
          </div>
        </div>

        {/* Safety Details Matrix Panel along Selected Route */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-2xl p-4 sm:p-5 shadow-md space-y-3">
          <h4 className="font-heading text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <span>Safety Parameters Along Route ({selectedRoute.badge})</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-pink-50/80 rounded-xl border border-pink-200">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold mb-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Street Lighting</span>
              </div>
              <p className="font-semibold text-slate-800">{selectedRoute.streetLighting}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Continuous municipal LEDs</p>
            </div>

            <div className="p-3 bg-pink-50/80 rounded-xl border border-pink-200">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold mb-1">
                <Train className="w-3.5 h-3.5" />
                <span>Transit Access</span>
              </div>
              <p className="font-semibold text-slate-800">{selectedRoute.transportAvailability}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Metro station within 250m</p>
            </div>

            <div className="p-3 bg-pink-50/80 rounded-xl border border-pink-200">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Crowd Density</span>
              </div>
              <p className="font-semibold text-slate-800">{selectedRoute.crowdDensity}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">At current time of day</p>
            </div>

            <div className="p-3 bg-pink-50/80 rounded-xl border border-pink-200">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold mb-1">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Estimated Fare</span>
              </div>
              <p className="font-semibold text-slate-800">{selectedRoute.costEstimate.split(' ')[0]}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Standard metered rate</p>
            </div>
          </div>
        </div>

        {/* CAUTION Section matching Screenshot 2 */}
        <div className="bg-rose-200/90 backdrop-blur-md border-2 border-pink-300 rounded-2xl p-4 sm:p-5 shadow-lg relative">
          <div className="flex items-center justify-between pb-3">
            <h4 className="font-heading text-base font-bold text-slate-800 tracking-wider">
              CAUTION
              <span className="block h-0.5 bg-slate-800 w-16 mt-0.5 rounded-full" />
            </h4>
            <span className="text-xs font-bold text-slate-700">view more</span>
          </div>

          <div className="space-y-2.5">
            {CAUTION_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center gap-3 bg-white/90 border border-pink-300 rounded-full px-4 py-2 shadow-xs hover:bg-white transition-all"
              >
                <span className="text-xl shrink-0">{alert.icon}</span>
                <div className="flex-1 text-xs text-slate-800 font-medium truncate">
                  <span>{alert.title} </span>
                  <span className="underline font-bold text-slate-900">{alert.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
