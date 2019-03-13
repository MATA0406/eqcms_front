// ------------------------ 액션 타입 정의 ----------------------------
const GET_REQ_EQUIPMENT = 'home/GET_REQ_EQUIPMENT';
const GET_MY_EQUIPMENT = 'home/GET_MY_EQUIPMENT';
const GET_REQ_TARGET_EQUIPMENT = 'home/GET_REQ_TARGET_EQUIPMENT';

// ---------------------- 액션 생성함수 정의 --------------------------
export const getReqEquipment = req_equip_list => ({
  type: GET_REQ_EQUIPMENT,
  req_equip_list,
});
export const getMyEquipment = my_equip_list => ({
  type: GET_MY_EQUIPMENT,
  my_equip_list,
});
export const getReqTargetEquipment = (page, rows, search_info) => ({
  type: GET_REQ_TARGET_EQUIPMENT,
  page,
  rows,
  search_info,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  my_equip_list: [],
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
        req_equip_list: action.req_equip_list,
      };
    case GET_MY_EQUIPMENT:
      return {
        ...state,
        my_equip_list: action.my_equip_list,
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
