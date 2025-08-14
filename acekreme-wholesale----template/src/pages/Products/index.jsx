import React, { useEffect, useState } from 'react';
import { listProducts, createProduct, deleteProduct } from '../../api/productsApi';

export default function Products() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: ''
  });
  const [alert, setAlert] = useState(null);

  const load = async () => {
    try {
      const data = await listProducts();
      setItems(data);
    } catch (e) {
      setAlert({ type: 'error', msg: 'Failed to load products.' });
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      setAlert({ type: 'success', msg: 'Product added!' });
      setForm({ name:'', category:'', price:'', stock:'', description:'', imageUrl:'' });
      load();
    } catch {
      setAlert({ type: 'error', msg: 'Add failed.' });
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setAlert({ type: 'success', msg: 'Product deleted.' });
      load();
    } catch {
      setAlert({ type: 'error', msg: 'Delete failed.' });
    }
  };

  return (
    <>
      <div className="card">
        <h2>Add Product</h2>
        {alert && <div className={`alert ${alert.type}`}>{alert.msg}</div>}
        <form onSubmit={onSubmit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
          <input placeholder="Category" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} required />
          <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} required />
          <input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))} required />
          <input placeholder="Image URL (optional)" value={form.imageUrl} onChange={e=>setForm(f=>({...f,imageUrl:e.target.value}))} />
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          <button type="submit">Save</button>
        </form>
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <h2>Products</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Image</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${Number(p.price||0).toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>{p.imageUrl ? <img src={p.imageUrl} alt={p.name} style={{height:40}}/> : '-'}</td>
                <td>
                  <button className="btn danger" onClick={() => onDelete(p._id)}>Delete</button>
                  {/* You can add an edit modal/page later reusing updateProduct */}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan="6">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
