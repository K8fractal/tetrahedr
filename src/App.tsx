import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
//import Facet from "./Facet";
import { FacetStructure } from "./facetStructure";
import { ToolModeContextProvider } from "./ToolModeContextProvider";
import { RadioSelect } from "./RadioSelect";
// import Cube from "./Cube";
// import Tetrahedron from "./Tetrahedron";
// import Triangle from "./Triangle";
// import { IrregularTetrahedron } from "./irregularTetrahedron";
// import { Vector3 } from "three";

function App() {
  // const SQRT1_2 = Math.SQRT1_2;
  return (
    <div className="App">
      <header className="App-header">
        <p>Tetrahedr</p>
        <ToolModeContextProvider>
          <Canvas
            className="Three-canvas"
            camera={{ position: [0.1, 0.1, 5.1] }}
          >
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            <FacetStructure />
          </Canvas>
          <div className="iconBar">
            <RadioSelect label="Add" iconSource="iconAdd.svg" group="mode" />
            <RadioSelect
              label="Remove"
              iconSource="iconRemove.svg"
              group="mode"
            />
          </div>

          <p>Click on a face to add to the structure.</p>
        </ToolModeContextProvider>
        <p className="footnote">
          <a href="https://github.com/K8fractal/tetrahedr">
            Code for Tetrahedr on github
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
