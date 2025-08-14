import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  province: { type: String, trim: true },
  postalCode: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);