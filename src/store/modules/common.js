// ------------------------ 액션 타입 정의 ----------------------------
export const SET_COMMON_CD_LIST_ASYNC = 'common/SET_COMMON_CD_LIST_ASYNC';
export const SET_COMMON_CD_LIST200 = 'common/SET_COMMON_CD_LIST200';
export const SET_COMMON_CD_LIST201 = 'common/SET_COMMON_CD_LIST201';
export const REQ_SEARCH_OPEN = 'common/REQ_SEARCH_OPEN';
export const MODIFY_OPEN = 'common/MODIFY_OPEN';

// ---------------------- 액션 생성함수 정의 --------------------------

// 장비 목록 입력 SAGA
export const setCommonCdListAsync = grp_cd => ({
  type: SET_COMMON_CD_LIST_ASYNC,
  grp_cd,
});

// 장비 목록 입력(grp_cd: 200)
export const setCommonCdList200 = cd_list_200 => ({
  type: SET_COMMON_CD_LIST200,
  cd_list_200,
});

// 장비 목록 입력(grp_cd: 201)
export const setCommonCdList201 = cd_list_201 => ({
  type: SET_COMMON_CD_LIST201,
  cd_list_201,
});

// 다이얼로그 오픈
export const modifyOpenAction = modifyOpen => ({
  type: MODIFY_OPEN,
  modifyOpen,
});

// 다이얼로그 오픈
export const searchOpenAction = reqSearchOpen => ({
  type: REQ_SEARCH_OPEN,
  reqSearchOpen,
});

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  cd_list_200: [],
  cd_list_201: [],
  grp_cd: '',
  modifyOpen: false,
  reqSearchOpen: false,
};

// ---------------------- 리듀서 작성 --------------------------
export default function common(state = initialState, action) {
  switch (action.type) {
    case SET_COMMON_CD_LIST200:
      return {
        ...state,
        cd_list_200: action.cd_list_200,
      };
    case SET_COMMON_CD_LIST201:
      return {
        ...state,
        cd_list_201: action.cd_list_201,
      };
    case MODIFY_OPEN:
      return {
        ...state,
        modifyOpen: action.modifyOpen,
      };
    case REQ_SEARCH_OPEN:
      return {
        ...state,
        reqSearchOpen: action.reqSearchOpen,
      };
    default:
      return state;
  }
}
