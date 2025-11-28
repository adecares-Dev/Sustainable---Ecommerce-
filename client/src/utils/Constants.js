export const SUSTAINABILITY_LABELS = {
  ORGANIC: {
    label: 'Organic',
    description: 'Grown without synthetic pesticides or fertilizers',
    color: 'green'
  },
  RECYCLED: {
    label: 'Recycled',
    description: 'Made from recycled materials',
    color: 'blue'
  },
  FAIR_TRADE: {
    label: 'Fair Trade',
    description: 'Ethically sourced with fair wages',
    color: 'yellow'
  },
  LOCAL: {
    label: 'Local',
    description: 'Locally produced to reduce carbon footprint',
    color: 'purple'
  },
  BIODEGRADABLE: {
    label: 'Biodegradable',
    description: 'Naturally breaks down in the environment',
    color: 'indigo'
  }
};

export const PRODUCT_CATEGORIES = [
  { value: 'clothing', label: 'Clothing & Fashion' },
  { value: 'food', label: 'Food & Groceries' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'personal-care', label: 'Personal Care' },
  { value: 'sports', label: 'Sports & Outdoors' }
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'sustainability', label: 'Best Sustainability' },
  { value: 'popular', label: 'Most Popular' }
];

export const SDG_12_DESCRIPTION = {
  title: 'Responsible Consumption & Production',
  description: 'Ensure sustainable consumption and production patterns',
  targets: [
    'Implement the 10-year framework of programmes on sustainable consumption and production',
    'Achieve sustainable management and efficient use of natural resources',
    'Reduce food losses along production and supply chains',
    'Environmentally sound management of chemicals and all wastes',
    'Substantially reduce waste generation through prevention, reduction, recycling and reuse'
  ]
};