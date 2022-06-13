import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {global_theme} from './theme/global_theme';
import AuthRouter from './routers/auth.router';
import {useSelector} from 'react-redux';
import HomeRouter from './routers/home_app.router';
import DimensionsContextProvider from './contexts/dimensions.context';

const App = () => {
  const is_sign_in = useSelector(state => {
    console.log(state);
    return state.authReducer.is_sig_in;
  });
  return (
    <DimensionsContextProvider>
      <PaperProvider theme={global_theme}>
        {is_sign_in ? <HomeRouter /> : <AuthRouter />}
      </PaperProvider>
    </DimensionsContextProvider>
  );
};

export default App;
