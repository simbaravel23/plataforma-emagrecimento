import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Aula from './pages/Aula';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Payment from './pages/Payment';
import Dicas from './pages/Dicas';
import Aulas from './pages/Aulas';
import politicaPrivacidade from './pages/politica-de-privacidade';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate replace to="/auth?mode=login" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/politica-de-privacidade" element={<politicaPrivacidade />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/aula/:id" element={<Aula />} />
        <Route path="/dicas" element={<Dicas />} />
        <Route path="/aulas" element={<Aulas />} />
        <Route path="/politica-de-privacidade" element={<politicaPrivacidade />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
