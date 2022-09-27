import React from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import Cube from "./Cube";
import Tetrahedron from "./Tetrahedron";
import Facet from "./Facet";
import Triangle from "./Triangle";
import IrregularTetrahedron from "./irregularTetrahedron";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Tetrahedr</p>
        <Canvas className="Three-canvas">
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <Cube position={[0, 0, 0]} />
          {/* <Triangle
            vertices={[1, 1, 1, 1, -1, 1, 1, 0, 0]}
            position={[0, 0, 0]}
          /> */}
          <IrregularTetrahedron position={[0,0,0]} scale={0.5}/>
          {/* <Facet position={[0,0,0]} /> */}
        </Canvas>
        <p>Left and Right Click to Rotate</p>
      </header>
    </div>
  );
}

export default App;
