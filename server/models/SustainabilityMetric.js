import mongoose from 'mongoose';

const sustainabilityMetricSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['purchase', 'view', 'share'],
    required: true
  },
  impact: {
    carbonReduced: { type: Number, default: 0 }, // kg CO2
    waterSaved: { type: Number, default: 0 }, // liters
    energySaved: { type: Number, default: 0 }, // kWh
    wasteReduced: { type: Number, default: 0 } // kg
  },
  metadata: {
    productCategory: String,
    productPrice: Number,
    quantity: Number,
    location: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
sustainabilityMetricSchema.index({ user: 1, createdAt: -1 });
sustainabilityMetricSchema.index({ product: 1, type: 1 });

export default mongoose.model('SustainabilityMetric', sustainabilityMetricSchema);