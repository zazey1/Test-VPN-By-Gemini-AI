
import React, { useState, useEffect, useRef } from 'react';
import { ConnectionStatus, Server } from './types';
import { SERVERS } from './constants';
import { getCountryInfo } from './services/geminiService';
import WorldMap from './components/WorldMap';
import ConnectButton from './components/ConnectButton';
import ServerList from './components/ServerList';
import StatusDisplay from './components/StatusDisplay';
import { ShieldCheckIcon, WifiIcon } from './constants';

const App: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);
  const [currentIp, setCurrentIp] = useState<string>('192.168.1.10');
  const [connectionTime, setConnectionTime] = useState<number>(0);
  const [countryInfo, setCountryInfo] = useState<string>('');
  const [isInfoLoading, setIsInfoLoading] = useState<boolean>(false);
  const countryInfoCache = useRef<Record<string, string>>({});

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.CONNECTED) {
      const timer = setInterval(() => {
        setConnectionTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setConnectionTime(0);
    }
  }, [connectionStatus]);

  useEffect(() => {
    if (selectedServer) {
      const countryName = selectedServer.country;

      // Check cache first for an instant response
      if (countryInfoCache.current[countryName]) {
        setCountryInfo(countryInfoCache.current[countryName]);
        setIsInfoLoading(false);
        return;
      }
      
      // If not in cache, show loading state and prepare to fetch
      setIsInfoLoading(true);
      setCountryInfo('');
      
      const handler = setTimeout(() => {
        const fetchAndCacheInfo = async () => {
          try {
            const info = await getCountryInfo(countryName);
            countryInfoCache.current[countryName] = info; // Cache the result
            setCountryInfo(info);
          } catch (error) {
            console.error(`Error fetching info for ${countryName}:`, error);
            const errorMessage = "Could not retrieve information for this country.";
            countryInfoCache.current[countryName] = errorMessage; // Also cache errors to prevent retries
            setCountryInfo(errorMessage);
          } finally {
            setIsInfoLoading(false);
          }
        };
        fetchAndCacheInfo();
      }, 500); // 500ms delay to debounce API calls

      // Cleanup function to clear the timeout if the user selects another server
      return () => {
        clearTimeout(handler);
      };
    }
  }, [selectedServer]);


  const generateIpForServer = (server: Server): string => {
    const randomOctet = () => Math.floor(Math.random() * 254) + 1;
    return `${server.ipPrefix}.${randomOctet()}.${randomOctet()}`;
  };

  const handleConnectToggle = () => {
    if (connectionStatus === ConnectionStatus.CONNECTED) {
      setConnectionStatus(ConnectionStatus.DISCONNECTING);
      setTimeout(() => {
        setConnectionStatus(ConnectionStatus.DISCONNECTED);
        setCurrentIp('192.168.1.10');
      }, 1500);
    } else if (connectionStatus === ConnectionStatus.DISCONNECTED) {
      setConnectionStatus(ConnectionStatus.CONNECTING);
      setTimeout(() => {
        setConnectionStatus(ConnectionStatus.CONNECTED);
        setCurrentIp(generateIpForServer(selectedServer));
      }, 2000);
    }
  };

  const handleServerSelect = (server: Server) => {
    if (connectionStatus === ConnectionStatus.DISCONNECTED) {
      setSelectedServer(server);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center font-sans p-4">
      <main className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 flex items-center justify-center gap-3">
              <ShieldCheckIcon className="w-10 h-10" />
              Gemini VPN
            </h1>
            <p className="text-slate-400 mt-2">Your simulated shield in the digital world.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-slate-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 flex flex-col justify-between">
            <div>
              <StatusDisplay
                status={connectionStatus}
                ip={currentIp}
                connectionTime={connectionTime}
              />
              <div className="my-8">
                <WorldMap selectedServer={selectedServer} status={connectionStatus} />
              </div>
            </div>
            <ConnectButton status={connectionStatus} onClick={handleConnectToggle} />
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <WifiIcon className="w-6 h-6" />
              Server Locations
            </h2>
            <div className="flex-grow overflow-y-auto pr-2 -mr-2" style={{maxHeight: '300px'}}>
               <ServerList
                  servers={SERVERS}
                  selectedServer={selectedServer}
                  onSelect={handleServerSelect}
                  disabled={connectionStatus !== ConnectionStatus.DISCONNECTED}
                />
            </div>
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h3 className="font-semibold text-slate-300 mb-2">About {selectedServer.country}</h3>
              {isInfoLoading ? (
                 <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-3 py-1">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                </div>
              ) : (
                <p className="text-slate-400 text-sm">{countryInfo}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
