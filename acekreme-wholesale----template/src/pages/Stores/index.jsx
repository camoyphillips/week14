import React, { useEffect, useState } from 'react';
import { listStores, createStore, deleteStore } from '../../api/storesApi';

export default function Stores() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:'', address:'', city:'', province:'', postalCode:'', contactPhone:'', managerName:'', openingHours:'9 AM - 5 PM' });
  const [alert, setAlert] = useState(null);

  const load = async () => {
    try { setItems(await listStores()); } catch { setAlert({ type:'error', msg:'Failed to load stores.' }); }
  };
  useEffect(()=>{ load(); },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await createStore(form); setAlert({ type:'success', msg:'Store added.' }); setForm({ ...form, name:'', address:'', city:'', province:'', postalCode:'', contactPhone:'', managerName:'' }); load(); }
    catch { setAlert({ type:'error', msg:'Add failed.' }); }
  };

  const onDelete = async(id) => {
    if(!confirm('Delete this store?')) return;
    try { await deleteStore(id); setAlert({ type:'success', msg:'Store deleted.' }); load(); }
    catch { setAlert({ type:'error', msg:'Delete failed.' }); }
  };

  return (
    <>
      <div className="card">
        <h2>Add Store</h2>
        {alert && <div className={`alert ${alert.type}`}>{alert.msg}</div>}
        <form onSubmit={onSubmit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
          <input placeholder="Address" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} required />
          <input placeholder="City" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} required />
          <input placeholder="Province" value={form.province} onChange={e=>setForm(f=>({...f,province:e.target.value}))} required />
          <input placeholder="Postal Code" value={form.postalCode} onChange={e=>setForm(f=>({...f,postalCode:e.target.value}))} required />
          <input placeholder="Phone" value={form.contactPhone} onChange={e=>setForm(f=>({...f,contactPhone:e.target.value}))} />
          <input placeholder="Manager" value={form.managerName} onChange={e=>setForm(f=>({...f,managerName:e.target.value}))} />
          <input placeholder="Hours" value={form.openingHours} onChange={e=>setForm(f=>({...f,openingHours:e.target.value}))} />
          <button type="submit">Save</button>
        </form>
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <h2>Stores</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Address</th><th>Phone</th><th>Manager</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map(s=>(
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.address}, {s.city}</td>
                <td>{s.contactPhone||'-'}</td>
                <td>{s.managerName||'-'}</td>
                <td><button className="btn danger" onClick={()=>onDelete(s._id)}>Delete</button></td>
              </tr>
            ))}
            {items.length===0 && <tr><td colSpan="5">No stores found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
