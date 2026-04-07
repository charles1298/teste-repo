import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ListPage from './pages/ListPage';
import RecipesPage from './pages/RecipesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        {/* Catch-all: redirect any unknown route (e.g. /characters) to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
