import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
    <NoteState>   {/*State varible are now available in all the components and sub-components inside this <NoteState> tag*/}
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About/>} /> {/* for eg. we can use that state in this About compo go to about compo to see how*/ }
          </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
