import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Aula from './pages/Aula';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Payment from './pages/Payment';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate replace to="/auth?mode=login" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/aula/:id" element={<Aula />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
