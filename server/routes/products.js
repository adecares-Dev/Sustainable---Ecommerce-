import express from 'express';
import Product from '../models/Product.js';
import { auth } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      category,
      organic,
      recycled,
      fairTrade,
      local,
      biodegradable,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 12,
      search
    } = req.query;

    let filter = { isActive: true };
    
    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Category filter
    if (category) filter.category = category;
    
    // Sustainability filters
    if (organic === 'true') filter['sustainabilityMetrics.isOrganic'] = true;
    if (recycled === 'true') filter['sustainabilityMetrics.isRecycled'] = true;
    if (fairTrade === 'true') filter['sustainabilityMetrics.isFairTrade'] = true;
    if (local === 'true') filter['sustainabilityMetrics.isLocal'] = true;
    if (biodegradable === 'true') filter['sustainabilityMetrics.isBiodegradable'] = true;
    
    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    let sort = {};
    switch(sortBy) {
      case 'price-low':
        sort.price = 1;
        break;
      case 'price-high':
        sort.price = -1;
        break;
      case 'sustainability':
        sort['sustainabilityMetrics.packagingScore'] = -1;
        break;
      case 'popular':
        sort.salesCount = -1;
        break;
      default:
        sort.createdAt = -1;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort(sort)
      .limit(limitNum)
      .skip(skip);

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      total
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching products',
      error: error.message 
    });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name description')
      .populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching product',
      error: error.message 
    });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin/Vendor)
router.post('/', auth, validateProduct, async (req, res) => {
  try {
    if (!['admin', 'vendor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Admin or vendor role required.' });
    }

    const product = new Product({
      ...req.body,
      createdBy: req.user.id
    });

    await product.save();
    await product.populate('category', 'name');

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating product',
      error: error.message 
    });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin/Vendor)
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership (vendors can only update their own products)
    if (req.user.role === 'vendor' && product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name');

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating product',
      error: error.message 
    });
  }
});

export default router;