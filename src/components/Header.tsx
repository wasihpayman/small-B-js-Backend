import React from 'react';
import { LogOut, User as UserIcon, Building2 } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Business Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="btn-ghost flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};