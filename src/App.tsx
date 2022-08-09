import React from 'react';
import './App.css';
import Canvas from './Canvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Tetrahedr
        </p>
        <Canvas value={50}/>
        <p>After the Canvas</p>
      </header>
    </div>
  );
}

export default App;
