import React, { useState, useEffect } from 'react';
import { ArrowLeft, Radio, MapPin, Users, BatteryWarning, Power, Navigation, StopCircle, Move, Pin, Truck, Map, Zap, Clock, LayoutDashboard, MessageSquare, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

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

interface LiveBroadcastingScreenProps {
  onNavigate: (screen: string) => void;
  trucks: IceCreamTruck[];
  broadcastingTruckId: string | null;
  onStartBroadcasting: (truckId: string, mode: 'mobile' | 'static') => void;
  onStopBroadcasting: () => void;
}

export default function LiveBroadcastingScreen({
  onNavigate,
  trucks,
  broadcastingTruckId,
  onStartBroadcasting,
  onStopBroadcasting
}: LiveBroadcastingScreenProps) {
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<'mobile' | 'static'>('mobile');
  const [broadcastDuration, setBroadcastDuration] = useState('00:00:00');
  const [staticLocation, setStaticLocation] = useState<{lat: number, lng: number} | null>(null);
  const [staticDuration, setStaticDuration] = useState<number>(2); // hours
  const [isPinDropMode, setIsPinDropMode] = useState(false);

  const isBroadcasting = !!broadcastingTruckId;
  const broadcastingTruck = isBroadcasting ? trucks.find(t => t.id === broadcastingTruckId) : null;
  const availableTrucks = trucks;

  const handleToggleBroadcast = () => {
    console.log('Toggle broadcast clicked', { isBroadcasting, selectedTruckId, selectedMode, availableTrucks, broadcastingTruckId });
    if (isBroadcasting) {
      console.log('Stopping broadcast');
      onStopBroadcasting();
      setBroadcastDuration('00:00:00');
    } else {
      // Start broadcasting with the selected truck and mode
      const truckToUse = selectedTruckId || availableTrucks[0]?.id;
      console.log('Starting broadcast with truck:', truckToUse, 'mode:', selectedMode);
      if (truckToUse) {
        onStartBroadcasting(truckToUse, selectedMode);
        console.log('Called onStartBroadcasting with:', truckToUse, selectedMode);
      } else {
        console.log('No truck available to broadcast');
      }
    }
  };

  // Initialize selected truck if not set
  useEffect(() => {
    console.log('All trucks:', trucks);
    console.log('Available trucks:', availableTrucks);
    console.log('Selected truck ID:', selectedTruckId);
    if (!selectedTruckId && availableTrucks.length > 0) {
      setSelectedTruckId(availableTrucks[0].id);
      console.log('Set selected truck to:', availableTrucks[0].id);
    }
  }, [selectedTruckId, availableTrucks, trucks]);

  // Timer effect for broadcasting duration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBroadcasting) {
      let seconds = 0;
      timer = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        setBroadcastDuration(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      setBroadcastDuration('00:00:00');
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isBroadcasting]);

  const getBroadcastModeInfo = (mode: 'mobile' | 'static') => {
    return mode === 'mobile' ? {
      icon: Truck,
      title: 'Mobile Broadcasting',
      description: 'Broadcasting while moving - customers can see your real-time location as you drive',
      color: 'green',
      badge: 'Live & Moving',
      features: ['Real-time GPS tracking', 'Moving location updates', 'Route visibility']
    } : {
      icon: Pin,
      title: 'Static Broadcasting',
      description: 'Broadcasting from a fixed location - customers know exactly where to find you',
      color: 'blue',
      badge: 'Live & Parked',
      features: ['Fixed location pin', 'Set your spot manually', 'Stable meeting point']
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('driver-dashboard')}
            className="flex items-center text-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Live Broadcasting</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Map View */}
      <div className="relative h-[40vh] bg-gray-200" onClick={isPinDropMode ? (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Convert pixel coordinates to lat/lng (mock implementation)
        const lat = 40.7128 + (y - rect.height/2) / 1000;
        const lng = -74.0060 + (x - rect.width/2) / 1000;
        setStaticLocation({lat, lng});
        setIsPinDropMode(false);
      } : undefined}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              {isPinDropMode
                ? 'Tap to drop pin for static location'
                : isBroadcasting
                ? `${broadcastingTruck?.broadcastMode === 'mobile' ? 'Moving Location' : 'Fixed Location'}`
                : 'Ready to Broadcast'
              }
            </p>
          </div>
        </div>

        {/* Location Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {isBroadcasting ? (
            <>
              <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                broadcastingTruck?.broadcastMode === 'mobile'
                  ? 'bg-green-500 animate-pulse'
                  : 'bg-blue-500 animate-pulse'
              }`}></div>
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full opacity-30 animate-ping ${
                broadcastingTruck?.broadcastMode === 'mobile'
                  ? 'bg-green-500'
                  : 'bg-blue-500'
              }`}></div>
            </>
          ) : staticLocation ? (
            <div className="w-6 h-6 rounded-full border-4 border-white bg-blue-500 shadow-lg"></div>
          ) : (
            <div className="w-6 h-6 rounded-full border-4 border-white bg-gray-400 shadow-lg"></div>
          )}
        </div>

        {/* Status Overlay */}
        {isBroadcasting && (
          <div className="absolute top-4 left-4 right-4">
            <div className={`text-white rounded-lg p-4 shadow-lg ${
              broadcastingTruck?.broadcastMode === 'mobile' ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {broadcastingTruck?.broadcastMode === 'mobile' ? (
                    <Truck className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Pin className="w-5 h-5 animate-pulse" />
                  )}
                  <span className="font-bold">
                    {broadcastingTruck?.broadcastMode === 'mobile' ? 'Broadcasting Live & Moving' : 'Broadcasting Live & Parked'}
                  </span>
                </div>
                <span className="font-mono">{broadcastDuration}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="px-6 py-6">
        {!isBroadcasting ? (
          /* Setup Mode */
          <>
            {/* Truck Selection */}
            {availableTrucks.length > 1 && (
              <Card className="p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Select Truck to Broadcast</h3>
                <select
                  value={selectedTruckId || ''}
                  onChange={(e) => setSelectedTruckId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                >
                  {availableTrucks.map(truck => (
                    <option key={truck.id} value={truck.id}>
                      {truck.name}
                    </option>
                  ))}
                </select>
              </Card>
            )}

            {/* Broadcasting Mode Selection */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Broadcasting Mode</h3>

              <div className="space-y-4">
                {/* Mobile Broadcasting Option */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMode === 'mobile'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setSelectedMode('mobile')}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedMode === 'mobile' ? 'bg-green-500' : 'bg-gray-200'
                    }`}>
                      <Truck className={`w-6 h-6 ${selectedMode === 'mobile' ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Mobile Broadcasting</h4>
                        <Badge className={selectedMode === 'mobile' ? 'bg-green-500' : 'bg-gray-300'}>
                          Live & Moving
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Perfect for driving routes - customers can see your real-time location and track your movement
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Zap className="w-3 h-3 mr-1" />
                          Real-time GPS
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Navigation className="w-3 h-3 mr-1" />
                          Route tracking
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Truck className="w-3 h-3 mr-1" />
                          On-the-go service
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Static Broadcasting Option */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMode === 'static'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedMode('static')}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedMode === 'static' ? 'bg-blue-500' : 'bg-gray-200'
                    }`}>
                      <Pin className={`w-6 h-6 ${selectedMode === 'static' ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Static Broadcasting</h4>
                        <Badge className={selectedMode === 'static' ? 'bg-blue-500' : 'bg-gray-300'}>
                          Live & Parked
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Great for fixed locations - set your spot and let customers know exactly where to find you
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          Fixed location
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Stable meeting point
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <BatteryWarning className="w-3 h-3 mr-1" />
                          Battery friendly
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Static Broadcasting Configuration */}
            {selectedMode === 'static' && (
              <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4">Static Broadcasting Setup</h3>

                {/* Pin Location */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Set Your Location
                  </label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsPinDropMode(true)}
                      variant="outline"
                      className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {staticLocation ? 'Change Location' : 'Drop Pin on Map'}
                    </Button>
                    <Button
                      onClick={() => {
                        // Use current location (mock)
                        setStaticLocation({lat: 40.7128, lng: -74.0060});
                      }}
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      Use Current Location
                    </Button>
                  </div>
                  {staticLocation && (
                    <p className="text-xs text-blue-600 mt-1">
                      📍 Pin dropped at {staticLocation.lat.toFixed(4)}, {staticLocation.lng.toFixed(4)}
                    </p>
                  )}
                </div>

                {/* Duration Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How long will you broadcast?
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 4, 8].map(hours => (
                      <button
                        key={hours}
                        onClick={() => setStaticDuration(hours)}
                        className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                          staticDuration === hours
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        {hours}h
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    You can stop early or extend later
                  </p>
                </div>
              </Card>
            )}

            {/* Start Broadcasting Button */}
            <Button
              onClick={handleToggleBroadcast}
              className={`w-full h-16 text-lg ${
                selectedMode === 'mobile'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={!selectedTruckId || (selectedMode === 'static' && !staticLocation)}
            >
              {selectedMode === 'mobile' ? (
                <Truck className="w-6 h-6 mr-2" />
              ) : (
                <Radio className="w-6 h-6 mr-2" />
              )}
              Start {selectedMode === 'mobile' ? 'Mobile' : 'Static'} Broadcasting
            </Button>
          </>
        ) : (
          /* Broadcasting Active Mode */
          <>
            <Card className={`p-6 mb-6 ${
              broadcastingTruck?.broadcastMode === 'mobile' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  broadcastingTruck?.broadcastMode === 'mobile' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {broadcastingTruck?.broadcastMode === 'mobile' ? (
                    <Truck className="w-10 h-10 text-white animate-pulse" />
                  ) : (
                    <Pin className="w-10 h-10 text-white animate-pulse" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {broadcastingTruck?.name} is {broadcastingTruck?.broadcastMode === 'mobile' ? 'Moving' : 'Parked'}!
                </h2>
                <p className="text-gray-600 mb-2">
                  {broadcastingTruck?.broadcastMode === 'mobile'
                    ? 'Customers can see your real-time location and track your movement'
                    : 'Customers can find you at your fixed location'
                  }
                </p>
                <Badge className={`${
                  broadcastingTruck?.broadcastMode === 'mobile' ? 'bg-green-500' : 'bg-blue-500'
                } text-white`}>
                  {broadcastingTruck?.broadcastMode === 'mobile' ? 'Live & Moving' : 'Live & Parked'}
                </Badge>
              </div>

              <Button
                onClick={handleToggleBroadcast}
                className="w-full h-16 text-lg bg-red-500 hover:bg-red-600"
              >
                <StopCircle className="w-6 h-6 mr-2" />
                Stop Broadcasting
              </Button>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Nearby Users</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Navigation className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">0.8 mi</p>
                <p className="text-sm text-gray-600">Visibility Radius</p>
              </Card>
            </div>

            {/* Active Requests Feed */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Active Requests</h3>
                <Badge className="bg-orange-500">3 New</Badge>
              </div>

              <div className="space-y-3">
                <Card className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">Sarah M.</p>
                      <p className="text-sm text-gray-600">0.3 miles away</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">New</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    "Can you come to the park? We have a group of 10 people!"
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Ignore
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">Mike R.</p>
                      <p className="text-sm text-gray-600">0.5 miles away</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">New</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    {broadcastingTruck?.broadcastMode === 'mobile'
                      ? '"When will you be near downtown?"'
                      : '"Are you staying at this location long?"'
                    }
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Ignore
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Battery/Usage Warning */}
        <div className={`border rounded-lg p-4 ${
          selectedMode === 'mobile' || broadcastingTruck?.broadcastMode === 'mobile'
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex gap-3">
            <BatteryWarning className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              selectedMode === 'mobile' || broadcastingTruck?.broadcastMode === 'mobile'
                ? 'text-yellow-600'
                : 'text-blue-600'
            }`} />
            <div>
              <p className={`text-sm font-medium mb-1 ${
                selectedMode === 'mobile' || broadcastingTruck?.broadcastMode === 'mobile'
                  ? 'text-yellow-900'
                  : 'text-blue-900'
              }`}>
                {selectedMode === 'mobile' || broadcastingTruck?.broadcastMode === 'mobile'
                  ? 'Mobile Broadcasting Uses More Battery'
                  : 'Static Broadcasting is Battery Friendly'
                }
              </p>
              <p className={`text-xs ${
                selectedMode === 'mobile' || broadcastingTruck?.broadcastMode === 'mobile'
                  ? 'text-yellow-800'
                  : 'text-blue-800'
              }`}>
                {selectedMode === 'mobile' || broadcastingTruck?.broadcastMode === 'mobile'
                  ? 'Real-time GPS tracking uses more power. Keep your device charged or plugged in while driving.'
                  : 'Fixed location broadcasting uses minimal battery. Great for extended periods at one spot.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button
            onClick={() => onNavigate('driver-dashboard')}
            className="flex flex-col items-center text-gray-400"
          >
            <LayoutDashboard className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button className="flex flex-col items-center text-orange-500">
            <Radio className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Live</span>
          </button>
          <button
            onClick={() => onNavigate('truck-requests')}
            className="flex flex-col items-center text-gray-400"
          >
            <MessageSquare className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Requests</span>
          </button>
          <button
            onClick={() => onNavigate('driver-profile')}
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