import React from 'react';
import {Text} from 'react-native';
import styles from './error_text.style';

export const ErrorsText = ({error}) => {
  switch (error) {
    case 'min_max':
      return (
        <Text style={styles.errText}>мінімум 4 символи та не більше 20</Text>
      );
      break;
    case 'no_such_user_exists':
      return <Text style={styles.errText}>такого юзера не існує</Text>;
      break;
    case 'req':
      return <Text style={styles.errText}>обов'язкове поле</Text>;
      break;
    case 'wrong_pass':
      return <Text style={styles.errText}>невірний пароль</Text>;
      break;
    case 'already_exists':
      return <Text style={styles.errText}>такий юзер вже існує</Text>;
      break;
    case 'phone':
      return <Text style={styles.errText}>невірний номер телефону</Text>;
      break;
    default:
      return null;
      break;
  }
};
