import React, { useState, useEffect } from 'react';
import { Activity, Users, MessageSquare, Shield, Server, Database } from 'lucide-react';

export const ApiStats: React.FC = () => {
  const [apiInfo, setApiInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiInfo();
  }, []);

  const fetchApiInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/');
      const data = await response.json();
      setApiInfo(data);
    } catch (error) {
      console.error('Failed to fetch API info:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      name: 'API Status',
      value: 'Online',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Authentication',
      value: 'JWT Token',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Database',
      value: 'In-Memory',
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Framework',
      value: 'NestJS',
      icon: Server,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const features = [
    {
      title: 'Token-based Authentication',
      description: 'Secure JWT-based login system with email authentication',
      icon: Shield,
    },
    {
      title: 'User Management',
      description: 'User profiles with role-based access control',
      icon: Users,
    },
    {
      title: 'Internal Messaging',
      description: 'Send and receive messages between users with read status',
      icon: MessageSquare,
    },
    {
      title: 'API Documentation',
      description: 'Complete Swagger/OpenAPI documentation available',
      icon: Server,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Activity className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">API Overview</h2>
      </div>

      {/* API Info Card */}
      {apiInfo && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{apiInfo.name}</h3>
            <p className="card-description">Version {apiInfo.version}</p>
          </div>
          <div className="card-content">
            <p className="text-gray-700 mb-4">{apiInfo.description}</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(apiInfo.endpoints).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {key}: {value as string}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="card-content">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">API Features</h3>
          <p className="card-description">Core functionality provided by the Business Dashboard API</p>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Links</h3>
          <p className="card-description">Useful resources and documentation</p>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="http://localhost:3000/api"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Server className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">API Documentation</p>
                  <p className="text-sm text-gray-500">Swagger UI</p>
                </div>
              </div>
            </a>
            <a
              href="http://localhost:3000/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">API Status</p>
                  <p className="text-sm text-gray-500">Health Check</p>
                </div>
              </div>
            </a>
            <div className="block p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Data Storage</p>
                  <p className="text-sm text-gray-500">In-Memory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};