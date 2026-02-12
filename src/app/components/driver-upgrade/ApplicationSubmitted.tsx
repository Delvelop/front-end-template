import React from 'react';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface ApplicationSubmittedProps {
  onNavigate: (screen: string) => void;
}

export default function ApplicationSubmitted({ onNavigate }: ApplicationSubmittedProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
          Your driver application has been successfully submitted. We'll review it and get back to you soon.
        </p>

        {/* Status Info */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">What's Next?</h3>
              <p className="text-sm text-gray-700">
                Our team will review your application within 1-2 business days. You'll receive an email notification once your verification is complete.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Application Status</p>
                <p className="text-lg font-bold text-orange-600">Under Review</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* What You Can Do */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold text-gray-900 mb-3">While You Wait</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>You can start creating your food truck profiles</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>Set up your truck details and operating hours</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>You'll be able to broadcast live once verified</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => onNavigate('verification-pending')}
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-lg"
          >
            Continue to Dashboard
          </Button>
          <Button
            onClick={() => onNavigate('home')}
            variant="outline"
            className="w-full h-14 text-lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
