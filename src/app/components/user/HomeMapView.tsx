import React, { useState } from 'react';
import { MapPin, Search, Filter, List, User, Star, Navigation, Radio } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { FoodTruck, User as UserType } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomeMapViewProps {
  user: UserType | null;
  trucks: FoodTruck[];
  onNavigate: (screen: string) => void;
  onSelectTruck: (truck: FoodTruck) => void;
  onBecomeDriver: () => void;
}

const foodTypeFilters = ['All', 'Tacos', 'Burgers', 'Pizza', 'Sushi', 'Ice Cream'];

const truckImages: { [key: string]: string } = {
  'taco-truck': 'https://images.unsplash.com/photo-1630165683188-4f2e2bbaa52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjB0YWNvcyUyMG1leGljYW58ZW58MXx8fHwxNzcwODYwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'burger-truck': 'https://images.unsplash.com/photo-1760008018960-a3a39c44e052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kJTIwdHJ1Y2slMjBnb3VybWV0fGVufDF8fHx8MTc3MDg2MDkxNnww&ixlib=rb-4.1.0&q=80&w=1080',
  'pizza-truck': 'https://images.unsplash.com/photo-1685478566051-8e5c5af68a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2QlMjB0cnVja3xlbnwxfHx8fDE3NzA3ODk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'sushi-truck': 'https://images.unsplash.com/photo-1758369636923-96e7b94137ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGZvb2QlMjB0cnVja3xlbnwxfHx8fDE3NzA4NjA5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
};

export default function HomeMapView({
  user,
  trucks,
  onNavigate,
  onSelectTruck,
  onBecomeDriver
}: HomeMapViewProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showListView, setShowListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrucks = trucks.filter(truck => {
    const matchesFilter = activeFilter === 'All' || truck.foodType === activeFilter;
    const matchesSearch = truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         truck.foodType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">Find Food Trucks</h1>
            <button
              onClick={() => onNavigate('user-profile')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search food trucks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {foodTypeFilters.map(filter => (
              <Badge
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Become Driver Banner */}
      {user && user.role === 'user' && (
        <div className="mx-4 my-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <h3 className="font-bold text-lg mb-1">Become a Driver</h3>
          <p className="text-sm text-orange-50 mb-3">Start earning with your food truck</p>
          <Button
            onClick={onBecomeDriver}
            className="w-full bg-white text-orange-600 hover:bg-orange-50"
          >
            Get Started
          </Button>
        </div>
      )}

      {/* Map View */}
      {!showListView && (
        <div className="relative h-[calc(100vh-280px)] bg-gray-200 mx-4 rounded-lg overflow-hidden">
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive Map View</p>
              <p className="text-sm text-gray-400">Shows your location and nearby trucks</p>
            </div>
          </div>

          {/* Mock Map Pins */}
          <div className="absolute top-1/4 left-1/3">
            <div className="relative">
              <div className="absolute -top-8 -left-4 animate-bounce">
                <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Radio className="w-4 h-4 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4">
            <div className="relative">
              <div className="absolute -top-8 -left-4">
                <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Radio className="w-4 h-4 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-1/3 left-1/2">
            <div className="relative">
              <div className="absolute -top-8 -left-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* My Location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
          </div>

          {/* View Toggle */}
          <div className="absolute top-4 right-4">
            <Button
              onClick={() => setShowListView(true)}
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Live Broadcasting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Static Location</span>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {showListView && (
        <div className="px-4 pb-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              {filteredTrucks.length} Trucks Found
            </h2>
            <Button
              onClick={() => setShowListView(false)}
              variant="outline"
              size="sm"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>

          <div className="space-y-4">
            {filteredTrucks.map(truck => (
              <div
                key={truck.id}
                onClick={() => onSelectTruck(truck)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
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
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{truck.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{truck.foodType}</Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm font-semibold">{truck.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{truck.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Navigation className="w-4 h-4 mr-1" />
                    {truck.distance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center text-orange-500">
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Map</span>
          </button>
          <button
            onClick={() => onNavigate('request-history')}
            className="flex flex-col items-center text-gray-400"
          >
            <List className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Requests</span>
          </button>
          <button
            onClick={() => onNavigate('user-profile')}
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
