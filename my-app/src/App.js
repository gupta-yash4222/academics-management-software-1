import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddNotes from './pages/AddNotes';
import Blogs from './pages/Blogs';
import Signup from './pages/Signup'
import Login from './pages/Login';
import CoursePlannerPage from './pages/CoursePlanner'
import MyNavbar from './components/MyNavbar';
import FeedbackForm from './components/Feedback-form';
import BrowseNotes from './components/BrowseNotes';
import BrowseReview from './components/BrowseReview';
import Container from 'react-bootstrap/Container';
import ReviewDetail from './components/ReviewDetail';
import EventCalendar from './components/EventCalendar';

function tokenExists() {
	const token_str = sessionStorage.getItem('token');
	const token = JSON.parse(token_str);
	return token ? true: false;
} 

function App() {
	const logged = tokenExists();

	// if (!logged) {
  //   return (
	// 		<Router>
	// 			<MyNavbar logged={false}></MyNavbar>
	// 			<Routes>
	// 				<Route path='/login' element={<Login />} />
	// 				<Route path='/signup' element={<Signup />} />
	// 			</Routes>
	// 		</Router>
	// 	)
  // }
  console.log(sessionStorage.getItem("profileId"));
  return (
    <div className="App">
      <Container fluid>
        <Router>
          <MyNavbar logged={true}></MyNavbar>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/notes/create' element={<AddNotes />} />
            <Route path='/notes/browse' element={<BrowseNotes />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/feedback/create' element={<FeedbackForm />} />
            <Route path='/feedback/browse' element={<BrowseReview />} />
            <Route path='/feedback/browse/detailedReview' exact element={<ReviewDetail />} />
            <Route path='/calendar/events' element={<EventCalendar />} />
						<Route path='/planner' element={<CoursePlannerPage />} />
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
