import React, { useState } from 'react';
import { MapPin, Truck } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface WelcomeScreenProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (screen: string) => void;
}

export default function WelcomeScreen({ onLogin, onNavigate }: WelcomeScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
            <Truck className="w-10 h-10 text-orange-500" />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Truck Duck Go
        </h1>

        {/* Tagline */}
        <p className="text-lg text-orange-50 mb-8 text-center">
          Find Ice Cream Trucks Near You
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-white font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 bg-white/90 border-0 h-12"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-white font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 bg-white/90 border-0 h-12"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => onNavigate('password-reset')}
              className="text-sm text-orange-100 hover:text-white"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-white text-orange-600 hover:bg-orange-50 font-semibold"
          >
            Login
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 text-white">Or continue with</span>
            </div>
          </div>

          {/* Google OAuth */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-white/90 text-gray-700 border-0 hover:bg-white"
            onClick={() => onLogin('google-user@example.com', 'google-auth')}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login with Google
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('signup')}
              className="text-orange-100 hover:text-white"
            >
              Don't have an account? <span className="font-semibold">Sign Up</span>
            </button>
          </div>
        </form>

        {/* Location Permission Notice */}
        <div className="mt-8 text-center text-sm text-orange-100 opacity-75">
          <div className="flex justify-center mb-2">
            <MapPin className="w-4 h-4" />
          </div>
          <p>This app requires location permissions to find nearby ice cream trucks</p>
        </div>
      </div>
    </div>
  );
}
