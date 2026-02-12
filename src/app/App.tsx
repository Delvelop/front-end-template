import React, { useState } from 'react';
import { MapPin, Truck } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

// Auth screens
import WelcomeScreen from './components/auth/WelcomeScreen';
import SignUpScreen from './components/auth/SignUpScreen';
import LoginScreen from './components/auth/LoginScreen';
import PasswordResetScreen from './components/auth/PasswordResetScreen';

// User screens
import HomeMapView from './components/user/HomeMapView';
import TruckDetailsScreen from './components/user/TruckDetailsScreen';
import UserProfileScreen from './components/user/UserProfileScreen';
import RequestHistoryScreen from './components/user/RequestHistoryScreen';

// Driver upgrade screens
import DriverSignupLanding from './components/driver-upgrade/DriverSignupLanding';
import DriverApplicationForm from './components/driver-upgrade/DriverApplicationForm';
import ApplicationSubmitted from './components/driver-upgrade/ApplicationSubmitted';
import VerificationPendingDashboard from './components/driver-upgrade/VerificationPendingDashboard';

// Active driver screens
import DriverDashboard from './components/driver/DriverDashboard';
import MyTrucksManagement from './components/driver/MyTrucksManagement';
import AddEditTruckScreen from './components/driver/AddEditTruckScreen';
import LiveBroadcastingScreen from './components/driver/LiveBroadcastingScreen';
import TruckRequestsManagement from './components/driver/TruckRequestsManagement';
import DriverProfileScreen from './components/driver/DriverProfileScreen';

export type UserRole = 'guest' | 'user' | 'driver-pending' | 'driver-active';

export interface User {
  id: string;
  email: string;
  firstName: string;
  homeCity: string;
  role: UserRole;
  driverInfo?: {
    licenseNumber?: string;
    businessName?: string;
    verificationStatus: 'pending' | 'approved' | 'rejected';
  };
}

export interface IceCreamTruck {
  id: string;
  name: string;
  ownerId: string;
  flavorCategories: string[];
  description: string;
  status: 'live' | 'static' | 'offline';
  location: {
    lat: number;
    lng: number;
  };
  distance?: string;
  rating: number;
  schedule: string;
  contact: string;
  photoUrl: string;
}

export interface Request {
  id: string;
  userId: string;
  userName: string;
  truckId: string;
  truckName: string;
  message: string;
  status: 'pending' | 'acknowledged' | 'ignored' | 'expired';
  timestamp: Date;
  location?: {
    lat: number;
    lng: number;
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<IceCreamTruck | null>(null);
  const [selectedTruckForEdit, setSelectedTruckForEdit] = useState<IceCreamTruck | null>(null);
  const [broadcastingTruckId, setBroadcastingTruckId] = useState<string | null>(null);

  // Mock ice cream trucks data
  const [iceCreamTrucks, setIceCreamTrucks] = useState<IceCreamTruck[]>([
    {
      id: '1',
      name: 'Sweet Dreams Ice Cream',
      ownerId: 'driver1',
      flavorCategories: ['Classic', 'Premium', 'Vegan'],
      description: 'Artisanal ice cream made fresh daily with premium ingredients',
      status: 'live',
      location: { lat: 37.7849, lng: -122.4194 }, // Union Square area
      distance: '0.3 miles',
      rating: 4.8,
      schedule: 'Mon-Fri: 11am-9pm',
      contact: '(555) 123-4567',
      photoUrl: 'ice-cream-truck-1'
    },
    {
      id: '2',
      name: 'Frosty Delights',
      ownerId: 'driver2',
      flavorCategories: ['Soft Serve', 'Novelties', 'Shakes'],
      description: 'Classic soft serve and frozen treats for all ages',
      status: 'live',
      location: { lat: 37.7659, lng: -122.4070 }, // Mission District
      distance: '0.5 miles',
      rating: 4.6,
      schedule: 'Daily: 10am-10pm',
      contact: '(555) 234-5678',
      photoUrl: 'ice-cream-truck-2'
    },
    {
      id: '3',
      name: 'Gelato Express',
      ownerId: 'driver3',
      flavorCategories: ['Gelato', 'Sorbet', 'Coffee'],
      description: 'Authentic Italian gelato and refreshing sorbets',
      status: 'static',
      location: { lat: 37.7955, lng: -122.4058 }, // North Beach
      distance: '0.8 miles',
      rating: 4.9,
      schedule: 'Tue-Sun: 12pm-8pm',
      contact: '(555) 345-6789',
      photoUrl: 'ice-cream-truck-3'
    },
    {
      id: '4',
      name: 'Chill Zone',
      ownerId: 'driver4',
      flavorCategories: ['Rolled Ice Cream', 'Bubble Tea', 'Frozen Yogurt'],
      description: 'Trendy rolled ice cream and frozen yogurt creations',
      status: 'offline',
      location: { lat: 37.7599, lng: -122.4148 }, // Castro District
      distance: '1.2 miles',
      rating: 4.7,
      schedule: 'Mon-Sat: 11am-9pm',
      contact: '(555) 456-7890',
      photoUrl: 'ice-cream-truck-4'
    }
  ]);

  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      truckId: '1',
      truckName: 'Sweet Dreams Ice Cream',
      message: 'Can you come to the park? Kids want ice cream!',
      status: 'pending',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      location: { lat: 37.7749, lng: -122.4194 }
    }
  ]);

  const navigate = (screen: string, data?: any) => {
    setCurrentScreen(screen);
    if (data?.truck) {
      setSelectedTruck(data.truck);
    }
    if (data?.truckForEdit) {
      setSelectedTruckForEdit(data.truckForEdit);
    }
  };

  const handleLogin = (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      firstName: 'John',
      homeCity: 'San Francisco',
      role: 'user'
    };
    setUser(mockUser);
    navigate('home');
  };

  const handleSignUp = (data: any) => {
    const newUser: User = {
      id: Math.random().toString(),
      email: data.email,
      firstName: data.firstName,
      homeCity: data.homeCity,
      role: 'user'
    };
    setUser(newUser);
    navigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('welcome');
  };

  const handleBecomeDriver = () => {
    navigate('driver-signup-landing');
  };

  const handleDriverApplication = (data: any) => {
    if (user) {
      setUser({
        ...user,
        role: 'driver-pending',
        driverInfo: {
          licenseNumber: data.licenseNumber,
          businessName: data.businessName,
          verificationStatus: 'pending'
        }
      });
    }
    navigate('application-submitted');
  };

  const handleApproveDriver = () => {
    if (user && user.driverInfo) {
      setUser({
        ...user,
        role: 'driver-active',
        driverInfo: {
          ...user.driverInfo,
          verificationStatus: 'approved'
        }
      });
    }
  };

  const handleSendRequest = (message: string, shareLocation: boolean) => {
    if (user && selectedTruck) {
      const newRequest: Request = {
        id: Math.random().toString(),
        userId: user.id,
        userName: user.firstName,
        truckId: selectedTruck.id,
        truckName: selectedTruck.name,
        message,
        status: 'pending',
        timestamp: new Date(),
        location: shareLocation ? { lat: 37.7749, lng: -122.4194 } : undefined
      };
      setRequests([...requests, newRequest]);
      navigate('home');
    }
  };

  const handleSaveTruck = (truckData: any) => {
    if (selectedTruckForEdit) {
      // Update existing truck
      setIceCreamTrucks(iceCreamTrucks.map(truck =>
        truck.id === selectedTruckForEdit.id
          ? { ...truck, ...truckData, id: selectedTruckForEdit.id }
          : truck
      ));
    } else {
      // Add new truck
      const newTruck: IceCreamTruck = {
        id: Math.random().toString(),
        ownerId: user?.id || '',
        name: truckData.name,
        flavorCategories: truckData.flavorCategories || ['Classic'],
        description: truckData.description,
        status: 'offline',
        location: { lat: 37.7749, lng: -122.4194 }, // Default location
        rating: 0,
        schedule: truckData.schedule,
        contact: truckData.contact,
        photoUrl: 'ice-cream-truck-1' // Default photo
      };
      setIceCreamTrucks([...iceCreamTrucks, newTruck]);
    }
    setSelectedTruckForEdit(null);
  };

  const handleStartBroadcasting = (truckId: string) => {
    console.log('handleStartBroadcasting called with truckId:', truckId);
    setBroadcastingTruckId(truckId);
    // Update the truck status to 'live'
    setIceCreamTrucks(trucks =>
      trucks.map(truck =>
        truck.id === truckId
          ? { ...truck, status: 'live' as const }
          : truck.ownerId === user?.id
          ? { ...truck, status: 'static' as const } // Set other owned trucks to static
          : truck
      )
    );
    console.log('Broadcasting truck ID set to:', truckId);
  };

  const handleStopBroadcasting = () => {
    if (broadcastingTruckId) {
      setBroadcastingTruckId(null);
      // Update the truck status to 'static'
      setIceCreamTrucks(trucks =>
        trucks.map(truck =>
          truck.id === broadcastingTruckId
            ? { ...truck, status: 'static' as const }
            : truck
        )
      );
    }
  };

  const getBroadcastingTruck = () => {
    return broadcastingTruckId
      ? iceCreamTrucks.find(truck => truck.id === broadcastingTruckId)
      : null;
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // Auth screens
      case 'welcome':
        return <WelcomeScreen onNavigate={navigate} />;
      case 'signup':
        return <SignUpScreen onSignUp={handleSignUp} onNavigate={navigate} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onNavigate={navigate} />;
      case 'password-reset':
        return <PasswordResetScreen onNavigate={navigate} />;

      // User screens
      case 'home':
        return (
          <HomeMapView
            user={user}
            trucks={iceCreamTrucks}
            onNavigate={navigate}
            onSelectTruck={(truck) => navigate('truck-details', { truck })}
            onBecomeDriver={handleBecomeDriver}
          />
        );
      case 'truck-details':
        return (
          <TruckDetailsScreen
            truck={selectedTruck}
            onNavigate={navigate}
            onSendRequest={handleSendRequest}
          />
        );
      case 'user-profile':
        return (
          <UserProfileScreen
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
            onBecomeDriver={handleBecomeDriver}
          />
        );
      case 'request-history':
        return (
          <RequestHistoryScreen
            requests={requests.filter(r => r.userId === user?.id)}
            onNavigate={navigate}
          />
        );

      // Driver upgrade screens
      case 'driver-signup-landing':
        return <DriverSignupLanding onNavigate={navigate} />;
      case 'driver-application':
        return <DriverApplicationForm onSubmit={handleDriverApplication} onNavigate={navigate} />;
      case 'application-submitted':
        return <ApplicationSubmitted onNavigate={navigate} />;
      case 'verification-pending':
        return (
          <VerificationPendingDashboard
            user={user}
            onNavigate={navigate}
            onApprove={handleApproveDriver}
          />
        );

      // Active driver screens
      case 'driver-dashboard':
        return (
          <DriverDashboard
            user={user}
            trucks={iceCreamTrucks.filter(t => t.ownerId === user?.id)}
            requests={requests.filter(r =>
              iceCreamTrucks.some(t => t.id === r.truckId && t.ownerId === user?.id)
            )}
            onNavigate={navigate}
          />
        );
      case 'my-trucks':
        return (
          <MyTrucksManagement
            trucks={iceCreamTrucks.filter(t => t.ownerId === user?.id)}
            onNavigate={navigate}
            onEditTruck={(truck) => navigate('add-edit-truck', { truckForEdit: truck })}
          />
        );
      case 'add-edit-truck':
        return (
          <AddEditTruckScreen
            truck={selectedTruckForEdit}
            onNavigate={navigate}
            onSaveTruck={handleSaveTruck}
          />
        );
      case 'live-broadcasting':
        return (
          <LiveBroadcastingScreen
            onNavigate={navigate}
            trucks={iceCreamTrucks.filter(t => t.ownerId === user?.id)}
            broadcastingTruckId={broadcastingTruckId}
            onStartBroadcasting={handleStartBroadcasting}
            onStopBroadcasting={handleStopBroadcasting}
          />
        );
      case 'truck-requests':
        return (
          <TruckRequestsManagement
            requests={requests.filter(r =>
              iceCreamTrucks.some(t => t.id === r.truckId && t.ownerId === user?.id)
            )}
            onNavigate={navigate}
            onUpdateRequest={(requestId, status) => {
              setRequests(requests.map(r =>
                r.id === requestId ? { ...r, status } : r
              ));
            }}
          />
        );
      case 'driver-profile':
        return (
          <DriverProfileScreen
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );

      default:
        return <WelcomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      <Toaster />
    </div>
  );
}
