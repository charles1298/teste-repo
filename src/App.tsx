import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Cards from './pages/Cards';
import MyDeck from './pages/MyDeck';
import Characters from './pages/Characters';
import News from './pages/News';

import Timeline from './pages/Timeline';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cards" element={<Cards />} />
          <Route path="deck" element={<MyDeck />} />
          <Route path="characters" element={<Characters />} />
          <Route path="news" element={<News />} />
          <Route path="timeline" element={<Timeline />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
