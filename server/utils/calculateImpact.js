// Calculate environmental impact for products and orders

// Base impact factors (these would typically come from a database or environmental studies)
const IMPACT_FACTORS = {
  // Carbon footprint factors (kg CO2 per unit)
  carbon: {
    clothing: 15, // kg CO2 per clothing item
    food: 2.5,    // kg CO2 per kg of food
    electronics: 50, // kg CO2 per electronic item
    home: 10,     // kg CO2 per home item
    'personal-care': 3, // kg CO2 per personal care item
    default: 5    // kg CO2 per item
  },
  // Water usage factors (liters per unit)
  water: {
    clothing: 2500, // liters per clothing item (cotton)
    food: 1000,     // liters per kg of food
    electronics: 100, // liters per electronic item
    home: 500,      // liters per home item
    'personal-care': 200, // liters per personal care item
    default: 300    // liters per item
  },
  // Energy consumption factors (kWh per unit)
  energy: {
    clothing: 50,   // kWh per clothing item
    food: 10,       // kWh per kg of food
    electronics: 100, // kWh per electronic item
    home: 25,       // kWh per home item
    'personal-care': 15, // kWh per personal care item
    default: 20     // kWh per item
  }
};

// Calculate impact for a single product
export const calculateProductImpact = (product, quantity = 1) => {
  const category = product.category?.name || 'default';
  
  const carbonFootprint = (IMPACT_FACTORS.carbon[category] || IMPACT_FACTORS.carbon.default) * quantity;
  const waterUsage = (IMPACT_FACTORS.water[category] || IMPACT_FACTORS.water.default) * quantity;
  const energyConsumption = (IMPACT_FACTORS.energy[category] || IMPACT_FACTORS.energy.default) * quantity;

  // Apply sustainability discounts
  let carbonDiscount = 0;
  let waterDiscount = 0;
  let energyDiscount = 0;

  if (product.sustainabilityMetrics?.isOrganic) {
    carbonDiscount += 0.2; // 20% reduction for organic
    waterDiscount += 0.1;  // 10% reduction for organic
  }

  if (product.sustainabilityMetrics?.isRecycled) {
    carbonDiscount += 0.3; // 30% reduction for recycled materials
    energyDiscount += 0.25; // 25% reduction for recycled
  }

  if (product.sustainabilityMetrics?.isLocal) {
    carbonDiscount += 0.15; // 15% reduction for local production
  }

  // Apply discounts
  const finalCarbon = carbonFootprint * (1 - Math.min(carbonDiscount, 0.6)); // Max 60% discount
  const finalWater = waterUsage * (1 - Math.min(waterDiscount, 0.4)); // Max 40% discount
  const finalEnergy = energyConsumption * (1 - Math.min(energyDiscount, 0.5)); // Max 50% discount

  return {
    carbonFootprint: Math.max(finalCarbon, 0.1), // Minimum 0.1 kg CO2
    waterUsage: Math.max(finalWater, 10), // Minimum 10 liters
    energyConsumption: Math.max(finalEnergy, 1) // Minimum 1 kWh
  };
};

// Calculate impact for an entire order
export const calculateOrderImpact = (orderItems) => {
  let totalCarbon = 0;
  let totalWater = 0;
  let totalEnergy = 0;

  orderItems.forEach(item => {
    totalCarbon += item.sustainabilityMetrics?.carbonFootprint || 0;
    totalWater += item.sustainabilityMetrics?.waterSaved || 0;
    totalEnergy += item.sustainabilityMetrics?.energySaved || 0;
  });

  // Calculate trees saved equivalent (approx 21kg CO2 per tree per year)
  const treesSaved = totalCarbon / 21;

  return {
    totalCarbonFootprint: parseFloat(totalCarbon.toFixed(2)),
    totalWaterSaved: parseFloat(totalWater.toFixed(2)),
    totalEnergySaved: parseFloat(totalEnergy.toFixed(2)),
    treesSaved: parseFloat(treesSaved.toFixed(1))
  };
};

// Calculate user's lifetime impact
export const calculateUserLifetimeImpact = (orders) => {
  const impact = {
    totalCarbonReduced: 0,
    totalWaterSaved: 0,
    totalEnergySaved: 0,
    totalTreesSaved: 0,
    sustainablePurchases: 0
  };

  orders.forEach(order => {
    impact.totalCarbonReduced += order.sustainabilityImpact.totalCarbonFootprint || 0;
    impact.totalWaterSaved += order.sustainabilityImpact.totalWaterSaved || 0;
    impact.totalEnergySaved += order.sustainabilityImpact.totalEnergySaved || 0;
    impact.totalTreesSaved += order.sustainabilityImpact.treesSaved || 0;
    impact.sustainablePurchases += order.items.length;
  });

  // Format numbers
  impact.totalCarbonReduced = parseFloat(impact.totalCarbonReduced.toFixed(2));
  impact.totalWaterSaved = parseFloat(impact.totalWaterSaved.toFixed(2));
  impact.totalEnergySaved = parseFloat(impact.totalEnergySaved.toFixed(2));
  impact.totalTreesSaved = parseFloat(impact.totalTreesSaved.toFixed(1));

  return impact;
};