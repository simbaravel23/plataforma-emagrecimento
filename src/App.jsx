import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Aula from './pages/Aula';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Payment from './pages/Payment';
import Dicas from './pages/Dicas';
import Aulas from './pages/Aulas';
import PoliticaPrivacidade from './pages/Politica-de-privacidade'; 
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate replace to="/auth?mode=login" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={<Payment />} />
        
        {/* 👇 Rota com componente em maiúsculo */}
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
        
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;