import React, { useState, useEffect } from 'react';
import { TrustedContact } from '../types';
import { 
  Clock, 
  Play, 
  Square, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Heart, 
  Check, 
  Bell, 
  Smartphone,
  Navigation,
  Timer
} from 'lucide-react';
import { 
  BurgundyBow, 
  SparkleStar, 
  PinkScrunchie,
  AegisShieldSticker,
  StaySafeHeartSticker,
  GirlPowerSticker 
} from './PopGraphics';
import confetti from 'canvas-confetti';

interface CheckInViewProps {
  contacts: TrustedContact[];
  isTripActive: boolean;
  onToggleTrip: (active: boolean) => void;
  destinationName?: string;
}

export const CheckInView: React.FC<CheckInViewProps> = ({
  contacts,
  isTripActive,
  onToggleTrip,
  destinationName = 'Kashmere Gate, Delhi',
}) => {
  const [intervalMinutes, setIntervalMinutes] = useState<number>(20);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(20 * 60);
  const [showPopModal, setShowPopModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [alertDispatched, setAlertDispatched] = useState<boolean>(false);
  const [gracePeriodSeconds, setGracePeriodSeconds] = useState<number>(60);

  // Interval timer tick
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTripActive && !showPopModal) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            triggerCheckInPop();
            return intervalMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTripActive, showPopModal, intervalMinutes]);

  // Grace period timer while popup is active
  useEffect(() => {
    let graceTimer: NodeJS.Timeout;
    if (showPopModal && !alertDispatched) {
      graceTimer = setInterval(() => {
        setGracePeriodSeconds((prev) => {
          if (prev <= 1) {
            handleNoResponseAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(graceTimer);
  }, [showPopModal, alertDispatched]);

  const triggerCheckInPop = () => {
    setShowPopModal(true);
    setGracePeriodSeconds(60);
    setAlertDispatched(false);
  };

  const handleImSafe = () => {
    setShowPopModal(false);
    setAlertDispatched(false);
    setSecondsRemaining(intervalMinutes * 60);

    // Cute celebration confetti
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FF2E93', '#F472B6', '#FBCFE8', '#34D399'],
    });

    setToastMessage(`Great! Glad you're safe 💕 Next check-in in ${intervalMinutes} minutes.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleNeedHelp = () => {
    setAlertDispatched(true);
  };

  const handleNoResponseAlert = () => {
    setAlertDispatched(true);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gingham pb-24 px-3 sm:px-6 pt-3">
      {/* Decorative bows and sparkles */}
      <BurgundyBow className="absolute top-2 left-2 rotate-[-12deg]" size={54} />
      <BurgundyBow className="absolute top-2 right-2 rotate-[12deg]" size={54} />
      <SparkleStar className="absolute top-20 right-14 animate-sparkle" size={22} color="#FF2E93" />
      <div className="absolute top-16 left-8 hidden lg:block rotate-[-10deg] pointer-events-none">
        <AegisShieldSticker size={56} />
      </div>
      <div className="absolute bottom-24 right-8 hidden lg:block rotate-[12deg] pointer-events-none">
        <GirlPowerSticker size={60} />
      </div>
      <div className="absolute bottom-36 left-10 hidden xl:block rotate-[-8deg] pointer-events-none">
        <StaySafeHeartSticker size={52} />
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        {/* Toast Reassurance Banner */}
        {toastMessage && (
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <span>🌸</span>
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* TRIP MODE STATUS & TIMER CARD */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-5 sm:p-6 shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">⏱️</span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
              Trip Safety Companion
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            AEGIS automatically asks <strong className="text-pink-600">"Are you safe?"</strong> at your chosen interval. If unanswered, an alert with your location is sent to your trusted contacts!
          </p>

          {/* Active Trip Visual Timer */}
          <div className="py-2">
            <div className={`p-6 rounded-3xl border-2 transition-all max-w-xs mx-auto ${
              isTripActive 
                ? 'bg-pink-50 border-pink-400 shadow-md' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {isTripActive ? 'Next Safety Pop In' : 'Trip Mode Inactive'}
              </span>
              <div className="font-mono text-4xl sm:text-5xl font-black text-pink-600 tracking-tight">
                {isTripActive ? formatTimer(secondsRemaining) : `${intervalMinutes}:00`}
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Destination: <strong className="text-slate-800">{destinationName}</strong>
              </p>
            </div>
          </div>

          {/* Trip Control Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <button
              id="btn-toggle-trip-mode"
              onClick={() => onToggleTrip(!isTripActive)}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isTripActive
                  ? 'bg-rose-100 hover:bg-rose-200 text-rose-800 border-2 border-rose-300'
                  : 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white'
              }`}
            >
              {isTripActive ? (
                <>
                  <Square className="w-4 h-4 fill-rose-800" />
                  <span>End Current Trip</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Trip Mode</span>
                </>
              )}
            </button>

            {/* Quick Demo Test Button */}
            <button
              id="btn-trigger-demo-checkin"
              onClick={triggerCheckInPop}
              className="w-full sm:w-auto px-4 py-3 bg-pink-100 hover:bg-pink-200 border border-pink-300 text-pink-800 font-bold text-xs sm:text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              title="Test the 'Are you safe?' pop immediately"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Test Check-In Pop Now</span>
            </button>
          </div>
        </div>

        {/* SETTINGS CARD (Per User Requirements) */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-5 shadow-md space-y-4">
          <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-pink-600" />
            <span>Check-In Settings</span>
          </h3>

          {/* 1. Interval Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Check-In Frequency (Minutes)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map((mins) => (
                <button
                  key={mins}
                  id={`btn-interval-${mins}`}
                  onClick={() => {
                    setIntervalMinutes(mins);
                    setSecondsRemaining(mins * 60);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all ${
                    intervalMinutes === mins
                      ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-pink-300'
                  }`}
                >
                  Every {mins} Mins
                </button>
              ))}
            </div>
          </div>

          {/* 2. Contacts to notify if missed */}
          <div className="space-y-2 pt-1 border-t border-pink-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Contacts Notified on Missed Check-In
              </label>
              <span className="text-[11px] text-pink-600 font-semibold">
                {contacts.length} Active
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  className="px-3 py-1.5 bg-pink-50 border border-pink-200 rounded-xl text-xs text-slate-700 flex items-center gap-1.5 font-medium"
                >
                  <span>{c.avatar}</span>
                  <span>{c.name}</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REASSURING SAFETY INFO NOTE */}
        <div className="bg-rose-100/70 border-2 border-pink-300 rounded-2xl p-4 text-xs text-slate-700 space-y-1.5">
          <p className="font-bold text-pink-800 flex items-center gap-1 font-heading">
            <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
            <span>How the Safety Grace Period Works</span>
          </p>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            When the pop appears, you have <strong>60 seconds</strong> to tap "Yes, I'm safe". If you don't respond, we treat it as an emergency and immediately dispatch your current GPS coordinates to your primary trusted contacts.
          </p>
        </div>
      </div>

      {/* CHECK-IN POPUP MODAL (Per User Requirements) */}
      {showPopModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-pink-400 p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-5 text-center relative animate-fadeIn text-slate-800">
            {!alertDispatched ? (
              <>
                {/* Cute reassuring mascot asking "Are you safe?" */}
                <div className="relative inline-block mx-auto">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-200 via-rose-100 to-pink-50 border-2 border-pink-300 flex items-center justify-center text-4xl shadow-inner">
                    🌸
                  </div>
                  <Sparkles className="w-5 h-5 text-pink-500 absolute -top-1 -right-1 animate-sparkle" />
                </div>

                <div className="space-y-1">
                  <span className="px-3 py-0.5 bg-pink-100 text-pink-700 rounded-full text-xs font-bold uppercase">
                    Journey Safety Check-In
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 pt-1">
                    Are you safe? 💕
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Travelling to {destinationName}
                  </p>
                </div>

                {/* Grace countdown bar */}
                <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Grace Period Remaining</span>
                    <span className="text-rose-600 font-mono text-sm">{gracePeriodSeconds}s</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500 transition-all duration-1000 ease-linear"
                      style={{ width: `${(gracePeriodSeconds / 60) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Two Big Friendly Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    id="btn-checkin-yes"
                    onClick={handleImSafe}
                    className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-pink-300 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Yes, I'm safe 💖</span>
                  </button>

                  <button
                    id="btn-checkin-no"
                    onClick={handleNeedHelp}
                    className="w-full py-3.5 px-6 bg-red-100 hover:bg-red-200 border-2 border-red-400 text-red-700 font-bold text-sm sm:text-base rounded-2xl shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span>No, I need help 🚨</span>
                  </button>
                </div>
              </>
            ) : (
              /* Emergency Alert Dispatched Screen */
              <div className="space-y-4 pt-2">
                <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center mx-auto text-red-600">
                  <AlertCircle className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                    Help Alert Dispatched!
                  </h3>
                  <p className="text-xs sm:text-sm text-red-600 font-bold mt-1">
                    Alert sent to: {contacts.map(c => c.name).join(', ')}
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 text-left text-xs space-y-1.5 text-slate-700">
                  <p><strong>Name:</strong> Kaisha (AEGIS User)</p>
                  <p><strong>Last Known GPS:</strong> 28.6692° N, 77.2285° E (Kashmere Gate)</p>
                  <p><strong>Status:</strong> Missed safety check-in, immediate attention requested</p>
                </div>

                <button
                  onClick={() => setShowPopModal(false)}
                  className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
