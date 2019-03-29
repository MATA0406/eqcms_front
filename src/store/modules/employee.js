// ------------------------ 액션 타입 정의 ----------------------------
const SET_EMPLOYEE_LIST = 'equipment/SET_EMPLOYEE_LIST';
const SET_EMPLOYEE_EQUIP_LIST = 'equipment/SET_EMPLOYEE_EQUIP_LIST';

// ---------------------- 액션 생성함수 정의 --------------------------
// 직원 목록 입력
export const setEmployeeList = emp_list => ({
  type: SET_EMPLOYEE_LIST,
  emp_list,
});

// 직원 장비 목록 입력
export const setEmployeeEquipList = response => ({
  type: SET_EMPLOYEE_EQUIP_LIST,
  emp_info: response.emp_info,
  emp_equip_list: response.emp_equip_list,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  emp_list: [],
  emp_info: {},
  emp_equip_list: [],
};

// ---------------------- 리듀서 작성 --------------------------
export default function employee(state = initialState, action) {
  switch (action.type) {
    case SET_EMPLOYEE_LIST:
      return {
        ...state,
        emp_list: action.emp_list,
      };
    case SET_EMPLOYEE_EQUIP_LIST:
      return {
        ...state,
        emp_info: action.emp_info,
        emp_equip_list: action.emp_equip_list,
      };
    default:
      return state;
  }
}
