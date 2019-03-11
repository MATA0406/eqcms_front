// ------------------------ 액션 타입 정의 ----------------------------
const GET_REQ_EQUIPMENT = 'home/GET_REQ_EQUIPMENT';
const GET_MY_EQUIPMENT = 'home/GET_MY_EQUIPMENT';
const GET_REQ_TARGET_EQUIPMENT = 'home/GET_REQ_TARGET_EQUIPMENT';

// ---------------------- 액션 생성함수 정의 --------------------------
export const getReqEquipment = () => ({ type: GET_REQ_EQUIPMENT });
export const getMyEquipment = () => ({ type: GET_MY_EQUIPMENT });
export const getReqTargetEquipment = (page, rows, search_info) => ({
  type: GET_REQ_TARGET_EQUIPMENT,
  page,
  rows,
  search_info,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  req_equip_list: {},
  page: 1,
  rows: 20,
  search_info: '',
};

// ---------------------- 리듀서 작성 --------------------------
export default function home(state = initialState, action) {
  switch (action.type) {
    case GET_REQ_EQUIPMENT:
      return {
        ...state,
        req_equip_list: action.page,
      };
    case GET_MY_EQUIPMENT:
      return {
        ...state,
        req_equip_list: action.page,
      };
    case GET_REQ_TARGET_EQUIPMENT:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
}
