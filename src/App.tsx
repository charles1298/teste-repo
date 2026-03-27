import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import EasterEgg from './components/EasterEgg';
import Dashboard from './pages/Dashboard';
import Cards from './pages/Cards';
import MyDeck from './pages/MyDeck';
import Characters from './pages/Characters';
import News from './pages/News';
import Timeline from './pages/Timeline';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cards" element={<Cards />} />
          <Route path="deck" element={<MyDeck />} />
          <Route path="characters" element={<Characters />} />
          <Route path="news" element={<News />} />
          <Route path="timeline" element={<Timeline />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <EasterEgg />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
