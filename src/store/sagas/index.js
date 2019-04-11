import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as loginActions from 'store/modules/login';
import * as commonActions from 'store/modules/common';
import * as homeActions from 'store/modules/home';
import * as equipmentActions from 'store/modules/equipment';
import * as common from 'js/common';

// ============================== USER =====================================
// 로그인
function* goLogin(action) {
  try {
    // 로그인 API
    const user = yield call(common.goLoginAPI, action);
    // 로그인 액션
    yield put(loginActions.goLoginAsync(user));
    yield (window.location.href = '/');
  } catch (e) {
    console.log('saga Err!! ::', e);
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
  }
}

// ============================== COMMON =====================================
// 공통 코드
function* getCommonCode(action) {
  try {
    // 공통 코드 API
    const cd_list = yield call(common.commonCodeAPI, action);

    if (action.grp_cd === '200') {
      yield put(commonActions.setCommonCdList200(cd_list));
    } else if (action.grp_cd === '201') {
      yield put(commonActions.setCommonCdList201(cd_list));
    }
  } catch (e) {
    console.log('saga Err!! ::', e);
  }
}

// 공통 코드
function* getEquipTpCdList() {
  try {
    // 공통 코드 API
    const equip_tp_cd_list = yield call(common.getEquipTpCdList);
    console.log('equip_tp_cd_list :: ', equip_tp_cd_list);
    yield put(homeActions.getEquipTpCdList(equip_tp_cd_list));
  } catch (e) {
    console.log('saga Err!! ::', e);
  }
}

// ============================== HOME =====================================
// 요청 장비 목록
function* getReqEquipmentList() {
  try {
    // 요청 장비 목록 API
    const response = yield call(common.getReqEquipmentListAPI);
    yield put(homeActions.getReqEquipment(response.req_equip_list));
  } catch (e) {
    console.log('saga Err!! ::', e);
  }
}

// 나의 장비 목록
function* getMyEquipmentList() {
  try {
    // 요청 장비 목록 API
    const response = yield call(common.getMyEquipmentListAPI);
    yield put(homeActions.getMyEquipment(response.my_equip_list));
  } catch (e) {
    console.log('saga Err!! ::', e);
  }
}

// 요청 대상 장비 목록 조회(검색)
// function* getReqTargetEquipment(action) {
//   try {
//     console.log(action);
//     // 요청 대상 장비 목록 조회(검색) API
//     const response = yield call(common.getReqTargetEquipment, action.e);
//     yield put(homeActions.getReqTargetEquipment(response));
//   } catch (e) {
//     console.log('saga Err!! ::', e);
//   }
// }

// ============================== EQUIPMENT =====================================
// 요청 장비 목록
function* getEquipmentInfo(action) {
  try {
    // 요청 장비 목록 API
    const equip_info = yield call(common.getEquipInfo, action.equip_no);
    yield put(equipmentActions.setEquipmentInfo(equip_info));
    yield put(commonActions.modifyOpenAction(true));
  } catch (e) {
    console.log('saga Err!! ::', e);
  }
}

/*
  Redux Saga Root
*/
function* root() {
  // 로그인
  yield takeLatest(loginActions.GO_LOGIN, goLogin);
  // 로그아웃
  yield takeLatest(loginActions.GO_LOGOUT, goLogout);
  // 비밀번호 수정
  yield takeLatest(loginActions.PW_UPDATE, pwUpdate);
  // 공통코드 조회
  yield takeEvery(commonActions.SET_COMMON_CD_LIST_ASYNC, getCommonCode);
  // 장비 구분 코드 목록 조회 액션
  yield takeEvery(homeActions.GET_EQUIP_TP_CD_LIST_ASYNC, getEquipTpCdList);
  // 요청장비목록 조회(HOME)
  yield takeEvery(homeActions.GET_REQ_EQUIPMENT_ASYNC, getReqEquipmentList);
  // 나의장비목록 조회(HOME)
  yield takeEvery(homeActions.GET_MY_EQUIPMENT_ASYNC, getMyEquipmentList);
  // 요청 대상 장비 목록 조회(검색)
  // yield takeEvery(
  //   homeActions.GET_REQ_TARGET_EQUIPMENT_ASYNC,
  //   getReqTargetEquipment,
  // );
  // 장비 상세 조회
  yield takeEvery(equipmentActions.SET_EQUIPMENT_INFO_ASYNC, getEquipmentInfo);
}

export default root;
