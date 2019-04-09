import React from 'react';
import ReactDOM from 'react-dom';

// **** createStore 와 루트 리듀서 불러오기
import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from 'store/modules/index';

// **** Provider 불러오기
import { Provider } from 'react-redux';

import 'index.css';
import App from 'client/App';
import * as serviceWorker from 'serviceWorker';

import createSagaMiddleware from 'redux-saga';

import root from './store/sagas';

// **** 리덕스 개발자도구 적용
const devTools =
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// **** 스토어를 만들고 현재 값 확인해보기
const store = createStore(
  combineReducers,
  devTools(applyMiddleware(sagaMiddleware)),
);

// then run the saga
sagaMiddleware.run(root);

// **** 렌더링해서 기존의 App 감싸주기
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
