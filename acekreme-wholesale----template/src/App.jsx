import React from 'react';
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Stores from './pages/Stores';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>AceKreme Admin</h2>
        <nav>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/stores">Stores</NavLink>
          <NavLink to="/admin/customers">Customers</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
        </nav>
      </aside>

      <section>
        <header className="header">
          <h1>Wholesale Admin</h1>
          <a className="btn secondary" href="http://localhost:3000/logout">Logout</a>
        </header>

        <main className="main">
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/stores" element={<Stores />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Outlet />
        </main>

        <footer className="footer">© {new Date().getFullYear()} AceKreme Wholesale</footer>
      </section>
    </div>
  );
}