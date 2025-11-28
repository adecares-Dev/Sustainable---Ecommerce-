import React from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Leaderboard = ({ data, loading }) => {
  const { user } = useAuth();

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1: return <Medal className="h-6 w-6 text-gray-400" />;
      case 2: return <Award className="h-6 w-6 text-orange-500" />;
      default: return <Star className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRankColor = (index) => {
    switch(index) {
      case 0: return 'bg-yellow-50 border-yellow-200';
      case 1: return 'bg-gray-50 border-gray-200';
      case 2: return 'bg-orange-50 border-orange-200';
      default: return 'bg-white border-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sustainability Leaderboard</h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Leaderboard Data Yet</h3>
        <p className="text-gray-600">Be the first to make sustainable purchases!</p>
      </div>
    );
  }

  const currentUserRank = data.findIndex(item => item.userId === user?.id);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sustainability Leaderboard</h2>
        {currentUserRank !== -1 && (
          <div className="text-sm text-green-600 font-medium">
            Your Rank: #{currentUserRank + 1}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {data.slice(0, 10).map((item, index) => (
          <div
            key={item._id || index}
            className={`flex items-center justify-between p-4 border rounded-lg ${getRankColor(index)} ${
              item.userId === user?.id ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8">
                {getRankIcon(index)}
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">
                    {item.user?.[0]?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {item.user?.[0]?.name || 'Anonymous User'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.totalOrders || 0} sustainable purchases
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {item.totalCarbonReduced?.toFixed(2) || 0} kg
              </div>
              <div className="text-xs text-gray-500">CO₂ reduced</div>
            </div>
          </div>
        ))}
      </div>

      {currentUserRank >= 10 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-green-600">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-800">You</div>
                <div className="text-xs text-gray-500">Rank #{currentUserRank + 1}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {data[currentUserRank]?.totalCarbonReduced?.toFixed(2) || 0} kg
              </div>
              <div className="text-xs text-gray-500">CO₂ reduced</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        Top 10 most sustainable shoppers this month
      </div>
    </div>
  );
};

export default Leaderboard;