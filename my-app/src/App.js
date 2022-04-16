import React, { useState } from 'react'
import ReactDOM from 'react-dom'
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
import EventCalendar from './components/EventCalendar'
import Profile from './pages/Profile';
import Footer from './pages/Footer';
import useToken from './components/userToken';
import HomePrivate from './pages/HomePrivate';

function App() {

  const { token, setToken } = useToken();

  return (
    <div className="App">
      <Container fluid>
        <Router>
          <MyNavbar setToken={setToken}></MyNavbar>
          <Routes>
            <Route path='/' exact element={!token ? <Home setToken={setToken}/> : <HomePrivate />} />
            <Route path='/notes/create' element={<AddNotes />} />
            <Route path='/notes/browse' element={<BrowseNotes />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login setToken={setToken}/>} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/feedback/create' element={<FeedbackForm />} />
            <Route path='/feedback/browse' element={<BrowseReview />} />
            <Route path='/feedback/browse/detailedReview' exact element={<ReviewDetail />} />
            <Route path='/calendar/events' element={<EventCalendar />} />
            <Route path='random' element={<ReviewDetail />} />
            
          </Routes>
          {/* <Footer></Footer> */}
        </Router>

      </Container>
    </div>
  );
}

export default App;
