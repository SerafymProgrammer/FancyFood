import React, {useState, useContext} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {
  Button,
  Title,
  List,
  Card,
  Paragraph,
  ActivityIndicator,
  Checkbox,
  IconButton,
  Portal,
  Dialog,
} from 'react-native-paper';
import {create_order, get_free_tables} from './booking_table_page.service';
import HeaderComponent from '../header/header.component';
import {
  formatted_time,
  reducePrice,
  textOverflow,
} from '../../../../utils/helpers';
import {useSelector} from 'react-redux';
import UiInputComponent from '../../auth/ui_form_components/ui_input/ui_input.component';
import styles from './booking_table_page.styles';
import {DimensionsContext} from '../../../../contexts/dimensions.context';

const BookingTableComponent = props => {
  const [comment, set_comment] = useState('');
  const [date, set_date] = useState(new Date());
  const [time, set_time] = useState('');
  const [tables_to_order, set_tables_to_order] = useState({});
  const [id_reserve, set_id_reserve] = React.useState('');
  const [room_key, set_room_key] = React.useState('');
  const [call_admin, set_call_admin] = React.useState(false);
  const [food, setFood] = React.useState([]);
  const [add_food_dialog_show, set_add_food_dialog_show] =
    React.useState(false);
  const menu_data = useSelector(state => {
    return state.homeReducer.menu;
  });
  const {width, height} = useContext(DimensionsContext);
  const get_tables = () => {
    if (!date) {
      alert('Please select date');
      return;
    }

    if (!time) {
      alert('Please select time');
      return;
    }
    let date_ = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
    );
    get_free_tables(date_).then(res => {
      set_tables_to_order(res.data);
    });
  };

  const toConfirm = () => {
    if (!date) {
      alert('Please select date');
      return;
    }

    if (!time) {
      alert('Please select time');
      return;
    }
    let date_ = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
    );
    let order = {
      date: date_.getTime(),
      format: 'booking_table',
      table_id: id_reserve,
      dishes: food.map(dish => dish.dish_id),
      need_call: call_admin,
      address: '',
      user_id: '',
    };
    create_order(JSON.stringify(order)).then(res => {
      if (res.code === 200) {
        set_tables_to_order(prevState => {
          let new_data = {...prevState};
          console.log('room_key', room_key);
          console.log('id_reserve', id_reserve);
          new_data[room_key] = new_data[room_key].map(table =>
            table.table_id === id_reserve
              ? {...table, status: 'reserved'}
              : table,
          );
          return new_data;
        });
        setFood([]);
        set_call_admin(false);
        set_id_reserve('');
      }
      console.log(res);
    });
  };
  return (
    <View>
      <HeaderComponent title={'Reserve table'} navigation={props.navigation} />
      <ScrollView
        style={{
          width: '100%',
          height: height - 80,
        }}>
        <TouchableOpacity
          onPress={() => {
            DateTimePickerAndroid.open({
              value: date,
              onChange: (e, d_) => {
                set_date(d_);
              },
              mode: 'date',
              is24Hour: true,
            });
          }}
          style={styles.date_time_touchables}>
          <Text style={{color: date ? 'black' : '#c2bdbd'}}>
            {date ? date.toLocaleDateString() : 'Select date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            DateTimePickerAndroid.open({
              value: date,
              onChange: (e, d_) => {
                set_time(d_);
              },
              mode: 'time',
              is24Hour: true,
            });
          }}
          style={styles.date_time_touchables}>
          <Text style={{color: time ? 'black' : '#c2bdbd'}}>
            {time ? `${formatted_time(time)}` : 'Select time'}
          </Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={() => {
            get_tables();
          }}>
          Show Tables
        </Button>

        {Object.keys(tables_to_order).length ? (
          <View>
            <View style={{paddingHorizontal: 10}}>
              {Object.keys(tables_to_order).map((key_, index) => (
                <List.Accordion
                  title={key_}
                  id={index}
                  style={{
                    backgroundColor: '#c2c2c2',
                    marginVertical: 5,
                    borderRadius: 12,
                  }}>
                  {tables_to_order[key_].map((table, ind) => (
                    <Card
                      style={{marginBottom: 10, paddingBottom: 20}}
                      key={table.table_id}>
                      <Card.Cover
                        source={{uri: table.image}}
                        style={
                          table.status === 'reserved' ? {opacity: 0.5} : {}
                        }
                      />
                      <Card.Content>
                        <Title>{table.title}</Title>
                      </Card.Content>
                      {id_reserve === table.table_id ? (
                        <View style={{paddingHorizontal: 10, marginTop: 10}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Checkbox
                              status={call_admin ? 'checked' : 'unchecked'}
                              style={{}}
                              onPress={() => {
                                set_call_admin(!call_admin);
                              }}
                            />
                            <Text style={{color: 'black'}}>
                              The administrator will call you back
                            </Text>
                          </View>
                          {food.length ? (
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginVertical: 10,
                                color: 'black',
                              }}>
                              Total price: {reducePrice(food) + '$'}
                            </Text>
                          ) : null}
                          {food.length ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginLeft: 10,
                              }}>
                              {food.map(item => {
                                return (
                                  <View
                                    key={item.dish_id}
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
                                    <Text
                                      style={{
                                        color: '#ffffff',
                                        fontSize: 16,
                                      }}>
                                      {textOverflow(20, item.title)}
                                    </Text>
                                    <IconButton
                                      icon={'close'}
                                      color={'#ffffff'}
                                      size={16}
                                      onPress={() =>
                                        setFood(
                                          food.filter(
                                            res_food =>
                                              res_food.dish_id !== item.dish_id,
                                          ),
                                        )
                                      }
                                    />
                                    {/* <View></View> */}
                                  </View>
                                );
                              })}
                            </View>
                          ) : null}
                          <Button
                            mode="contained"
                            onPress={() => {
                              set_add_food_dialog_show(true);
                            }}
                            style={{
                              marginLeft: 10,
                              width: '50%',
                              marginTop: 10,
                              marginBottom: 10,
                            }}>
                            Add food
                          </Button>
                          <UiInputComponent
                            mode={'outlined'}
                            label="Your comment"
                            value={comment}
                            onChangeText={text => {
                              // setErrorsLogin(null);
                              set_comment(text);
                            }}
                            multiline={true}
                          />

                          <View style={{paddingHorizontal: 10, marginTop: 20}}>
                            <Button
                              mode="contained"
                              onPress={() => {
                                toConfirm(table, index);
                              }}
                              style={{
                                // marginHorizontal: 10,
                                width: '100%',
                                // marginTop: 10,
                              }}>
                              To Confirm
                            </Button>
                          </View>
                        </View>
                      ) : (
                        <View style={{paddingHorizontal: 10, marginTop: 10}}>
                          <Button
                            mode="contained"
                            onPress={() => {
                              set_room_key(key_);
                              set_id_reserve(table.table_id);
                            }}
                            disabled={table.status === 'reserved'}
                            style={{}}>
                            {table.status === 'reserved'
                              ? 'Reserved'
                              : 'To reserve'}
                          </Button>
                        </View>
                      )}
                    </Card>
                  ))}
                </List.Accordion>
              ))}
            </View>

            <Portal>
              <Dialog
                visible={add_food_dialog_show}
                dismissable={false}
                // onDismiss={() => set_add_food_dialog_show(false)}
              >
                <Dialog.Title>Select food</Dialog.Title>
                <View style={{borderTopWidth: 2, height: 400}}>
                  <ScrollView
                    style={{
                      // backgroundColor:'#000000a0',
                      width: '100%',
                      // height:'100%'
                    }}>
                    <View style={{paddingHorizontal: 10}}>
                      {Object.keys(menu_data).map((item, index) => (
                        <List.Accordion
                          title={item}
                          id={index}
                          style={{
                            backgroundColor: '#c2c2c2',
                            marginVertical: 5,
                            borderRadius: 12,
                          }}>
                          {menu_data[item].map((el, ind) => (
                            <Card style={{marginBottom: 10}}>
                              <Card.Cover source={{uri: el.image}} />
                              <Card.Content>
                                <Title>{el.title}</Title>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  <Paragraph
                                    style={{fontSize: 20, color: 'black'}}>
                                    {el.price + '$'}
                                  </Paragraph>

                                  {food.filter(
                                    res_food => res_food.dish_id === el.dish_id,
                                  ).length ? (
                                    <IconButton
                                      icon={'checkbox-marked-circle'}
                                      color={'#9cc9b2'}
                                      size={30}
                                      onPress={() =>
                                        setFood(
                                          food.filter(
                                            res_food =>
                                              res_food.dish_id !== el.dish_id,
                                          ),
                                        )
                                      }
                                    />
                                  ) : (
                                    <IconButton
                                      icon={'plus-circle'}
                                      size={30}
                                      onPress={() => setFood([...food, el])}
                                    />
                                  )}
                                </View>
                              </Card.Content>
                            </Card>
                          ))}
                        </List.Accordion>
                      ))}
                    </View>
                  </ScrollView>
                </View>
                <Dialog.Actions
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Button onPress={() => set_add_food_dialog_show(false)}>
                    Cancel
                  </Button>
                  <Button onPress={() => set_add_food_dialog_show(false)}>
                    Done
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </View>
  );
};

export default BookingTableComponent;
