import React, { useState } from 'react';
import { Truck, Radio, MessageSquare, DollarSign, Plus, TrendingUp, CheckCircle, LayoutDashboard, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { User as UserType, IceCreamTruck, Request } from '../../App';

interface DriverDashboardProps {
  user: UserType | null;
  trucks: IceCreamTruck[];
  requests: Request[];
  onNavigate: (screen: string) => void;
}

export default function DriverDashboard({
  user,
  trucks,
  requests,
  onNavigate
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
            <Badge className="bg-green-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Verification Success Banner */}
        {showWelcomeBanner && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 mb-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">You're All Set!</h2>
                <p className="text-green-50 mb-4">
                  Your driver account is verified and active. You can now broadcast your location and start receiving requests.
                </p>
                <Button
                  onClick={() => setShowWelcomeBanner(false)}
                  className="bg-white text-green-600 hover:bg-green-50 h-10 px-6"
                >
                  OK, Got It!
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Truck className="w-5 h-5 text-orange-500" />
              <Badge className="bg-orange-100 text-orange-700 text-xs">
                {liveTrucks} Live
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900">{trucks.length}</p>
            <p className="text-sm text-gray-600">My Trucks</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              {pendingRequests > 0 && (
                <Badge className="bg-red-500 text-xs">New</Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
            <p className="text-sm text-gray-600">Requests</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => trucks.length > 0 ? onNavigate('live-broadcasting') : null}
              disabled={trucks.length === 0}
              className={`h-24 flex flex-col items-center justify-center ${
                trucks.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              title={trucks.length === 0 ? 'Add a truck first to go live' : 'Start broadcasting your location'}
            >
              <Radio className="w-6 h-6 mb-2" />
              <span>Go Live</span>
            </Button>

            <Button
              onClick={() => onNavigate('add-edit-truck')}
              className="h-24 bg-orange-500 hover:bg-orange-600 flex flex-col items-center justify-center"
            >
              <Plus className="w-6 h-6 mb-2" />
              <span>Add Truck</span>
            </Button>
          </div>
        </div>

        {/* My Trucks Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">My Trucks</h2>
            <button
              onClick={() => onNavigate('my-trucks')}
              className="text-orange-600 font-medium text-sm"
            >
              View All →
            </button>
          </div>

          {trucks.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <Truck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">No Trucks Yet</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add your first ice cream truck to get started
              </p>
              <Button
                onClick={() => onNavigate('add-edit-truck')}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Truck
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {trucks.slice(0, 3).map(truck => (
                <div
                  key={truck.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onNavigate('my-trucks')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Truck className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{truck.name}</h3>
                        <p className="text-sm text-gray-600">{truck.foodType}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        className={
                          truck.status === 'live'
                            ? 'bg-green-500'
                            : truck.status === 'static'
                            ? 'bg-blue-500'
                            : 'bg-gray-500'
                        }
                      >
                        {truck.status === 'live' && <Radio className="w-3 h-3 mr-1 animate-pulse" />}
                        {truck.status === 'live' ? 'Live' : truck.status === 'static' ? 'Open' : 'Offline'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Requests */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>
            <button
              onClick={() => onNavigate('truck-requests')}
              className="text-orange-600 font-medium text-sm"
            >
              View All →
            </button>
          </div>

          {requests.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">No Requests Yet</h3>
              <p className="text-sm text-gray-600">
                Customer requests will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.slice(0, 3).map(request => (
                <div
                  key={request.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{request.userName}</h3>
                      <p className="text-sm text-gray-600">{request.truckName}</p>
                    </div>
                    <Badge
                      className={
                        request.status === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : request.status === 'acknowledged'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                  {request.message && (
                    <p className="text-sm text-gray-700">{request.message}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Preview */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">This Week</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-gray-600">Requests</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">18h</p>
              <p className="text-xs text-gray-600">Live Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">$890</p>
              <p className="text-xs text-gray-600">Estimated</p>
            </div>
          </div>
        </div>
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
