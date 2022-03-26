import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Blogs from './pages/Blogs';
import Signup from './pages/Signup'
import MyNavbar from './components/MyNavbar';
import Login from './pages/Login';
import FeedbackForm from './components/Feedback-form';

function App() {
  return (
    <div className="App" style = {{height:"100vh"}}>
      <Router>
        <MyNavbar></MyNavbar>
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
