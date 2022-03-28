import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.scss';
// import 'bootstrap/dist/css/bootstrap.css';
// // Put any other imports below so that CSS from your
// // components takes precedence over default styles.
import App from './App';

document.body.style.height = "100vh";
document.body.style.minHeight = "100vh";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
