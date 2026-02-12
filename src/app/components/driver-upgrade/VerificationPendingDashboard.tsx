import React from 'react';
import { Clock, Truck, Plus, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { User } from '../../App';

interface VerificationPendingDashboardProps {
  user: User | null;
  onNavigate: (screen: string) => void;
  onApprove: () => void;
}

export default function VerificationPendingDashboard({
  user,
  onNavigate,
  onApprove
}: VerificationPendingDashboardProps) {
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <h1 className="text-xl font-bold text-gray-900">Driver Dashboard</h1>
      </div>

      <div className="px-6 py-6">
        {/* Verification Status Banner */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900">Verification Pending</h2>
                <Badge className="bg-orange-500">Under Review</Badge>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Your application is being reviewed by our team. This usually takes 1-2 business days. We'll notify you as soon as it's complete.
              </p>
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Expected completion:</span>
                  <span className="font-semibold text-gray-900">Within 48 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Button to Simulate Approval */}
          <div className="mt-4 pt-4 border-t border-orange-200">
            <Button
              onClick={onApprove}
              variant="outline"
              className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
              size="sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              [Demo] Simulate Approval
            </Button>
          </div>
        </div>

        {/* Limited Features Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 font-medium mb-1">
                Limited Access Mode
              </p>
              <p className="text-xs text-blue-700">
                While your verification is pending, you can create truck profiles and view requests, but you won't be able to broadcast live locations yet.
              </p>
            </div>
          </div>
        </div>

        {/* Available Features */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">What You Can Do Now</h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('add-edit-truck')}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Add Food Truck</h3>
                    <p className="text-sm text-gray-600">Create your truck profile</p>
                  </div>
                </div>
                <Badge className="bg-green-500">Available</Badge>
              </div>
            </button>

            <button
              onClick={() => onNavigate('my-trucks')}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Manage Trucks</h3>
                    <p className="text-sm text-gray-600">Edit truck details</p>
                  </div>
                </div>
                <Badge className="bg-green-500">Available</Badge>
              </div>
            </button>

            <button
              onClick={() => onNavigate('truck-requests')}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">View Requests</h3>
                    <p className="text-sm text-gray-600">See customer requests</p>
                  </div>
                </div>
                <Badge className="bg-green-500">Available</Badge>
              </div>
            </button>
          </div>
        </div>

        {/* Locked Features */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Coming After Verification</h2>
          <div className="space-y-3">
            <div className="w-full bg-gray-100 border border-gray-200 rounded-lg p-4 opacity-60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700">Live Broadcasting</h3>
                    <p className="text-sm text-gray-600">Share your real-time location</p>
                  </div>
                </div>
                <Badge className="bg-gray-400">Locked</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
          <p className="text-sm text-gray-700 mb-4">
            If you have questions about your application status or need to update your information, contact our support team.
          </p>
          <Button variant="outline" className="w-full">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
