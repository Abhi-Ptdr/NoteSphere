import React from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useEffect } from 'react';

const About = () => {
  //Using useContext Hook
  const a = useContext(NoteContext);

  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);     {/* I only want to run it one time so empty array [] */}
  
  return (
    <div>
      This is about {a.state.name} and he is in class {a.state.class} {/* name and update fxn are in state class */}
    </div>
  )
}

export default About