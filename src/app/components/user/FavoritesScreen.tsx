import React, { useState } from 'react';
import { ArrowLeft, MapPin, List, User as UserIcon, Heart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { User, IceCreamTruck } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface FavoritesScreenProps {
  user: User | null;
  trucks: IceCreamTruck[];
  onNavigate: (screen: string) => void;
  onToggleFavorite: (truckId: string) => void;
  onSelectTruck: (truck: IceCreamTruck) => void;
}

const truckImages: { [key: string]: string } = {
  'ice-cream-truck-1': 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-2': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-3': 'https://images.unsplash.com/photo-1625869016774-3a92be1f3460?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-4': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center'
};

export default function FavoritesScreen({
  user,
  trucks,
  onNavigate,
  onToggleFavorite,
  onSelectTruck
}: FavoritesScreenProps) {
  const [showUnfavoriteDialog, setShowUnfavoriteDialog] = useState(false);
  const [truckToUnfavorite, setTruckToUnfavorite] = useState<IceCreamTruck | null>(null);

  const favoriteTrucks = trucks.filter(truck => user?.favoriteTrucks.includes(truck.id));

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
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Favorite Trucks</h1>
          <p className="text-gray-600">
            {favoriteTrucks.length} favorite{favoriteTrucks.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Favorites List */}
        {favoriteTrucks.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorite trucks yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Tap the heart icon on truck details to add your favorite ice cream trucks here
            </p>
            <Button
              onClick={() => onNavigate('home')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Find Ice Cream Trucks
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteTrucks.map(truck => (
              <div
                key={truck.id}
                className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelectTruck(truck)}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <ImageWithFallback
                    src={truckImages[truck.photoUrl]}
                    alt={truck.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate mb-1">{truck.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600 mr-2">{truck.rating}</span>
                    {truck.status === 'live-mobile' && (
                      <Badge className="bg-green-500 text-xs">Live & Moving</Badge>
                    )}
                    {truck.status === 'live-static' && (
                      <Badge className="bg-blue-500 text-xs">Live & Parked</Badge>
                    )}
                    {truck.status === 'offline' && (
                      <Badge className="bg-gray-500 text-xs">Offline</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{truck.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnfavoriteClick(truck);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0 ml-2"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
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
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Favorites</span>
          </button>
          <button
            onClick={() => onNavigate('user-profile')}
            className="flex flex-col items-center text-gray-400"
          >
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>

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
    </div>
  );
}