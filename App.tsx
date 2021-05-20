import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/modules";
import Navigator from './src/Navigator';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
