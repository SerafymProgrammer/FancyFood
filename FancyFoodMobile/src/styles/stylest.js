
import {
    StyleSheet,
  } from 'react-native';

 const styles = StyleSheet.create({
    sectionContainer: {
      // marginTop: 55,
      paddingHorizontal: 24,
      backgroundColor: '#ffffff',
      height: '100%'
    },
    mainContainer: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#ffffff',
      height: '100%'
    },
    loginContainer: {
      // marginTop: 10,
      paddingHorizontal: 24,
      backgroundColor: '#ffffff',
      height: '100%'
    },
  
  
    title: {
      textAlign: "center",
      marginBottom: 10,
      marginTop: 40,
    },
    inputWrap: {
      marginBottom: 20,
  
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    haveAnAccText: {
      marginTop: 8
    },
    errText: {
      color: '#ed2e2e'
    },
    carousel: {
      flex: 1,
      backgroundColor: '#141518'
    },
    item: {
      borderWidth: 2,
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      borderColor: 'white',
      elevation: 3
    },
    imageBackground: {
      flex: 2,
      backgroundColor: '#EBEBEB',
      borderWidth: 5,
      borderColor: 'white'
    },
    rightTextContainer: {
      marginLeft: 'auto',
      marginRight: -2,
      backgroundColor: 'rgba(49, 49, 51,0.5)',
      padding: 3,
      marginTop: 3,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    },
    rightText: { color: 'white' },
    lowerContainer: {
      flex: 1,
      margin: 10
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 18
    },
    contentText: { 
      fontSize:12
    }
  });
  
  export default styles;