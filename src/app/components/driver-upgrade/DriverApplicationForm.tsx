import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface DriverApplicationFormProps {
  onSubmit: (data: any) => void;
  onNavigate: (screen: string) => void;
}

export default function DriverApplicationForm({
  onSubmit,
  onNavigate
}: DriverApplicationFormProps) {
  const [formData, setFormData] = useState({
    licenseNumber: '',
    businessName: '',
    businessLicense: null as File | null,
    insurance: null as File | null,
    acceptedTerms: false
  });

  const handleFileChange = (field: 'businessLicense' | 'insurance', file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.acceptedTerms) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('driver-signup-landing')}
            className="mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Driver Application</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <p className="text-gray-600 mb-8">
          Fill out this form to become a verified driver. We'll review your application and get back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Driver's License Number */}
          <div>
            <Label htmlFor="licenseNumber" className="flex items-center gap-2">
              Driver's License Number
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="licenseNumber"
              type="text"
              placeholder="Enter your license number"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>

          {/* Business Name */}
          <div>
            <Label htmlFor="businessName" className="flex items-center gap-2">
              Business Name
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessName"
              type="text"
              placeholder="Your food truck business name"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>

          {/* Business License Upload */}
          <div>
            <Label htmlFor="businessLicense" className="flex items-center gap-2">
              Business License
              <span className="text-gray-500 text-sm font-normal">(Optional)</span>
            </Label>
            <div className="mt-1.5">
              <label
                htmlFor="businessLicense"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 bg-gray-50 hover:bg-orange-50"
              >
                <div className="text-center">
                  {formData.businessLicense ? (
                    <>
                      <FileText className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-700 font-medium">
                        {formData.businessLicense.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Click to change</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload business license
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG</p>
                    </>
                  )}
                </div>
              </label>
              <input
                id="businessLicense"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFileChange('businessLicense', e.target.files?.[0] || null)}
              />
            </div>
          </div>

          {/* Insurance Certificate Upload */}
          <div>
            <Label htmlFor="insurance" className="flex items-center gap-2">
              Insurance Certificate
              <span className="text-gray-500 text-sm font-normal">(Optional)</span>
            </Label>
            <div className="mt-1.5">
              <label
                htmlFor="insurance"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 bg-gray-50 hover:bg-orange-50"
              >
                <div className="text-center">
                  {formData.insurance ? (
                    <>
                      <FileText className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-700 font-medium">
                        {formData.insurance.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Click to change</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload insurance certificate
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG</p>
                    </>
                  )}
                </div>
              </label>
              <input
                id="insurance"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFileChange('insurance', e.target.files?.[0] || null)}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.acceptedTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptedTerms: checked as boolean })
                }
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                I agree to the{' '}
                <button type="button" className="text-orange-600 hover:text-orange-700 font-medium">
                  Terms and Conditions
                </button>{' '}
                and{' '}
                <button type="button" className="text-orange-600 hover:text-orange-700 font-medium">
                  Driver Agreement
                </button>
                . I confirm that all information provided is accurate.
              </label>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">
                  Your information is secure
                </p>
                <p className="text-xs text-blue-700">
                  We use industry-standard encryption to protect your data. Your documents will only be used for verification purposes.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleSubmit}
          disabled={!formData.acceptedTerms || !formData.licenseNumber || !formData.businessName}
          className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-lg disabled:opacity-50"
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
}
