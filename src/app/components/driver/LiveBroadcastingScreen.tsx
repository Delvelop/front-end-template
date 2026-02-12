import React, { useState } from 'react';
import { ArrowLeft, Radio, MapPin, Users, BatteryWarning, Power, Navigation, StopCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Card } from '../ui/card';

interface LiveBroadcastingScreenProps {
  onNavigate: (screen: string) => void;
}

export default function LiveBroadcastingScreen({ onNavigate }: LiveBroadcastingScreenProps) {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastDuration, setBroadcastDuration] = useState('00:00:00');

  const handleToggleBroadcast = () => {
    setIsBroadcasting(!isBroadcasting);
    if (!isBroadcasting) {
      // Start timer simulation
      let seconds = 0;
      const timer = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        setBroadcastDuration(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      }, 1000);
      return () => clearInterval(timer);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="relative h-[40vh] bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Your Current Location</p>
          </div>
        </div>

        {/* Current Location Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${
            isBroadcasting ? 'bg-green-500 animate-pulse' : 'bg-blue-600'
          }`}></div>
          {isBroadcasting && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-green-500 rounded-full opacity-30 animate-ping"></div>
          )}
        </div>

        {/* Status Overlay */}
        {isBroadcasting && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-green-500 text-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 animate-pulse" />
                  <span className="font-bold">Broadcasting Live</span>
                </div>
                <span className="font-mono">{broadcastDuration}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="px-6 py-6">
        {/* Main Toggle */}
        <div className="mb-6">
          <Card className={`p-6 ${isBroadcasting ? 'bg-green-50 border-green-200' : ''}`}>
            <div className="text-center mb-6">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isBroadcasting ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                {isBroadcasting ? (
                  <Radio className="w-10 h-10 text-white animate-pulse" />
                ) : (
                  <Power className="w-10 h-10 text-gray-500" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isBroadcasting ? 'You Are Live!' : 'Start Broadcasting'}
              </h2>
              <p className="text-gray-600">
                {isBroadcasting
                  ? 'Customers can see your location and send requests'
                  : 'Share your location with nearby customers'}
              </p>
            </div>

            <Button
              onClick={handleToggleBroadcast}
              className={`w-full h-16 text-lg ${
                isBroadcasting
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isBroadcasting ? (
                <>
                  <StopCircle className="w-6 h-6 mr-2" />
                  Stop Broadcasting
                </>
              ) : (
                <>
                  <Radio className="w-6 h-6 mr-2" />
                  Start Broadcasting
                </>
              )}
            </Button>
          </Card>
        </div>

        {/* Stats */}
        {isBroadcasting && (
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
              <p className="text-sm text-gray-600">Radius</p>
            </Card>
          </div>
        )}

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
                "Are you coming to downtown today?"
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

        {/* Battery Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex gap-3">
            <BatteryWarning className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-900 font-medium mb-1">
                Battery Optimization
              </p>
              <p className="text-xs text-yellow-800">
                Live broadcasting uses GPS and may drain your battery faster. Make sure your device is charged or plugged in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
