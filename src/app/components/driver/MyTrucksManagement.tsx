import React from 'react';
import { ArrowLeft, Truck, Plus, Edit, Trash2, Radio, LayoutDashboard, MessageSquare, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { IceCreamTruck } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MyTrucksManagementProps {
  trucks: IceCreamTruck[];
  onNavigate: (screen: string, data?: any) => void;
  onEditTruck: (truck: IceCreamTruck) => void;
}

const truckImages: { [key: string]: string } = {
  'ice-cream-truck-1': 'https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-2': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-3': 'https://images.unsplash.com/photo-1625869016774-3a92be1f3460?w=400&h=300&fit=crop&crop=center',
  'ice-cream-truck-4': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center'
};

export default function MyTrucksManagement({
  trucks,
  onNavigate,
  onEditTruck
}: MyTrucksManagementProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('driver-dashboard')}
              className="mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">My Trucks</h1>
          </div>
          <Button
            onClick={() => onNavigate('add-edit-truck')}
            className="bg-orange-500 hover:bg-orange-600"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <div className="px-6 py-6">
        {trucks.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Trucks Yet</h2>
            <p className="text-gray-600 mb-6">
              Add your first ice cream truck to start receiving requests and broadcasting your location
            </p>
            <Button
              onClick={() => onNavigate('add-edit-truck')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Truck
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                {trucks.length} {trucks.length === 1 ? 'truck' : 'trucks'} total
              </p>
            </div>

            <div className="space-y-4">
              {trucks.map(truck => (
                <div
                  key={truck.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Truck Image */}
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={truckImages[truck.photoUrl]}
                      alt={truck.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        truck.status === 'live'
                          ? 'bg-green-500'
                          : truck.status === 'static'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                      }`}
                    >
                      {truck.status === 'live' && <Radio className="w-3 h-3 mr-1 animate-pulse" />}
                      {truck.status === 'live' ? 'Live' : truck.status === 'static' ? 'Open' : 'Offline'}
                    </Badge>
                  </div>

                  {/* Truck Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{truck.name}</h3>
                        <div className="flex flex-wrap gap-1">
                          {truck.flavorCategories.slice(0, 2).map((category, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                          {truck.flavorCategories.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{truck.flavorCategories.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{truck.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <p className="text-gray-500">Schedule</p>
                        <p className="font-medium text-gray-900">{truck.schedule}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-500">Contact</p>
                        <p className="font-medium text-gray-900">{truck.contact}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {truck.status === 'live' ? (
                        <Button
                          onClick={() => onNavigate('live-broadcasting')}
                          className="flex-1 bg-green-500 hover:bg-green-600"
                        >
                          <Radio className="w-4 h-4 mr-2 animate-pulse" />
                          Broadcasting
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={() => onEditTruck(truck)}
                            variant="outline"
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button
            onClick={() => onNavigate('driver-dashboard')}
            className="flex flex-col items-center text-gray-400"
          >
            <LayoutDashboard className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('live-broadcasting')}
            className="flex flex-col items-center text-gray-400"
          >
            <Radio className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Live</span>
          </button>
          <button
            onClick={() => onNavigate('truck-requests')}
            className="flex flex-col items-center text-gray-400"
          >
            <MessageSquare className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Requests</span>
          </button>
          <button
            onClick={() => onNavigate('driver-profile')}
            className="flex flex-col items-center text-gray-400"
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
