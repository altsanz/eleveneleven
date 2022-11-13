import React from 'react';
import './App.css';
import NumberWrapper from './components/NumberWrapper';

function App() {

  

  
  const number = React.useMemo(() => Math.round(Math.random() * 99999), [])
  console.log(number);
  return (
    <div className="App h-screen">
      <NumberWrapper number={number}/>
    </div>
  );
}

export default App;
