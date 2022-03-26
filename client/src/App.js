import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Blogs from './pages/Blogs';
import Signup from './pages/Signup'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import StarRating from './components/Start-rating';
import FeedbackForm from './components/Feedback-form';

function App() {
  return (
    <div className="App" style = {{height:"100vh"}}>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' exact element={ <Home /> } />
          <Route path='/notes' element={ <Notes /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/feedback' element={ <FeedbackForm /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
