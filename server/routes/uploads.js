import express from 'express';
import upload from '../middleware/upload.js';
import { auth, vendor } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// @desc    Upload product images
// @route   POST /api/upload/products
// @access  Private (Vendor/Admin)
router.post('/products', auth, vendor, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadedImages = req.files.map(file => {
      if (file.path) {
        // Cloudinary upload
        return {
          url: file.path,
          alt: file.originalname,
          publicId: file.filename
        };
      } else {
        // Local upload
        return {
          url: `/uploads/products/${file.filename}`,
          alt: file.originalname,
          filename: file.filename
        };
      }
    });

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      images: uploadedImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading images',
      error: error.message
    });
  }
});

// @desc    Delete uploaded image
// @route   DELETE /api/upload/images/:id
// @access  Private (Vendor/Admin)
router.delete('/images/:id', auth, vendor, async (req, res) => {
  try {
    const { id } = req.params;

    if (process.env.CLOUDINARY_CLOUD_NAME) {
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(id);
    } else {
      // Delete local file logic would go here
      // You would need to implement file system deletion
    }

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
});

export default router;