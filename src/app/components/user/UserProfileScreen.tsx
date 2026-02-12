import React, { useState } from 'react';
import { ArrowLeft, MapPin, Bell, Shield, LogOut, Truck, Trash2, ChevronDown, ChevronRight, Eye, EyeOff, Lock, UserX } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  const handleDeleteAccount = () => {
    if (!deletePassword) {
      setDeleteError('Password is required');
      return;
    }

    // Here you would normally validate the password against the user's actual password
    // For this demo, we'll just simulate the deletion
    alert('Account deletion simulated - user would be logged out');
    setShowDeleteDialog(false);
    onLogout();
  };

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

      <div className="px-6 py-6 pb-24">
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

        <Separator className="mb-8" />

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
            <div className="w-full bg-gray-50 rounded-lg">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowPrivacySettings(!showPrivacySettings)}
              >
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Privacy & Security</span>
                </div>
                {showPrivacySettings ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {showPrivacySettings && (
                <div className="px-4 pb-4 border-t border-gray-200 space-y-2">
                  {/* Location Privacy */}
                  <button className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-600 mr-3" />
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-gray-900">Location Privacy</span>
                      <p className="text-xs text-gray-500">Control who can see your location</p>
                    </div>
                  </button>

                  {/* Profile Visibility */}
                  <button className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4 text-gray-600 mr-3" />
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-gray-900">Profile Visibility</span>
                      <p className="text-xs text-gray-500">Manage your profile visibility</p>
                    </div>
                  </button>

                  {/* Change Password */}
                  <button className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <Lock className="w-4 h-4 text-gray-600 mr-3" />
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-gray-900">Change Password</span>
                      <p className="text-xs text-gray-500">Update your account password</p>
                    </div>
                  </button>

                  {/* Data Download */}
                  <button className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <UserX className="w-4 h-4 text-gray-600 mr-3" />
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-gray-900">Download My Data</span>
                      <p className="text-xs text-gray-500">Export your account data</p>
                    </div>
                  </button>

                  {/* Delete Account */}
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium">Delete Account</span>
                      <p className="text-xs text-red-400">Permanently delete your account</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
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
                    Start earning by sharing your ice cream truck location with nearby customers
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
          </>
        )}

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

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                <strong>This action is permanent and cannot be undone.</strong>
              </p>
              <p>
                Deleting your account will remove all your data, including your profile,
                request history, and any saved preferences. You will no longer be able to
                access your account or recover any information.
              </p>
            </div>

            <div>
              <Label htmlFor="delete-password">Confirm your password to continue</Label>
              <Input
                id="delete-password"
                type="password"
                placeholder="Enter your password"
                value={deletePassword}
                onChange={(e) => {
                  setDeletePassword(e.target.value);
                  setDeleteError('');
                }}
                className={`mt-1 ${deleteError ? 'border-red-500' : ''}`}
              />
              {deleteError && (
                <p className="text-red-500 text-sm mt-1">{deleteError}</p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeletePassword('');
                  setDeleteError('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
