import React, { useState } from 'react';
import { ArrowLeft, Chrome } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

interface SignUpScreenProps {
  onSignUp: (data: any) => void;
  onNavigate: (screen: string) => void;
}


export default function SignUpScreen({ onSignUp, onNavigate }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    homeCity: '',
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <button
          onClick={() => onNavigate('welcome')}
          className="flex items-center text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600 mb-8">Join to discover ice cream trucks near you</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
              className="mt-1.5"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Must be at least 8 characters with uppercase, lowercase, and number
            </p>
          </div>

          {/* First Name */}
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>

          {/* Home City */}
          <div>
            <Label htmlFor="homeCity">Home City</Label>
            <Input
              id="homeCity"
              type="text"
              placeholder="San Francisco"
              value={formData.homeCity}
              onChange={(e) => setFormData({ ...formData, homeCity: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>


          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-orange-500 hover:bg-orange-600"
          >
            Create Account
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google OAuth */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => onSignUp({ ...formData, email: 'google-user@example.com' })}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Sign up with Google
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-orange-600 hover:text-orange-700"
            >
              Already have an account? <span className="font-semibold">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
