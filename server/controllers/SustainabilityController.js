import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get user sustainability impact
// @route   GET /api/sustainability/impact/:userId
// @access  Private
export const getUserImpact = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user access
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const orders = await Order.find({ user: userId, status: 'delivered' });

    const impactSummary = {
      totalCarbonReduced: 0,
      totalWaterSaved: 0,
      totalEnergySaved: 0,
      sustainablePurchases: 0,
      totalOrders: orders.length,
      treesEquivalent: 0
    };

    orders.forEach(order => {
      impactSummary.totalCarbonReduced += order.sustainabilityImpact.totalCarbonFootprint || 0;
      impactSummary.totalWaterSaved += order.sustainabilityImpact.totalWaterSaved || 0;
      impactSummary.totalEnergySaved += order.sustainabilityImpact.totalEnergySaved || 0;
      impactSummary.sustainablePurchases += order.items.length;
    });

    // Calculate trees equivalent (approx 21kg CO2 per tree per year)
    impactSummary.treesEquivalent = (impactSummary.totalCarbonReduced / 21).toFixed(1);

    res.json({
      success: true,
      impact: impactSummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sustainability impact',
      error: error.message
    });
  }
};

// @desc    Get sustainability leaderboard
// @route   GET /api/sustainability/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Order.aggregate([
      {
        $match: { status: 'delivered' }
      },
      {
        $group: {
          _id: '$user',
          totalCarbonReduced: { $sum: '$sustainabilityImpact.totalCarbonFootprint' },
          totalOrders: { $sum: 1 },
          totalItems: { $sum: { $size: '$items' } }
        }
      },
      { 
        $sort: { totalCarbonReduced: -1 } 
      },
      { 
        $limit: 10 
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          userId: '$_id',
          totalCarbonReduced: 1,
          totalOrders: 1,
          totalItems: 1,
          user: { $arrayElemAt: ['$user', 0] }
        }
      }
    ]);

    res.json({
      success: true,
      leaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
};

// @desc    Get overall platform sustainability stats
// @route   GET /api/sustainability/stats
// @access  Public
export const getPlatformStats = async (req, res) => {
  try {
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      carbonStats,
      productStats
    ] = await Promise.all([
      Order.countDocuments({ status: 'delivered' }),
      User.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true }),
      Order.aggregate([
        {
          $match: { status: 'delivered' }
        },
        {
          $group: {
            _id: null,
            totalCarbon: { $sum: '$sustainabilityImpact.totalCarbonFootprint' },
            totalWater: { $sum: '$sustainabilityImpact.totalWaterSaved' },
            totalEnergy: { $sum: '$sustainabilityImpact.totalEnergySaved' }
          }
        }
      ]),
      Product.aggregate([
        {
          $match: { isActive: true }
        },
        {
          $group: {
            _id: null,
            avgPackagingScore: { $avg: '$sustainabilityMetrics.packagingScore' },
            organicCount: { $sum: { $cond: ['$sustainabilityMetrics.isOrganic', 1, 0] } },
            recycledCount: { $sum: { $cond: ['$sustainabilityMetrics.isRecycled', 1, 0] } },
            fairTradeCount: { $sum: { $cond: ['$sustainabilityMetrics.isFairTrade', 1, 0] } }
          }
        }
      ])
    ]);

    const stats = {
      totalOrders,
      totalUsers,
      totalProducts,
      totalCarbonReduced: carbonStats[0]?.totalCarbon || 0,
      totalWaterSaved: carbonStats[0]?.totalWater || 0,
      totalEnergySaved: carbonStats[0]?.totalEnergy || 0,
      avgPackagingScore: productStats[0]?.avgPackagingScore?.toFixed(1) || 0,
      organicProducts: productStats[0]?.organicCount || 0,
      recycledProducts: productStats[0]?.recycledCount || 0,
      fairTradeProducts: productStats[0]?.fairTradeCount || 0
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching platform stats',
      error: error.message
    });
  }
};

// @desc    Get sustainable product recommendations
// @route   GET /api/sustainability/recommendations
// @access  Public
export const getRecommendations = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const recommendations = await Product.find({
      isActive: true,
      $or: [
        { 'sustainabilityMetrics.packagingScore': { $gte: 4 } },
        { 'sustainabilityMetrics.isOrganic': true },
        { 'sustainabilityMetrics.isRecycled': true },
        { 'sustainabilityMetrics.isFairTrade': true }
      ]
    })
    .sort({ 
      'sustainabilityMetrics.packagingScore': -1, 
      salesCount: -1 
    })
    .limit(parseInt(limit))
    .populate('category', 'name');

    res.json({
      success: true,
      count: recommendations.length,
      recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations',
      error: error.message
    });
  }
};