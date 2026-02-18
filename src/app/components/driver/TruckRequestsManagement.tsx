import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, MapPin, Filter, LayoutDashboard, Truck, MessageSquare, User, Radio } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Request } from '../../App';

interface TruckRequestsManagementProps {
  requests: Request[];
  onNavigate: (screen: string) => void;
  onUpdateRequest: (requestId: string, status: Request['status']) => void;
}

export default function TruckRequestsManagement({
  requests,
  onNavigate,
  onUpdateRequest
}: TruckRequestsManagementProps) {
  const [activeTab, setActiveTab] = useState('all');

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acknowledgedRequests = requests.filter(r => r.status === 'acknowledged');
  const ignoredRequests = requests.filter(r => r.status === 'ignored');

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const RequestCard = ({ request }: { request: Request }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-orange-600">
              {request.userName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{request.userName}</h3>
            <p className="text-sm text-gray-600">{request.truckName}</p>
            <p className="text-xs text-gray-500">{formatTimestamp(request.timestamp)}</p>
          </div>
        </div>
        <Badge
          className={
            request.status === 'pending'
              ? 'bg-orange-100 text-orange-700'
              : request.status === 'acknowledged'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }
        >
          {request.status}
        </Badge>
      </div>

      {request.message && (
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <p className="text-sm text-gray-700">{request.message}</p>
        </div>
      )}

      <div className="flex items-center text-sm text-gray-500 mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        {request.location ? 'Location shared' : 'Location not shared'}
      </div>

      {request.status === 'pending' && (
        <div className="flex gap-2">
          <Button
            onClick={() => onUpdateRequest(request.id, 'acknowledged')}
            className="flex-1 bg-green-500 hover:bg-green-600"
            size="sm"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Acknowledge
          </Button>
          <Button
            onClick={() => onUpdateRequest(request.id, 'ignored')}
            variant="outline"
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
            size="sm"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Ignore
          </Button>
        </div>
      )}
    </div>
  );

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
            <h1 className="text-xl font-bold text-gray-900">Requests</h1>
          </div>
          {pendingRequests.length > 0 && (
            <Badge className="bg-red-500">
              {pendingRequests.length} New
            </Badge>
          )}
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-orange-600">{pendingRequests.length}</p>
            <p className="text-xs text-orange-700">Pending</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{acknowledgedRequests.length}</p>
            <p className="text-xs text-green-700">Acknowledged</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-600">{requests.length}</p>
            <p className="text-xs text-gray-700">Total</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">
              All ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="acknowledged">
              Done ({acknowledgedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {requests.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">No Requests Yet</h3>
                <p className="text-sm text-gray-600">
                  Customer requests will appear here when they send them
                </p>
              </div>
            ) : (
              requests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">No Pending Requests</h3>
                <p className="text-sm text-gray-600">
                  You're all caught up!
                </p>
              </div>
            ) : (
              pendingRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>

          <TabsContent value="acknowledged" className="space-y-4">
            {acknowledgedRequests.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">No Acknowledged Requests</h3>
                <p className="text-sm text-gray-600">
                  Acknowledged requests will appear here
                </p>
              </div>
            ) : (
              acknowledgedRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>
        </Tabs>
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
          <button className="flex flex-col items-center text-orange-500">
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
