import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Star, Radio, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { IceCreamTruck } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TruckDetailsScreenProps {
  truck: IceCreamTruck | null;
  onNavigate: (screen: string) => void;
  onSendRequest: (message: string, shareLocation: boolean) => void;
}

const truckImages: { [key: string]: string } = {
  'ice-cream-truck-1': 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-2': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-3': 'https://images.unsplash.com/photo-1625869016774-3a92be1f3460?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-4': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center'
};

export default function TruckDetailsScreen({
  truck,
  onNavigate,
  onSendRequest
}: TruckDetailsScreenProps) {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [shareLocation, setShareLocation] = useState(true);

  if (!truck) {
    return null;
  }

  const handleSendRequest = () => {
    onSendRequest(requestMessage, shareLocation);
    setShowRequestModal(false);
    setRequestMessage('');
    setShareLocation(true);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Image */}
      <div className="relative h-64">
        <ImageWithFallback
          src={truckImages[truck.photoUrl]}
          alt={truck.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onNavigate('home')}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <Badge
          className={`absolute top-4 right-4 ${
            truck.status === 'live'
              ? 'bg-green-500'
              : truck.status === 'static'
              ? 'bg-blue-500'
              : 'bg-gray-500'
          }`}
        >
          {truck.status === 'live' && <Radio className="w-3 h-3 mr-1 animate-pulse" />}
          {truck.status === 'live' ? 'Live Now' : truck.status === 'static' ? 'Open' : 'Offline'}
        </Badge>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Title and Rating */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{truck.name}</h1>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex flex-wrap gap-2">
              {truck.flavorCategories.slice(0, 3).map((category, index) => (
                <Badge key={index} variant="outline" className="text-sm px-2 py-1">
                  {category}
                </Badge>
              ))}
              {truck.flavorCategories.length > 3 && (
                <Badge variant="outline" className="text-sm px-2 py-1">
                  +{truck.flavorCategories.length - 3} more
                </Badge>
              )}
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-lg font-semibold">{truck.rating}</span>
              <span className="text-gray-500 ml-1">(248 reviews)</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{truck.distance} away</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">About</h2>
          <p className="text-gray-700 leading-relaxed">{truck.description}</p>
        </div>

        {/* Schedule */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Hours</h2>
          <div className="flex items-center text-gray-700">
            <Clock className="w-5 h-5 mr-3 text-orange-500" />
            <span>{truck.schedule}</span>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Contact</h2>
          <div className="flex items-center text-gray-700">
            <Phone className="w-5 h-5 mr-3 text-orange-500" />
            <span>{truck.contact}</span>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-orange-700">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Amazing tacos! The best I've had in the city. Highly recommend the carnitas.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-700">SA</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Anderson</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Great food and friendly service. Love that they're often in my neighborhood!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Send Request Button (Fixed at bottom) */}
      {truck.status === 'live' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <Button
            onClick={() => setShowRequestModal(true)}
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-lg"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Send Request to Truck
          </Button>
        </div>
      )}

      {/* Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Food Truck</DialogTitle>
            <DialogDescription>
              Send a request to {truck.name} to come to your location
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Let them know where you are or what you'd like..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="mt-1.5"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-location">Share exact location</Label>
                <p className="text-sm text-gray-500">Help them find you easier</p>
              </div>
              <Switch
                id="share-location"
                checked={shareLocation}
                onCheckedChange={setShareLocation}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRequestModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendRequest}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
