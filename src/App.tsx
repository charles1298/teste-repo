import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import Analysis from './pages/Analysis';
import MapPage from './pages/MapPage';
import WeaponsRecipes from './pages/WeaponsRecipes';
import Inventory from './pages/Inventory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="items" element={<Items />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="map" element={<MapPage />} />
          <Route path="recipes" element={<WeaponsRecipes />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
