import axios from 'axios';

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
      alert(err);
    });
}

// 로그아웃 API
export function goLogoutAPI() {
  // 로그아웃 API
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
    })
    .catch(err => {
      // Token error List
      const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

      if (errCodes.indexOf(err.response.data.code) !== -1) {
        alert(err.response.data.message);
        window.location.href = '/login';
      } else {
        console.log(err);
        alert(err);
      }
    });
}

// 로그아웃 API
export function pwModifyAPI(data) {
  // 로그아웃 API
  axios
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

// 로그아웃 API
export function commonCodeAPI(data) {
  // 로그아웃 API
  axios
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
