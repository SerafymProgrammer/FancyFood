import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { ErrorsText } from '../ui_form_components/error_text/error_text.component';



const Register = (props) => {

    const [login, setLogin] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [formattedPhone, setFormattedPhone] = React.useState("");
    const [password, setPassword] = React.useState('');
    const [errorsLogin, setErrorsLogin] = React.useState(null);
    const [errorsPassword, setErrorsPassword] = React.useState(null);
    const [errorsPhone, setErrorsPhone] = React.useState(null);
    const [isFocusedPhone, setIsFocusedPhone] = React.useState(null);
    const phoneInput = React.useRef(null);
    const regist =  async () => {
      let have_errs = false;
  
  
  
      if(!phoneInput.current?.isValidNumber(phone)) {
        setErrorsPhone('phone')
        have_errs = true;
      }
      if(!login) {
        setErrorsLogin('req')
        have_errs = true;
      }
  
      
  
      if(login?.length&&(login.length<4||login.length>20)) {
        setErrorsLogin('min_max')
        have_errs = true;
      }
      
      if(!password) {
        setErrorsPassword('req')
        have_errs = true;
      }
  
      if(password?.length&&(password.length<4||password.length>20)) {
        setErrorsPassword('min_max')
        have_errs = true;
      }
  
      if (have_errs) {
        return
      }
  
  
      let users = await AsyncStorage.getItem('users');
      users = await JSON.parse(users);
  
      let checkName =await users.filter((item) =>item.login===login);
      if (checkName.length) {
  
        setErrorsLogin('already_exists')
        return
      }
      await AsyncStorage.setItem(
          'users',
          JSON.stringify([...users,{
            login, password, phone, isAdmin: false
          }])
        );
       await props.navigation.navigate('Login')
      
  
      // props.navigation.navigate('Main')
    };
  
  
    return (
      <View style={styles.sectionContainer}>
        <View style={{alignItems:'center', marginTop: 20}}>
        <Image source={require('./images/logo.jpg')} style={{width: '80%', height: 180, marginTop:5, borderRadius:0,borderWidth: 2, height: 80, borderColor: '#000000' }}/>
        </View>
            <Title style={styles.title }>Register</Title>
        <View style={styles.inputWrap}>
        <PhoneInput
        textContainerStyle={{backgroundColor:'#e7e7e7'}}
        textInputStyle={{color: '#000000'}}
        codeTextStyle={isFocusedPhone ?{color: '#9cc9b2'}:{}}
        countryPickerButtonStyle={{backgroundColor:'#e7e7e7'}}
        containerStyle={isFocusedPhone ? {borderColor: '#9cc9b2', borderBottomWidth: 2, width: '100%'}: {borderColor:'#cfcfcf', borderBottomWidth: 2, width: '100%'}}
        textInputProps={{
          onFocus:() => {setIsFocusedPhone(true)},
          onBlur:() => {setIsFocusedPhone(false)}
        }}
              ref={phoneInput}
              value={phone}
              defaultCode="DM"
              layout="second"
              onChangeText={(text) => {
                setPhone(text);
                setErrorsPhone(null);
              }}
              onChangeFormattedText={(text) => {
                setFormattedPhone(text);
              }}
              // withDarkTheme
              withShadow
              autoFocus
        />
        <ErrorsText error = {errorsPhone}/>
      </View>
      <View style={styles.inputWrap}>
      <TextInput
      error ={errorsLogin}
        label="login"
        value={login}
        onChangeText={text => {
          setErrorsLogin(null)
          setLogin(text)}}
      />
        <ErrorsText error = {errorsLogin}/>
  
  
      </View>
      <View style={styles.inputWrap}>
      <TextInput
        error ={errorsPassword}
        label="password"
        value={password}
        onChangeText={text => {
          setErrorsPassword(null)
          setPassword(text)}}
      />
            <ErrorsText error = {errorsPassword}/>
      </View>
  
      <Button mode="contained" onPress={() => regist()}>Register</Button>
      
      <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
      <Text style={styles.haveAnAccText}>Already have an acc? Go to login</Text>
      </TouchableOpacity>
      </View>
    );
  };