// eslint-disable-next-line import/prefer-default-export
export function goApi(url, data) {
  fetch(`http://d3rg13r6ps3p6u.cloudfront.net/apis/${url}`, data)
    .then(response => response.json())
    .then(json => {
      localStorage.setItem('access_token', json.data.login_info.access_token);

      return json;
    })
    .catch(err => console.log(err));
}
