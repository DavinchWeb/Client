import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Card = React.forwardRef(({ cardName, position, rotation }, ref) => {
  const texture = useLoader(
    TextureLoader,
    require(`../assets/cards/${cardName}.png`)
  );

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={() => {
        console.log({ cardName });
      }}
    >
      <planeGeometry args={[2, 3]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
});

export default Card;
