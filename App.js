import React from 'react';
import Navigator from "./navigation/Navigator";
import { Provider } from "react-redux";
import store, { persistedStore} from "./redux/store";
import {View, Text } from "react-native";

import { PersistGate } from "redux-persist/es/integration/react";



export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={<View><Text>Loading...</Text></View>}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
