import React from 'react';
import {
  StatusBar,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {global_theme} from './theme/global_theme';
import AuthRouter from './routers/auth.router';

const App = () => {
  return (
    <PaperProvider theme={global_theme}>

        {/*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />*/}
        <AuthRouter />
    </PaperProvider>
  );
};

export default App;
