import React from 'react';
import { Server, ConnectionStatus } from '../types';
import { SERVERS } from '../constants';

interface WorldMapProps {
  selectedServer: Server | null;
  status: ConnectionStatus;
}

// A simple projection to convert lat/lon to x/y for our SVG
const mercatorProjection = (lon: number, lat: number, width: number, height: number) => {
    const x = (lon + 180) * (width / 360);
    const latRad = lat * Math.PI / 180;
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    const y = (height / 2) - (width * mercN / (2 * Math.PI));
    return { x, y };
};

const WorldMap: React.FC<WorldMapProps> = ({ selectedServer, status }) => {
  const width = 500;
  const height = 250;

  // Home location (can be customized)
  const homeCoords = { lat: 34.0522, lon: -118.2437 }; // Los Angeles
  const homePos = mercatorProjection(homeCoords.lon, homeCoords.lat, width, height);
  const serverPos = selectedServer ? mercatorProjection(selectedServer.coords.lon, selectedServer.coords.lat, width, height) : null;

  const isConnected = status === ConnectionStatus.CONNECTED;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.2))' }}>
        {/* Map Path - Simplified world map */}
        <path
          d="M250,0 C111.9,0,0,55.9,0,125 C0,194.1,111.9,250,250,250 C388.1,250,500,194.1,500,125 C500,55.9,388.1,0,250,0 Z M475,125 C475,182.1,373.1,225,250,225 C126.9,225,25,182.1,25,125 C25,67.9,126.9,25,250,25 C373.1,25,475,67.9,475,125 Z M100,125 C100,157.9,167.2,185,250,185 C332.8,185,400,157.9,400,125 C400,92.1,332.8,65,250,65 C167.2,65,100,92.1,100,125 Z"
          fill="none"
          stroke="#334155"
          strokeWidth="0.5"
        />

        {/* Server Locations */}
        {SERVERS.map(server => {
            const pos = mercatorProjection(server.coords.lon, server.coords.lat, width, height);
            const isSelected = selectedServer?.id === server.id;
            return (
                <g key={server.id}>
                    {/* Pulsing glow for the selected server */}
                    {isSelected && (
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="4"
                            className="fill-cyan-400 animate-pulse-glow"
                        />
                    )}
                    <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 4 : 2}
                        className={`transition-all duration-300 ${isSelected ? 'fill-cyan-400' : 'fill-slate-500'}`}
                    />
                </g>
            );
        })}

        {/* Home Location */}
        <circle cx={homePos.x} cy={homePos.y} r="3" className="fill-green-400" />
        <circle cx={homePos.x} cy={homePos.y} r="6" className="fill-green-400/30 animate-ping" />
        
        {/* Connection line */}
        {serverPos && (
          <g>
             <path
              d={`M ${homePos.x} ${homePos.y} Q ${(homePos.x + serverPos.x)/2} ${(homePos.y + serverPos.y)/2 - 50} ${serverPos.x} ${serverPos.y}`}
              fill="none"
              className={`stroke-slate-600 transition-opacity duration-500 ${isConnected ? 'opacity-100' : 'opacity-0'}`}
              strokeWidth="1"
            />
            {isConnected && (
              <path
                d={`M ${homePos.x} ${homePos.y} Q ${(homePos.x + serverPos.x)/2} ${(homePos.y + serverPos.y)/2 - 50} ${serverPos.x} ${serverPos.y}`}
                fill="none"
                className="stroke-cyan-400"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                style={{
                  animation: 'dash 2s linear infinite'
                }}
              />
            )}
          </g>
        )}
      </svg>
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes pulse-glow {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        .animate-pulse-glow {
          transform-origin: center;
          animation: pulse-glow 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WorldMap;
