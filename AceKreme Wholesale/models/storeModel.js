import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  province: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  contactPhone: { type: String, trim: true },
  managerName: { type: String, trim: true },
  openingHours: { type: String, trim: true, default: '9 AM - 5 PM' }
}, { timestamps: true });

export default mongoose.model('Store', storeSchema);