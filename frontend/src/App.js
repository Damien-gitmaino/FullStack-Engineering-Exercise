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
      {/* Main Home Page */}
      <Route path="/" element={<Onboarding />} />

      {/* Onboarding Steps */}
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Admin Panel */}
      <Route path="/admin" element={<Admin />} />

      {/* Data Table Page */}
      <Route path="/data" element={<DataTable />} />

      {/* Nav Page */}
      <Route path="/nav" element={<Nav />} />

      {/* Error page */}
      <Route path="/error" element={<Error />} />

      {/* Catch-All 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
}

export default App;
