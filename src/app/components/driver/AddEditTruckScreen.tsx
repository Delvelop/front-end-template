import React, { useState } from 'react';
import { ArrowLeft, Upload, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { IceCreamTruck } from '../../App';
import { toast } from 'sonner';

interface AddEditTruckScreenProps {
  truck?: IceCreamTruck | null;
  onNavigate: (screen: string) => void;
  onSaveTruck: (truckData: any) => void;
}


export default function AddEditTruckScreen({
  truck,
  onNavigate,
  onSaveTruck
}: AddEditTruckScreenProps) {
  const [formData, setFormData] = useState({
    name: truck?.name || '',
    flavorCategories: truck?.flavorCategories || ['Classic'],
    description: truck?.description || '',
    schedule: truck?.schedule || '',
    contact: truck?.contact || '',
    photo: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save the truck data
    onSaveTruck({
      name: formData.name,
      flavorCategories: formData.flavorCategories,
      description: formData.description,
      schedule: formData.schedule,
      contact: formData.contact,
    });

    toast.success(truck ? 'Truck updated successfully!' : 'Truck added successfully!');
    setTimeout(() => {
      onNavigate('my-trucks');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('my-trucks')}
            className="mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {truck ? 'Edit Truck' : 'Add New Truck'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div>
            <Label>Truck Photo</Label>
            <div className="mt-1.5">
              <label
                htmlFor="photo"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 bg-gray-50 hover:bg-orange-50"
              >
                {formData.photo ? (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-700 font-medium">
                      {formData.photo.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Click to change</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload truck photo
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                  </div>
                )}
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
              />
            </div>
          </div>

          {/* Truck Name */}
          <div>
            <Label htmlFor="name">
              Truck Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Sweet Dreams Ice Cream"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>


          {/* Description */}
          <div>
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Tell customers about your ice cream truck..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="mt-1.5"
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Describe what makes your ice cream truck special
            </p>
          </div>

          {/* Operating Hours */}
          <div>
            <Label htmlFor="schedule">
              Operating Hours <span className="text-red-500">*</span>
            </Label>
            <Input
              id="schedule"
              type="text"
              placeholder="e.g., Mon-Fri: 11am-9pm"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>

          {/* Contact Information */}
          <div>
            <Label htmlFor="contact">
              Contact Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Tip:</span> Provide accurate and detailed information to help customers find and choose your ice cream truck.
            </p>
          </div>
        </form>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <Button
            onClick={() => onNavigate('my-trucks')}
            variant="outline"
            className="flex-1 h-12"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-12 bg-orange-500 hover:bg-orange-600"
            disabled={!formData.name || !formData.description || !formData.schedule || !formData.contact}
          >
            {truck ? 'Save Changes' : 'Add Truck'}
          </Button>
        </div>
      </div>
    </div>
  );
}
