import api from './api';

export const sustainabilityService = {
  // Get user's sustainability impact
  async getUserImpact(userId) {
    const response = await api.get(`/sustainability/impact/${userId}`);
    return response.data;
  },

  // Get sustainability leaderboard
  async getLeaderboard() {
    const response = await api.get('/sustainability/leaderboard');
    return response.data;
  },

  // Calculate impact for products
  calculateProductImpact(products) {
    return products.reduce((impact, product) => {
      const metrics = product.sustainabilityMetrics || {};
      return {
        carbonReduced: impact.carbonReduced + (metrics.carbonFootprint || 0),
        waterSaved: impact.waterSaved + (metrics.waterUsage || 0),
        energySaved: impact.energySaved + (metrics.energyConsumption || 0)
      };
    }, { carbonReduced: 0, waterSaved: 0, energySaved: 0 });
  },

  // Get impact equivalents
  getImpactEquivalents(impact) {
    return {
      treesPlanted: (impact.carbonReduced / 21).toFixed(1),
      showers: (impact.waterSaved / 65).toFixed(0),
      homesPowered: (impact.energySaved / 900).toFixed(1)
    };
  }
};