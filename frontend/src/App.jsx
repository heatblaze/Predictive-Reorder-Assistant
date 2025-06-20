import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InventoryList from './pages/InventoryList';
import InventoryDetails from './pages/InventoryDetails';
import AddItem from './pages/AddItem';
import ReorderRequests from './pages/ReorderRequests';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <>
      <nav className="top-nav">
        <h1 className="logo">📦 Predictive Reorder Assistant</h1>
        <div className="nav-links">
          <NavLink to="/" end className="nav-link">Dashboard</NavLink>
          <NavLink to="/inventory" className="nav-link">Inventory</NavLink>
          <NavLink to="/add" className="nav-link">Add Item</NavLink>
          <NavLink to="/reorders" className="nav-link">Reorders</NavLink>
          <NavLink to="/alerts" className="nav-link">Alerts</NavLink>
          <NavLink to="/reports" className="nav-link">Reports</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
        </div>
      </nav>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/:id" element={<InventoryDetails />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/reorders" element={<ReorderRequests />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
