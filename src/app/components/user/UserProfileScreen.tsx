import React, { useState } from 'react';
import { ArrowLeft, MapPin, List, User as UserIcon, Bell, Shield, LogOut, Truck, Trash2, ChevronDown, ChevronRight, Eye, EyeOff, Lock, UserX, Heart, Star, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { User, IceCreamTruck, Report } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import ReportModal from '../common/ReportModal';
import { toast } from 'sonner';

interface UserProfileScreenProps {
  user: User | null;
  trucks: IceCreamTruck[];
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onBecomeDriver: () => void;
  onToggleFavorite: (truckId: string) => void;
  onSelectTruck: (truck: IceCreamTruck) => void;
  onUpdateNotificationSettings: (settings: User['notificationSettings']) => void;
  onSubmitReport: (reportData: Omit<Report, 'id' | 'reporterId' | 'reporterName' | 'timestamp' | 'status'>) => boolean;
}

const truckImages: { [key: string]: string } = {
  'ice-cream-truck-1': 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-2': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-3': 'https://images.unsplash.com/photo-1625869016774-3a92be1f3460?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-4': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center'
};

export default function UserProfileScreen({
  user,
  trucks,
  onNavigate,
  onLogout,
  onBecomeDriver,
  onToggleFavorite,
  onSelectTruck,
  onUpdateNotificationSettings,
  onSubmitReport
}: UserProfileScreenProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showUnfavoriteDialog, setShowUnfavoriteDialog] = useState(false);
  const [truckToUnfavorite, setTruckToUnfavorite] = useState<IceCreamTruck | null>(null);

  const favoriteTrucks = trucks.filter(truck => user?.favoriteTrucks.includes(truck.id));

  const handleNotificationChange = (key: keyof User['notificationSettings'], value: boolean) => {
    if (user) {
      onUpdateNotificationSettings({
        ...user.notificationSettings,
        [key]: value
      });
    }
  };

  const handleReportSubmit = (reportData: Omit<Report, 'id' | 'reporterId' | 'reporterName' | 'timestamp' | 'status'>) => {
    const success = onSubmitReport(reportData);
    if (success) {
      toast.success('Report submitted successfully! We\'ll review it within 24 hours.');
    }
    return success;
  };

  const handleUnfavoriteClick = (truck: IceCreamTruck) => {
    setTruckToUnfavorite(truck);
    setShowUnfavoriteDialog(true);
  };

  const handleConfirmUnfavorite = () => {
    if (truckToUnfavorite) {
      onToggleFavorite(truckToUnfavorite.id);
      setShowUnfavoriteDialog(false);
      setTruckToUnfavorite(null);
      toast.success(`${truckToUnfavorite.name} removed from favorites`);
    }
  };

  const handleCancelUnfavorite = () => {
    setShowUnfavoriteDialog(false);
    setTruckToUnfavorite(null);
  };

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
          <h2 className="text-lg font-bold text-gray-900 mb-4">Favorites</h2>
          <div className="mb-6">
            <div className="w-full bg-gray-50 rounded-lg">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowFavorites(!showFavorites)}
              >
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-3" />
                  <span className="font-medium text-gray-900">
                    Favorite Trucks ({favoriteTrucks.length})
                  </span>
                </div>
                {showFavorites ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {showFavorites && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  {favoriteTrucks.length === 0 ? (
                    <div className="text-center py-6">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 mb-1">No favorite trucks yet</p>
                      <p className="text-xs text-gray-400">
                        Tap the heart icon on truck details to add favorites
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 mt-3">
                      {favoriteTrucks.map(truck => (
                        <div
                          key={truck.id}
                          className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => onSelectTruck(truck)}
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                            <ImageWithFallback
                              src={truckImages[truck.photoUrl]}
                              alt={truck.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{truck.name}</h3>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-xs text-gray-600">{truck.rating}</span>
                              {truck.status === 'live' && (
                                <Badge className="ml-2 bg-green-500 text-xs">Live</Badge>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnfavoriteClick(truck);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
          <div className="space-y-3">
            <div className="w-full bg-gray-50 rounded-lg">
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Notifications</span>
                </div>
                {showNotifications ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {showNotifications && (
                <div className="px-4 pb-4 border-t border-gray-200 space-y-4 mt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Favorite Truck Broadcasting</p>
                      <p className="text-sm text-gray-600">Get notified when your favorite trucks go live</p>
                    </div>
                    <Switch
                      checked={user?.notificationSettings.favoriteTruckBroadcast || false}
                      onCheckedChange={(value) => handleNotificationChange('favoriteTruckBroadcast', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">New Trucks in Area</p>
                      <p className="text-sm text-gray-600">Be notified about new ice cream trucks nearby</p>
                    </div>
                    <Switch
                      checked={user?.notificationSettings.newTrucksInArea || false}
                      onCheckedChange={(value) => handleNotificationChange('newTrucksInArea', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">General Updates</p>
                      <p className="text-sm text-gray-600">App updates and promotional messages</p>
                    </div>
                    <Switch
                      checked={user?.notificationSettings.generalUpdates || false}
                      onCheckedChange={(value) => handleNotificationChange('generalUpdates', value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <button className="w-full flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <MapPin className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-900">Location Settings</span>
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              className="w-full flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <AlertTriangle className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-900">Report Issue</span>
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
            <List className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Requests</span>
          </button>
          <button className="flex flex-col items-center text-orange-500">
            <UserIcon className="w-6 h-6 mb-1" />
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

      {/* Unfavorite Confirmation Dialog */}
      <Dialog open={showUnfavoriteDialog} onOpenChange={setShowUnfavoriteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove from Favorites</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>
                Are you sure you want to remove <strong>{truckToUnfavorite?.name}</strong> from your favorites?
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleCancelUnfavorite}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmUnfavorite}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Remove
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
