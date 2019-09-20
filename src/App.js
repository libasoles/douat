import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import MainScreen from "./screens/MainScreen";
import reducers from "./store/reducers";

const store = createStore(reducers, applyMiddleware(reduxThunk));

const App = () => (
  <Provider store={store}>
    <MainScreen />
  </Provider>
);
export default App;
