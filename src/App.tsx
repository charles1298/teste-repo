import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import PantryPage from './pages/PantryPage';
import ListPage from './pages/ListPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/map" element={<div style={{ padding: '120px 40px 80px', textAlign: 'center' }}><h2 style={{ fontFamily: 'var(--serif)', fontSize: 32 }}>Mapa de Ofertas</h2><p style={{ color: 'var(--text-sub)', marginTop: 12 }}>Em breve...</p></div>} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/cart" element={<div style={{ padding: '120px 40px 80px', textAlign: 'center' }}><h2 style={{ fontFamily: 'var(--serif)', fontSize: 32 }}>Carrinho</h2><p style={{ color: 'var(--text-sub)', marginTop: 12 }}>Em breve...</p></div>} />
        <Route path="/recipes" element={<PantryPage />} />
        <Route path="/profile" element={<div style={{ padding: '120px 40px 80px', textAlign: 'center' }}><h2 style={{ fontFamily: 'var(--serif)', fontSize: 32 }}>Meu Perfil</h2><p style={{ color: 'var(--text-sub)', marginTop: 12 }}>Em breve...</p></div>} />
      </Route>
    </Routes>
  );
}
