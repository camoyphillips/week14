import React, { useEffect, useState } from 'react';
import { listCustomers, createCustomer, deleteCustomer } from '../../api/customersApi';

export default function Customers() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', company:'', address:'', city:'', province:'', postalCode:'' });
  const [alert, setAlert] = useState(null);

  const load = async () => {
    try { setItems(await listCustomers()); } catch { setAlert({ type:'error', msg:'Failed to load customers.' }); }
  };
  useEffect(()=>{ load(); },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await createCustomer(form); setAlert({ type:'success', msg:'Customer added.' }); setForm({ firstName:'', lastName:'', email:'', phone:'', company:'', address:'', city:'', province:'', postalCode:'' }); load(); }
    catch { setAlert({ type:'error', msg:'Add failed.' }); }
  };

  const onDelete = async (id) => {
    if(!confirm('Delete this customer?')) return;
    try { await deleteCustomer(id); setAlert({ type:'success', msg:'Customer deleted.' }); load(); }
    catch { setAlert({ type:'error', msg:'Delete failed.' }); }
  };

  return (
    <>
      <div className="card">
        <h2>Add Customer</h2>
        {alert && <div className={`alert ${alert.type}`}>{alert.msg}</div>}
        <form onSubmit={onSubmit}>
          <input placeholder="First Name" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))} required />
          <input placeholder="Last Name" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))} required />
          <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
          <input placeholder="Phone" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
          <input placeholder="Company" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} />
          <input placeholder="Address" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} />
          <input placeholder="City" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} />
          <input placeholder="Province" value={form.province} onChange={e=>setForm(f=>({...f,province:e.target.value}))} />
          <input placeholder="Postal Code" value={form.postalCode} onChange={e=>setForm(f=>({...f,postalCode:e.target.value}))} />
          <button type="submit">Save</button>
        </form>
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <h2>Customers</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map(c=>(
              <tr key={c._id}>
                <td>{c.firstName} {c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.phone||'-'}</td>
                <td>{c.company||'-'}</td>
                <td><button className="btn danger" onClick={()=>onDelete(c._id)}>Delete</button></td>
              </tr>
            ))}
            {items.length===0 && <tr><td colSpan="5">No customers found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
