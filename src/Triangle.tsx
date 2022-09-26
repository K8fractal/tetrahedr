import { MeshProps } from "@react-three/fiber";

interface TriangleProps extends MeshProps {
  vertices: number[];
}

const Triangle = (props: TriangleProps) => {
  const vertices = new Float32Array(props.vertices);

  return (
    <mesh {...props}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={vertices}
          itemSize={3}
          count={3}
        />
      </bufferGeometry>
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};

export default Triangle;
