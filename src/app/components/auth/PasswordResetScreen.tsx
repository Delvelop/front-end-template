import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface PasswordResetScreenProps {
  onNavigate: (screen: string) => void;
}

export default function PasswordResetScreen({ onNavigate }: PasswordResetScreenProps) {
  const [step, setStep] = useState<'request' | 'success' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      onNavigate('login');
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center text-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-16 max-w-md mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h1>
          <p className="text-gray-600 mb-8">
            We've sent a password reset link to <span className="font-semibold">{email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Click the link in the email to reset your password. The link will expire in 24 hours.
          </p>
          <Button
            onClick={() => setStep('reset')}
            className="w-full h-12 bg-orange-500 hover:bg-orange-600"
          >
            Continue to Reset Password
          </Button>
          <Button
            onClick={() => onNavigate('login')}
            variant="outline"
            className="w-full h-12 mt-4"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'reset') {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center text-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-8 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600 mb-8">Enter your new password</p>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1.5"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <button
          onClick={() => onNavigate('login')}
          className="flex items-center text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <Mail className="w-16 h-16 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
        <p className="text-gray-600 mb-8">
          Enter your email address and we'll send you a link to reset your password
        </p>

        <form onSubmit={handleRequestReset} className="space-y-6">
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

          <Button
            type="submit"
            className="w-full h-12 bg-orange-500 hover:bg-orange-600"
          >
            Send Reset Link
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => onNavigate('login')}
          >
            Back to Login
          </Button>
        </form>
      </div>
    </div>
  );
}
