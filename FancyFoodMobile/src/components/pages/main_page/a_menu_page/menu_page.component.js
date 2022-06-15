import React, {useContext, useCallback} from 'react';
import {View, ScrollView, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './menu_page.styles';
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

const MenuPageComponent = props => {
  // const [menu_data, set_menu_data] = useState(null);
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
      <HeaderComponent title={'Menu'} navigation={props.navigation} />
      {/* require('./interer.jpg') */}
      <ImageBackground
        source={images.menu_interer}
        style={{
          flex: 1,
          resizeMode: 'cover',
          alignItems: 'flex-end',
          height: '100%',
          width: '100%',
        }}>
        <ScrollView
          style={{
            // backgroundColor:'#000000a0',
            width: '100%',
            height: '100%',
          }}>
          <View style={{paddingHorizontal: 10}}>
            <List.Section style={{backgroundColor: '#c2c2c2'}}>
              {Object.keys(menu_data).map((item, index) => (
                <List.Accordion
                  key={item + index}
                  title={item}
                  id={index}
                  style={{
                    backgroundColor: '#c2c2c2',
                    borderBottomColor: '#9cc9b2',
                    borderBottomWidth: 2,
                  }}>
                  {menu_data[item].map((el, ind) => (
                    <Card style={{marginBottom: 10}} key={el.dish_id}>
                      <Card.Cover source={{uri: el.image}} />
                      <Card.Content>
                        <Title>{el.title}</Title>
                        <Paragraph>{el.price + '$'}</Paragraph>
                      </Card.Content>
                    </Card>
                  ))}
                </List.Accordion>
              ))}
            </List.Section>
          </View>
        </ScrollView>
      </ImageBackground>
      <Button
        mode="contained"
        onPress={() => {
          props.navigation.navigate('Reserve');
        }}
        style={{
          position: 'absolute',
          bottom: 50,
          width: 200,
          left: (width - 200) / 2,
          right: (width - 200) / 2,
        }}>
        Reserve a table
      </Button>
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default MenuPageComponent;
