import React from 'react';
import { Leaf, Droplets, Zap, Trees } from 'lucide-react';

const ImpactMetrics = ({ data }) => {
  const metrics = [
    {
      icon: Leaf,
      label: 'Carbon Reduced',
      value: data?.totalCarbonReduced || 0,
      unit: 'kg CO₂',
      color: 'green',
      description: 'Equivalent to planting trees'
    },
    {
      icon: Droplets,
      label: 'Water Saved',
      value: data?.totalWaterSaved || 0,
      unit: 'L',
      color: 'blue',
      description: 'Fresh water conserved'
    },
    {
      icon: Zap,
      label: 'Energy Saved',
      value: data?.totalEnergySaved || 0,
      unit: 'kWh',
      color: 'yellow',
      description: 'Clean energy equivalent'
    },
    {
      icon: Trees,
      label: 'Sustainable Purchases',
      value: data?.sustainablePurchases || 0,
      unit: 'items',
      color: 'emerald',
      description: 'Eco-friendly choices'
    }
  ];

  const getEquivalentImpact = (metric) => {
    if (metric.label === 'Carbon Reduced') {
      const trees = (metric.value / 21).toFixed(1);
      return `Equivalent to ${trees} trees planted`;
    }
    if (metric.label === 'Water Saved') {
      const showers = (metric.value / 65).toFixed(0);
      return `Equivalent to ${showers} showers`;
    }
    if (metric.label === 'Energy Saved') {
      const homes = (metric.value / 900).toFixed(1);
      return `Power for ${homes} homes for a month`;
    }
    return metric.description;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${metric.color}-100 mb-4`}>
              <IconComponent className={`h-6 w-6 text-${metric.color}-600`} />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {metric.value.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {metric.unit}
            </div>
            <div className="text-lg font-semibold text-gray-700 mb-2">
              {metric.label}
            </div>
            <div className="text-xs text-gray-500">
              {getEquivalentImpact(metric)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImpactMetrics;