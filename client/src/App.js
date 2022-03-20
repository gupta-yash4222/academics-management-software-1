import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Blogs from './pages/Blogs';
import Signup from './pages/Signup'
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <div className="App" style = {{height:"100vh"}}>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' exact element={ <Home /> } />
          <Route path='/notes' element={ <Notes /> } />
          <Route path='/blogs' element={ <Blogs /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
