import React from 'react';
import { ArrowLeft, Edit, MapPin, Bell, Shield, LogOut, Truck } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { User } from '../../App';

interface UserProfileScreenProps {
  user: User | null;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onBecomeDriver: () => void;
}

export default function UserProfileScreen({
  user,
  onNavigate,
  onLogout,
  onBecomeDriver
}: UserProfileScreenProps) {
  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 py-6">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-orange-600">
              {user.firstName.charAt(0)}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.firstName}</h1>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <div className="flex items-center justify-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{user.homeCity}</span>
          </div>
        </div>

        {/* Food Preferences */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Food Preferences</h2>
            <button className="text-orange-600 text-sm font-medium">
              <Edit className="w-4 h-4 inline mr-1" />
              Edit
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.foodPreferences.map(pref => (
              <Badge key={pref} className="bg-orange-500">
                {pref}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Become Driver Section */}
        {user.role === 'user' && (
          <>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 mb-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Become a Driver</h3>
                  <p className="text-orange-50 text-sm">
                    Start earning by sharing your food truck location with nearby customers
                  </p>
                </div>
                <Truck className="w-12 h-12 text-white opacity-80" />
              </div>
              <Button
                onClick={onBecomeDriver}
                className="w-full bg-white text-orange-600 hover:bg-orange-50"
              >
                Get Started
              </Button>
            </div>
            <Separator className="mb-8" />
          </>
        )}

        {/* My Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">My Activity</h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('request-history')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span className="font-medium text-gray-900">Request History</span>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-900">Notifications</span>
            </button>
            <button className="w-full flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <MapPin className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-900">Location Settings</span>
            </button>
            <button className="w-full flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <Shield className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-900">Privacy & Security</span>
            </button>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Logout */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center text-gray-400"
          >
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Map</span>
          </button>
          <button
            onClick={() => onNavigate('request-history')}
            className="flex flex-col items-center text-gray-400"
          >
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Requests</span>
          </button>
          <button className="flex flex-col items-center text-orange-500">
            <Shield className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
