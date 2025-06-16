import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ApiService } from './services/api';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      ApiService.setToken(token);
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await ApiService.getUserProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      localStorage.removeItem('token');
      ApiService.setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string) => {
    try {
      const response = await ApiService.login(email);
      localStorage.setItem('token', response.access_token);
      ApiService.setToken(response.access_token);
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    ApiService.setToken(null);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;