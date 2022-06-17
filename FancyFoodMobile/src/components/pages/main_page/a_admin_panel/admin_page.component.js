import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ToastAndroid,
  Linking,
} from 'react-native';
import HeaderComponent from '../header/header.component';
import styles from './admin_page.styles';
import {
  ActivityIndicator,
  Button,
  Card,
  Checkbox,
  Dialog,
  Portal,
  Title,
} from 'react-native-paper';
import {reducePrice, textOverflow} from '../../../../utils/helpers';
import {ImagesContext} from '../../../../contexts/images.context';
import {del_order, get_orders} from './admin_page.service';
import {DimensionsContext} from '../../../../contexts/dimensions.context';

const AdminPageComponent = props => {
  const [orders, set_orders] = useState([]);
  const [is_loading, set_is_loading] = useState(false);
  const [order_status_modal, set_order_status_modal] = useState(false);
  const images = useContext(ImagesContext);
  const {width, height} = useContext(DimensionsContext);
  const get_orders_ = () => {
    set_is_loading(true);
    get_orders().then(res => {
      set_orders(
        res.data
          .sort((a, b) => b.date - a.date)
          .map(order => ({...order, date: new Date(order.date)})),
      );
      set_is_loading(false);
    });
  };

  useEffect(() => {
    get_orders_();
  }, []);

  useEffect(() => {}, [orders]);

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent title={'Усі бронювання'} navigation={props.navigation} />
      {/* require('./interer.jpg') */}
      <ImageBackground
        source={images.menu_interer}
        style={{
          // flex: 1,
          resizeMode: 'cover',
          alignItems: 'flex-end',
          height: height,
          width: '100%',
        }}>
        {orders.length ? (
          <ScrollView
            style={{
              marginVertical: 12,
              // backgroundColor:'#000000a0',
              width: '100%',
              // height: 100,
            }}>
            <View style={{paddingHorizontal: 10, paddingBottom: 40}}>
              {orders.map((item, index) => (
                <Card
                  style={{marginBottom: 10, paddingBottom: 20}}
                  key={item.order_id}>
                  <Card.Cover
                    source={{uri: item.table.image}}
                    style={{opacity: 0.5}}
                  />
                  <Card.Content>
                    <Title>{item.table.title}</Title>
                  </Card.Content>
                  <View style={{paddingHorizontal: 10, marginTop: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        Нікнейм:{' '}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          textDecorationLine: 'underline',
                          fontSize: 16,
                        }}>
                        {item.user_data.login}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          marginVertical: 12,
                          fontWeight: 'bold',
                        }}>
                        Телефон:{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(`tel:${item.user_data.phone}`);
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            textDecorationLine: 'underline',
                            fontSize: 16,
                          }}>
                          {item.user_data.phone}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Checkbox status={'checked'} disabled={true} style={{}} />
                      <Text style={{color: 'black', fontSize: 16}}>
                        Адміністратор має передзвонити{' '}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: 'black',
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginVertical: 12,
                      }}>
                      Загальна вартість: {reducePrice(item.dishes) + '$'}
                    </Text>

                    {item.dishes.length ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginLeft: 10,
                        }}>
                        {item.dishes.map(dish => {
                          return (
                            <View
                              key={dish.dish_id}
                              style={{
                                backgroundColor: '#858585',
                                padding: 10,
                                borderRadius: 12,

                                width: '80%',
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <Text style={{color: '#ffffff', fontSize: 16}}>
                                {textOverflow(20, dish.title)}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    ) : null}

                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                        marginLeft: 10,
                      }}>
                      <Text style={{fontSize: 18, color: 'black'}}>Дата: </Text>

                      <Text style={{fontSize: 18, color: 'black'}}>
                        {item.date.toLocaleDateString()}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                        marginLeft: 10,
                      }}>
                      <Text style={{fontSize: 18, color: 'black'}}>Час: </Text>

                      <Text style={{fontSize: 18, color: 'black'}}>
                        {item.date.toLocaleTimeString()}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                        marginLeft: 10,
                      }}>
                      <Text style={{fontSize: 18, color: 'black'}}>
                        Коментар:{' '}
                      </Text>

                      <Text style={{fontSize: 18, color: 'black'}}>
                        {item.comment}
                      </Text>
                    </View>

                    <View style={{paddingHorizontal: 10, marginTop: 20}}>
                      <Button
                        mode="text"
                        onPress={() => {
                          set_order_status_modal(item.order_id);
                        }}
                        color={'#a09cc9'}
                        style={{
                          // marginHorizontal: 10,
                          width: '100%',

                          // marginTop: 10,
                        }}>
                        {'ЗАБРОНЬОВАНО'}
                      </Button>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width,
              backgroundColor: 'white',
              padding: 12,
            }}>
            {is_loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{color: '#c9a19c', fontSize: 22}}>
                Немає жодних замовлень
              </Text>
            )}
          </View>
        )}
      </ImageBackground>

      <Portal>
        <Dialog
          visible={order_status_modal}
          onDismiss={() => set_order_status_modal(!order_status_modal)}
          style={{borderRadius: 12, backgroundColor: '#c2c2c2'}}>
          <Dialog.Content
            style={{
              // position: 'absolute',

              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Button
              mode="contained"
              color={'#c9a19c'}
              style={{zIndex: 15000000, marginVertical: 10}}
              onPress={() => {
                del_order(order_status_modal).then(res => {
                  if (res.code === 200) {
                    set_orders(
                      orders.filter(
                        order => order.order_id !== order_status_modal,
                      ),
                    );
                    set_order_status_modal(false);
                    ToastAndroid.showWithGravity(
                      'Бронювання успішно скасовано!',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
                  }
                });
              }}>
              <Text>Скасувати бронювання</Text>
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
      {/*<Button*/}
      {/*  mode="contained"*/}
      {/*  onPress={() => {*/}
      {/*    props.navigation.navigate('menu_page');*/}
      {/*  }}*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    bottom: 100,*/}
      {/*    width: 200,*/}
      {/*    left: (width - 200) / 2,*/}
      {/*    right: (width - 200) / 2,*/}
      {/*  }}>*/}
      {/*  GO TO MAIN PAGE*/}
      {/*</Button>*/}
    </View>
  );
};

export default AdminPageComponent;
