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
import FavoritesScreen from './components/user/FavoritesScreen';

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
  favoriteTrucks: string[]; // Array of truck IDs
  notificationSettings: {
    favoriteTruckBroadcast: boolean;
    newTrucksInArea: boolean;
    generalUpdates: boolean;
  };
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
  status: 'live-mobile' | 'live-static' | 'offline';
  location: {
    lat: number;
    lng: number;
  };
  distance?: string;
  rating: number;
  reviewCount: number;
  schedule: string;
  contact: string;
  photoUrl: string;
  broadcastMode?: 'mobile' | 'static'; // Additional field to track current broadcast mode
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

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  type: 'bug' | 'inappropriate-truck' | 'inappropriate-user' | 'spam' | 'other';
  category: 'technical' | 'content' | 'behavior' | 'safety' | 'other';
  targetId?: string; // truck ID or user ID if reporting specific entity
  targetName?: string; // truck name or user name
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-review' | 'resolved' | 'closed';
  timestamp: Date;
  screenshots?: string[];
}

export interface Review {
  id: string;
  truckId: string;
  userId: string;
  userName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  timestamp: Date;
  verified?: boolean; // if user actually visited the truck
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<IceCreamTruck | null>(null);
  const [selectedTruckForEdit, setSelectedTruckForEdit] = useState<IceCreamTruck | null>(null);
  const [broadcastingTruckId, setBroadcastingTruckId] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      truckId: '1',
      userId: 'user2',
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Amazing ice cream! The best I\'ve had in the city. Highly recommend the vanilla bean.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      verified: true
    },
    {
      id: '2',
      truckId: '1',
      userId: 'user3',
      userName: 'Mike R.',
      rating: 5,
      comment: 'Great quality and friendly service. Love that they use premium ingredients!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      verified: true
    },
    {
      id: '3',
      truckId: '2',
      userId: 'user4',
      userName: 'Emma L.',
      rating: 4,
      comment: 'Good soft serve, reasonable prices. Quick service even when busy.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      verified: true
    }
  ]);

  // Mock ice cream trucks data
  const [iceCreamTrucks, setIceCreamTrucks] = useState<IceCreamTruck[]>([
    {
      id: '1',
      name: 'Sweet Dreams Ice Cream',
      ownerId: 'driver1',
      flavorCategories: ['Classic', 'Premium', 'Vegan'],
      description: 'Artisanal ice cream made fresh daily with premium ingredients',
      status: 'live-mobile',
      location: { lat: 37.7849, lng: -122.4194 }, // Union Square area
      distance: '0.3 miles',
      rating: 4.8,
      reviewCount: 248,
      schedule: 'Mon-Fri: 11am-9pm',
      contact: '(555) 123-4567',
      photoUrl: 'ice-cream-truck-1',
      broadcastMode: 'mobile'
    },
    {
      id: '2',
      name: 'Frosty Delights',
      ownerId: 'driver2',
      flavorCategories: ['Soft Serve', 'Novelties', 'Shakes'],
      description: 'Classic soft serve and frozen treats for all ages',
      status: 'live-static',
      location: { lat: 37.7659, lng: -122.4070 }, // Mission District
      distance: '0.5 miles',
      rating: 4.6,
      reviewCount: 189,
      schedule: 'Daily: 10am-10pm',
      contact: '(555) 234-5678',
      photoUrl: 'ice-cream-truck-2',
      broadcastMode: 'static'
    },
    {
      id: '3',
      name: 'Gelato Express',
      ownerId: 'driver3',
      flavorCategories: ['Gelato', 'Sorbet', 'Coffee'],
      description: 'Authentic Italian gelato and refreshing sorbets',
      status: 'live-mobile',
      location: { lat: 37.7955, lng: -122.4058 }, // North Beach
      distance: '0.8 miles',
      rating: 4.9,
      reviewCount: 312,
      schedule: 'Tue-Sun: 12pm-8pm',
      contact: '(555) 345-6789',
      photoUrl: 'ice-cream-truck-3',
      broadcastMode: 'mobile'
    },
    {
      id: '4',
      name: 'Chill Zone',
      ownerId: 'driver4',
      flavorCategories: ['Rolled Ice Cream', 'Bubble Tea', 'Frozen Yogurt'],
      description: 'Trendy rolled ice cream and frozen yogurt creations',
      status: 'live-mobile',
      location: { lat: 37.7599, lng: -122.4148 }, // Castro District
      distance: '1.2 miles',
      rating: 4.7,
      reviewCount: 156,
      schedule: 'Mon-Sat: 11am-9pm',
      contact: '(555) 456-7890',
      photoUrl: 'ice-cream-truck-4',
      broadcastMode: 'mobile'
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
      role: 'user',
      favoriteTrucks: [],
      notificationSettings: {
        favoriteTruckBroadcast: true,
        newTrucksInArea: true,
        generalUpdates: false
      }
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
      role: 'user',
      favoriteTrucks: [],
      notificationSettings: {
        favoriteTruckBroadcast: true,
        newTrucksInArea: true,
        generalUpdates: false
      }
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

  const handleSwitchToUserView = () => {
    navigate('home');
  };

  const handleSwitchToDriverView = () => {
    if (user?.role === 'driver-pending') {
      navigate('verification-pending');
    } else if (user?.role === 'driver-active') {
      navigate('driver-dashboard');
    }
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
      navigate('driver-dashboard');
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

  const handleStartBroadcasting = (truckId: string, mode: 'mobile' | 'static' = 'mobile') => {
    console.log('handleStartBroadcasting called with truckId:', truckId, 'mode:', mode);
    setBroadcastingTruckId(truckId);

    const truck = iceCreamTrucks.find(t => t.id === truckId);

    // Check if any users have this truck as favorite and should be notified
    if (truck && user?.role === 'driver-active') {
      // In a real app, this would send push notifications to users who have this truck favorited
      // For demo purposes, we'll show a toast if the current user would receive the notification
      const mockNotifyUsers = () => {
        // Simulate checking if current user (when switched to regular user) would get notification
        if (user?.notificationSettings.favoriteTruckBroadcast) {
          // This simulates what other users would see
          console.log(`Would notify users: ${truck.name} is now broadcasting in ${mode} mode!`);
        }
      };
      mockNotifyUsers();
    }

    // Update the truck status based on broadcasting mode
    const status = mode === 'mobile' ? 'live-mobile' : 'live-static';
    setIceCreamTrucks(trucks =>
      trucks.map(truck =>
        truck.id === truckId
          ? { ...truck, status: status as const, broadcastMode: mode }
          : truck.ownerId === user?.id
          ? { ...truck, status: 'offline' as const } // Set other owned trucks to offline
          : truck
      )
    );
    console.log('Broadcasting truck ID set to:', truckId, 'with status:', status);
  };

  const handleStopBroadcasting = () => {
    if (broadcastingTruckId) {
      setBroadcastingTruckId(null);
      // Update the truck status to 'offline'
      setIceCreamTrucks(trucks =>
        trucks.map(truck =>
          truck.id === broadcastingTruckId
            ? { ...truck, status: 'offline' as const, broadcastMode: undefined }
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

  const handleToggleFavorite = (truckId: string) => {
    if (user) {
      const isFavorite = user.favoriteTrucks.includes(truckId);
      const updatedFavorites = isFavorite
        ? user.favoriteTrucks.filter(id => id !== truckId)
        : [...user.favoriteTrucks, truckId];

      setUser({
        ...user,
        favoriteTrucks: updatedFavorites
      });
    }
  };

  const handleUpdateNotificationSettings = (settings: User['notificationSettings']) => {
    if (user) {
      setUser({
        ...user,
        notificationSettings: settings
      });
    }
  };

  const handleSubmitReport = (reportData: Omit<Report, 'id' | 'reporterId' | 'reporterName' | 'timestamp' | 'status'>) => {
    if (user) {
      const newReport: Report = {
        id: Math.random().toString(),
        reporterId: user.id,
        reporterName: user.firstName,
        timestamp: new Date(),
        status: 'open',
        ...reportData
      };

      setReports([...reports, newReport]);

      // Show success toast
      console.log('Report submitted:', newReport);
      return true;
    }
    return false;
  };

  const handleSubmitReview = (truckId: string, rating: 1 | 2 | 3 | 4 | 5, comment: string) => {
    if (user) {
      const newReview: Review = {
        id: Math.random().toString(),
        truckId,
        userId: user.id,
        userName: user.firstName,
        rating,
        comment,
        timestamp: new Date(),
        verified: false // In a real app, this would be determined by visit history
      };

      setReviews([...reviews, newReview]);

      // Recalculate truck rating and review count
      const truckReviews = [...reviews, newReview].filter(r => r.truckId === truckId);
      const averageRating = truckReviews.reduce((sum, review) => sum + review.rating, 0) / truckReviews.length;

      setIceCreamTrucks(trucks =>
        trucks.map(truck =>
          truck.id === truckId
            ? { ...truck, rating: Math.round(averageRating * 10) / 10, reviewCount: truckReviews.length }
            : truck
        )
      );

      return true;
    }
    return false;
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // Auth screens
      case 'welcome':
        return <WelcomeScreen onLogin={handleLogin} onNavigate={navigate} />;
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
            onToggleFavorite={handleToggleFavorite}
            onSwitchToDriverView={handleSwitchToDriverView}
          />
        );
      case 'truck-details':
        return (
          <TruckDetailsScreen
            truck={selectedTruck}
            user={user}
            reviews={reviews.filter(r => r.truckId === selectedTruck?.id)}
            onNavigate={navigate}
            onSendRequest={handleSendRequest}
            onToggleFavorite={handleToggleFavorite}
            onSubmitReport={handleSubmitReport}
            onSubmitReview={handleSubmitReview}
          />
        );
      case 'user-profile':
        return (
          <UserProfileScreen
            user={user}
            trucks={iceCreamTrucks}
            onNavigate={navigate}
            onLogout={handleLogout}
            onBecomeDriver={handleBecomeDriver}
            onToggleFavorite={handleToggleFavorite}
            onSelectTruck={(truck) => navigate('truck-details', { truck })}
            onUpdateNotificationSettings={handleUpdateNotificationSettings}
            onSubmitReport={handleSubmitReport}
          />
        );
      case 'request-history':
        return (
          <RequestHistoryScreen
            requests={requests.filter(r => r.userId === user?.id)}
            onNavigate={navigate}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            user={user}
            trucks={iceCreamTrucks}
            onNavigate={navigate}
            onToggleFavorite={handleToggleFavorite}
            onSelectTruck={(truck) => navigate('truck-details', { truck })}
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
            onSwitchToUserView={handleSwitchToUserView}
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
            onSwitchToUserView={handleSwitchToUserView}
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
        return <WelcomeScreen onLogin={handleLogin} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      <Toaster />
    </div>
  );
}
