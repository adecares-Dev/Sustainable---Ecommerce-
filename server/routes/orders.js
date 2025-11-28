import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  getOrders
} from '../controllers/orderController.js';
import { auth, admin } from '../middleware/auth.js';
import { validateOrder } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .post(auth, validateOrder, createOrder)
  .get(auth, admin, getOrders);

router.route('/myorders')
  .get(auth, getMyOrders);

router.route('/:id')
  .get(auth, getOrder);

router.route('/:id/status')
  .put(auth, admin, updateOrderStatus);

export default router;