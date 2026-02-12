import React from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle, MapPin, List, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Request } from '../../App';

interface RequestHistoryScreenProps {
  requests: Request[];
  onNavigate: (screen: string) => void;
}

export default function RequestHistoryScreen({
  requests,
  onNavigate
}: RequestHistoryScreenProps) {
  const getStatusIcon = (status: Request['status']) => {
    switch (status) {
      case 'acknowledged':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'ignored':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusBadge = (status: Request['status']) => {
    const variants = {
      pending: 'bg-orange-100 text-orange-700',
      acknowledged: 'bg-green-100 text-green-700',
      ignored: 'bg-red-100 text-red-700',
      expired: 'bg-gray-100 text-gray-700'
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

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

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('home')}
            className="mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Request History</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {requests.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Requests Yet</h2>
            <p className="text-gray-600">
              Your food truck requests will appear here
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {requests.length} {requests.length === 1 ? 'request' : 'requests'} sent
              </p>
            </div>

            <div className="space-y-4">
              {requests.map(request => (
                <div
                  key={request.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(request.status)}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          {request.truckName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatTimestamp(request.timestamp)}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>

                  {request.message && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">{request.message}</p>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-500">
                    {request.location ? (
                      <>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Location shared</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-1 opacity-50" />
                        <span>Location not shared</span>
                      </>
                    )}
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
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center text-gray-400"
          >
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Map</span>
          </button>
          <button className="flex flex-col items-center text-orange-500">
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
