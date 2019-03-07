// ------------------------ 액션 타입 정의 ----------------------------
const GET_REQ_EQUIPMENT = 'home/GET_REQ_EQUIPMENT';
const GET_MY_EQUIPMENT = 'home/GET_MY_EQUIPMENT';
const GET_REQ_TARGET_EQUIPMENT = 'home/GET_REQ_TARGET_EQUIPMENT';

// ---------------------- 액션 생성함수 정의 --------------------------
export const get_req_equipment = () => ({ type: GET_REQ_EQUIPMENT });
export const get_my_equipment = () => ({ type: GET_MY_EQUIPMENT });
export const get_req_target_equipment = (page, rows, search_info) => ({
  type: GET_REQ_TARGET_EQUIPMENT,
  page,
  rows,
  search_info,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  page: 1,
  rows: 20,
  search_info: false,
};

// ---------------------- 리듀서 작성 --------------------------
export default function home(state = initialState, action) {
  switch (action.type) {
    case get_req_equipment:
      return {
        ...state,
        page: action.page,
      };
    case get_my_equipment:
      return {
        ...state,
        page: action.page,
      };
    case get_req_target_equipment:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
}
