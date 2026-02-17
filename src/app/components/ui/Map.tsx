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

// Custom ice cream truck icon (offline)
const iceCreamTruckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Truck body -->
      <rect x="10" y="18" width="12" height="6" rx="1" fill="#9CA3AF"/>
      <rect x="7" y="19" width="4" height="5" rx="1" fill="#6B7280"/>

      <!-- Truck windows -->
      <rect x="11" y="19" width="9" height="2" rx="0.5" fill="#F3F4F6"/>
      <rect x="8" y="20" width="2" height="1.5" rx="0.2" fill="#F3F4F6"/>

      <!-- Wheels -->
      <circle cx="9" cy="26" r="1.8" fill="#374151"/>
      <circle cx="20" cy="26" r="1.8" fill="#374151"/>

      <!-- Ice cream cone on top -->
      <path d="M16 10 L14 14 L18 14 Z" fill="#D1D5DB"/>
      <circle cx="16" cy="10" r="2.5" fill="#E5E7EB"/>
      <circle cx="15" cy="9" r="1" fill="#F3F4F6" opacity="0.8"/>

      <!-- Offline indicator -->
      <circle cx="24" cy="12" r="3" fill="#EF4444" opacity="0.9"/>
      <path d="M22.5 12 L25.5 12" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `),
  iconSize: [34, 34],
  iconAnchor: [17, 32],
  popupAnchor: [0, -32],
});

// Custom mobile live truck icon (truck with motion lines)
const mobileLiveTruckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Motion lines behind truck -->
      <g opacity="0.8">
        <path d="M2 14h6" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
        <path d="M1 17h4" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
        <path d="M3 20h7" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
        <path d="M0 23h5" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Truck body -->
      <rect x="16" y="16" width="16" height="8" rx="1" fill="#10B981"/>
      <rect x="12" y="18" width="6" height="6" rx="1" fill="#059669"/>

      <!-- Truck windows -->
      <rect x="18" y="18" width="12" height="3" rx="0.5" fill="#FFFFFF"/>
      <rect x="13" y="19" width="4" height="2" rx="0.3" fill="#FFFFFF"/>

      <!-- Wheels -->
      <circle cx="15" cy="26" r="2" fill="#374151"/>
      <circle cx="29" cy="26" r="2" fill="#374151"/>
      <circle cx="15" cy="26" r="1.2" fill="#4B5563"/>
      <circle cx="29" cy="26" r="1.2" fill="#4B5563"/>

      <!-- Ice cream cone on top -->
      <path d="M24 8 L22 12 L26 12 Z" fill="#FFFFFF"/>
      <circle cx="24" cy="8" r="2.5" fill="#FFFFFF"/>

      <!-- Direction arrow -->
      <path d="M36 20 L42 20 L40 18 M42 20 L40 22" stroke="#059669" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `),
  iconSize: [50, 34],
  iconAnchor: [25, 32],
  popupAnchor: [0, -32],
});

// Custom static live truck icon (parked truck with pin)
const staticLiveTruckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Location pin -->
      <path d="M16 2 C19.5 2 22 4.5 22 8 C22 12 16 18 16 18 S10 12 10 8 C10 4.5 12.5 2 16 2 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1"/>
      <circle cx="16" cy="8" r="2" fill="#FFFFFF"/>

      <!-- Truck body -->
      <rect x="10" y="20" width="12" height="6" rx="1" fill="#3B82F6"/>
      <rect x="7" y="21" width="4" height="5" rx="1" fill="#1D4ED8"/>

      <!-- Truck windows -->
      <rect x="11" y="21" width="9" height="2" rx="0.5" fill="#FFFFFF"/>
      <rect x="8" y="22" width="2" height="1.5" rx="0.2" fill="#FFFFFF"/>

      <!-- Wheels -->
      <circle cx="9" cy="28" r="1.8" fill="#374151"/>
      <circle cx="20" cy="28" r="1.8" fill="#374151"/>
      <circle cx="9" cy="28" r="1" fill="#6B7280"/>
      <circle cx="20" cy="28" r="1" fill="#6B7280"/>

      <!-- Ice cream cone on top -->
      <path d="M16 14 L14.5 17 L17.5 17 Z" fill="#FFFFFF"/>
      <circle cx="16" cy="14" r="1.5" fill="#FFFFFF"/>

      <!-- Parking indicators -->
      <rect x="6" y="30" width="3" height="0.5" rx="0.25" fill="#93C5FD" opacity="0.8"/>
      <rect x="23" y="30" width="3" height="0.5" rx="0.25" fill="#93C5FD" opacity="0.8"/>
    </svg>
  `),
  iconSize: [36, 40],
  iconAnchor: [18, 35],
  popupAnchor: [0, -35],
});

// User location icon
const userLocationIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="#F97316"/>
      <circle cx="12" cy="12" r="4" fill="#FFFFFF"/>
      <circle cx="12" cy="12" r="2" fill="#F97316"/>
    </svg>
  `),
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