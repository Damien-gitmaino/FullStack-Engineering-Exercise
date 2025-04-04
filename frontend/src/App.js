/**
 * Main Application Component
 * Handles routing configuration for the entire application using React Router
 */
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from './pages/Onboarding';
import Admin from './pages/Admin';
import DataTable from './pages/DataTable';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import Nav from './pages/Nav';

function App() {
  return <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Onboarding />} />
      
      {/* Protected Routes */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/data" element={<DataTable />} />
      <Route path="/nav" element={<Nav />} />
      
      {/* Error Handling Routes */}
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
}

export default App;
