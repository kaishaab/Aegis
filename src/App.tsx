/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, TrustedContact, RouteOption, NearbyService } from './types';
import { INITIAL_CONTACTS, MOCK_ROUTES } from './data/mockData';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { SafeMaps } from './components/SafeMaps';
import { SOSView } from './components/SOSView';
import { SOSModal } from './components/SOSModal';
import { CheckInView } from './components/CheckInView';
import { ReviewsView } from './components/ReviewsView';
import { NearbyServicesView } from './components/NearbyServicesView';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [contacts, setContacts] = useState<TrustedContact[]>(INITIAL_CONTACTS);
  const [isTripActive, setIsTripActive] = useState<boolean>(false);
  const [destination, setDestination] = useState<string>('Kashmere Gate, Delhi');
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(
    MOCK_ROUTES['Kashmere Gate, Delhi'][1]
  );
  const [isSOSModalOpen, setIsSOSModalOpen] = useState<boolean>(false);
  const [selectedNearbyCategory, setSelectedNearbyCategory] = useState<string>('police');

  const handleStartTrip = (dest: string, route: RouteOption) => {
    setDestination(dest);
    setSelectedRoute(route);
    setIsTripActive(true);
    setActiveTab('checkin');
  };

  const handleOpenServiceOnMap = (service: NearbyService) => {
    setDestination(service.name);
    setActiveTab('safemaps');
  };

  const handleSelectNearbyCategory = (category: string) => {
    setSelectedNearbyCategory(category);
    setActiveTab('nearbyservices');
  };

  return (
    <div className="min-h-screen bg-[#FFF0F4] text-slate-800 flex flex-col selection:bg-pink-300 selection:text-pink-900">
      {/* Top Header Bar & Persistent Desktop Side / Mobile Bottom Nav */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isTripActive={isTripActive}
        onQuickSOS={() => setIsSOSModalOpen(true)}
      />

      {/* Main Content Area with Desktop Offset for Left Side Icon Bar */}
      <main className="flex-1 lg:pl-20 transition-all">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard
                onSelectTab={setActiveTab}
                onSelectNearbyCategory={handleSelectNearbyCategory}
                onSearchDestination={(query) => {
                  setDestination(query);
                  setActiveTab('safemaps');
                }}
                isTripActive={isTripActive}
              />
            </motion.div>
          )}

          {activeTab === 'safemaps' && (
            <motion.div
              key="safemaps"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SafeMaps
                initialSearch={destination}
                onStartTrip={handleStartTrip}
              />
            </motion.div>
          )}

          {activeTab === 'sos' && (
            <motion.div
              key="sos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SOSView
                contacts={contacts}
                onUpdateContacts={setContacts}
                onOpenPoliceOnMap={() => {
                  setDestination('Nearest Police Booth & Women Helpdesk');
                  setActiveTab('safemaps');
                }}
                onTriggerSOSModal={() => setIsSOSModalOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'checkin' && (
            <motion.div
              key="checkin"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <CheckInView
                contacts={contacts}
                isTripActive={isTripActive}
                onToggleTrip={setIsTripActive}
                destinationName={destination}
              />
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ReviewsView />
            </motion.div>
          )}

          {activeTab === 'nearbyservices' && (
            <motion.div
              key="nearbyservices"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <NearbyServicesView
                selectedCategory={selectedNearbyCategory}
                onSelectCategory={setSelectedNearbyCategory}
                onOpenServiceOnMap={handleOpenServiceOnMap}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Emergency SOS Confirmation Modal */}
      <SOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        contacts={contacts}
      />
    </div>
  );
}
