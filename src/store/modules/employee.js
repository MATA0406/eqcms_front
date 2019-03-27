// ------------------------ 액션 타입 정의 ----------------------------
const SET_EMPLOYEE_LIST = 'equipment/SET_EMPLOYEE_LIST';

// ---------------------- 액션 생성함수 정의 --------------------------
// 직원 목록 입력
export const setEmployeeList = emp_list => ({
  type: SET_EMPLOYEE_LIST,
  emp_list,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  emp_list: [],
};

// ---------------------- 리듀서 작성 --------------------------
export default function employee(state = initialState, action) {
  switch (action.type) {
    case SET_EMPLOYEE_LIST:
      return {
        ...state,
        emp_list: action.emp_list,
      };
    default:
      return state;
  }
}
