import React from 'react';
import { User as UserIcon, Mail, Shield, Calendar } from 'lucide-react';
import { User } from '../types';
import { format } from 'date-fns';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <UserIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="card-title">{user.name}</h3>
              <p className="card-description capitalize">{user.role} Account</p>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="text-gray-900">{user.id}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 capitalize">{user.role}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-gray-900">
                    {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Account Information</h3>
          <p className="card-description">Your account details and settings</p>
        </div>
        <div className="card-content">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Demo Account</h4>
                <p className="text-sm text-blue-700 mt-1">
                  This is a demonstration account for the Business Dashboard API. 
                  In a production environment, you would have additional security features 
                  and account management options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};