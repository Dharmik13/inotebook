import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from "./context/notes/noteState"; import Alert from "./components/Alert";
;

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is Amazing react inotebook App." />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
            </Routes>
          </div>
        </Router >
      </NoteState>

    </>
  );
}

export default App;
