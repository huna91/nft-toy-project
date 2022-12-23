import styled from "styled-components";

const Minting_Wrap = styled.div`
  width: calc(100% - 100px);
  height: 100%;
  margin-top: 50px;
  padding-left: 150px;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Minting_Image_Wrap = styled.div`
  width: calc(100% - 150px);
  height: 500px;
  /* border: 1px solid pink; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Minting_Button = styled.div`
  font-size: 50px;
`;

const Cube_Wrap = styled.div`
  position: relative;
  top: -100px;
  width: 220px;
  height: 220px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg);
  animation: animate 10s linear infinite;
  @keyframes animate {
    0% {
      transform: rotateX(-30deg) rotateY(0deg);
    }
    100% {
      transform: rotateX(-30deg) rotateY(360deg);
    }
  } ;
`;

const Cube_Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const Cube_Box_Top = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  background: #151515;
  transform: rotateX(90deg) translateZ(100px);
`;

const Cube_Shadow = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 250px;
  height: 250px;
  background: #40ffff;
  transform: rotateX(90deg) translateZ(-150px);
  :hover {
    transform: scale(1.5);
  }
  filter: blur(20px);
  box-shadow: 0 0 120px rgba(64, 255, 255, 0.2),
    0 0 200px rgba(64, 255, 255, 0.4), 0 0 300px rgba(64, 255, 255, 0.6),
    0 0 400px rgba(64, 255, 255, 0.8), 0 0 500px rgba(64, 255, 255, 1);
`;

const Cube_Box_Mesh = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  background: linear-gradient(#151515, #40ffff);
  transform: rotateY(calc(90deg * ${(props) => props.ii})) translateZ(109px);
`;

export {
  Minting_Wrap,
  Minting_Image_Wrap,
  Cube_Wrap,
  Cube_Box,
  Cube_Box_Top,
  Cube_Shadow,
  Cube_Box_Mesh,
  Minting_Button,
};
