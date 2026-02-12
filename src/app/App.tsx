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
  foodPreferences: string[];
  role: UserRole;
  driverInfo?: {
    licenseNumber?: string;
    businessName?: string;
    verificationStatus: 'pending' | 'approved' | 'rejected';
  };
}

export interface FoodTruck {
  id: string;
  name: string;
  ownerId: string;
  foodType: string;
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
  const [selectedTruck, setSelectedTruck] = useState<FoodTruck | null>(null);
  const [selectedTruckForEdit, setSelectedTruckForEdit] = useState<FoodTruck | null>(null);

  // Mock food trucks data
  const [foodTrucks] = useState<FoodTruck[]>([
    {
      id: '1',
      name: 'Taco Paradise',
      ownerId: 'driver1',
      foodType: 'Tacos',
      description: 'Authentic Mexican street tacos with homemade tortillas',
      status: 'live',
      location: { lat: 37.7749, lng: -122.4194 },
      distance: '0.3 miles',
      rating: 4.8,
      schedule: 'Mon-Fri: 11am-9pm',
      contact: '(555) 123-4567',
      photoUrl: 'taco-truck'
    },
    {
      id: '2',
      name: 'Burger Boss',
      ownerId: 'driver2',
      foodType: 'Burgers',
      description: 'Gourmet burgers made with locally sourced ingredients',
      status: 'live',
      location: { lat: 37.7750, lng: -122.4190 },
      distance: '0.5 miles',
      rating: 4.6,
      schedule: 'Daily: 10am-10pm',
      contact: '(555) 234-5678',
      photoUrl: 'burger-truck'
    },
    {
      id: '3',
      name: 'Pizza on Wheels',
      ownerId: 'driver3',
      foodType: 'Pizza',
      description: 'Wood-fired Neapolitan pizza made fresh',
      status: 'static',
      location: { lat: 37.7745, lng: -122.4200 },
      distance: '0.8 miles',
      rating: 4.9,
      schedule: 'Tue-Sun: 12pm-8pm',
      contact: '(555) 345-6789',
      photoUrl: 'pizza-truck'
    },
    {
      id: '4',
      name: 'Sushi Express',
      ownerId: 'driver4',
      foodType: 'Sushi',
      description: 'Fresh sushi rolls and poke bowls',
      status: 'live',
      location: { lat: 37.7755, lng: -122.4185 },
      distance: '1.2 miles',
      rating: 4.7,
      schedule: 'Mon-Sat: 11am-9pm',
      contact: '(555) 456-7890',
      photoUrl: 'sushi-truck'
    }
  ]);

  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      truckId: '1',
      truckName: 'Taco Paradise',
      message: 'Can you come to Mission District?',
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
      foodPreferences: ['Tacos', 'Burgers', 'Pizza'],
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
      foodPreferences: data.foodPreferences,
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
            trucks={foodTrucks}
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
            trucks={foodTrucks.filter(t => t.ownerId === user?.id)}
            requests={requests.filter(r => 
              foodTrucks.some(t => t.id === r.truckId && t.ownerId === user?.id)
            )}
            onNavigate={navigate}
          />
        );
      case 'my-trucks':
        return (
          <MyTrucksManagement
            trucks={foodTrucks.filter(t => t.ownerId === user?.id)}
            onNavigate={navigate}
            onEditTruck={(truck) => navigate('add-edit-truck', { truckForEdit: truck })}
          />
        );
      case 'add-edit-truck':
        return (
          <AddEditTruckScreen
            truck={selectedTruckForEdit}
            onNavigate={navigate}
          />
        );
      case 'live-broadcasting':
        return <LiveBroadcastingScreen onNavigate={navigate} />;
      case 'truck-requests':
        return (
          <TruckRequestsManagement
            requests={requests.filter(r => 
              foodTrucks.some(t => t.id === r.truckId && t.ownerId === user?.id)
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
