import React from 'react';
import { ArrowLeft, Truck, DollarSign, Users, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DriverSignupLandingProps {
  onNavigate: (screen: string) => void;
}

export default function DriverSignupLanding({ onNavigate }: DriverSignupLandingProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <button
          onClick={() => onNavigate('user-profile')}
          className="flex items-center text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 py-8 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <Truck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Start Earning with Your Food Truck
          </h1>
          <p className="text-gray-600 text-lg">
            Join thousands of drivers already connecting with hungry customers
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-48 rounded-2xl overflow-hidden mb-8">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762908407323-28e9a9efd0be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjBkcml2ZXIlMjBidXNpbmVzcyUyMG93bmVyfGVufDF8fHx8MTc3MDg2MTAwMnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Food truck driver"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why Become a Driver?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Increase Revenue</h3>
                <p className="text-sm text-gray-700">
                  Reach more customers by broadcasting your location in real-time
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Connect with Customers</h3>
                <p className="text-sm text-gray-700">
                  Receive requests from nearby customers looking for your food
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Easy Location Sharing</h3>
                <p className="text-sm text-gray-700">
                  One-tap broadcasting makes it simple to let customers know where you are
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Valid driver's license</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Food truck business name</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Business license (optional but recommended)</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Insurance certificate (optional but recommended)</span>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Apply</h3>
                <p className="text-sm text-gray-700">
                  Submit your application with required information
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Get Verified</h3>
                <p className="text-sm text-gray-700">
                  We'll review your application (usually within 1-2 business days)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Start Broadcasting</h3>
                <p className="text-sm text-gray-700">
                  Once approved, broadcast your location and start receiving requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={() => onNavigate('driver-application')}
          className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
