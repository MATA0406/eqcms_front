// ------------------------ 액션 타입 정의 ----------------------------
const SET_COMMON_CD_LIST200 = 'common/SET_COMMON_CD_LIST200';
const SET_COMMON_CD_LIST201 = 'common/SET_COMMON_CD_LIST201';

// ---------------------- 액션 생성함수 정의 --------------------------

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

// ---------------------- 초기 상태 정의 --------------------------
const initialState = {
  cd_list_200: [],
  cd_list_201: [],
  grp_cd: '',
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
    default:
      return state;
  }
}
