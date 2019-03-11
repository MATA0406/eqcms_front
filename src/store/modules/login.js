// ------------------------ 액션 타입 정의 ----------------------------
const CHECK_LOGIN = 'login/CHECK_LOGIN';
const GO_LOGIN = 'login/GO_LOGIN';
const GO_LOGOUT = 'login/GO_LOGOUT';

// ---------------------- 액션 생성함수 정의 --------------------------
export const checkLogin = login_info => ({
  type: CHECK_LOGIN,
  login_info,
});
export const goLogin = login_info => ({
  type: GO_LOGIN,
  login_info,
});
export const goLogout = login_info => ({
  type: GO_LOGOUT,
  login_info,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  login_info: {},
};

// ---------------------- 리듀서 작성 --------------------------
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_LOGIN:
      return {
        ...state,
        login_info: action.login_info,
      };
    case GO_LOGIN:
      return {
        ...state,
        login_info: action.login_info,
      };
    case GO_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        login_info: {},
      };
    default:
      return state;
  }
}
