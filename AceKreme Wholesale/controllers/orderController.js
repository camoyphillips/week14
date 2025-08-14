import Order from '../models/orderModel.js';
import Customer from '../models/customerModel.js';
import Product from '../models/productModel.js';

// Helper to format date for input[type="date"]
function formatDateForInput(date) {
  return date ? new Date(date).toISOString().split('T')[0] : '';
}

// GET /admin/orders
export async function listOrders(req, res) {
  try {
    const orders = await Order.find().populate('customer').sort({ orderDate: -1 });
    res.render('order-list', { orders });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to fetch orders.');
    res.redirect('/admin');
  }
}

// GET /admin/orders/add
export async function showAddOrderForm(req, res) {
  try {
    const customers = await Customer.find().sort({ firstName: 1 });
    const products = await Product.find();
    res.render('order-add', { customers, products });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to load order form.');
    res.redirect('/admin/orders');
  }
}

// POST /admin/orders/add
export async function addOrder(req, res) {
  try {
    const {
      customer,
      orderDate,
      products,
      totalAmount,
      status,
      shippingAddress,
      trackingNumber
    } = req.body;

    const parsedProducts = JSON.parse(products);

    const newOrder = new Order({
      customer,
      orderDate,
      products: parsedProducts,
      totalAmount,
      status,
      shippingAddress,
      trackingNumber
    });

    await newOrder.save();
    req.flash('success', 'Order created successfully!');
    res.redirect('/admin/orders');
  } catch (err) {
    console.error('Error creating order:', err);
    req.flash('error', 'Failed to create order.');
    res.redirect('/admin/orders/add');
  }
}

// GET /admin/orders/edit/:id
export async function showEditOrderForm(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate('customer');
    const customers = await Customer.find().sort({ firstName: 1 });

    if (!order) {
      req.flash('error', 'Order not found.');
      return res.redirect('/admin/orders');
    }

    res.render('order-edit', {
      order,
      customers,
      formatDateForInput
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to load order edit form.');
    res.redirect('/admin/orders');
  }
}

// PUT /admin/orders/edit/:id
export async function updateOrder(req, res) {
  try {
    const {
      customer,
      orderDate,
      products,
      totalAmount,
      status,
      shippingAddress,
      trackingNumber
    } = req.body;

    const parsedProducts = JSON.parse(products);

    await Order.findByIdAndUpdate(req.params.id, {
      customer,
      orderDate,
      products: parsedProducts,
      totalAmount,
      status,
      shippingAddress,
      trackingNumber
    });

    req.flash('success', 'Order updated successfully!');
    res.redirect('/admin/orders');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to update order.');
    res.redirect(`/admin/orders/edit/${req.params.id}`);
  }
}

// GET /admin/orders/delete/:id
export async function deleteOrder(req, res) {
  try {
    await Order.findByIdAndDelete(req.params.id);
    req.flash('success', 'Order deleted.');
    res.redirect('/admin/orders');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to delete order.');
    res.redirect('/admin/orders');
  }
}

// GET /admin/orders/api
export async function getOrdersJson(req, res) {
  try {
    const orders = await Order.find().populate('customer');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}