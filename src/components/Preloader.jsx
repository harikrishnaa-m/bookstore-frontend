import React from "react";

function Preloader() {
  return (
    <div className="flex justify-center item-center h-screen ">
      <img
        className="object-contain"
        src="https://loading.io/assets/mod/spinner/comets/lg.gif"
        alt=""
      />
    </div>
  );
}

export default Preloader;
