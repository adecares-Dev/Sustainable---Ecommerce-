export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export const formatCarbon = (kgCO2) => {
  if (kgCO2 >= 1000) {
    return `${(kgCO2 / 1000).toFixed(1)} tons CO₂`;
  }
  return `${kgCO2.toFixed(1)} kg CO₂`;
};

export const formatWater = (liters) => {
  if (liters >= 1000) {
    return `${(liters / 1000).toFixed(1)} m³`;
  }
  return `${liters.toFixed(0)} L`;
};

export const formatEnergy = (kWh) => {
  if (kWh >= 1000) {
    return `${(kWh / 1000).toFixed(1)} MWh`;
  }
  return `${kWh.toFixed(0)} kWh`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};