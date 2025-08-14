// 1. Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// 2. Import core modules
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import cors from 'cors'; 

// 3. Import route handlers
import productRoutes from './routes/productRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// 4. Helper for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 5. Initialize Express app
const app = express();

// 6. Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Error:', err);
    process.exit(1);
  });

// 7. Middleware Setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Multiple allowed origins (Dev + Prod)
const allowedOrigins = [
  'http://localhost:5173',
  'https://localhost:5173',
  'https://acekreme.com' 
];

// CORS config
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SESSION_SECRET || 'a_strong_default_secret_for_dev_only',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  res.locals.currentPage = req.path;
  next();
});

// 8. Routes
app.get('/', (req, res) => res.redirect('/admin'));

app.get('/admin', (req, res) => {
  res.render('dashboard', { title: 'Admin Dashboard - AceKreme' });
});

app.use('/admin/products', productRoutes);
app.use('/admin/stores', storeRoutes);
app.use('/admin/customers', customerRoutes);
app.use('/admin/orders', orderRoutes);

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout Error:', err);
      req.flash('error', 'Logout failed.');
      return res.redirect('/admin');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// 9. 404 Handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found - AceKreme',
    message: 'The page you are looking for does not exist.'
  });
});

// 10. Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).render('error', {
    title: `Error ${statusCode} - AceKreme`,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// 11. Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`Products API:   http://localhost:${PORT}/admin/products/api`);
  console.log(`Stores API:     http://localhost:${PORT}/admin/stores/api`);
  console.log(`Customers API:  http://localhost:${PORT}/admin/customers/api`);
  console.log(`Orders API:     http://localhost:${PORT}/admin/orders/api`);
});
