import React, { useState } from "react";

export const ImagesContext = React.createContext();



const ImagesContextProvider = (props) => {

  return (
    <ImagesContext.Provider value={{

    }}>
      {props.children}
    </ImagesContext.Provider>
  );
};

export default ImagesContext;
