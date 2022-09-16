import React from 'react';
import './App.css';
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import Cube from './Cube';
import Tetrahedron from './Tetrahedron';

function App() {
  return (
    
    <div className="App">
      

      <header className="App-header">
        <p>
          Tetrahedr
        </p>
        <Canvas className='Three-canvas'>
          <OrbitControls />
          <ambientLight intensity={0.5}/>
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
        
          <Cube position={[2,0,0]}/>
          <Tetrahedron position={[1,0,0]}/>
        </Canvas>
        <p>Left and Right Click to Rotate</p>
      </header>
    </div>
  );
}

export default App;
