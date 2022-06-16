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
  const changeAuthData = useCallback(
    data => dispatch(authActions.setAuthData(data)),
    [dispatch],
  );
  const is_sign_in = useSelector(state => {
    return state.authReducer.is_sig_in;
  });
  const auth_data = useSelector(state => {
    return state.authReducer.auth_data;
  });
  const checkLog = async () => {
    const log = await AsyncStorage.getItem('token');
    const auth_data = await AsyncStorage.getItem('auth_data');
    if (!log) {
    } else {
      changeAuthData(JSON.parse(auth_data));
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
          {is_sign_in && auth_data ? <HomeRouter /> : <AuthRouter />}
        </PaperProvider>
      </DimensionsContextProvider>
    </ImagesContextProvider>
  );
};

export default App;
