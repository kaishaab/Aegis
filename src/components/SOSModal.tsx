import React, { useState, useEffect } from 'react';
import { TrustedContact } from '../types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  BatteryCharging, 
  Share2, 
  X, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: TrustedContact[];
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose, contacts }) => {
  const [countdown, setCountdown] = useState(5);
  const [isSent, setIsSent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsSent(false);
      setCopiedLink(false);
      return;
    }

    if (!isSent && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!isSent && countdown === 0) {
      handleConfirmSend();
    }
  }, [isOpen, countdown, isSent]);

  if (!isOpen) return null;

  const handleConfirmSend = () => {
    setIsSent(true);
    // Fire celebratory safety reassurance confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF2E93', '#FF69B4', '#F472B6', '#F43F5E'],
    });
  };

  const trackingLink = 'https://aegis.safety/track/live-kaisha-8821';

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(trackingLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-4 border-pink-400 p-5 sm:p-7 w-full max-w-md shadow-2xl space-y-4 relative animate-fadeIn text-slate-800">
        <button
          id="btn-close-sos-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSent ? (
          /* Step 1: Confirmation Modal with Countdown */
          <div className="text-center space-y-4 pt-2">
            <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-400 flex items-center justify-center mx-auto text-red-600 animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Confirm Emergency SOS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Send SOS with your current real-time GPS location to:
              </p>
            </div>

            {/* Recipient list */}
            <div className="bg-pink-50/80 border border-pink-200 rounded-2xl p-3 flex flex-wrap items-center justify-center gap-2">
              {contacts.map((c) => (
                <span
                  key={c.id}
                  className="px-2.5 py-1 bg-white border border-pink-300 rounded-full text-xs font-bold text-pink-700 shadow-2xs flex items-center gap-1"
                >
                  <span>{c.avatar}</span>
                  <span>{c.name}</span>
                </span>
              ))}
            </div>

            {/* Auto-send countdown progress bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Auto-dispatching in</span>
                <span className="text-red-600 font-extrabold text-sm">{countdown}s</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                id="btn-cancel-sos"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl border-2 border-slate-300 hover:bg-slate-50 font-bold text-xs sm:text-sm text-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-sos-now"
                onClick={handleConfirmSend}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send Now</span>
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Success State Screen with Live Shared Details */
          <div className="text-center space-y-4 pt-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                SOS Dispatched!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold mt-0.5">
                Your emergency location has been broadcast.
              </p>
            </div>

            {/* Live Shared Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-pink-600" />
                  <strong>Current Location:</strong>
                </span>
                <span className="font-mono text-[11px] text-slate-800">28.6692° N, 77.2285° E</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-pink-600" />
                  <strong>Dispatched At:</strong>
                </span>
                <span className="text-slate-800 font-medium">Just now (Live streaming)</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <BatteryCharging className="w-4 h-4 text-emerald-600" />
                  <strong>Device Battery:</strong>
                </span>
                <span className="text-emerald-700 font-bold">84% (Charging)</span>
              </div>
            </div>

            {/* Tracking Link Bar */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-pink-800 truncate">
                {trackingLink}
              </span>
              <button
                onClick={copyToClipboard}
                className="px-2.5 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Your contacts have received an automated SMS & WhatsApp notification with a one-tap Google Maps directions link directly to you.
            </p>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
            >
              Done / Return to Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
