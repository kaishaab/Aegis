export type ActiveTab = 'dashboard' | 'safemaps' | 'sos' | 'checkin' | 'reviews' | 'nearbyservices';

export type TimeOfDay = 'now' | 'night' | 'latenight';

export type TransportMode = 'car' | 'metro' | 'bike' | 'bus' | 'walk';

export type SafetyLevel = 'very_safe' | 'safe' | 'neutral' | 'moderate_unsafe' | 'very_unsafe';

export interface RouteOption {
  id: string;
  name: string;
  badge: string;
  time: string;
  durationMinutes: number;
  distance: string;
  costEstimate: string;
  safetyScore: number; // e.g. 8.8 out of 10
  safetyLabel: 'High Safety' | 'Balanced Safety' | 'Moderate Risk';
  description: string;
  streetLighting: 'Well-Lit (95%)' | 'Moderate (65%)' | 'Dim/Low (30%)';
  transportAvailability: 'High (Metro + Cabs)' | 'Medium' | 'Low';
  crowdDensity: 'Crowded & Active' | 'Moderate' | 'Sparse & Desolate';
  historicalRisk: 'Clean Record' | 'Few Minor Incidents' | 'Theft/Harassment Reported';
  roadCondition: 'Smooth & Paved' | 'Average' | 'Potholes / Waterlogged';
  cautionAlerts?: string[];
  polylineCoords: [number, number][]; // coordinates for SVG route path
  color: string;
}

export interface SafetyZone {
  id: string;
  name: string;
  level: SafetyLevel;
  description: string;
  streetLightPct: number;
  crowdScore: string;
  cctvCovered: boolean;
  policeProximity: string;
  shapeCoords: [number, number][];
}

export interface TrustedContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary: boolean;
  avatar: string;
}

export interface ReviewItem {
  id: string;
  areaName: string;
  userName: string;
  userRole: string; // e.g. "College Student", "Daily Metro Commuter"
  timeAgo: string;
  timeOfDay: 'Day' | 'Night' | 'Late Night';
  transportMode: 'Walking' | 'Auto' | 'Metro' | 'Cab' | 'Bus';
  overallRating: number; // 1-5
  roadSafety: number; // 1-5
  lighting: number; // 1-5
  transport: number; // 1-5
  crowdType: 'Safe & Friendly' | 'Neutral' | 'Desolate' | 'Rowdy / Avoid';
  autoFare: string;
  amenities: string[];
  comment: string;
  helpfulCount: number;
}

export interface NearbyService {
  id: string;
  name: string;
  category: 'police' | 'bus' | 'washroom' | 'hospital' | 'pharmacy' | 'metro' | 'petrol' | 'hotel';
  categoryLabel: string;
  distance: string;
  travelTime: string;
  address: string;
  isOpen24x7: boolean;
  safetyRating: number; // 1-5
  phone?: string;
  coords: [number, number]; // x, y for map display
  hasCCTV: boolean;
  womenStaffPresent: boolean;
}

export interface CautionAlert {
  id: string;
  icon: string;
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
}
