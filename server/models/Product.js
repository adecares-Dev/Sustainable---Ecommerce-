import mongoose from 'mongoose';

const sustainabilityMetricSchema = new mongoose.Schema({
  carbonFootprint: {
    type: Number,
    default: 0
  },
  waterUsage: {
    type: Number,
    default: 0
  },
  energyConsumption: {
    type: Number,
    default: 0
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  isRecycled: {
    type: Boolean,
    default: false
  },
  isBiodegradable: {
    type: Boolean,
    default: false
  },
  isFairTrade: {
    type: Boolean,
    default: false
  },
  isLocal: {
    type: Boolean,
    default: false
  },
  packagingScore: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  renewableEnergy: {
    type: Boolean,
    default: false
  },
  certifications: [{
    type: String
  }]
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxLength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  images: [{
    url: String,
    alt: String
  }],
  sustainabilityMetrics: sustainabilityMetricSchema,
  supplier: {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    sustainabilityCertifications: [String],
    ethicalRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    }
  },
  inventory: {
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    lowStockAlert: {
      type: Number,
      default: 10
    }
  },
  salesCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ 'sustainabilityMetrics.isOrganic': 1 });
productSchema.index({ 'sustainabilityMetrics.isRecycled': 1 });
productSchema.index({ 'sustainabilityMetrics.isFairTrade': 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

export default mongoose.model('Product', productSchema);