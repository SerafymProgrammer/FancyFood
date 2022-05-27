import React from 'react';
import { Text } from 'react-native';
import styles from './error_text.style';


export const ErrorsText = ({ error }) => {
  
  switch (error) {
    case 'min_max':
      return <Text style={styles.errText}>min 4 and max 20</Text>
      break;
    case 'no_such_user_exists':
      return <Text style={styles.errText}>no such user exists</Text>
      break;
    case 'req':
      return <Text style={styles.errText}>required</Text>
      break;
    case 'wrong_pass':
      return <Text style={styles.errText}>wrong password</Text>
      break;
    case 'already_exists':
      return <Text style={styles.errText}>a user with the same name already exists</Text>
      break;
    case 'phone':
      return <Text style={styles.errText}>invalid phone number</Text>
      break;
    default:
      return null;
      break;
  }

}