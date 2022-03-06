import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Signup from './pages/Signup'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' exact element={ <Home /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/blogs' element={ <Blogs /> } />
          <Route path='/sign-up' element={ <Signup /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
