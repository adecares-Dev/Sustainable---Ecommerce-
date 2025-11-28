import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const Analytics = () => {
  // Sample data for charts
  const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 198 },
    { name: 'Mar', sales: 5000, orders: 280 },
    { name: 'Apr', sales: 2780, orders: 189 },
    { name: 'May', sales: 3890, orders: 239 },
    { name: 'Jun', sales: 4390, orders: 278 }
  ];

  const sustainabilityData = [
    { name: 'Organic', value: 35 },
    { name: 'Recycled', value: 25 },
    { name: 'Fair Trade', value: 20 },
    { name: 'Local', value: 15 },
    { name: 'Other', value: 5 }
  ];

  const impactData = [
    { month: 'Jan', carbon: 120, water: 800, energy: 450 },
    { month: 'Feb', carbon: 98, water: 650, energy: 380 },
    { month: 'Mar', carbon: 156, water: 920, energy: 520 },
    { month: 'Apr', carbon: 134, water: 780, energy: 410 },
    { month: 'May', carbon: 145, water: 860, energy: 480 },
    { month: 'Jun', carbon: 167, water: 950, energy: 540 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const topProducts = [
    { name: 'Bamboo Toothbrush', sales: 234, revenue: 1166 },
    { name: 'Organic Cotton Bag', sales: 189, revenue: 945 },
    { name: 'Recycled Glass Bottle', sales: 156, revenue: 3894 },
    { name: 'Hemp T-Shirt', sales: 145, revenue: 4205 },
    { name: 'Wooden Phone Case', sales: 128, revenue: 1536 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">Track performance and sustainability metrics</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Last 6 Months</span>
          </button>
          <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales & Orders Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales ($)" />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sustainability Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Sustainability Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sustainabilityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sustainabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Environmental Impact */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="carbon" fill="#8884d8" name="Carbon Reduced (kg)" />
              <Bar dataKey="water" fill="#82ca9d" name="Water Saved (L)" />
              <Bar dataKey="energy" fill="#ffc658" name="Energy Saved (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Sustainable Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sales} units sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">${product.revenue}</div>
                  <div className="text-sm text-gray-500">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-green-600">1,234</div>
          <div className="text-gray-600">Total Sustainable Orders</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">45.6t</div>
          <div className="text-gray-600">Total CO₂ Reduced</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">89%</div>
          <div className="text-gray-600">Customer Satisfaction</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">$124.5K</div>
          <div className="text-gray-600">Total Revenue</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;