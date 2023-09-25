// import React from 'react'

import { useNavigate } from "react-router-dom";

function BackButton() {
  const NavigateTo = useNavigate();

  const goBack = () => {
    NavigateTo("/browse", { replace: true });
  };

  return (
    <div>
      <button
        style={{
          fontSize: "18pt",
          color: "black",
          backgroundColor: "transparent",
        }}
        onClick={goBack}
      >
        ←
      </button>
    </div>
  );
}

export default BackButton;
