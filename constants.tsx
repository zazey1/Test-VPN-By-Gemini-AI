
import React from 'react';
import { Server } from './types';

export const SERVERS: Server[] = [
  { id: 'us', country: 'United States', flag: '🇺🇸', ipPrefix: '104.25.12', coords: { lat: 38.8951, lon: -77.0364 } },
  { id: 'ca', country: 'Canada', flag: '🇨🇦', ipPrefix: '142.112.98', coords: { lat: 45.4215, lon: -75.6972 } },
  { id: 'gb', country: 'United Kingdom', flag: '🇬🇧', ipPrefix: '81.19.45', coords: { lat: 51.5074, lon: -0.1278 } },
  { id: 'de', country: 'Germany', flag: '🇩🇪', ipPrefix: '185.234.11', coords: { lat: 52.5200, lon: 13.4050 } },
  { id: 'jp', country: 'Japan', flag: '🇯🇵', ipPrefix: '103.45.18', coords: { lat: 35.6895, lon: 139.6917 } },
  { id: 'au', country: 'Australia', flag: '🇦🇺', ipPrefix: '45.12.70', coords: { lat: -33.8688, lon: 151.2093 } },
  { id: 'sg', country: 'Singapore', flag: '🇸🇬', ipPrefix: '172.104.90', coords: { lat: 1.3521, lon: 103.8198 } },
  { id: 'br', country: 'Brazil', flag: '🇧🇷', ipPrefix: '177.54.148', coords: { lat: -15.8267, lon: -47.9218 } },
];

// SVG Icons
export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />
  </svg>
);

export const WifiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
    </svg>
);

export const GlobeAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

export const PowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
  </svg>
);
