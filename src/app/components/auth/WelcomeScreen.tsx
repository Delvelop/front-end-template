import React from 'react';
import { MapPin, Truck } from 'lucide-react';
import { Button } from '../ui/button';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
            <Truck className="w-12 h-12 text-orange-500" />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Food Truck Tracker
        </h1>

        {/* Tagline */}
        <p className="text-xl text-orange-50 mb-12">
          Find Food Trucks Near You
        </p>

        {/* Location Icon */}
        <div className="mb-12 flex justify-center">
          <MapPin className="w-16 h-16 text-white opacity-80" />
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => onNavigate('signup')}
            className="w-full h-14 text-lg bg-white text-orange-600 hover:bg-orange-50"
          >
            Sign Up
          </Button>

          <Button
            onClick={() => onNavigate('login')}
            variant="outline"
            className="w-full h-14 text-lg bg-transparent text-white border-2 border-white hover:bg-white/10"
          >
            Login
          </Button>
        </div>

        {/* Location Permission Notice */}
        <div className="mt-12 text-sm text-orange-50 opacity-75">
          <p>This app requires location permissions to find nearby food trucks</p>
        </div>
      </div>
    </div>
  );
}
