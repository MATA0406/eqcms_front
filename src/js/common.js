import axios from 'axios';

// 토큰에러 처리
export const tokenError = err => {
  // Token error List
  const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

  if (errCodes.indexOf(err.response.data.code) !== -1) {
    alert(err.response.data.message);
    // this.props.history.push('/login');
    window.location.href = '/login';
  } else {
    alert(err.response.data.message);
  }
};

// 아이디 기억하기
export function setCookie(name, value, exp) {
  const date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString();
}

// 로그인 API
export function goLoginAPI(action) {
  return axios
    .post(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/login/api-100-0002',
      action.login_info,
    )
    .then(item => {
      localStorage.setItem(
        'access_token',
        item.data.data.login_info.access_token,
      );
      localStorage.setItem('login_nm', item.data.data.login_info.login_nm);
      localStorage.setItem('login_id', item.data.data.login_info.login_id);

      if (action.check.checked) {
        // name=Ethan, 7일 뒤 만료됨
        setCookie('login_id', item.data.data.login_info.login_id, 7);
      } else {
        document.cookie = 'login_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }

      return item.data.data.login_info;
    })
    .catch(err => {
      console.log(err);
      alert(err.response.data.message);
    });
}

// 로그아웃 API
export function goLogoutAPI() {
  return axios
    .post(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/login/api-100-0003',
      {},
      {
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      },
    )
    .then(() => {
      localStorage.clear();
      window.location.href = '/login';
    })
    .catch(err => {
      // Token error List
      const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

      if (errCodes.indexOf(err.response.data.code) !== -1) {
        alert(err.response.data.message);
        window.location.href = '/login';
      } else {
        console.log(err);
        alert(err.response.data.message);
      }
    });
}

// 로그아웃 API
export function pwModifyAPI(data) {
  return axios
    .post(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/login/api-100-0004',
      data,
      {
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      },
    )
    .then(() => {
      alert('수정이 완료되었습니다.');
      // handleClose();
    })
    .catch(err => {
      alert(err.response.data.message);
    });
}

// 공통 코드 목록 조회API
export const commonCodeAPI = action => {
  const params = {
    access_token: localStorage.getItem('access_token'),
    grp_cd_list: [action.grp_cd],
  };

  return axios
    .get(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/common/code/api-101-0001',
      {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      },
    )
    .then(json => {
      localStorage.setItem('access_token', json.data.data.access_token);

      return json.data.data.cd_list;
    })
    .catch(err => {
      console.log(err.response.data);

      tokenError(err);
    });
};

// 장비 구분 코드 목록 조회(공통)
export const getEquipTpCdList = () => {
  const params = {
    access_token: localStorage.getItem('access_token'),
  };

  // 장비 구분 코드 목록 조회API
  return axios
    .get(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/common/code/api-101-0002',
      {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      },
    )
    .then(json => {
      localStorage.setItem('access_token', json.data.data.access_token);
      return json.data.data.equip_tp_cd_list;
    })
    .catch(err => {
      console.log(err.response.data);

      // Token error List
      const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

      if (errCodes.indexOf(err.response.data.code) !== -1) {
        alert(err.response.data.message);
        // this.props.history.push('/login');
        window.location.href = '/login';
      } else {
        alert(err.response.data.message);
      }
    });
};

// 요청 장비 목록 조회API
export const getReqEquipmentListAPI = () => {
  const params = {
    access_token: localStorage.getItem('access_token'),
  };

  return axios
    .get(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/dashboard/api-200-0001',
      {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      },
    )
    .then(json => {
      localStorage.setItem('access_token', json.data.data.access_token);
      return json.data.data;
    })
    .catch(err => {
      console.log(err.response.data);

      // Token error List
      const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

      if (errCodes.indexOf(err.response.data.code) !== -1) {
        alert(err.response.data.message);
        window.location.href = '/login';
      } else {
        alert(err.response.data.message);
      }
    });
};

// 나의 장비 목록 조회API
export const getMyEquipmentListAPI = () => {
  const params = {
    access_token: localStorage.getItem('access_token'),
  };

  // 나의 장비 목록 조회API
  return axios
    .get(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/dashboard/api-200-0003',
      {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      },
    )
    .then(json => {
      localStorage.setItem('access_token', json.data.data.access_token);
      return json.data.data;
    })
    .catch(err => {
      console.log(err.response.data);

      // Token error List
      const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

      if (errCodes.indexOf(err.response.data.code) !== -1) {
        alert(err.response.data.message);
        window.location.href = '/login';
      } else {
        alert(err.response.data.message);
      }
    });
};

export const getReqTargetEquipment = e => {
  console.log('e :: ', e);
  // 검색 정보
  const search_info = {
    equip_tp_cd: e.target.equipTpCd.value,
    keyword: e.target.keyword.value,
  };

  const params = {
    access_token: localStorage.getItem('access_token'),
    page: 1,
    rows: this.props.rows,
    _search: this.props._search,
    search_info,
  };

  // 요청 대상 장비 목록 조회(검색)API
  return axios
    .get(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/dashboard/api-200-0002',
      {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      },
    )
    .then(json => {
      localStorage.setItem('access_token', json.data.data.access_token);
      return json.data.data;

      // state에 search_info 저장
      // this.setState(() => ({
      //   search_info,
      // }));
    })
    .catch(err => {
      console.log(err.response.data);

      // Token error List
      const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

      if (errCodes.indexOf(err.response.data.code) !== -1) {
        alert(err.response.data.message);
        window.location.href = '/login';
      } else {
        alert(err.response.data.message);
      }
    });
};

// 장비 상세 조회
export const getEquipInfo = equip_no => {
  const params = {
    access_token: localStorage.getItem('access_token'),
    equip_no,
  };

  // 요청 대상 장비 목록 조회(검색)API
  return axios
    .get('http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/equip/api-300-0002', {
      params: {
        params: JSON.stringify(params),
      },
      headers: {
        'contents-type': 'application/json',
      },
    })
    .then(json => {
      localStorage.setItem('access_token', json.data.data.access_token);
      return json.data.data.equip_info;
    })
    .catch(err => {
      console.log(err);

      // Token error List
      const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

      if (errCodes.indexOf(err.response.data.code) !== -1) {
        alert(err.response.data.message);
        window.location.href = '/login';
      } else {
        alert(err.response.data.message);
      }
    });
};
