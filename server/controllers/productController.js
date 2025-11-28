import Product from '../models/Product.js';
import Category from '../models/Category.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
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
      .populate('createdBy', 'name email')
      .sort(sort)
      .limit(limitNum)
      .skip(skip);

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name description')
      .populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin/Vendor)
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      createdBy: req.user.id
    });

    await product.save();
    await product.populate('category', 'name');
    await product.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin/Vendor)
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership (vendors can only update their own products)
    if (req.user.role === 'vendor' && product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name').populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin/Vendor)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership (vendors can only delete their own products)
    if (req.user.role === 'vendor' && product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ salesCount: -1, createdAt: -1 })
      .limit(8)
      .populate('category', 'name');

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
      error: error.message
    });
  }
};