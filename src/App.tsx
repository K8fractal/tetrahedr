import React from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import Facet from "./Facet";
// import Cube from "./Cube";
// import Tetrahedron from "./Tetrahedron";
// import Triangle from "./Triangle";
// import { IrregularTetrahedron } from "./irregularTetrahedron";
// import { Vector3 } from "three";

function App() {
  const SQRT1_2 = Math.SQRT1_2;
  return (
    <div className="App">
      <header className="App-header">
        <p>Tetrahedr</p>
        <Canvas className="Three-canvas">
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          {/* <Cube position={[0, 0, 0]} scale={0.95} /> */}
          {/* <Triangle
            vertices={[1, 1, 1, 1, -1, 1, 1, 0, 0]}
            position={[0, 0, 0]}
          /> */}
          {/* <IrregularTetrahedron
            position={[0, 0, 0]}
            scale={0.5}
            quaternion={[0, SQRT1_2, SQRT1_2, 0]}
            color="black"
          /> */}
          {/* <IrregularTetrahedron
            position={[0, 0, 0]}
            scale={0.5}
            quaternion={[0.5, -0.5, -0.5, 0.5]}
            color="green"
            vertices={[
              new Vector3(1, 1, 1),
              new Vector3(0, 1, -1),
              new Vector3(1, -1, -1),
              new Vector3(-1, 1, -1),
            ]}
          /> */}
          <Facet position={[0, 0, 0]} />

          <Facet position={[0, 0, 0]} quaternion={[0, SQRT1_2, 0, -SQRT1_2]} />
        </Canvas>
        <p>Left and Right Click to Rotate</p>
      </header>
    </div>
  );
}

export default App;
