import React from 'react';
import { ArrowLeft, CheckCircle, Truck, TrendingUp, Bell, Shield, LogOut, LayoutDashboard, MessageSquare, User as UserIcon, Radio } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { User } from '../../App';

interface DriverProfileScreenProps {
  user: User | null;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export default function DriverProfileScreen({
  user,
  onNavigate,
  onLogout
}: DriverProfileScreenProps) {
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('driver-dashboard')}
            className="mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Driver Profile</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg p-6 mb-6 text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-orange-600">
              {user.firstName.charAt(0)}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.firstName}</h1>
          <p className="text-gray-600 mb-3">{user.email}</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-green-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified Driver
            </Badge>
          </div>
        </div>

        {/* Verification Details */}
        {user.driverInfo && (
          <>
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Business Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Business Name</p>
                  <p className="font-medium text-gray-900">{user.driverInfo.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">License Number</p>
                  <p className="font-medium text-gray-900">{user.driverInfo.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verification Status</p>
                  <Badge className="bg-green-500 mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {user.driverInfo.verificationStatus === 'approved' ? 'Approved' : user.driverInfo.verificationStatus}
                  </Badge>
                </div>
              </div>
            </div>
            <Separator className="mb-6" />
          </>
        )}

        {/* Quick Stats */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <Truck className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Active Trucks</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <MessageSquare className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-600">Total Requests</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <CheckCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">94%</p>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Management */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Manage</h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('my-trucks')}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-gray-600 mr-3" />
                <span className="font-medium text-gray-900">My Trucks</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button
              onClick={() => onNavigate('truck-requests')}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-gray-600 mr-3" />
                <span className="font-medium text-gray-900">Requests</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-gray-600 mr-3" />
                <span className="font-medium text-gray-900">Analytics</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <Bell className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-900">Notification Settings</span>
            </button>
            <button className="w-full flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <Shield className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-900">Privacy & Security</span>
            </button>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Help & Support */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Help & Support</h2>
          <div className="bg-white rounded-lg p-6">
            <p className="text-sm text-gray-700 mb-4">
              Need help with your driver account or have questions? Our support team is here to help.
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>

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
            onClick={() => onNavigate('driver-dashboard')}
            className="flex flex-col items-center text-gray-400"
          >
            <LayoutDashboard className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('live-broadcasting')}
            className="flex flex-col items-center text-gray-400"
          >
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
          <button className="flex flex-col items-center text-orange-500">
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
