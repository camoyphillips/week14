import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // References the Customer model
    required: true
  },
  products: [ // Array of products in the order
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // References the Product model
        required: true
      },
      quantity: { type: Number, required: true, min: 1 },
      priceAtOrder: { type: Number, required: true, min: 0 }
    }
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: { type: String, trim: true },
  trackingNumber: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);