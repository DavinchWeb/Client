import React from "react";
import { useLoader } from "@react-three/fiber";
import { Euler, TextureLoader } from "three";

const Card = React.forwardRef(
  (
    {
      cardvalue,
      cardcolor,
      position,
      rotation = [0, 0, 0],
      state,
      onClick,
      cardview,
      arg = [2, 3],
    },
    ref
  ) => {
    const texture = useLoader(
      TextureLoader,
      require(`../assets/cards/${
        cardcolor == "black" ? "B" : "W"
      }_${cardvalue}.png`)
    );
    const Frotation = new Euler(rotation[0], rotation[1], rotation[2], "YXZ");
    return (
      <mesh
        ref={ref}
        position={position}
        rotation={Frotation}
        onClick={onClick}
      >
        <planeGeometry args={arg} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    );
  }
);

export default Card;
