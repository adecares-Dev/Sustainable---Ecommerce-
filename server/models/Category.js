import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxLength: [50, 'Category name cannot exceed 50 characters']
  },
  description: {
    type: String,
    maxLength: [200, 'Description cannot exceed 200 characters']
  },
  image: {
    type: String,
    default: ''
  },
  sustainabilityTips: [{
    title: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  }
}, {
  timestamps: true
});

// Virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentCategory'
});

export default mongoose.model('Category', categorySchema);