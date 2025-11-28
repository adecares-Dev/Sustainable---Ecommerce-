import React from 'react';
import { Leaf } from 'lucide-react';

const SustainabilityBadge = ({ score, showLabel = true }) => {
  const getBadgeColor = (score) => {
    if (score >= 4.5) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 3.5) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (score >= 2.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full border ${getBadgeColor(score)}`}>
      <Leaf className="h-3 w-3 mr-1" />
      <span className="text-xs font-medium">
        {getStars(score)} {showLabel && 'Eco'}
      </span>
    </div>
  );
};

export default SustainabilityBadge;