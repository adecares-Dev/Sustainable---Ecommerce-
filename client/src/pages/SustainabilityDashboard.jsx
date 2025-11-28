import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Leaf, Droplets, Zap, Target, Award, TrendingUp } from 'lucide-react';
import { sustainabilityService } from '../services/sustainabilityService';
import { useAuth } from '../hooks/useAuth';
import ImpactMetrics from '../components/sustainability/ImpactMetrics';
import Leaderboard from '../components/sustainability/LeaderBoard';

const SustainabilityDashboard = () => {
  const { user } = useAuth();

  const { data: impactData, isLoading: impactLoading } = useQuery({
    queryKey: ['sustainability-impact', user?.id],
    queryFn: () => sustainabilityService.getUserImpact(user.id),
    enabled: !!user
  });

  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery({
    queryKey: ['sustainability-leaderboard'],
    queryFn: sustainabilityService.getLeaderboard
  });

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <Leaf className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Track Your Sustainability Impact
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to see how your sustainable purchases are making a difference
          </p>
          <a
            href="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Sustainability Impact
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how your conscious shopping choices are contributing to a more sustainable future
          and supporting SDG 12: Responsible Consumption and Production
        </p>
      </div>

      {/* Impact Metrics */}
      {impactData && <ImpactMetrics data={impactData} />}

      {/* Additional Impact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Target className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold">SDG 12 Alignment</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Your purchases support sustainable consumption patterns, reduce waste,
            and promote responsible production practices.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <h3 className="text-lg font-semibold">Progress Tracking</h3>
          </div>
          <p className="text-gray-600 text-sm">
            You're in the top {leaderboard?.findIndex(item => item.userId === user.id) + 1 || '?'}%
            of sustainable shoppers. Keep up the great work!
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Award className="h-8 w-8 text-yellow-500 mr-3" />
            <h3 className="text-lg font-semibold">Certifications</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Your purchases support products with Organic, Fair Trade, Recycled,
            and other sustainability certifications.
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <Leaderboard data={leaderboard} loading={leaderboardLoading} />

      {/* Educational Section */}
      <div className="bg-green-50 rounded-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Understanding Your Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Carbon Footprint Reduction</h3>
            <p className="text-gray-600 mb-4">
              By choosing sustainable products, you've helped reduce greenhouse gas emissions
              equivalent to:
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• {((impactData?.totalCarbonReduced || 0) / 2.3).toFixed(1)} liters of gasoline not burned</li>
              <li>• {((impactData?.totalCarbonReduced || 0) * 1.6).toFixed(1)} km not driven by car</li>
              <li>• {((impactData?.totalCarbonReduced || 0) / 21).toFixed(1)} tree seedlings grown for 10 years</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Water Conservation</h3>
            <p className="text-gray-600 mb-4">
              Your water-saving choices are equivalent to:
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• {((impactData?.totalWaterSaved || 0) / 7.5).toFixed(0)} standard bathtubs of water</li>
              <li>• {((impactData?.totalWaterSaved || 0) / 15).toFixed(0)} washing machine loads</li>
              <li>• {((impactData?.totalWaterSaved || 0) / 2).toFixed(0)} days of drinking water for a person</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;