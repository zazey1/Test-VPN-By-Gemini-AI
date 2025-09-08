
import React from 'react';
import { ConnectionStatus } from '../types';
import { PowerIcon } from '../constants';

interface ConnectButtonProps {
  status: ConnectionStatus;
  onClick: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ status, onClick }) => {
  const getButtonClass = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return 'bg-green-500 hover:bg-green-600 shadow-green-500/30';
      case ConnectionStatus.DISCONNECTED:
        return 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/30';
      case ConnectionStatus.CONNECTING:
        return 'bg-yellow-500 cursor-not-allowed animate-pulse';
      case ConnectionStatus.DISCONNECTING:
        return 'bg-red-500 cursor-not-allowed animate-pulse';
      default:
        return 'bg-slate-600';
    }
  };

  const getButtonText = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return 'DISCONNECT';
      case ConnectionStatus.DISCONNECTED:
        return 'CONNECT';
      default:
        return status.toUpperCase();
    }
  };

  const isDisabled = status === ConnectionStatus.CONNECTING || status === ConnectionStatus.DISCONNECTING;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full flex items-center justify-center gap-3 text-white font-bold py-4 px-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105 ${getButtonClass()}`}
    >
      <PowerIcon className="w-7 h-7" />
      <span className="text-xl tracking-wider">{getButtonText()}</span>
    </button>
  );
};

export default ConnectButton;
