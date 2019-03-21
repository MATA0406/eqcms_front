// ------------------------ 액션 타입 정의 ----------------------------
const SET_EQUIPMENT = 'equipment/SET_EQUIPMENT';

// ---------------------- 액션 생성함수 정의 --------------------------
// 장비 목록 입력
export const setEquipmentList = response => ({
  type: SET_EQUIPMENT,
  equip_list: response.equip_list,
  page_info: response.page_info,
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
    case SET_EQUIPMENT:
      return {
        ...state,
        equip_list: action.equip_list,
      };
    default:
      return state;
  }
}
