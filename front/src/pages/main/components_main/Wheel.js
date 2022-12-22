import React from "react";
import { Wheel_Contents_Wrap } from "../styledCom";

// web 화면 크기 가져옴
let w = window.innerWidth;
let h = window.innerHeight;
let angle = 0;

// div 원형 배치
function create(_angle) {
  const BASE_X = w / 0.3;
  const BASE_Y = h / 2.3;
  const radian = (angle) => (angle * Math.PI) / 100;
  const SIZE_RADIUS = 300;
  const x = Math.cos(radian(_angle)) * SIZE_RADIUS + BASE_X;
  const y = Math.sin(radian(_angle)) * SIZE_RADIUS + BASE_Y;
}

const Wheel = () => {
  let div_num = [0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < div_num.length; i++) {
    create(angle + (360 / div_num.length) * i);
  }

  return (
    <div>
      <div>
        {div_num.map((val, index) => {
          <Wheel_Contents_Wrap />;
        })}
      </div>
    </div>
  );
};

export default Wheel;
