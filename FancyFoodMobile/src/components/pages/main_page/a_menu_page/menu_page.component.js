import React, {useContext, useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './menu_page.styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Button,
  Title,
  List,
  Card,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';
import {DimensionsContext} from '../../../../contexts/dimensions.context';
import HeaderComponent from '../header/header.component';
import {get_dishes_request} from './menu_page.service';
import {useDispatch, useSelector} from 'react-redux';
import {homeActions} from '../../../../redux/home/home.actions';
import {ImagesContext} from '../../../../contexts/images.context';

const localization_menu_page = {
  banket: 'Банкетний зал',
  hall: 'Основний зал',
  soups: 'Супи',
  salads: 'Салати',
  deserts: 'Десерти',
};
const MenuPageComponent = props => {
  const [accordion_manager, set_accordion_manager] = useState({});
  const images = useContext(ImagesContext);
  const {width, height} = useContext(DimensionsContext);
  const menu_data = useSelector(state => {
    return state.homeReducer.menu;
  });
  const dispatch = useDispatch();

  const set_menu = useCallback(
    menu => dispatch(homeActions.set_menu(menu)),
    [dispatch],
  );
  const checkLog = async () => {
    const log = await AsyncStorage.getItem('token');
    if (!log) {
      await props.navigation.navigate('Login');
    } else {
      get_dishes_request().then(res => {
        if (res.code === 200) {
          let res_data_keys = Object.keys(res.data);
          let accord_manager = {};
          res_data_keys.forEach(item => {
            accord_manager[item] = false;
          });
          set_accordion_manager(accord_manager);
          set_menu(res.data);
        }
      });
    }
  };

  React.useEffect(() => {
    checkLog();
  }, []);

  return menu_data ? (
    <View style={styles.mainContainer}>
      <HeaderComponent title={'Меню'} navigation={props.navigation} />

      <ImageBackground
        source={images.menu_interer}
        style={{
          flex: 1,
          resizeMode: 'cover',
          alignItems: 'flex-end',
          height: height,
          width: '100%',
        }}>
        <ScrollView
          style={
            {
              // backgroundColor:'#000000a0',
              // width: '100%',
              // height,
            }
          }>
          <View style={{paddingHorizontal: 10}}>
            {Object.keys(menu_data).map((item, index) => {
              return (
                <View
                  key={item + index}
                  title={item}
                  id={item}
                  descriptionStyle={{backgroundColor: 'red'}}
                  style={{
                    // marginHorizontal: 12,
                    // marginVertical: 12,
                    marginTop: 12,
                    // backgroundColor: '#c2c2c2',
                    borderBottomColor: '#9cc9b2',
                    borderRadius: 12,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      set_accordion_manager(prev => ({
                        ...prev,
                        [item]: !prev[item],
                      }));
                    }}
                    style={{
                      width: width - 24,
                      backgroundColor: '#c2c2c2',
                      borderRadius: 12,
                      paddingVertical: 16,
                      paddingHorizontal: 12,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: 'black', fontSize: 18}}>
                        {localization_menu_page[item]}
                      </Text>
                      <Icon
                        style={{fontSize: 22, color: 'black'}}
                        name={
                          accordion_manager[item] ? 'angle-up' : 'angle-down'
                        }
                      />
                    </View>
                  </TouchableOpacity>
                  {accordion_manager[item]
                    ? menu_data[item].map((el, ind) => (
                        <Card
                          style={{marginTop: 10, backgroundColor: 'white'}}
                          key={el.dish_id}>
                          <Card.Cover source={{uri: el.image}} />
                          <Card.Content>
                            <Title>{el.title}</Title>
                            <Paragraph>{el.price + '$'}</Paragraph>
                          </Card.Content>
                        </Card>
                      ))
                    : null}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </ImageBackground>
      <Button
        mode="contained"
        onPress={() => {
          props.navigation.navigate('booking_table_page');
        }}
        style={{
          position: 'absolute',
          bottom: 50,
          width: 200,
          left: (width - 200) / 2,
          right: (width - 200) / 2,
        }}>
        Забронювати столик
      </Button>
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default MenuPageComponent;
