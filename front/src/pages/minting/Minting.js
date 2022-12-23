import React, { Suspense, useState } from "react";
import {
  Minting_Wrap,
  Minting_Image_Wrap,
  Cube_Wrap,
  Cube_Box,
  Cube_Box_Top,
  Cube_Shadow,
  Cube_Box_Mesh,
  Minting_Button,
} from "./styledCom";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Result from "./components/Result";
import { useNavigate } from "react-router-dom";

const Pick = ({ color, speed, position }) => {
  const [hovered, setHovered] = useState(1.5);
  const [hcolor, setHcolor] = useState();

  return (
    <group
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHcolor("#FF4059");
        setHovered(2);
      }}
      onPointerLeave={(e) => {
        setHcolor(false);
        e.intersections.length === 0 && setHovered(1.5);
      }}
      onClick={popUp}
    >
      <mesh scale={(hovered, hovered, hovered)}>
        <Sphere visible args={[1, 200, 400]} position={position}>
          <MeshDistortMaterial
            color={hcolor || color}
            attach="material"
            distort={0.5}
            speed={speed}
            roughness={0.8}
          />
        </Sphere>
      </mesh>
    </group>
  );
};

function popUp() {
  console.log("클릭");
  return <Result />;
}

const Minting = () => {
  return (
    <Minting_Wrap>
      <div>
        <Minting_Button>GOGO!</Minting_Button>
      </div>
      <Minting_Image_Wrap>
        {/* <Canvas>
          <ambientLight intensity={0.3} />
          <pointLight intensity={0.75} position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <Pick color="#40FFFF" speed="1" position={[-3.5, 0, -0.3]} />
            <Pick color="#8C73FF" speed="3" position={[0, 0, 0]} />
            <Pick color="#BFFF00" speed="2" position={[3.5, 0, -0.3]} />
          </Suspense>
        </Canvas> */}
        <Cube_Wrap onPointerEnter={popUp}>
          <Cube_Box_Top></Cube_Box_Top>
          <Cube_Box>
            <Cube_Box_Mesh ii={0}></Cube_Box_Mesh>
            <Cube_Box_Mesh ii={1}></Cube_Box_Mesh>
            <Cube_Box_Mesh ii={2}></Cube_Box_Mesh>
            <Cube_Box_Mesh ii={3}></Cube_Box_Mesh>
          </Cube_Box>
          <Cube_Shadow></Cube_Shadow>
        </Cube_Wrap>
      </Minting_Image_Wrap>
    </Minting_Wrap>
  );
};

export default Minting;
