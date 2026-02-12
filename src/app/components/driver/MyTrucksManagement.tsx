import React from 'react';
import { ArrowLeft, Truck, Plus, Edit, Trash2, Radio, LayoutDashboard, MessageSquare, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FoodTruck } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MyTrucksManagementProps {
  trucks: FoodTruck[];
  onNavigate: (screen: string, data?: any) => void;
  onEditTruck: (truck: FoodTruck) => void;
}

const truckImages: { [key: string]: string } = {
  'taco-truck': 'https://images.unsplash.com/photo-1630165683188-4f2e2bbaa52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjB0YWNvcyUyMG1leGljYW58ZW58MXx8fHwxNzcwODYwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'burger-truck': 'https://images.unsplash.com/photo-1760008018960-a3a39c44e052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kJTIwdHJ1Y2slMjBnb3VybWV0fGVufDF8fHx8MTc3MDg2MDkxNnww&ixlib=rb-4.1.0&q=80&w=1080',
  'pizza-truck': 'https://images.unsplash.com/photo-1685478566051-8e5c5af68a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2QlMjB0cnVja3xlbnwxfHx8fDE3NzA3ODk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'sushi-truck': 'https://images.unsplash.com/photo-1758369636923-96e7b94137ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGZvb2QlMjB0cnVja3xlbnwxfHx8fDE3NzA4NjA5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
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
              Add your first food truck to start receiving requests and broadcasting your location
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
                        <Badge variant="outline">{truck.foodType}</Badge>
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
          <button className="flex flex-col items-center text-orange-500">
            <Truck className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">My Trucks</span>
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
