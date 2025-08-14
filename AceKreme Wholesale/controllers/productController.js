import Product from '../models/productModel.js'; 

// GET - List all products (for admin page)
export const getProducts = async (req, res) => { 
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.render('product-list', { products, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching products:', error);
    req.flash('error', 'Error fetching products.');
    res.redirect('/admin/products');
  }
};

// GET - Show form to add new product
export const getAddProductForm = (req, res) => { 
  res.render('product-add', { success_msg: req.flash('success'), error_msg: req.flash('error') });
};

// POST - Add new product to DB
export const addProduct = async (req, res) => { 
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    req.flash('success', 'Product added successfully!');
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error adding product:', error);
    req.flash('error', `Error adding product: ${error.message}`);
    res.redirect('/admin/products/add');
  }
};

// GET - Show edit form for a specific product
export const getEditProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error', 'Product not found!');
      return res.redirect('/admin/products');
    }
    res.render('product-edit', { product, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching product for edit:', error);
    req.flash('error', 'Error fetching product for edit.');
    res.redirect('/admin/products');
  }
};

// POST - Update a specific product in DB
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    req.flash('success', 'Product updated successfully!');
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error updating product:', error);
    req.flash('error', `Error updating product: ${error.message}`);
    res.redirect(`/admin/products/edit/${req.params.id}`);
  }
};

// GET - Show delete confirmation page for a product
export const getDeleteProductConfirmation = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error', 'Product not found for deletion!');
      return res.redirect('/admin/products');
    }
    res.render('product-delete', { product, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching product for deletion confirmation:', error);
    req.flash('error', 'Error fetching product for deletion confirmation.');
    res.redirect('/admin/products');
  }
};

// POST - Handle actual product deletion
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Product deleted successfully!');
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    req.flash('error', 'Error deleting product.');
    res.redirect(`/admin/products/delete/${req.params.id}`);
  }
};

// API Endpoint - Get all products as JSON
export const getProductsApi = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products for API:', error);
    res.status(500).json({ message: 'Error fetching products.' });
  }
};