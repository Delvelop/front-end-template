import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Star, Radio, MessageSquare, Heart, Flag, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { IceCreamTruck, User, Report, Review } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import ReportModal from '../common/ReportModal';
import ReviewModal from '../common/ReviewModal';

interface TruckDetailsScreenProps {
  truck: IceCreamTruck | null;
  user: User | null;
  reviews: Review[];
  onNavigate: (screen: string) => void;
  onSendRequest: (message: string, shareLocation: boolean) => void;
  onToggleFavorite: (truckId: string) => void;
  onSubmitReport: (reportData: Omit<Report, 'id' | 'reporterId' | 'reporterName' | 'timestamp' | 'status'>) => boolean;
  onSubmitReview: (truckId: string, rating: 1 | 2 | 3 | 4 | 5, comment: string) => boolean;
}

const truckImages: { [key: string]: string } = {
  'ice-cream-truck-1': 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-2': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-3': 'https://images.unsplash.com/photo-1625869016774-3a92be1f3460?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-4': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center'
};

export default function TruckDetailsScreen({
  truck,
  user,
  reviews,
  onNavigate,
  onSendRequest,
  onToggleFavorite,
  onSubmitReport,
  onSubmitReview
}: TruckDetailsScreenProps) {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [shareLocation, setShareLocation] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  if (!truck) {
    return null;
  }

  const isFavorite = user?.favoriteTrucks.includes(truck.id) || false;

  const handleSendRequest = () => {
    onSendRequest(requestMessage, shareLocation);
    setShowRequestModal(false);
    setRequestMessage('');
    setShareLocation(true);

    // Show success confirmation
    toast.success(`Request sent to ${truck.name}!`, {
      description: "Your request has been successfully sent to the truck driver. You'll be notified when they respond.",
      duration: 4000
    });
  };

  const handleReportSubmit = (reportData: Omit<Report, 'id' | 'reporterId' | 'reporterName' | 'timestamp' | 'status'>) => {
    const success = onSubmitReport(reportData);
    if (success) {
      toast.success('Report submitted successfully! We\'ll review it within 24 hours.');
    }
    return success;
  };

  const handleReviewSubmit = (rating: 1 | 2 | 3 | 4 | 5, comment: string) => {
    const success = onSubmitReview(truck.id, rating, comment);
    if (success) {
      toast.success('Review submitted successfully! Thank you for your feedback.');
    }
    return success;
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
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
        <button
          onClick={() => onToggleFavorite(truck.id)}
          className="absolute top-4 left-16 p-2 bg-white rounded-full shadow-lg"
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
        </button>
        <button
          onClick={() => setShowReportModal(true)}
          className="absolute top-4 left-28 p-2 bg-white rounded-full shadow-lg"
        >
          <Flag className="w-6 h-6 text-gray-400 hover:text-red-500" />
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
              <span className="text-gray-500 ml-1">({truck.reviewCount} reviews)</span>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Reviews ({reviews.length})</h2>
            <Button
              onClick={() => setShowReviewModal(true)}
              variant="outline"
              size="sm"
              className="text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <Star className="w-4 h-4 mr-1" />
              Write Review
            </Button>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">No reviews yet</p>
              <p className="text-sm text-gray-500">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold text-orange-700">
                          {review.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{review.userName}</p>
                          {review.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" title="Verified customer" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(review.timestamp)}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}

              {reviews.length > 3 && (
                <div className="text-center pt-2">
                  <button className="text-orange-600 text-sm font-medium hover:text-orange-700">
                    View all {reviews.length} reviews
                  </button>
                </div>
              )}
            </div>
          )}
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

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
        targetType="truck"
        targetId={truck.id}
        targetName={truck.name}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
        truckName={truck.name}
      />
    </div>
  );
}
