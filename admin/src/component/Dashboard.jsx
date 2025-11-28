import React from 'react';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package,
  Leaf,
  Recycle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      description: 'From last month'
    },
    {
      icon: DollarSign,
      label: 'Revenue',
      value: '$45,678',
      change: '+8%',
      changeType: 'positive',
      description: 'From last month'
    },
    {
      icon: Users,
      label: 'Customers',
      value: '5,678',
      change: '+15%',
      changeType: 'positive',
      description: 'From last month'
    },
    {
      icon: Leaf,
      label: 'Carbon Reduced',
      value: '12.5t',
      change: '+23%',
      changeType: 'positive',
      description: 'CO₂ equivalent'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      message: 'New order #ORD-1234 placed',
      time: '2 minutes ago',
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'product',
      message: 'New product "Eco Bamboo Toothbrush" added',
      time: '1 hour ago',
      user: 'Admin'
    },
    {
      id: 3,
      type: 'user',
      message: 'New vendor "Green Supplies" registered',
      time: '2 hours ago',
      user: 'System'
    },
    {
      id: 4,
      type: 'sustainability',
      message: 'Monthly sustainability report generated',
      time: '5 hours ago',
      user: 'System'
    }
  ];

  const sustainabilityMetrics = [
    { metric: 'Organic Products', value: 456, total: 500, percentage: 91 },
    { metric: 'Recycled Products', value: 289, total: 350, percentage: 83 },
    { metric: 'Fair Trade Products', value: 178, total: 200, percentage: 89 },
    { metric: 'Local Suppliers', value: 67, total: 80, percentage: 84 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your sustainable e-commerce admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">{stat.description}</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <IconComponent className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sustainability Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Sustainability Metrics</h2>
            <Recycle className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-4">
            {sustainabilityMetrics.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.metric}</span>
                  <span>{item.value}/{item.total} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-green-50 text-green-700 p-4 rounded-lg hover:bg-green-100 transition-colors text-center">
            <Package className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Add Product</span>
          </button>
          <button className="bg-blue-50 text-blue-700 p-4 rounded-lg hover:bg-blue-100 transition-colors text-center">
            <Users className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Manage Users</span>
          </button>
          <button className="bg-purple-50 text-purple-700 p-4 rounded-lg hover:bg-purple-100 transition-colors text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View Reports</span>
          </button>
          <button className="bg-orange-50 text-orange-700 p-4 rounded-lg hover:bg-orange-100 transition-colors text-center">
            <Leaf className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Sustainability</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;