import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {global_theme} from './theme/global_theme';
import AuthRouter from './routers/auth.router';
import {Provider} from 'react-redux';
import configureStore from './redux/store';

const store = configureStore();
const App = () => {
  return (
    <PaperProvider theme={global_theme}>
      <Provider store={store}>
        {/*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />*/}
        <AuthRouter />
      </Provider>
    </PaperProvider>
  );
};

export default App;
