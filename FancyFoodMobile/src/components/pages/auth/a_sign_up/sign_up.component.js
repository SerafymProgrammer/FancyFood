import React from 'react';
import {
  AsyncStorage,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ErrorsText} from '../ui_form_components/error_text/error_text.component';
import styles from './sign_up.styles';
import {Button, Title} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import {register_request} from './sign_up.service';
import UiInputComponent from '../ui_form_components/ui_input/ui_input.component';

const SignUpComponent = props => {
  const [login, setLogin] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [formattedPhone, setFormattedPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorsLogin, setErrorsLogin] = React.useState(null);
  const [errorsPassword, setErrorsPassword] = React.useState(null);
  const [errorsPhone, setErrorsPhone] = React.useState(null);
  const [isFocusedPhone, setIsFocusedPhone] = React.useState(null);
  const phoneInput = React.useRef(null);
  const regist = async () => {
    let have_errs = false;

    if (!phoneInput.current?.isValidNumber(phone)) {
      setErrorsPhone('phone');
      have_errs = true;
    }
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
      phone: formattedPhone,
      login,
      password,
    });
    await register_request(form_data).then(res => {
      if (res.code === 200) {
        ToastAndroid.showWithGravity(
          'Success registration!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        props.navigation.navigate('sign_in');
      }
    });
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        {/*<Image*/}
        {/*  source={'s'}*/}
        {/*  style={{*/}
        {/*    width: '80%',*/}
        {/*    marginTop: 5,*/}
        {/*    borderRadius: 0,*/}
        {/*    borderWidth: 2,*/}
        {/*    height: 80,*/}
        {/*    borderColor: '#000000',*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
      <Title style={styles.title}>Register</Title>
      <View style={styles.inputWrap}>
        <PhoneInput
          textContainerStyle={{backgroundColor: '#e7e7e7'}}
          textInputStyle={{color: '#000000'}}
          codeTextStyle={isFocusedPhone ? {color: '#9cc9b2'} : {}}
          countryPickerButtonStyle={{backgroundColor: '#e7e7e7'}}
          containerStyle={
            isFocusedPhone
              ? {borderColor: '#9cc9b2', borderBottomWidth: 2, width: '100%'}
              : {borderColor: '#cfcfcf', borderBottomWidth: 2, width: '100%'}
          }
          textInputProps={{
            onFocus: () => {
              setIsFocusedPhone(true);
            },
            onBlur: () => {
              setIsFocusedPhone(false);
            },
          }}
          ref={phoneInput}
          value={phone}
          defaultCode="UA"
          layout="second"
          onChangeText={text => {
            setPhone(text);
            setErrorsPhone(null);
          }}
          onChangeFormattedText={text => {
            setFormattedPhone(text);
          }}
          // withDarkTheme
          withShadow
          autoFocus
        />
        <ErrorsText error={errorsPhone} />
      </View>
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

      <Button mode="contained" onPress={() => regist()}>
        Register
      </Button>

      <TouchableOpacity onPress={() => props.navigation.navigate('sign_in')}>
        <Text style={styles.haveAnAccText}>
          Already have an acc? Go to login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpComponent;
