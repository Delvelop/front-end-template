import React, { useState } from 'react';
import { Truck, Radio, MessageSquare, Plus, TrendingUp, CheckCircle, LayoutDashboard, User, PlayCircle, PauseCircle, Settings, Clock, Users, Star, Timer } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { User as UserType, IceCreamTruck, Request } from '../../App';

interface DriverDashboardProps {
  user: UserType | null;
  trucks: IceCreamTruck[];
  requests: Request[];
  onNavigate: (screen: string) => void;
  onSwitchToUserView?: () => void;
}

export default function DriverDashboard({
  user,
  trucks,
  requests,
  onNavigate,
  onSwitchToUserView
}: DriverDashboardProps) {
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  if (!user) return null;

  const liveTrucks = trucks.filter(t => t.status === 'live').length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Driver Dashboard</h1>
          <div className="flex items-center gap-2">
            {onSwitchToUserView && (
              <Button
                onClick={onSwitchToUserView}
                variant="outline"
                size="sm"
                className="h-8 px-3"
              >
                <User className="w-4 h-4 mr-1" />
                User
              </Button>
            )}
            <Badge className="bg-green-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Welcome Banner - Only on first visit */}
        {showWelcomeBanner && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-bold text-lg">Welcome to your Dashboard!</h2>
            </div>
            <p className="text-green-50 text-sm mb-3">
              You're verified and ready to start earning. Add a truck and go live to receive customer requests.
            </p>
            <Button
              onClick={() => setShowWelcomeBanner(false)}
              size="sm"
              className="bg-white text-green-600 hover:bg-green-50"
            >
              Got it!
            </Button>
          </div>
        )}

        {/* Live Status Card - Most Important */}
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900">Quick Start</h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${liveTrucks > 0 ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium text-gray-600">
                {liveTrucks > 0 ? `${liveTrucks} Live` : 'Offline'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Primary Action - Go Live or Add Truck */}
            {trucks.length === 0 ? (
              <Button
                onClick={() => onNavigate('add-edit-truck')}
                className="h-16 bg-orange-500 hover:bg-orange-600 flex flex-col items-center justify-center col-span-2"
              >
                <Plus className="w-5 h-5 mb-1" />
                <span className="font-medium">Add Your First Truck</span>
              </Button>
            ) : (
              <Button
                onClick={() => onNavigate('live-broadcasting')}
                className="h-16 bg-green-500 hover:bg-green-600 flex flex-col items-center justify-center col-span-2"
              >
                <PlayCircle className="w-5 h-5 mb-1" />
                <span className="font-medium">Go Live</span>
              </Button>
            )}
          </div>
        </Card>

        {/* Active Requests - High Priority */}
        {requests.length > 0 && (
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Active Requests
                {pendingRequests > 0 && (
                  <Badge className="bg-red-500 text-xs ml-1">{pendingRequests}</Badge>
                )}
              </h2>
              <Button
                onClick={() => onNavigate('truck-requests')}
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-600 hover:bg-blue-100"
              >
                View All
              </Button>
            </div>

            <div className="space-y-2">
              {requests.slice(0, 2).map(request => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg p-3 border border-blue-200 cursor-pointer hover:shadow-sm"
                  onClick={() => onNavigate('truck-requests')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{request.userName}</h3>
                        <Badge
                          size="sm"
                          className={
                            request.status === 'pending'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-green-100 text-green-700'
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{request.truckName}</p>
                      {request.message && (
                        <p className="text-xs text-gray-500 line-clamp-1">{request.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">12h</p>
            <p className="text-xs text-gray-600">Broadcast Hours</p>
          </Card>

          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <MessageSquare className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-600">Requests Last Week</p>
          </Card>

          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">156</p>
            <p className="text-xs text-gray-600">Users Nearby</p>
          </Card>

          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">4.8</p>
            <p className="text-xs text-gray-600">Avg Rating</p>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Truck className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">{trucks.length}</p>
            <p className="text-xs text-gray-600">Total Trucks</p>
          </Card>

          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Timer className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">2.3m</p>
            <p className="text-xs text-gray-600">Avg Response</p>
          </Card>
        </div>

        {/* Truck Status Overview - Only if trucks exist */}
        {trucks.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">My Trucks</h2>
              <Button
                onClick={() => onNavigate('my-trucks')}
                variant="ghost"
                size="sm"
                className="text-orange-600 hover:bg-orange-50"
              >
                Manage →
              </Button>
            </div>

            <div className="space-y-2">
              {trucks.slice(0, 2).map(truck => (
                <div
                  key={truck.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => onNavigate('my-trucks')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{truck.name}</h3>
                      <p className="text-xs text-gray-500">{truck.foodType}</p>
                    </div>
                  </div>
                  <Badge
                    size="sm"
                    className={
                      truck.status === 'live'
                        ? 'bg-green-500'
                        : truck.status === 'static'
                        ? 'bg-blue-500'
                        : 'bg-gray-500'
                    }
                  >
                    {truck.status === 'live' && <Radio className="w-3 h-3 mr-1" />}
                    {truck.status === 'live' ? 'Live' : truck.status === 'static' ? 'Open' : 'Off'}
                  </Badge>
                </div>
              ))}

              {trucks.length > 2 && (
                <button
                  onClick={() => onNavigate('my-trucks')}
                  className="w-full text-center py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg"
                >
                  +{trucks.length - 2} more trucks
                </button>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center text-orange-500">
            <LayoutDashboard className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('my-trucks')}
            className="flex flex-col items-center text-gray-400"
          >
            <Truck className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">My Trucks</span>
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
