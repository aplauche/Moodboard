import React, { useEffect } from "react";
import Loader from "react-loader-spinner";

function Loading() {
  return (
    <Loader
      type="Puff"
      color="#b2c3ff"
      height={100}
      width={100}
      timeout={8000} //3 secs
    />
  );
}

export default Loading;
