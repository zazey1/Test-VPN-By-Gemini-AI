
import React from 'react';
import { ConnectionStatus } from '../types';

interface StatusDisplayProps {
  status: ConnectionStatus;
  ip: string;
  connectionTime: number;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, ip, connectionTime }) => {
  const getStatusColor = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return 'text-green-400';
      case ConnectionStatus.DISCONNECTED:
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold mb-2 transition-colors duration-300 ${getStatusColor()}`}>
        {status}
      </div>
      <div className="bg-slate-900 rounded-lg p-3 inline-block">
        <p className="text-xs text-slate-400">YOUR IP ADDRESS</p>
        <p className="font-mono text-lg text-slate-200 tracking-wider">{ip}</p>
      </div>
      {status === ConnectionStatus.CONNECTED && (
        <div className="mt-4">
          <p className="text-xs text-slate-400">DURATION</p>
          <p className="font-mono text-lg text-slate-200">{formatTime(connectionTime)}</p>
        </div>
      )}
    </div>
  );
};

export default StatusDisplay;
