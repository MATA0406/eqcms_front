// ------------------------ 액션 타입 정의 ----------------------------
const SET_EQUIPMENT = 'equipment/SET_EQUIPMENT';
const ADD_EQUIPMENT = 'equipment/ADD_EQUIPMENT';
const SET_EQUIPMENT_TP_CD_LIST = 'equipment/SET_EQUIPMENT_TP_CD_LIST';

// ---------------------- 액션 생성함수 정의 --------------------------
// 장비 목록 구분 코드 입력
export const setEquipmentTpCdList = equip_tp_cd_list => ({
  type: SET_EQUIPMENT_TP_CD_LIST,
  equip_tp_cd_list,
});

// 장비 목록 입력
export const setEquipmentList = response => ({
  type: SET_EQUIPMENT,
  equip_list: response.equip_list,
  page_info: response.page_info,
});

// 장비 목록 입력(스크롤)
export const addEquipmentList = response => ({
  type: ADD_EQUIPMENT,
  page_info: response.page_info,
  equip_list: response.equip_list,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  equip_tp_cd_list: [],
  equip_list: [],
  page_info: {},
  page: 1,
  rows: 20,
  _search: true,
  rest_records: 0,
  list_load_status: true,
};

// ---------------------- 리듀서 작성 --------------------------
export default function equipment(state = initialState, action) {
  switch (action.type) {
    case SET_EQUIPMENT_TP_CD_LIST:
      return {
        ...state,
        equip_tp_cd_list: action.equip_tp_cd_list,
      };
    case SET_EQUIPMENT:
      return {
        ...state,
        page_info: action.page_info,
        equip_list: action.equip_list,
        page: 1,
        rest_records: action.page_info.records - action.equip_list.length,
        list_load_status: !(
          action.page_info.records - action.equip_list.length <
          1
        ),
      };
    case ADD_EQUIPMENT:
      return {
        ...state,
        page_info: action.page_info,
        equip_list: state.equip_list.concat(action.equip_list),
        rest_records: state.rest_records - action.equip_list.length,
        list_load_status: !(state.rest_records - action.equip_list.length < 1),
        page: parseInt(action.page_info.page),
      };
    default:
      return state;
  }
}
