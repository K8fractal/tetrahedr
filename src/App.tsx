import React from 'react';
import './App.css';
import {Canvas, useFrame } from '@react-three/fiber'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Tetrahedr
        </p>
        <Canvas>
        <ambientLight />
        </Canvas>
        <p>After the Canvas</p>
      </header>
    </div>
  );
}

export default App;
