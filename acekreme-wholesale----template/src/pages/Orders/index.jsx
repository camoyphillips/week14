import React, { useEffect, useState } from 'react';
import { listOrders, createOrder, deleteOrder } from '../../api/ordersApi';
import { listCustomers } from '../../api/customersApi';

export default function Orders() {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer: '',
    products: '[]', // JSON string: [{ "product": "<id>", "quantity": 1, "priceAtOrder": 100 }]
    totalAmount: '',
    status: 'Pending',
    shippingAddress: '',
    trackingNumber: ''
  });
  const [alert, setAlert] = useState(null);

  const load = async () => {
    try {
      const [orders, custs] = await Promise.all([listOrders(), listCustomers()]);
      setItems(orders);
      setCustomers(custs);
    } catch {
      setAlert({ type:'error', msg:'Failed to load orders/customers.' });
    }
  };
  useEffect(()=>{ load(); },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(form);
      setAlert({ type:'success', msg:'Order created.' });
      setForm(f=>({ ...f, customer:'', products:'[]', totalAmount:'', status:'Pending', shippingAddress:'', trackingNumber:'' }));
      load();
    } catch {
      setAlert({ type:'error', msg:'Create failed. Ensure products is valid JSON.' });
    }
  };

  const onDelete = async (id) => {
    if(!confirm('Delete this order?')) return;
    try { await deleteOrder(id); setAlert({ type:'success', msg:'Order deleted.' }); load(); }
    catch { setAlert({ type:'error', msg:'Delete failed.' }); }
  };

  return (
    <>
      <div className="card">
        <h2>Create Order</h2>
        {alert && <div className={`alert ${alert.type}`}>{alert.msg}</div>}
        <form onSubmit={onSubmit}>
          <select value={form.customer} onChange={e=>setForm(f=>({...f,customer:e.target.value}))} required>
            <option value="">Select Customer</option>
            {customers.map(c=>(
              <option key={c._id} value={c._id}>{c.firstName} {c.lastName} ({c.email})</option>
            ))}
          </select>

          <textarea
            rows="5"
            value={form.products}
            onChange={e=>setForm(f=>({...f,products:e.target.value}))}
            placeholder='[{"product":"<productId>","quantity":1,"priceAtOrder":99.99}]'
            required
          />

          <input type="number" step="0.01" placeholder="Total Amount" value={form.totalAmount} onChange={e=>setForm(f=>({...f,totalAmount:e.target.value}))} required />

          <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <input placeholder="Shipping Address" value={form.shippingAddress} onChange={e=>setForm(f=>({...f,shippingAddress:e.target.value}))} />
          <input placeholder="Tracking Number" value={form.trackingNumber} onChange={e=>setForm(f=>({...f,trackingNumber:e.target.value}))} />
          <button type="submit">Save</button>
        </form>
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map(o=>(
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{o.customer ? `${o.customer.firstName} ${o.customer.lastName}` : '-'}</td>
                <td>{o.orderDate ? new Date(o.orderDate).toLocaleDateString() : '-'}</td>
                <td>${Number(o.totalAmount||0).toFixed(2)}</td>
                <td>{o.status}</td>
                <td><button className="btn danger" onClick={()=>onDelete(o._id)}>Delete</button></td>
              </tr>
            ))}
            {items.length===0 && <tr><td colSpan="6">No orders found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
