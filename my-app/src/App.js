import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import AddNotes from './pages/AddNotes';
import Blogs from './pages/Blogs';
import Signup from './pages/Signup'
import MyNavbar from './components/MyNavbar';
import Login from './pages/Login';
import FeedbackForm from './components/Feedback-form';
import BrowseNotes from './components/BrowseNotes';
import BrowseReview from './components/BrowseReview';
import Container from 'react-bootstrap/Container';
import ReviewDetail from './components/ReviewDetail';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Router>
          <MyNavbar></MyNavbar>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/notes/create' element={<AddNotes />} />
            <Route path='/notes/browse' element={<BrowseNotes />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/feedback/create' element={<FeedbackForm />} />
            <Route path='/feedback/browse' element={<BrowseReview />} />
            <Route path='/feedback/browse/detailedReview'  exact element={<ReviewDetail />} />
          </Routes>
        </Router>
      </Container>
      {/* <Router>
        <MyNavbar></MyNavbar>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/notes/create' element={<AddNotes />} />
          <Route path='/notes/browse' element={<BrowseNotes />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/feedback' element={<FeedbackForm />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
