import React, {useCallback} from 'react';
import {Text, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../../../redux/auth/auth.actions';
import {Button, Dialog, IconButton, Portal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderComponent = props => {
  const MORE_ICON = 'dots-vertical';
  const [openMenu, setOpenMenu] = React.useState(false);
  const [currUser, setCurrUser] = React.useState(null);
  const auth_data = useSelector(state => {
    return state.authReducer.auth_data;
  });
  const is_sign_in = useSelector(state => {
    return state.authReducer.is_sig_in;
  });
  const dispatch = useDispatch();

  const changeSignInStatus = useCallback(
    status => dispatch(authActions.isSignIn(status)),
    [dispatch],
  );
  const getCurrUser = async () => {
    let log = await AsyncStorage.getItem('currentUser');
    log = await JSON.parse(log);

    await setCurrUser(log);
  };

  const logaut = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('auth_data');
    changeSignInStatus(false);
    await props.navigation.navigate('Login');
    setOpenMenu(!openMenu);
  };

  React.useEffect(() => {
    getCurrUser();
  }, []);

  React.useEffect(() => {}, [openMenu]);

  return is_sign_in ? (
    <View
      style={{
        backgroundColor: '#858585',
        height: 60,
        justifyContent: 'center',
        position: 'relative',
        zIndex: 15000000,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 15000000,
          }}>
          {/*<Image*/}
          {/*  source={require('./images/mini_logo.jpg')}*/}
          {/*  style={{height: 50, width: 55, marginLeft: 10}}*/}
          {/*/>*/}
          <Text style={{marginLeft: 20, fontSize: 20, color: '#fff'}}>
            {props.title}
          </Text>
        </View>

        <IconButton
          icon={MORE_ICON}
          color={'#000000'}
          size={25}
          onPress={() => setOpenMenu(!openMenu)}
        />
      </View>
      <Portal>
        <Dialog
          visible={openMenu}
          onDismiss={() => setOpenMenu(!openMenu)}
          style={{borderRadius: 12, backgroundColor: '#858585'}}>
          <Dialog.Content
            style={{
              // position: 'absolute',

              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            {auth_data.isAdmin ? (
              <Button
                mode="contained"
                style={{zIndex: 15000000, marginVertical: 10}}
                onPress={() => {
                  setOpenMenu(false);
                  props.navigation.navigate('admin_panel');
                }}>
                <Text>All reserves</Text>
              </Button>
            ) : null}

            <Button
              mode="contained"
              style={{zIndex: 15000000, marginVertical: 10}}
              onPress={() => logaut()}>
              <Text>Logaut</Text>
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  ) : (
    <View></View>
  );
};

export default HeaderComponent;
