import React, {useCallback} from 'react';
import {Text, View, TouchableOpacity, ToastAndroid} from 'react-native';
import styles from './sign_in.styles';
import {Button, Title} from 'react-native-paper';
import UiInputComponent from '../ui_form_components/ui_input/ui_input.component';
import {useDispatch} from 'react-redux';
import {auth_request} from './sign_in.service';
import {authActions} from '../../../../redux/auth/auth.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInComponent = props => {
  const [login, setLogin] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errorsLogin, setErrorsLogin] = React.useState(null);
  const [errorsPassword, setErrorsPassword] = React.useState(null);
  const dispatch = useDispatch();

  const changeSignInStatus = useCallback(
    status => dispatch(authActions.isSignIn(status)),
    [dispatch],
  );

  const changeAuthData = useCallback(
    data => dispatch(authActions.setAuthData(data)),
    [dispatch],
  );

  const auth = async () => {
    let have_errs = false;

    if (!login) {
      setErrorsLogin('req');
      have_errs = true;
    }

    if (login?.length && (login.length < 4 || login.length > 20)) {
      setErrorsLogin('min_max');
      have_errs = true;
    }
    if (!password) {
      setErrorsPassword('req');
      have_errs = true;
    }

    if (password?.length && (password.length < 4 || password.length > 20)) {
      setErrorsPassword('min_max');
      have_errs = true;
    }

    if (have_errs) {
      return;
    }

    let form_data = JSON.stringify({
      login,
      password,
    });
    await auth_request(form_data).then(async res => {
      console.log(res);
      if (res.code === 200 && res.token) {
        console.log('success');
        ToastAndroid.showWithGravity(
          'Success authorization!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        await AsyncStorage.setItem('token', res.token);
        await AsyncStorage.setItem('auth_data', JSON.stringify(res.auth_data));
        changeAuthData(res.auth_data);
        changeSignInStatus(true);
      }
    });
  };

  return (
    <View style={styles.loginContainer}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        {/*<Image source={'£'} style={styles.login_logo_img} />*/}
      </View>

      <Title style={styles.title}>Authorization</Title>
      <UiInputComponent
        error={errorsLogin}
        label="login"
        value={login}
        onChangeText={text => {
          setErrorsLogin(null);
          setLogin(text);
        }}
      />

      <UiInputComponent
        error={errorsPassword}
        label="password"
        value={password}
        onChangeText={text => {
          setErrorsPassword(null);
          setPassword(text);
        }}
      />

      <Button
        mode="contained"
        onPress={() => {
          auth();
        }}>
        Login
      </Button>

      <TouchableOpacity onPress={() => props.navigation.navigate('sign_up')}>
        <Text style={styles.haveAnAccText}>
          Do not have an acc? Go to register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInComponent;
