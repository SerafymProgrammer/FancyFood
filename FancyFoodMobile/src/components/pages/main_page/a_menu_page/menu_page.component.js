import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './menu_page.styles';
import {Button, Title, List, Card, Paragraph} from 'react-native-paper';
import {DimensionsContext} from '../../../../contexts/dimensions.context';
import HeaderComponent from '../header/header.component';

const MenuPageComponent = props => {
  const [menu_data, set_menu_data] = useState([]);
  const {width, height} = useContext(DimensionsContext);
  const checkLog = async () => {
    const log = await AsyncStorage.getItem('token');

    if (!log) {
      await props.navigation.navigate('Login');
    }
  };

  React.useEffect(() => {
    checkLog();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent title={'Menu'} navigation={props.navigation} />
      {/* require('./interer.jpg') */}
      {/*<ImageBackground*/}
      {/*  source={require('./images/menu_interer.jpg')}*/}
      {/*  style={{*/}
      {/*    flex: 1,*/}
      {/*    resizeMode: 'cover',*/}
      {/*    // justifyContent: "center",*/}
      {/*    alignItems: 'flex-end',*/}
      {/*    height: '100%',*/}
      {/*    width: '100%',*/}
      {/*  }}>*/}
        <ScrollView
          style={{
            // backgroundColor:'#000000a0',
            width: '100%',
            height: '100%',
          }}>
          <View style={{paddingHorizontal: 10}}>
            {menu_data.map((item, index) => (
              <List.Accordion
                key={item.title + index}
                title={item.title}
                id={index}
                style={{
                  backgroundColor: '#c2c2c2',
                  marginVertical: 5,
                  borderRadius: 12,
                }}>
                {item.data.map((el, ind) => (
                  <Card style={{marginBottom: 10}} key={ind + el.title}>
                    <Card.Cover source={el.image} />
                    <Card.Content>
                      <Title>{el.title}</Title>
                      <Paragraph>{el.price + '$'}</Paragraph>
                    </Card.Content>
                    {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                  </Card.Actions> */}
                  </Card>
                ))}
              </List.Accordion>
            ))}
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
  );
};

export default MenuPageComponent;
