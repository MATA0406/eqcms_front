// ------------------------ 액션 타입 정의 ----------------------------
export const GO_LOGIN = 'login/GO_LOGIN';
export const GO_LOGIN_ASYNC = 'login/GO_LOGIN_ASYNC';
export const GO_LOGOUT = 'login/GO_LOGOUT';
export const PW_UPDATE = 'login/PW_UPDATE';

// ---------------------- 액션 생성함수 정의 --------------------------
export const goLogin = (login_info, check) => ({
  type: GO_LOGIN,
  login_info,
  check,
});
export const goLoginAsync = (login_info, check) => ({
  type: GO_LOGIN_ASYNC,
  login_info,
  check,
});
export const goLogout = () => ({
  type: GO_LOGOUT,
});
export const pwUpdate = data => ({
  type: PW_UPDATE,
  data,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  login_info: {},
  check: '',
};

// ---------------------- 리듀서 작성 --------------------------
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case GO_LOGIN_ASYNC:
      return {
        ...state,
        login_info: action.login_info,
      };
    default:
      return state;
  }
}
