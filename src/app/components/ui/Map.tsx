import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom ice cream truck icon
const iceCreamTruckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMTdIM1Y2SDdWMTdaIiBmaWxsPSIjRkY2QjM1Ii8+CjxwYXRoIGQ9Ik0yMSAxN0g3VjZIMjFWMTdaIiBmaWxsPSIjRkZBNTAwIi8+CjxjaXJjbGUgY3g9IjkiIGN5PSIxOSIgcj0iMiIgZmlsbD0iIzMzMzMzMyIvPgo8Y2lyY2xlIGN4PSIxOSIgY3k9IjE5IiByPSIyIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik0xMCA4SDE4VjEwSDEwVjhaIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0xMSA5SDE3VjEzSDExVjlaIiBmaWxsPSIjRTZGRkZGIi8+Cjwvc3ZnPg==',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Custom mobile live truck icon (pulsing green)
const mobileLiveTruckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMTdIM1Y2SDdWMTdaIiBmaWxsPSIjMTBCOTgxIi8+CjxwYXRoIGQ9Ik0yMSAxN0g3VjZIMjFWMTdaIiBmaWxsPSIjMDZCNkQ0Ii8+CjxjaXJjbGUgY3g9IjkiIGN5PSIxOSIgcj0iMiIgZmlsbD0iIzMzMzMzMyIvPgo8Y2lyY2xlIGN4PSIxOSIgY3k9IjE5IiByPSIyIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik0xMCA4SDE4VjEwSDEwVjhaIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0xMSA5SDE3VjEzSDExVjlaIiBmaWxsPSIjRTZGRkZGIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNCIgcj0iMyIgZmlsbD0iIzEwQjk4MSIvPgo8cGF0aCBkPSJNMTAuNSAyLjVMMTMuNSA1LjVMMTAuNSA4LjVaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPg==',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Custom static live truck icon (pulsing blue)
const staticLiveTruckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMTdIM1Y2SDdWMTdaIiBmaWxsPSIjMzMzM0Y3Ii8+CjxwYXRoIGQ9Ik0yMSAxN0g3VjZIMjFWMTdaIiBmaWxsPSIjNjM2NkY3Ii8+CjxjaXJjbGUgY3g9IjkiIGN5PSIxOSIgcj0iMiIgZmlsbD0iIzMzMzMzMyIvPgo8Y2lyY2xlIGN4PSIxOSIgY3k9IjE5IiByPSIyIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik0xMCA4SDE4VjEwSDEwVjhaIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0xMSA5SDE3VjEzSDExVjlaIiBmaWxsPSIjRTZGRkZGIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNCIgcj0iMyIgZmlsbD0iIzMzMzNGNyIvPgo8cGF0aCBkPSJNMTAgMkgxNFY2SDEwVjJaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPg==',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// User location icon
const userLocationIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzNBODJGNiIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPg==',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

interface IceCreamTruck {
  id: string;
  name: string;
  ownerId: string;
  flavorCategories: string[];
  description: string;
  status: 'live-mobile' | 'live-static' | 'offline';
  location: {
    lat: number;
    lng: number;
  };
  distance?: string;
  rating: number;
  schedule: string;
  contact: string;
  photoUrl: string;
  broadcastMode?: 'mobile' | 'static';
}

interface MapProps {
  trucks: IceCreamTruck[];
  onTruckClick: (truck: IceCreamTruck) => void;
  userLocation?: { lat: number; lng: number };
}

export default function Map({ trucks, onTruckClick, userLocation }: MapProps) {
  // Default center is San Francisco
  const center: [number, number] = userLocation ? [userLocation.lat, userLocation.lng] : [37.7749, -122.4194];

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Truck markers */}
        {trucks.map((truck) => {
          let truckIcon = iceCreamTruckIcon;
          if (truck.status === 'live-mobile') {
            truckIcon = mobileLiveTruckIcon;
          } else if (truck.status === 'live-static') {
            truckIcon = staticLiveTruckIcon;
          }

          return (
            <Marker
              key={truck.id}
              position={[truck.location.lat, truck.location.lng]}
              icon={truckIcon}
              eventHandlers={{
                click: () => onTruckClick(truck),
              }}
            >
              <Popup>
                <div className="text-center min-w-48">
                  <h3 className="font-bold text-gray-900 mb-2">{truck.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{truck.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      truck.status === 'live-mobile'
                        ? 'bg-green-100 text-green-800'
                        : truck.status === 'live-static'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {truck.status === 'live-mobile'
                        ? 'Live & Moving'
                        : truck.status === 'live-static'
                        ? 'Live & Parked'
                        : 'Offline'
                      }
                    </span>
                    <span className="text-sm font-medium">⭐ {truck.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{truck.schedule}</p>
                  <button
                    onClick={() => onTruckClick(truck)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-3 rounded"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}