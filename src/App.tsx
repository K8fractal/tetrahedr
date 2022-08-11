import React from 'react';
import './App.css';
import {Canvas} from '@react-three/fiber'
import Cube from './Cube';

function App() {
  return (
    
    <div className="App">
      

      <header className="App-header">
        <p>
          Tetrahedr
        </p>
        <Canvas className='Three-canvas'>
          <ambientLight intensity={0.5}/>
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <Cube position={[-1,0,0]}/>
        </Canvas>
        <p>After the Canvas</p>
      </header>
    </div>
  );
}

export default App;
