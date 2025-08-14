import express from 'express';
const router = express.Router();
import * as productController from '../controllers/productController.js'; 
// import * as authMiddleware from '../middleware/authMiddleware.js'; 

// Admin Routes (rendered with Pug)
// router.use(authMiddleware.protectAdmin); 

router.get('/', productController.getProducts);
router.get('/add', productController.getAddProductForm);
router.post('/add', productController.addProduct);
router.get('/edit/:id', productController.getEditProductForm);
router.post('/edit/:id', productController.updateProduct);
router.get('/delete/:id', productController.getDeleteProductConfirmation);
router.post('/delete/:id', productController.deleteProduct);

// API Endpoint (returns JSON)
router.get('/api', productController.getProductsApi);

export default router;