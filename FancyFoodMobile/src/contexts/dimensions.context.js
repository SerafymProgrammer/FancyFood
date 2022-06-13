import React, {useState} from 'react';
import {Dimensions} from 'react-native';

export const DimensionsContext = React.createContext();

const DimensionsContextProvider = props => {
  const {width, height} = Dimensions.get('window');
  return (
    <DimensionsContext.Provider
      value={{
        width,
        height,
      }}>
      {props.children}
    </DimensionsContext.Provider>
  );
};

export default DimensionsContextProvider;
