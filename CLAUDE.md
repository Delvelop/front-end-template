# 🍦 TruckDuckGo - Ice Cream Truck Platform

A modern React-based mobile web application that connects ice cream truck drivers with customers, featuring real-time location tracking, request management, and comprehensive business tools.

## 📱 Application Overview

TruckDuckGo is a dual-sided platform serving both **customers** and **ice cream truck drivers**. The app features a responsive mobile-first design with role-based navigation and real-time interactions.

### 🎯 Core Purpose
- **For Customers**: Find nearby ice cream trucks, send location requests, track favorites, and leave reviews
- **For Drivers**: Manage trucks, broadcast live locations, handle customer requests, and track business performance

---

## 👥 User Roles & Authentication

### **Guest Users**
- View welcome screen
- Access login/signup flows
- Limited functionality

### **Regular Users**
- Find ice cream trucks on interactive map
- Send location requests to drivers
- Manage favorite trucks
- View request history
- Leave reviews and ratings
- Report issues
- Upgrade to driver account

### **Driver (Pending Verification)**
- Submit driver application
- Access verification pending dashboard
- Limited truck management
- Cannot go live until verified

### **Driver (Active/Verified)**
- Full driver dashboard access
- Manage multiple trucks
- Broadcast live locations
- Handle customer requests
- View analytics and earnings
- Switch between user and driver views

---

## 🔑 Key Features

### 🗺️ **Interactive Map System**
- **Real-time truck locations** with status indicators
- **Live status badges**: Live (broadcasting), Open (static location), Offline
- **Distance calculation** from user location
- **Custom truck markers** with photos and ratings
- **List/Map view toggle** for different viewing preferences

### 📱 **Request Management**
- **Customer requests**: Send location requests with optional messages
- **Location sharing**: Optional GPS coordinate sharing
- **Request status tracking**: Pending, Acknowledged, Completed
- **Request history**: Full history with timestamps and status
- **Driver notifications**: Real-time request alerts

### ⭐ **Favorites & Reviews**
- **Favorite truck management** with heart icons
- **Confirmation dialogs** for unfavoriting
- **5-star rating system** with written reviews
- **Review moderation** and display
- **Favorite notifications** when trucks go live

### 🚛 **Truck Management (Drivers)**
- **Multiple truck support** per driver
- **Truck profiles**: Name, food type, photos, descriptions
- **Live broadcasting controls** with location sharing
- **Status management**: Live, Static, Offline
- **Truck analytics** and performance metrics

### 🔄 **Live Broadcasting**
- **One truck at a time** broadcasting limit
- **Real-time location updates**
- **Customer visibility** on map while live
- **Start/stop broadcasting controls**
- **Automatic status updates**

### 📊 **Analytics & Reporting**
- **Driver performance metrics**: Weekly earnings, live time, request counts
- **Request analytics**: Response rates, completion tracking
- **Earnings estimates** based on activity
- **Trend visualization** for business insights

---

## 🎨 User Experience Features

### 📱 **Navigation**
- **Bottom navigation tabs** with consistent icons:
  - **Users**: Map (MapPin), Requests (List), Profile (User)
  - **Drivers**: Dashboard (LayoutDashboard), My Trucks (Truck), Requests (MessageSquare), Profile (User)
- **Smart navigation**: Context-aware based on user role and verification status
- **View toggles**: Switch between user and driver modes for verified drivers

### 🎉 **Interactive Elements**
- **Toast notifications** for all major actions
- **Confirmation dialogs** for destructive actions
- **Loading states** and error handling
- **Hover effects** and smooth transitions
- **Pull-to-refresh** simulation

### 📋 **Forms & Modals**
- **Driver application form** with validation
- **Request sending modal** with message and location options
- **Review submission** with star ratings
- **Report system** for issues and violations
- **Settings management** with toggles and preferences

---

## 🏗️ Technical Architecture

### **Frontend Framework**
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive styling
- **Lucide React** for consistent iconography

### **State Management**
- **React hooks** (useState, useEffect) for local state
- **Props drilling** for component communication
- **Context patterns** for user authentication state

### **UI Components**
- **Custom component library** with shadcn/ui base
- **Reusable components**: Button, Card, Badge, Dialog, etc.
- **Responsive design** with mobile-first approach
- **Consistent design system** across all screens

### **Data Structure**
```typescript
// Core data models
User: { id, name, email, role, favoriteTrucks, notificationSettings }
IceCreamTruck: { id, name, description, foodType, status, location, rating }
Request: { id, userId, truckId, message, status, timestamp }
Review: { id, truckId, userId, rating, comment, timestamp }
```

---

## 🔄 User Flows

### **Customer Journey**
1. **Discovery**: Login → Map view → Find trucks
2. **Interaction**: Select truck → View details → Send request
3. **Management**: Track requests → Leave reviews → Manage favorites

### **Driver Onboarding**
1. **Application**: Become driver → Fill form → Submit application
2. **Verification**: Pending dashboard → Simulated approval
3. **Activation**: Driver dashboard → Add trucks → Go live

### **Driver Operations**
1. **Setup**: Add truck details → Configure settings
2. **Broadcasting**: Go live → Receive requests → Respond to customers
3. **Management**: Track analytics → Manage multiple trucks → Handle feedback

---

## 🎛️ Admin & Testing Features

### **Simulation Tools**
- **Approval simulation**: Instantly approve driver applications for testing
- **Mock data**: Pre-populated trucks, users, and requests
- **Status toggling**: Easy switching between different truck statuses

### **Development Features**
- **Hot reload** with Vite
- **TypeScript** for type safety
- **ESLint integration** for code quality
- **GitHub Pages deployment** with automated CI/CD

---

## 🚀 Deployment & Production

### **GitHub Pages Setup**
- **Automatic deployment** via GitHub Actions
- **Production builds** with optimized assets
- **CDN delivery** through GitHub's infrastructure
- **Custom domain support** available

### **Build Configuration**
- **Base path** configuration for GitHub Pages subdirectory
- **Asset optimization** and code splitting
- **Environment-specific** builds (dev vs production)

---

## 🧪 Testing & Quality

### **Built-in Testing Features**
- **Simulation mode** for driver approval
- **Mock data** for testing all features
- **Error boundaries** and graceful degradation
- **Form validation** and user feedback

### **Code Quality**
- **TypeScript** for compile-time error catching
- **Consistent** coding patterns and component structure
- **Responsive design** testing across device sizes
- **Accessibility** considerations in UI components

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm run preview
```

---

## 🎨 Design System

### **Colors**
- **Primary**: Orange (#F97316) - CTAs and branding
- **Success**: Green (#22C55E) - Live status and confirmations
- **Info**: Blue (#3B82F6) - Requests and information
- **Warning**: Red (#EF4444) - Alerts and destructive actions

### **Typography**
- **Headings**: Bold, clear hierarchy
- **Body**: Readable sizes with proper contrast
- **Labels**: Consistent sizing and color usage

### **Spacing**
- **Consistent**: 4px grid system via Tailwind
- **Mobile-optimized**: Touch-friendly button sizes
- **Clean**: Generous white space for readability

---

## 🚀 Future Enhancement Opportunities

- **Real-time messaging** between drivers and customers
- **Payment integration** for seamless transactions
- **Advanced analytics** with charts and trends
- **Push notifications** for mobile apps
- **Multi-language support** for broader accessibility
- **Driver scheduling** and route optimization

---

*Built with ❤️ using React, TypeScript, and Tailwind CSS*