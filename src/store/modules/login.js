// ------------------------ 액션 타입 정의 ----------------------------
const CHECK_LOGIN = 'login/CHECK_LOGIN';
const LOGIN = 'login/LOGIN';

// ---------------------- 액션 생성함수 정의 --------------------------
export const checkLogin = login_info => ({
  type: CHECK_LOGIN,
  login_info,
});
export const goLogin = login_info => ({
  type: LOGIN,
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
        login_info: state.login_info,
      };
    case LOGIN:
      return {
        ...state,
        login_info: state.login_info,
      };
    default:
      return state;
  }
}
