import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FacetStructure } from "./facetStructure";
import { ToolModeSelector } from "./ToolModeSelector";
import { PaletteSelector } from "./PaletteSelector";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Tetrahedr</p>
        <Canvas className="Three-canvas" camera={{ position: [0.1, 0.1, 5.1] }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <FacetStructure />
        </Canvas>
        <PaletteSelector />
        <ToolModeSelector />
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
