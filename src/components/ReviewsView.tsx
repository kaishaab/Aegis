import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { MOCK_REVIEWS } from '../data/mockData';
import { 
  Star, 
  Heart, 
  Lightbulb, 
  Car, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Filter, 
  PlusCircle, 
  ThumbsUp, 
  Sparkles, 
  ShieldCheck, 
  X,
  Check
} from 'lucide-react';
import { 
  BurgundyBow, 
  SparkleStar,
  AegisShieldSticker,
  StaySafeHeartSticker,
  GirlPowerSticker
} from './PopGraphics';

export const ReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(MOCK_REVIEWS);
  const [filterTime, setFilterTime] = useState<string>('All');
  const [filterTransport, setFilterTransport] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [formArea, setFormArea] = useState('Kashmere Gate to University Road');
  const [formRoadSafety, setFormRoadSafety] = useState(5);
  const [formLighting, setFormLighting] = useState(4);
  const [formTransport, setFormTransport] = useState(5);
  const [formCrowd, setFormCrowd] = useState<'Safe & Friendly' | 'Neutral' | 'Desolate' | 'Rowdy / Avoid'>('Safe & Friendly');
  const [formFare, setFormFare] = useState('₹40 - ₹60');
  const [formAmenities, setFormAmenities] = useState<string[]>(['Bright LED lights', 'Police patrol booth']);
  const [formComment, setFormComment] = useState('');
  const [formTimeOfDay, setFormTimeOfDay] = useState<'Day' | 'Night' | 'Late Night'>('Night');
  const [formTransportMode, setFormTransportMode] = useState<'Walking' | 'Auto' | 'Metro' | 'Cab' | 'Bus'>('Walking');

  const availableAmenities = [
    'Bright LED lights',
    'Police patrol booth',
    '24/7 Street food',
    'Pink Toilet',
    'CCTV cameras',
    '24/7 Pharmacy',
    'Verified Rickshaw stand',
  ];

  const toggleAmenity = (item: string) => {
    if (formAmenities.includes(item)) {
      setFormAmenities(formAmenities.filter(a => a !== item));
    } else {
      setFormAmenities([...formAmenities, item]);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const overall = Math.round((formRoadSafety + formLighting + formTransport) / 3);
    const newRev: ReviewItem = {
      id: 'rev_' + Date.now(),
      areaName: formArea,
      userName: 'Kaisha (Verified)',
      userRole: 'Community Traveler',
      timeAgo: 'Just now',
      timeOfDay: formTimeOfDay,
      transportMode: formTransportMode,
      overallRating: overall,
      roadSafety: formRoadSafety,
      lighting: formLighting,
      transport: formTransport,
      crowdType: formCrowd,
      autoFare: formFare,
      amenities: formAmenities,
      comment: formComment || 'Felt safe travelling through this stretch. Great road visibility!',
      helpfulCount: 1,
    };

    setReviews([newRev, ...reviews]);
    setShowAddForm(false);
    setFormComment('');
  };

  const handleUpvote = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterTime !== 'All' && r.timeOfDay !== filterTime) return false;
    if (filterTransport !== 'All' && r.transportMode !== filterTransport) return false;
    return true;
  });

  // Calculate Averages
  const avgSafety = (reviews.reduce((acc, r) => acc + r.roadSafety, 0) / reviews.length).toFixed(1);
  const avgLighting = (reviews.reduce((acc, r) => acc + r.lighting, 0) / reviews.length).toFixed(1);
  const avgTransport = (reviews.reduce((acc, r) => acc + r.transport, 0) / reviews.length).toFixed(1);
  const avgOverall = (reviews.reduce((acc, r) => acc + r.overallRating, 0) / reviews.length).toFixed(1);

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gingham pb-24 px-3 sm:px-6 pt-3">
      {/* Corner Bows and Sparkles */}
      <BurgundyBow className="absolute top-2 left-2 rotate-[-12deg]" size={54} />
      <BurgundyBow className="absolute top-2 right-2 rotate-[12deg]" size={54} />
      <SparkleStar className="absolute top-20 right-10 animate-sparkle" size={22} color="#FF1493" />
      <div className="absolute top-28 left-6 hidden lg:block rotate-[-10deg] pointer-events-none">
        <AegisShieldSticker size={54} />
      </div>
      <div className="absolute bottom-24 right-6 hidden lg:block rotate-[12deg] pointer-events-none">
        <StaySafeHeartSticker size={52} />
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Top Header Card with Average Scores */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                  Area Safety Ratings & Reviews
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Real community insights on lighting, auto fares, and crowd safety from women commuters.
              </p>
            </div>

            <button
              id="btn-open-add-review"
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm rounded-full shadow-md active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Average Score Bars Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-pink-50/80 border border-pink-200 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500">Overall Score</span>
              <div className="font-heading text-2xl font-black text-pink-600 mt-0.5">
                {avgOverall} <span className="text-xs text-slate-400">/ 5</span>
              </div>
              <div className="w-full bg-pink-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-pink-500 h-full rounded-full" style={{ width: `${(Number(avgOverall) / 5) * 100}%` }} />
              </div>
            </div>

            <div className="p-3 bg-pink-50/80 border border-pink-200 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500">Road Safety</span>
              <div className="font-heading text-2xl font-black text-rose-600 mt-0.5">
                {avgSafety} <span className="text-xs text-slate-400">/ 5</span>
              </div>
              <div className="w-full bg-rose-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(Number(avgSafety) / 5) * 100}%` }} />
              </div>
            </div>

            <div className="p-3 bg-pink-50/80 border border-pink-200 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500">Lighting</span>
              <div className="font-heading text-2xl font-black text-amber-600 mt-0.5">
                {avgLighting} <span className="text-xs text-slate-400">/ 5</span>
              </div>
              <div className="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(Number(avgLighting) / 5) * 100}%` }} />
              </div>
            </div>

            <div className="p-3 bg-pink-50/80 border border-pink-200 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500">Transport Access</span>
              <div className="font-heading text-2xl font-black text-purple-600 mt-0.5">
                {avgTransport} <span className="text-xs text-slate-400">/ 5</span>
              </div>
              <div className="w-full bg-purple-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(Number(avgTransport) / 5) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Filters: Time of Day & Transport */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-pink-100 text-xs">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-pink-600" />
              <span className="font-bold text-slate-700">Time:</span>
              {['All', 'Day', 'Night', 'Late Night'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterTime(t)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                    filterTime === t
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-pink-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700">Mode:</span>
              {['All', 'Walking', 'Auto', 'Metro'].map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterTransport(m)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                    filterTransport === m
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-pink-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Feed */}
        <div className="space-y-3">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/95 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-400 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                      {rev.areaName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-700">
                      {rev.timeOfDay} Commute
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>by <strong>{rev.userName}</strong> ({rev.userRole})</span>
                    <span>•</span>
                    <span>{rev.timeAgo}</span>
                  </div>
                </div>

                {/* Star Badge */}
                <div className="flex items-center gap-1 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full shrink-0">
                  <div className="text-pink-500 text-xs">
                    {'★'.repeat(rev.overallRating)}{'☆'.repeat(5 - rev.overallRating)}
                  </div>
                  <span className="text-xs font-bold text-pink-700">{rev.overallRating}.0</span>
                </div>
              </div>

              {/* Parameter Metrics Pills */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-800 rounded-full font-semibold">
                  🛡️ Road Safety: {rev.roadSafety}/5
                </span>
                <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full font-semibold">
                  💡 Lighting: {rev.lighting}/5
                </span>
                <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-full font-semibold">
                  👥 Crowd: {rev.crowdType}
                </span>
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full font-semibold">
                  🛺 Fare: {rev.autoFare}
                </span>
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                "{rev.comment}"
              </p>

              {/* Amenities tags */}
              {rev.amenities.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-500">Nearby:</span>
                  {rev.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-pink-50 border border-pink-200 text-pink-700 rounded-md text-[10px] font-medium"
                    >
                      ✓ {a}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer: Helpful Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                <span className="text-[11px]">Verified route observation</span>
                <button
                  onClick={() => handleUpvote(rev.id)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full text-xs font-bold transition-all active:scale-95"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-pink-300 p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-1.5">
                <span>Rate a Street or Route</span>
                <Sparkles className="w-4 h-4 text-pink-500" />
              </h3>
              <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Area / Road Name</label>
                <input
                  type="text"
                  required
                  value={formArea}
                  onChange={(e) => setFormArea(e.target.value)}
                  placeholder="e.g. Kashmere Gate to University Road"
                  className="w-full px-3 py-2 bg-pink-50/60 border border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 font-medium"
                />
              </div>

              {/* Time of Day & Transport Mode */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time of Commute</label>
                  <select
                    value={formTimeOfDay}
                    onChange={(e) => setFormTimeOfDay(e.target.value as unknown as 'Day' | 'Night' | 'Late Night')}
                    className="w-full px-3 py-2 bg-pink-50/60 border border-pink-300 rounded-xl focus:outline-none font-medium"
                  >
                    <option value="Day">Daytime</option>
                    <option value="Night">Night (8 PM - 11 PM)</option>
                    <option value="Late Night">Late Night (After 11 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Transport Mode</label>
                  <select
                    value={formTransportMode}
                    onChange={(e) => setFormTransportMode(e.target.value as unknown as 'Walking' | 'Auto' | 'Metro' | 'Cab' | 'Bus')}
                    className="w-full px-3 py-2 bg-pink-50/60 border border-pink-300 rounded-xl focus:outline-none font-medium"
                  >
                    <option value="Walking">Walking</option>
                    <option value="Auto">Auto / Rickshaw</option>
                    <option value="Metro">Metro</option>
                    <option value="Cab">Cab / Taxi</option>
                    <option value="Bus">Bus</option>
                  </select>
                </div>
              </div>

              {/* Parameter 1: Road Safety */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Road Safety Rating</span>
                  <span className="text-pink-600">{formRoadSafety} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formRoadSafety}
                  onChange={(e) => setFormRoadSafety(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Parameter 2: Lighting */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Street Lighting Quality</span>
                  <span className="text-amber-600">{formLighting} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formLighting}
                  onChange={(e) => setFormLighting(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Parameter 3: Crowd Type */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Type of Crowd</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(['Safe & Friendly', 'Neutral', 'Desolate', 'Rowdy / Avoid'] as const).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormCrowd(type)}
                      className={`p-1.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                        formCrowd === type
                          ? 'bg-pink-500 text-white border-pink-600'
                          : 'bg-pink-50/60 border-pink-200 text-slate-700 hover:bg-pink-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 4: Auto Fare Range */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Average Auto / Rickshaw Fare</label>
                <input
                  type="text"
                  value={formFare}
                  onChange={(e) => setFormFare(e.target.value)}
                  placeholder="e.g. ₹30 E-rickshaw fixed or ₹60 Uber Auto"
                  className="w-full px-3 py-2 bg-pink-50/60 border border-pink-300 rounded-xl focus:outline-none font-medium"
                />
              </div>

              {/* Parameter 5: Nearby Amenities Checklist */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nearby Amenities & Safe Spots</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableAmenities.map((amenity) => {
                    const isChecked = formAmenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                          isChecked
                            ? 'bg-pink-500 text-white border-pink-600'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-pink-50'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '}
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Advice for Women Commuters</label>
                <textarea
                  rows={3}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Describe your experience: were the streets well lit? Was the crowd helpful? Any dark spots to avoid?"
                  className="w-full px-3 py-2 bg-pink-50/60 border border-pink-300 rounded-xl focus:outline-none font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-md"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
