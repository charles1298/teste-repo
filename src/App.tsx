import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Cards from './pages/Cards';
import MyDeck from './pages/MyDeck';
import Characters from './pages/Characters';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cards" element={<Cards />} />
          <Route path="deck" element={<MyDeck />} />
          <Route path="characters" element={<Characters />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
