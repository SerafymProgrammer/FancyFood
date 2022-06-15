import React, {useCallback} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {global_theme} from './theme/global_theme';
import AuthRouter from './routers/auth.router';
import {useDispatch, useSelector} from 'react-redux';
import HomeRouter from './routers/home_app.router';
import DimensionsContextProvider from './contexts/dimensions.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authActions} from './redux/auth/auth.actions';
import ImagesContextProvider from './contexts/images.context';

const App = () => {
  const dispatch = useDispatch();

  const changeSignInStatus = useCallback(
    status => dispatch(authActions.isSignIn(status)),
    [dispatch],
  );
  const is_sign_in = useSelector(state => {
    return state.authReducer.is_sig_in;
  });
  const checkLog = async () => {
    const log = await AsyncStorage.getItem('token');

    if (!log) {
    } else {
      changeSignInStatus(true);
    }
  };

  React.useEffect(() => {
    checkLog();
  }, []);
  return (
    <ImagesContextProvider>
      <DimensionsContextProvider>
        <PaperProvider theme={global_theme}>
          {is_sign_in ? <HomeRouter /> : <AuthRouter />}
        </PaperProvider>
      </DimensionsContextProvider>
    </ImagesContextProvider>
  );
};

export default App;
