import express from 'express';
const router = express.Router();
import * as storeController from '../controllers/storeController.js';
// import * as authMiddleware from '../middleware/authMiddleware.js';

// Admin Routes (rendered with Pug)
// router.use(authMiddleware.protectAdmin);

router.get('/', storeController.getStores);
router.get('/add', storeController.getAddStoreForm);
router.post('/add', storeController.addStore);
router.get('/edit/:id', storeController.getEditStoreForm);
router.post('/edit/:id', storeController.updateStore);
router.get('/delete/:id', storeController.getDeleteStoreConfirmation);
router.post('/delete/:id', storeController.deleteStore);

// API Endpoint (returns JSON)
router.get('/api', storeController.getStoresApi);

export default router;