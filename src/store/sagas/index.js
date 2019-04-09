import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from 'store/modules/login';
import * as common from 'js/common';

// 로그인
function* goLogin(action) {
  try {
    // 로그인 API
    const user = yield call(common.goLoginAPI, action);
    // 로그인 액션
    yield put(actions.goLoginAsync(user));
    yield (window.location.href = '/');
  } catch (e) {
    console.log('saga Err!! ::', e);
    alert('saga Err!! ::', e);
  }
}

// 로그아웃
function* goLogout() {
  try {
    // 로그아웃 API
    yield call(common.goLogoutAPI);
    yield (window.location.href = '/login');
  } catch (e) {
    console.log('saga Err!! ::', e);
    alert('saga Err!! ::', e);
  }
}

// 비밀번호 수정
function* pwUpdate(action) {
  try {
    console.log(action);
    // 비밀번호 수정 API
    yield call(common.pwModifyAPI, action.data);
  } catch (e) {
    console.log('saga Err!! ::', e);
    alert('saga Err!! ::', e);
  }
}

/*
  Redux Saga Root
*/
function* root() {
  yield takeLatest(actions.GO_LOGIN, goLogin);
  yield takeLatest(actions.GO_LOGOUT, goLogout);
  yield takeLatest(actions.PW_UPDATE, pwUpdate);
  // yield takeEvery(GO_LOGIN, fetchUser);
}

export default root;
