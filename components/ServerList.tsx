import React from 'react';
import { Server } from '../types';

interface ServerListProps {
  servers: Server[];
  selectedServer: Server;
  onSelect: (server: Server) => void;
  disabled: boolean;
}

const ServerList: React.FC<ServerListProps> = ({ servers, selectedServer, onSelect, disabled }) => {
  return (
    <>
      <ul className="space-y-2" key={selectedServer.id}>
        {servers.map((server) => (
          <li key={server.id}>
            <button
              onClick={() => onSelect(server)}
              disabled={disabled}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors duration-200 ${
                selectedServer.id === server.id
                  ? 'bg-cyan-500/20 ring-2 ring-cyan-500 text-white animate-selection-highlight'
                  : 'bg-slate-700/50 hover:bg-slate-700'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="text-2xl leading-none">{server.flag}</span>
              <span className="font-medium">{server.country}</span>
            </button>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes selection-zoom-in {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
            background-color: #06b6d4; /* cyan-500 */
          }
          100% {
            transform: scale(1);
            background-color: rgba(6, 182, 212, 0.2); /* bg-cyan-500/20 */
          }
        }
        .animate-selection-highlight {
          animation: selection-zoom-in 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default ServerList;