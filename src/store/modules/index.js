import { combineReducers } from 'redux';
import loginReducer from './login';
import home from './home';
import equipment from './equipment';

// 리듀서가 여러개일대는 redux 의 내장함수인 combineReducers 를 사용하여 리듀서를 하나로 합치는 작업을 합니다.
// 여러개로 나뉘어진 리듀서들을 서브리듀서 라고 부르고, 하나로 합쳐진 리듀서를 루트리듀서 라고 부릅니다.
export default combineReducers({
  home,
  loginReducer,
  equipment,
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});
