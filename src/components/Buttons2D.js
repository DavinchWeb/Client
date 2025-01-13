import { Html } from "@react-three/drei";
import axios from "axios";
import React, { useState } from "react";

const Buttons2D = ({ RN, cardUser, cardNum }) => {
  const numbers = Array.from({ length: 12 }, (_, i) => i);
  const [selectedbutton, setSelcetedButton] = useState();
  return (
    <Html position={[-3, 0, 0]} className="suspect_main_box">
      <div className="suspect_grid">
        <div
          className="gird_box"
          onClick={() => {
            setSelcetedButton(-2);
          }}
        >
          <img
            src={`/assets2/cards/${selectedbutton == -2 ? "W" : "B"}_-2.png`}
          ></img>
        </div>
        {numbers.map((number) => (
          <div
            className="gird_box"
            key={number}
            onClick={() => {
              setSelcetedButton(number);
            }}
          >
            <img
              src={`/assets2/cards/${
                selectedbutton == number ? "W" : "B"
              }_${number}.png`}
            ></img>
          </div>
        ))}
        <div
          className="gird_box suspect"
          onClick={() => {
            const data = {
              roomNum: Number(RN),
              cardUser: Number(cardUser),
              cardNum: Number(cardNum),
              cardValue: Number(selectedbutton),
            };
            axios.post("/game/suspect", data);
          }}
        >
          <span>추론!</span>
        </div>
      </div>
    </Html>
  );
};

export default Buttons2D;
