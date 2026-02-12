import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, List, User, Star, Navigation, Radio, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { IceCreamTruck, User as UserType } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import Map from '../ui/Map';
import { toast } from 'sonner';

interface HomeMapViewProps {
  user: UserType | null;
  trucks: IceCreamTruck[];
  onNavigate: (screen: string) => void;
  onSelectTruck: (truck: IceCreamTruck) => void;
  onBecomeDriver: () => void;
  onToggleFavorite: (truckId: string) => void;
}


const truckImages: { [key: string]: string } = {
  'ice-cream-truck-1': 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-2': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-3': 'https://images.unsplash.com/photo-1625869016774-3a92be1f3460?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-4': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center'
};

export default function HomeMapView({
  user,
  trucks,
  onNavigate,
  onSelectTruck,
  onBecomeDriver,
  onToggleFavorite
}: HomeMapViewProps) {
  const [showListView, setShowListView] = useState(false);
  const [userLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Mock user location
  const [previousTruckStatuses, setPreviouseTruckStatuses] = useState<{[key: string]: string}>({});
  const [notifiedTrucks, setNotifiedTrucks] = useState<Set<string>>(new Set()); // Track which trucks we've notified about
  const [isInitialized, setIsInitialized] = useState(false); // Track if we've initialized the statuses

  const filteredTrucks = trucks;

  // Memoize truck status changes to prevent unnecessary re-renders
  const truckStatuses = useMemo(() => {
    const statuses: {[key: string]: string} = {};
    trucks.forEach(truck => {
      statuses[truck.id] = truck.status;
    });
    return statuses;
  }, [trucks]);

  // Initialize truck statuses on first load to prevent false "newly broadcasting" notifications
  useEffect(() => {
    if (!isInitialized && trucks.length > 0) {
      const initialStatuses: {[key: string]: string} = {};
      const initialNotifiedTrucks = new Set<string>();

      trucks.forEach(truck => {
        initialStatuses[truck.id] = truck.status;
        // If truck is already live when component mounts, mark it as already notified
        // so we don't send notification just for loading the page
        if (truck.status === 'live') {
          initialNotifiedTrucks.add(truck.id);
        }
      });

      setPreviouseTruckStatuses(initialStatuses);
      setNotifiedTrucks(initialNotifiedTrucks);
      setIsInitialized(true);
      return;
    }

    // Only run notification logic after initialization
    if (!isInitialized) return;

    if (user?.notificationSettings.favoriteTruckBroadcast && user?.role !== 'driver-active' && user?.favoriteTrucks) {
      let hasChanges = false;
      const newNotifiedTrucks = new Set(notifiedTrucks);

      trucks.forEach(truck => {
        const wasLive = previousTruckStatuses[truck.id] === 'live';
        const isNowLive = truck.status === 'live';
        const isFavorite = user.favoriteTrucks.includes(truck.id);
        const alreadyNotified = notifiedTrucks.has(truck.id);

        // Only notify if: wasn't live before, is live now, is favorite, and we haven't notified yet
        if (!wasLive && isNowLive && isFavorite && !alreadyNotified) {
          toast(`🍦 ${truck.name} is now broadcasting!`, {
            description: "Your favorite ice cream truck is live and taking requests.",
            action: {
              label: "View",
              onClick: () => onSelectTruck(truck)
            }
          });
          newNotifiedTrucks.add(truck.id);
          hasChanges = true;
        }

        // Reset notification flag when truck goes offline
        if (truck.status !== 'live' && notifiedTrucks.has(truck.id)) {
          newNotifiedTrucks.delete(truck.id);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setNotifiedTrucks(newNotifiedTrucks);
      }
    }

    // Update previous statuses only if they actually changed
    let statusesChanged = false;
    Object.keys(truckStatuses).forEach(truckId => {
      if (previousTruckStatuses[truckId] !== truckStatuses[truckId]) {
        statusesChanged = true;
      }
    });

    if (statusesChanged) {
      setPreviouseTruckStatuses(truckStatuses);
    }
  }, [truckStatuses, isInitialized]); // Only depend on the memoized truck statuses and initialization state

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">Find Ice Cream Trucks</h1>
            <button
              onClick={() => onNavigate('user-profile')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>

        </div>
      </div>


      {/* Map View */}
      {!showListView && (
        <div className="relative h-[calc(100vh-180px)] mx-4 rounded-lg overflow-hidden">
          <Map
            trucks={filteredTrucks}
            onTruckClick={onSelectTruck}
            userLocation={userLocation}
          />

          {/* View Toggle */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              onClick={() => setShowListView(true)}
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Live Broadcasting</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Static Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Your Location</span>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {showListView && (
        <div className="px-4 pb-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              {filteredTrucks.length} Trucks Found
            </h2>
            <Button
              onClick={() => setShowListView(false)}
              variant="outline"
              size="sm"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>

          <div className="space-y-4">
            {filteredTrucks.map(truck => (
              <div
                key={truck.id}
                onClick={() => onSelectTruck(truck)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <ImageWithFallback
                    src={truckImages[truck.photoUrl]}
                    alt={truck.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      onToggleFavorite(truck.id);
                    }}
                    className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-lg z-10"
                  >
                    <Heart className={`w-5 h-5 ${
                      user?.favoriteTrucks.includes(truck.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-400'
                    }`} />
                  </button>
                  <Badge
                    className={`absolute top-3 right-3 ${
                      truck.status === 'live'
                        ? 'bg-green-500'
                        : truck.status === 'static'
                        ? 'bg-blue-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {truck.status === 'live' && <Radio className="w-3 h-3 mr-1 animate-pulse" />}
                    {truck.status === 'live' ? 'Live' : truck.status === 'static' ? 'Open' : 'Offline'}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{truck.name}</h3>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {truck.flavorCategories.slice(0, 2).map(category => (
                      <Badge key={category} variant="outline">{category}</Badge>
                    ))}
                    {truck.flavorCategories.length > 2 && (
                      <Badge variant="outline">+{truck.flavorCategories.length - 2} more</Badge>
                    )}
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm font-semibold">{truck.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{truck.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Navigation className="w-4 h-4 mr-1" />
                    {truck.distance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center text-orange-500">
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Map</span>
          </button>
          <button
            onClick={() => onNavigate('request-history')}
            className="flex flex-col items-center text-gray-400"
          >
            <List className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Requests</span>
          </button>
          <button
            onClick={() => onNavigate('user-profile')}
            className="flex flex-col items-center text-gray-400"
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
