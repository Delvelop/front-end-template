import React, { useState } from 'react';
import { ArrowLeft, Chrome } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (screen: string) => void;
}

export default function LoginScreen({ onLogin, onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1.5"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => onNavigate('password-reset')}
              className="text-sm text-orange-600 hover:text-orange-700"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-orange-500 hover:bg-orange-600"
          >
            Login
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
            onClick={() => onLogin('google-user@example.com', 'google-auth')}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Login with Google
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('signup')}
              className="text-orange-600 hover:text-orange-700"
            >
              Don't have an account? <span className="font-semibold">Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
