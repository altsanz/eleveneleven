import React from 'react';
import './App.css';
import NumberWrapper from './components/NumberWrapper';

function App() {
  return (
    <div className="App h-screen">
      <NumberWrapper number={11}/>
    </div>
  );
}

export default App;
