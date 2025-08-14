import express from 'express';
import {
  listOrders,
  showAddOrderForm,
  addOrder,
  showEditOrderForm,
  updateOrder,
  deleteOrder,
  getOrdersJson
} from '../controllers/orderController.js';

const router = express.Router();

// Admin page: List all orders
router.get('/', listOrders);

// Admin page: Show form to add new order
router.get('/add', showAddOrderForm);

// Admin page: Submit new order
router.post('/add', addOrder);

// Admin page: Show form to edit order
router.get('/edit/:id', showEditOrderForm);

// Admin page: Submit order edit
router.put('/edit/:id', updateOrder);

// Admin page: Delete order
router.get('/delete/:id', deleteOrder);

// API endpoint: Return all orders as JSON
router.get('/api', getOrdersJson);

export default router;