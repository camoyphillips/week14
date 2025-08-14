import Store from '../models/storeModel.js'; 

// GET - List all store locations (for admin page)
export const getStores = async (req, res) => {
  try {
    const stores = await Store.find({}).sort({ createdAt: -1 });
    res.render('store-list', { stores, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching stores:', error);
    req.flash('error', 'Error fetching stores.');
    res.redirect('/admin/stores');
  }
};

// GET - Show form to add new store
export const getAddStoreForm = (req, res) => {
  res.render('store-add', { success_msg: req.flash('success'), error_msg: req.flash('error') });
};

// POST - Add new store to DB
export const addStore = async (req, res) => {
  try {
    const newStore = new Store(req.body);
    await newStore.save();
    req.flash('success', 'Store added successfully!');
    res.redirect('/admin/stores');
  } catch (error) {
    console.error('Error adding store:', error);
    req.flash('error', `Error adding store: ${error.message}`);
    res.redirect('/admin/stores/add');
  }
};

// GET - Show edit form for a specific store
export const getEditStoreForm = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      req.flash('error', 'Store not found!');
      return res.redirect('/admin/stores');
    }
    res.render('store-edit', { store, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching store for edit:', error);
    req.flash('error', 'Error fetching store for edit.');
    res.redirect('/admin/stores');
  }
};

// POST - Update a specific store in DB
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    await Store.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    req.flash('success', 'Store updated successfully!');
    res.redirect('/admin/stores');
  } catch (error) {
    console.error('Error updating store:', error);
    req.flash('error', `Error updating store: ${error.message}`);
    res.redirect(`/admin/stores/edit/${req.params.id}`);
  }
};

// GET - Show delete confirmation page for a store
export const getDeleteStoreConfirmation = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      req.flash('error', 'Store not found for deletion!');
      return res.redirect('/admin/stores');
    }
    res.render('store-delete', { store, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching store for deletion confirmation:', error);
    req.flash('error', 'Error fetching store for deletion confirmation.');
    res.redirect('/admin/stores');
  }
};

// POST - Handle actual store deletion
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    await Store.findByIdAndDelete(id);
    req.flash('success', 'Store deleted successfully!');
    res.redirect('/admin/stores');
  } catch (error) {
    console.error('Error deleting store:', error);
    req.flash('error', 'Error deleting store.');
    res.redirect(`/admin/stores/delete/${req.params.id}`);
  }
};

// API Endpoint - Get all stores as JSON
export const getStoresApi = async (req, res) => {
  try {
    const stores = await Store.find({});
    res.json(stores);
  } catch (error) {
    console.error('Error fetching stores for API:', error);
    res.status(500).json({ message: 'Error fetching stores.' });
  }
};