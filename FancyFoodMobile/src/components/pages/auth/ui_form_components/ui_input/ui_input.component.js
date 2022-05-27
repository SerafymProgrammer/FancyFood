import React from 'react';
import {View} from 'react-native';
import styles from './ui_input.styles';
import {TextInput} from 'react-native-paper';
import {ErrorsText} from '../error_text/error_text.component';

const UiInputComponent = props => {
  return (
    <View style={styles.inputWrap}>
      <TextInput {...props} />
      <ErrorsText error={props.error} />
    </View>
  );
};

export default UiInputComponent;
