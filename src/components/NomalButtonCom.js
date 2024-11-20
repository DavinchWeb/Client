import React from "react";
const ButtonComponent = ({ onClick, title }) => {
  return (
    <button onClick={onClick} className="button">
      {title}
    </button>
  );
};

export default ButtonComponent;
