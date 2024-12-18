import React from "react";
const ButtonComponent = ({ onClick, title, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
};

export default ButtonComponent;
