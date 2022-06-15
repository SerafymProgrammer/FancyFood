import React, {useState} from 'react';

export const ImagesContext = React.createContext();

const ImagesContextProvider = props => {
  return (
    <ImagesContext.Provider
      value={{
        menu_interer: require('../assets/images/menu_interer.jpg'),
      }}>
      {props.children}
    </ImagesContext.Provider>
  );
};

export default ImagesContextProvider;
