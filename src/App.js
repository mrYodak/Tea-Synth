import React from 'react'
import Osc1 from './components/Osc1';
import Filter from './components/Filter';
import Keyboard from './components/Keyboard';
import ADSR from './components/ADSR';

import './App.scss';


function App() {
  


  return (
    <div className="App">
      <div className='Header'>
      <h1>Synth</h1> 
      <Keyboard/>
      </div>           
      <div className='Modules'>
      <Osc1 />
      <Filter/> 
      <ADSR/>    
      </div>
    </div>
  );
}

export default App;
