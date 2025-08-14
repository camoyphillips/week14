import express from 'express';
const router = express.Router();
import * as customerController from '../controllers/customerController.js';

// Admin Routes (rendered with Pug)
// router.use(authMiddleware.protectAdmin);

router.get('/', customerController.getCustomers);
router.get('/add', customerController.getAddCustomerForm);
router.post('/add', customerController.addCustomer);
router.get('/edit/:id', customerController.getEditCustomerForm);
router.post('/edit/:id', customerController.updateCustomer);
router.get('/delete/:id', customerController.getDeleteCustomerConfirmation);
router.post('/delete/:id', customerController.deleteCustomer);

// API Endpoint (returns JSON)
router.get('/api', customerController.getCustomersApi);

export default router;