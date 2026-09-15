import React, { useState, useEffect } from 'react';
import { NearbyService } from '../types';
import { NEARBY_SERVICES } from '../data/mockData';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Navigation, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  Info,
  X
} from 'lucide-react';
import { 
  BurgundyBow, 
  SparkleStar, 
  CategoryPillIcon, 
  AegisShieldSticker, 
  StaySafeHeartSticker,
  CutePepperSpraySticker,
  PinkTicketSticker
} from './PopGraphics';

interface NearbyServicesViewProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenServiceOnMap: (service: NearbyService) => void;
}

export const NearbyServicesView: React.FC<NearbyServicesViewProps> = ({ 
  selectedCategory, 
  onSelectCategory,
  onOpenServiceOnMap 
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const categories: {
    id: 'police' | 'bus' | 'washroom' | 'hospital' | 'pharmacy' | 'metro' | 'petrol' | 'hotel';
    label: string;
    description: string;
    catKey: 'police' | 'bus' | 'washroom' | 'hospital' | 'pharmacy' | 'metro' | 'petrol' | 'hotel';
    emoji: string;
  }[] = [
    { 
      id: 'police', 
      label: 'Police Stations', 
      description: 'Delhi Police Stations, Chowkis & 24/7 Pink Women Helpdesks', 
      catKey: 'police',
      emoji: '👮‍♀️'
    },
    { 
      id: 'bus', 
      label: 'Bus Stations', 
      description: 'ISBT Kashmere Gate, GPO, Yamuna Bazar & nearby DTC Stands', 
      catKey: 'bus',
      emoji: '🚌'
    },
    { 
      id: 'washroom', 
      label: 'Public & Restaurant Washrooms', 
      description: 'Clean public pink toilets & safe verified customer restrooms', 
      catKey: 'washroom',
      emoji: '🚺'
    },
    { 
      id: 'hospital', 
      label: 'Hospitals', 
      description: '24/7 Emergency trauma, maternity & multispeciality hospitals', 
      catKey: 'hospital',
      emoji: '🏥'
    },
    { 
      id: 'pharmacy', 
      label: 'Pharmacies', 
      description: '24/7 Chemist counters, SOS medical supplies & first-aid', 
      catKey: 'pharmacy',
      emoji: '💊'
    },
    { 
      id: 'metro', 
      label: 'Metro Stations', 
      description: 'CCTV-monitored DMRC interchange gates & security checkposts', 
      catKey: 'metro',
      emoji: '🚇'
    },
    { 
      id: 'petrol', 
      label: 'Petrol Pumps', 
      description: 'Well-lit 24/7 fuel stations with air, water & emergency staff', 
      catKey: 'petrol',
      emoji: '⛽'
    },
    { 
      id: 'hotel', 
      label: 'Hotels', 
      description: 'Reputable verified hotels with 24/7 manned security receptions', 
      catKey: 'hotel',
      emoji: '🏨'
    },
  ];

  // Current selected category object
  const currentCat = categories.find((c) => c.id === selectedCategory) || categories[0];

  // STRICT SEGREGATION: Only include particulars belonging strictly to the selected category
  const filteredServices = NEARBY_SERVICES.filter((s) => {
    if (s.category !== currentCat.id) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const [activeService, setActiveService] = useState<NearbyService>(() => {
    return filteredServices[0] || NEARBY_SERVICES.find(s => s.category === currentCat.id) || NEARBY_SERVICES[0];
  });

  // Keep activeService in sync when category changes
  useEffect(() => {
    const firstInCat = NEARBY_SERVICES.find((s) => s.category === currentCat.id);
    if (firstInCat) {
      setActiveService(firstInCat);
    }
  }, [currentCat.id]);

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gingham pb-24 px-3 sm:px-6 pt-3">
      {/* Corner Bows, Stickers and Sparkles */}
      <BurgundyBow className="absolute top-2 left-2 rotate-[-12deg]" size={54} />
      <BurgundyBow className="absolute top-2 right-2 rotate-[12deg]" size={54} />
      <SparkleStar className="absolute top-20 right-14 animate-sparkle" size={22} color="#FF2E93" />
      <div className="absolute top-12 left-8 hidden lg:block rotate-[-8deg] pointer-events-none">
        <AegisShieldSticker size={56} />
      </div>
      <div className="absolute top-28 right-8 hidden lg:block rotate-[10deg] pointer-events-none">
        <StaySafeHeartSticker size={52} />
      </div>
      <div className="absolute bottom-28 left-4 hidden lg:block rotate-[-12deg] pointer-events-none">
        <CutePepperSpraySticker size={54} />
      </div>
      <div className="absolute bottom-32 right-6 hidden lg:block rotate-[8deg] pointer-events-none">
        <PinkTicketSticker size={72} />
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header Search & Category Selection */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCat.emoji}</span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                  Nearby Services: {currentCat.label}
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Segregated directory: Showing only verified <strong className="text-pink-700">{currentCat.label.toLowerCase()}</strong> around Kashmere Gate & Delhi.
              </p>
            </div>

            {/* Total Count Badge */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 bg-pink-100 border border-pink-300 text-pink-700 font-extrabold text-xs rounded-full shadow-xs">
                {filteredServices.length} {currentCat.label} Found
              </span>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-full flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live GPS Radar</span>
              </span>
            </div>
          </div>

          {/* Search Input within this segregated category */}
          <div className="relative flex items-center bg-pink-50/60 border-2 border-pink-300 rounded-full px-3.5 py-2 focus-within:bg-white focus-within:border-pink-500 transition-all">
            <Search className="w-4 h-4 text-pink-600 mr-2 shrink-0" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={`Search within ${currentCat.label} (e.g. name, landmark, gate)...`}
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-medium text-slate-800"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="p-1 hover:bg-pink-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 8 Segregated Category Selectors (No 'All' option, strictly segregated) */}
          <div>
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Select Service Category:
              </span>
              <span className="text-[11px] font-semibold text-pink-600">
                Click any category to switch list
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar pt-0.5">
              {categories.map((cat) => {
                const isActive = currentCat.id === cat.id;
                const totalInCat = NEARBY_SERVICES.filter((s) => s.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    id={`chip-cat-${cat.id}`}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setSearchFilter('');
                    }}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-102 ring-2 ring-pink-300'
                        : 'bg-pink-50/80 text-slate-700 border border-pink-200 hover:bg-pink-100 hover:border-pink-300'
                    }`}
                  >
                    <span className="scale-80">
                      <CategoryPillIcon category={cat.catKey} size={20} />
                    </span>
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        isActive
                          ? 'bg-white text-pink-700 shadow-xs'
                          : 'bg-pink-200/80 text-pink-800'
                      }`}
                    >
                      {totalInCat}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Particulars Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-pink-100/90 border-2 border-pink-300 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border-2 border-pink-300 shadow-xs shrink-0">
              <CategoryPillIcon category={currentCat.catKey} size={32} />
            </div>
            <div>
              <h3 className="font-heading font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span>{currentCat.label}</span>
                <span className="text-pink-700 font-extrabold text-[11px] bg-white px-2 py-0.5 rounded-full border border-pink-200 shadow-xs">
                  Only {currentCat.label} Shown
                </span>
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {currentCat.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs font-black text-pink-700 px-3 py-1 bg-white rounded-full border border-pink-200 shadow-xs">
              {filteredServices.length} Total Registered
            </span>
          </div>
        </div>

        {/* Embedded Interactive Service Mini-Map Preview (ONLY renders pins for this segregated category) */}
        {filteredServices.length > 0 && (
          <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-pink-600" />
                <span>Radar Pin: {activeService?.name || currentCat.label}</span>
              </h4>
              <span className="text-xs font-bold text-pink-600">
                {activeService ? `${activeService.distance} away` : ''}
              </span>
            </div>

            {/* Mini Vector Map Container */}
            <div className="relative h-48 sm:h-56 bg-[#9BD4A3] rounded-2xl overflow-hidden border-2 border-white shadow-inner">
              <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
                {/* Roads */}
                <path d="M0 100 L400 100" stroke="#64748B" strokeWidth="18" />
                <path d="M200 0 L200 200" stroke="#64748B" strokeWidth="18" />
                <path d="M80 0 L320 200" stroke="#64748B" strokeWidth="12" />
                <path d="M0 100 L400 100" stroke="#FFF" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M200 0 L200 200" stroke="#FFF" strokeWidth="2" strokeDasharray="6 6" />

                {/* User Current Position (Pink Halo) */}
                <circle cx="160" cy="100" r="14" fill="#FF2E93" opacity="0.3" className="animate-ping" />
                <circle cx="160" cy="100" r="7" fill="#FF2E93" stroke="#FFF" strokeWidth="2" />

                {/* ONLY Service Pins of the SELECTED CATEGORY */}
                {filteredServices.map((s) => {
                  const isSelected = activeService?.id === s.id;
                  // Scale coords to 400x200
                  const px = (s.coords[0] / 400) * 360 + 20;
                  const py = (s.coords[1] / 400) * 160 + 20;

                  return (
                    <g
                      key={s.id}
                      transform={`translate(${px}, ${py})`}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => setActiveService(s)}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? 16 : 10}
                        fill={isSelected ? '#FF1493' : '#E11D48'}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fontSize={isSelected ? '12' : '8'}
                        fill="#FFF"
                        fontWeight="bold"
                      >
                        {s.category === 'police'
                          ? '👮'
                          : s.category === 'washroom'
                          ? '🚺'
                          : s.category === 'bus'
                          ? '🚌'
                          : s.category === 'hospital'
                          ? '🏥'
                          : s.category === 'pharmacy'
                          ? '💊'
                          : s.category === 'metro'
                          ? '🚇'
                          : s.category === 'petrol'
                          ? '⛽'
                          : '🏨'}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Floating selected service card over mini map */}
              {activeService && (
                <div className="absolute bottom-2 left-2 right-2 sm:right-auto bg-white/95 backdrop-blur-md border border-pink-300 rounded-xl p-2.5 shadow-md flex items-center justify-between gap-3">
                  <div className="truncate">
                    <strong className="text-xs text-slate-900 block truncate">{activeService.name}</strong>
                    <span className="text-[10px] text-slate-500">{activeService.address}</span>
                  </div>
                  <button
                    onClick={() => onOpenServiceOnMap(activeService)}
                    className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-xs font-bold shrink-0 shadow-xs flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Navigate</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State when no items match search */}
        {filteredServices.length === 0 && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 border-2 border-pink-200 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-pink-100 mx-auto flex items-center justify-center text-3xl">
              🔍
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-base">
              No {currentCat.label} matching "{searchFilter}"
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any {currentCat.label.toLowerCase()} matching that search keyword in this category.
            </p>
            <button
              onClick={() => setSearchFilter('')}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* Strictly Segregated List of Particulars */}
        <div className="space-y-2.5">
          {filteredServices.map((service) => {
            const isSelected = activeService?.id === service.id;
            return (
              <div
                key={service.id}
                id={`card-service-${service.id}`}
                onClick={() => setActiveService(service)}
                className={`bg-white/95 backdrop-blur-md rounded-2xl p-4 border-2 transition-all cursor-pointer shadow-sm hover:shadow-md ${
                  isSelected
                    ? 'border-pink-500 ring-2 ring-pink-200 bg-pink-50/40'
                    : 'border-pink-200 hover:border-pink-400'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <CategoryPillIcon category={service.category} size={46} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                          {service.name}
                        </h4>
                        <span className="px-2 py-0.2 bg-pink-50 text-pink-700 border border-pink-200 text-[10px] font-bold rounded-full">
                          {service.categoryLabel}
                        </span>
                        {service.isOpen24x7 && (
                          <span className="px-2 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                            24/7 Open
                          </span>
                        )}
                        {service.womenStaffPresent && (
                          <span className="px-2 py-0.2 bg-pink-100 text-pink-700 text-[10px] font-bold rounded-full">
                            🌸 Women Staff Present
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 font-medium">
                        📍 {service.address}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                        <span className="flex items-center gap-1 font-bold text-pink-600">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{service.distance}</span>
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{service.travelTime}</span>
                        </span>
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{service.safetyRating} Safety Rating</span>
                        </span>
                        {service.hasCCTV && (
                          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            ✓ CCTV Protected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Open on Map & Call */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      id={`btn-open-map-${service.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenServiceOnMap(service);
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open on Map</span>
                    </button>

                    {service.phone && (
                      <a
                        href={`tel:${service.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{service.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
