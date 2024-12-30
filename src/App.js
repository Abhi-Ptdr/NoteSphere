import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <>
    <NoteState>   {/*State varible are now available in all the components and sub-components inside this <NoteState> tag*/}
      <Router>
        <Navbar/>
        <Alert message="React Is Amezing"/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About/>} /> {/* for eg. we can use that state in this About compo go to about compo to see how*/ }
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
