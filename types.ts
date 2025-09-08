
export enum ConnectionStatus {
  DISCONNECTED = 'Disconnected',
  CONNECTING = 'Connecting...',
  CONNECTED = 'Connected',
  DISCONNECTING = 'Disconnecting...',
}

export interface Server {
  id: string;
  country: string;
  flag: string;
  ipPrefix: string;
  coords: {
    lat: number;
    lon: number;
  };
}
