// ------------------------ 액션 타입 정의 ----------------------------
const GET_REQ_EQUIPMENT = 'home/GET_REQ_EQUIPMENT';
const GET_MY_EQUIPMENT = 'home/GET_MY_EQUIPMENT';
const GET_REQ_TARGET_EQUIPMENT = 'home/GET_REQ_TARGET_EQUIPMENT';
const ADD_REQ_TARGET_EQUIPMENT = 'home/ADD_REQ_TARGET_EQUIPMENT';
const GET_EQUIP_TP_CD_LIST = 'home/GET_EQUIP_TP_CD_LIST';

// ---------------------- 액션 생성함수 정의 --------------------------
// 요청 장비 목록 조회
export const getReqEquipment = req_equip_list => ({
  type: GET_REQ_EQUIPMENT,
  req_equip_list,
});

// 나의 장비 목록 조회
export const getMyEquipment = my_equip_list => ({
  type: GET_MY_EQUIPMENT,
  my_equip_list,
});

// 요청 대상 장비 목록 조회(검색)
export const getReqTargetEquipment = response => ({
  type: GET_REQ_TARGET_EQUIPMENT,
  page_info: response.page_info,
  equip_list: response.equip_list,
});

// 요청 대상 장비 목록 조회(검색)
export const addReqTargetEquipment = response => ({
  type: ADD_REQ_TARGET_EQUIPMENT,
  page_info: response.page_info,
  equip_list: response.equip_list,
});

// Common - 장비 구분 코드 목록 조회
export const getEquipTpCdList = equip_tp_cd_list => ({
  type: GET_EQUIP_TP_CD_LIST,
  equip_tp_cd_list,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  my_equip_list: [],
  req_equip_list: {},
  equip_list: [],
  equip_tp_cd_list: [],
  page_info: {},
  page: 1,
  rows: 20,
  rest_records: 0,
  list_load_status: true,
  _search: true,
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
        page_info: action.page_info,
        equip_list: action.equip_list,
        page: state.page + 1,
        rest_records: action.page_info.records - action.equip_list.length,
        list_load_status: !(
          action.page_info.records - action.equip_list.length <
          1
        ),
      };
    case GET_EQUIP_TP_CD_LIST:
      return {
        ...state,
        equip_tp_cd_list: action.equip_tp_cd_list,
      };
    case ADD_REQ_TARGET_EQUIPMENT:
      return {
        ...state,
        page_info: action.page_info,
        equip_list: state.equip_list.concat(action.equip_list),
        rest_records: state.rest_records - action.equip_list.length,
        list_load_status: !(state.rest_records - action.equip_list.length < 1),
        page: state.page + 1,
      };
    default:
      return state;
  }
}
