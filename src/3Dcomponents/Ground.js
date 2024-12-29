import React from "react";

const Ground = () => {
  return (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[14, 32]} />
      {/* 반지름 14, 세그먼트 32로 원형 지형 생성 */}
      <meshBasicMaterial color="gray" />
    </mesh>
  );
};

export default Ground;
