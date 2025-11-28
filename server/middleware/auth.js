import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Token is valid but user no longer exists.' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        message: 'Account has been deactivated.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Invalid token.',
      error: error.message 
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: 'Access denied. Admin role required.' 
    });
  }
};

const vendor = (req, res, next) => {
  if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ 
      message: 'Access denied. Vendor or admin role required.' 
    });
  }
};

export { auth, admin, vendor };