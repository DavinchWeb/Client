import { Html } from "@react-three/drei";
import axios from "axios";
import React, { useState } from "react";

const DoorDie = ({ RN, reset }) => {
  return (
    <Html position={[-5, 0, 0]}>
      <div className="DorDie_box">
        <div
          className="Keep_going DorDie"
          onClick={() => {
            const data = { roomNum: Number(RN), doOrDie: true };
            axios.post("/game/turn", data);
            reset();
          }}
        >
          <span>계속</span>
          <span>맞추기!</span>
        </div>
        <div
          className="pass_myturn DorDie"
          onClick={() => {
            const data = { roomNum: Number(RN), doOrDie: false };
            axios.post("/game/turn", data);
            reset();
          }}
        >
          <span>턴 넘기기!</span>
        </div>
      </div>
    </Html>
  );
};

export default DoorDie;
