import Customer from '../models/customerModel.js'; 

// GET - List all customers (for admin page)
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.render('customer-list', { customers, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching customers:', error);
    req.flash('error', 'Error fetching customers.');
    res.redirect('/admin/customers');
  }
};

// GET - Show form to add new customer
export const getAddCustomerForm = (req, res) => {
  res.render('customer-add', { success_msg: req.flash('success'), error_msg: req.flash('error') });
};

// POST - Add new customer to DB
export const addCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    req.flash('success', 'Customer added successfully!');
    res.redirect('/admin/customers');
  } catch (error) {
    console.error('Error adding customer:', error);
    req.flash('error', `Error adding customer: ${error.message}`);
    res.redirect('/admin/customers/add');
  }
};

// GET - Show edit form for a specific customer
export const getEditCustomerForm = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      req.flash('error', 'Customer not found!');
      return res.redirect('/admin/customers');
    }
    res.render('customer-edit', { customer, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching customer for edit:', error);
    req.flash('error', 'Error fetching customer for edit.');
    res.redirect('/admin/customers');
  }
};

// POST - Update a specific customer in DB
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    req.flash('success', 'Customer updated successfully!');
    res.redirect('/admin/customers');
  } catch (error) {
    console.error('Error updating customer:', error);
    req.flash('error', `Error updating customer: ${error.message}`);
    res.redirect(`/admin/customers/edit/${req.params.id}`);
  }
};

// GET - Show delete confirmation page for a customer
export const getDeleteCustomerConfirmation = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      req.flash('error', 'Customer not found for deletion!');
      return res.redirect('/admin/customers');
    }
    res.render('customer-delete', { customer, success_msg: req.flash('success'), error_msg: req.flash('error') });
  } catch (error) {
    console.error('Error fetching customer for deletion confirmation:', error);
    req.flash('error', 'Error fetching customer for deletion confirmation.');
    res.redirect('/admin/customers');
  }
};

// POST - Handle actual customer deletion
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    req.flash('success', 'Customer deleted successfully!');
    res.redirect('/admin/customers');
  } catch (error) {
    console.error('Error deleting customer:', error);
    req.flash('error', 'Error deleting customer.');
    res.redirect(`/admin/customers/delete/${req.params.id}`);
  }
};

// API Endpoint - Get all customers as JSON
export const getCustomersApi = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers for API:', error);
    res.status(500).json({ message: 'Error fetching customers.' });
  }
};