import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import MainScreen from "./screens/MainScreen";
import reducers from "./store/reducers";

const store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <MainScreen />
  </Provider>
);
export default App;
