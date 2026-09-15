import React, { useState } from 'react';
import { TrustedContact } from '../types';
import { 
  PhoneCall, 
  ShieldAlert, 
  UserPlus, 
  Trash2, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Battery, 
  Share2, 
  Volume2, 
  VolumeX, 
  ArrowUp, 
  ArrowDown, 
  Sparkles,
  X,
  AlertOctagon,
  ExternalLink
} from 'lucide-react';
import { BurgundyBow, SparkleStar } from './PopGraphics';

interface SOSViewProps {
  contacts: TrustedContact[];
  onUpdateContacts: (contacts: TrustedContact[]) => void;
  onOpenPoliceOnMap: () => void;
  onTriggerSOSModal: () => void;
}

export const SOSView: React.FC<SOSViewProps> = ({
  contacts,
  onUpdateContacts,
  onOpenPoliceOnMap,
  onTriggerSOSModal,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [callInitiated, setCallInitiated] = useState<string | null>(null);

  const handleCall = (number: string, title: string) => {
    setCallInitiated(`${title} (${number})`);
    setTimeout(() => {
      setCallInitiated(null);
    }, 4000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    const newContact: TrustedContact = {
      id: 'c_' + Date.now(),
      name: newContactName.trim(),
      relation: newContactRelation.trim() || 'Friend',
      phone: newContactPhone.trim(),
      isPrimary: contacts.length < 2,
      avatar: '🌸',
    };

    onUpdateContacts([...contacts, newContact]);
    setNewContactName('');
    setNewContactRelation('');
    setNewContactPhone('');
    setShowAddModal(false);
  };

  const handleRemoveContact = (id: string) => {
    onUpdateContacts(contacts.filter(c => c.id !== id));
  };

  const handleMoveContact = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= contacts.length) return;
    const updated = [...contacts];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    onUpdateContacts(updated);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gingham pb-24 px-3 sm:px-6 pt-3">
      {/* Decorative bows and sparkles */}
      <BurgundyBow className="absolute top-2 left-2 rotate-[-12deg]" size={54} />
      <BurgundyBow className="absolute top-2 right-2 rotate-[12deg]" size={54} />
      <SparkleStar className="absolute top-16 right-16 animate-sparkle" size={20} color="#FF1493" />

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Call Feedback Banner */}
        {callInitiated && (
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span className="font-bold text-sm">Dialing: {callInitiated}...</span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">Connecting</span>
          </div>
        )}

        {/* GIANT SOS BUTTON CARD */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-5 sm:p-7 shadow-xl text-center relative overflow-hidden">
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <span className="px-3 py-1 bg-red-100 border border-red-300 text-red-700 text-xs font-black uppercase rounded-full tracking-wider">
                Emergency Dispatch
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                Need Immediate Help?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Tap the big button below to broadcast your live GPS coordinates, battery level, and emergency alert to your trusted contacts.
              </p>
            </div>

            {/* Giant Pulsing SOS Button */}
            <div className="py-2 flex justify-center">
              <button
                id="btn-send-sos-giant"
                onClick={onTriggerSOSModal}
                className="relative group w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-red-500 via-rose-600 to-pink-600 text-white font-extrabold shadow-2xl hover:shadow-red-500/50 flex flex-col items-center justify-center p-4 active:scale-95 transition-all cursor-pointer border-4 border-white/80"
              >
                {/* Ripple rings */}
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25" />
                <span className="absolute -inset-2 rounded-full border-2 border-pink-400/60 animate-pulse" />

                <AlertOctagon className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md text-white group-hover:scale-110 transition-transform mb-1" />
                <span className="font-heading text-xl sm:text-2xl tracking-tight drop-shadow-md">
                  SEND SOS
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-pink-100 mt-0.5">
                  Alert {contacts.length} Contacts
                </span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 font-medium">
              ⚡ Will notify: <strong className="text-pink-600">{contacts.map(c => c.name).join(', ')}</strong>
            </p>
          </div>
        </div>

        {/* IMMEDIATE EMERGENCY HOTLINES (Grid of clear large buttons) */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-4 sm:p-5 shadow-md space-y-3">
          <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-pink-600" />
            <span>Emergency Quick Calls</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Call Police 112 */}
            <button
              id="btn-call-police"
              onClick={() => handleCall('112', 'Police Emergency')}
              className="p-3.5 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-lg">👮</span>
              </div>
              <span className="text-xs font-bold text-slate-800">Call Police</span>
              <span className="text-sm font-extrabold text-red-600 font-heading">112</span>
            </button>

            {/* Women Helpline 1091 */}
            <button
              id="btn-call-women-helpline"
              onClick={() => handleCall('1091', 'Women Helpline')}
              className="p-3.5 bg-pink-50 hover:bg-pink-100 border-2 border-pink-300 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-lg">👩‍🦰</span>
              </div>
              <span className="text-xs font-bold text-slate-800">Women Helpline</span>
              <span className="text-sm font-extrabold text-pink-600 font-heading">1091</span>
            </button>

            {/* Call Ambulance 102 */}
            <button
              id="btn-call-ambulance"
              onClick={() => handleCall('102', 'Ambulance Medical')}
              className="p-3.5 bg-rose-50 hover:bg-rose-100 border-2 border-rose-300 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-lg">🚑</span>
              </div>
              <span className="text-xs font-bold text-slate-800">Ambulance</span>
              <span className="text-sm font-extrabold text-rose-600 font-heading">102</span>
            </button>

            {/* Nearest Police Booth on Map */}
            <button
              id="btn-find-police-booth"
              onClick={onOpenPoliceOnMap}
              className="p-3.5 bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Police Booth</span>
              <span className="text-[11px] font-bold text-purple-700">350m Away</span>
            </button>
          </div>
        </div>

        {/* TRUSTED CONTACTS SECTION */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-3xl p-4 sm:p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span>Trusted Contacts Circle</span>
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              </h3>
              <p className="text-[11px] text-slate-500">
                Alerts are dispatched in this sequence during SOS & missed check-ins
              </p>
            </div>
            <button
              id="btn-add-contact-open"
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Contact</span>
            </button>
          </div>

          <div className="space-y-2 pt-1">
            {contacts.map((contact, idx) => (
              <div
                key={contact.id}
                className="p-3 bg-pink-50/70 border border-pink-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:bg-pink-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-pink-300 flex items-center justify-center text-xl shadow-xs">
                    {contact.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-800">{contact.name}</span>
                      {contact.isPrimary && (
                        <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[9px] font-black uppercase">
                          Priority #1
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>{contact.relation}</span>
                      <span>•</span>
                      <span className="font-mono">{contact.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Priority order arrows & delete */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveContact(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 text-slate-400 hover:text-pink-600 disabled:opacity-30"
                    title="Move up priority"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveContact(idx, 'down')}
                    disabled={idx === contacts.length - 1}
                    className="p-1 text-slate-400 hover:text-pink-600 disabled:opacity-30"
                    title="Move down priority"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
                    title="Delete contact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SOS DISPATCH TECHNICAL EXPLANATION CARD (Per User Requirements) */}
        <div className="bg-rose-100/80 border-2 border-pink-300 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-pink-800 font-bold font-heading">
            <Share2 className="w-4 h-4" />
            <span>What information is shared when SOS is sent?</span>
          </div>
          <ul className="space-y-1 pl-5 list-disc text-slate-600">
            <li><strong>Live GPS Coordinates:</strong> Real-time pinpoint with interactive tracking link.</li>
            <li><strong>Phone Battery & Network Status:</strong> So your loved ones know if your phone is about to die.</li>
            <li><strong>Audio Siren & Silent Mode:</strong> Dispatches discreet SMS/WhatsApp alerts even if your phone is muted.</li>
            <li><strong>Nearby Landmarks:</strong> Nearest police booth, metro station, and lighted crossroads.</li>
          </ul>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-pink-300 p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-1.5">
                <span>Add Trusted Contact</span>
                <Sparkles className="w-4 h-4 text-pink-500" />
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  className="w-full px-3 py-2 bg-pink-50/60 border border-pink-300 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={newContactRelation}
                  onChange={(e) => setNewContactRelation(e.target.value)}
                  placeholder="e.g. Sister, Mom, College Roommate"
                  className="w-full px-3 py-2 bg-pink-50/60 border border-pink-300 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (with SMS/WhatsApp)</label>
                <input
                  type="tel"
                  required
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3 py-2 bg-pink-50/60 border border-pink-300 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
