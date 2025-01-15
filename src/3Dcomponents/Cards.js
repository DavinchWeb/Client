import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Card = React.forwardRef(
  (
    { cardvalue, cardcolor, position, rotation, state, onClick, cardview },
    ref
  ) => {
    const texture = useLoader(
      TextureLoader,
      require(`../assets/cards/${
        cardcolor == "black" ? "B" : "W"
      }_${cardvalue}.png`)
    );

    return (
      <mesh ref={ref} position={position} rotation={rotation} onClick={onClick}>
        <planeGeometry args={[2, 3]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    );
  }
);

export default Card;
