import React, { Fragment } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import lightGreen from '@material-ui/core/colors/lightGreen';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
  },
  iconSize: {
    fontSize: 100,
  },
  reqBtn2: {
    color: '#ffffff',
    backgroundColor: blue.A400,
    '&:hover': {
      backgroundColor: blue[500],
    },
  },
  reqBtn3: {
    color: '#ffffff',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green.A700,
    },
  },
  reqBtn4: {
    color: '#ffffff',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red.A400,
    },
  },
  myBtn1: {
    color: '#ffffff',
    backgroundColor: lightGreen[500],
    '&:hover': {
      backgroundColor: lightGreen.A400,
    },
  },
  myBtn2: {
    color: '#ffffff',
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple.A400,
    },
  },
};

function ButtonComponent(props) {
  const { classes, equip_info, cardType, history } = props;

  let req_type;
  let btn_type;

  // 요청 상태 코드에 따라 버튼 CSS 처리
  if (cardType === 'req_card' && equip_info.req_cd === '201002') {
    req_type = classes.reqBtn2;
  } else if (cardType === 'req_card' && equip_info.req_cd === '201003') {
    req_type = classes.reqBtn3;
  } else if (cardType === 'req_card' && equip_info.req_cd === '201004') {
    req_type = classes.reqBtn4;
  }

  // 요청 상태 코드에 따라 btn_type 처리
  if (cardType === 'req_card' && equip_info.req_cd === '201002') {
    btn_type = 'req_cancel';
  } else if (cardType === 'req_card' && equip_info.req_cd === '201003') {
    btn_type = 'receive';
  } else if (cardType === 'req_card' && equip_info.req_cd === '201004') {
    btn_type = 'reject_confirm';
  } else if (cardType === 'my_card' && equip_info.req_cd === '201004') {
    btn_type = 'reject_confirm';
  } else if (cardType === 'my_card' && equip_info.req_cd === '201004') {
    btn_type = 'reject_confirm';
  }

  const btnClick = async e => {
    const data = {
      equip_no: e.currentTarget.dataset.equip_no,
      btn_type: e.currentTarget.dataset.btn_type,
    };

    // 장비 요청 상태 변경처리 API
    await axios
      .post(
        'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/common/equip/api-102-0001',
        data,
        {
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      )
      .then(item => {
        localStorage.setItem('access_token', item.data.data.access_token);
        window.location.reload();
      })
      .catch(err => {
        console.log('err ', err.response.data);

        // Token error List
        const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

        if (errCodes.indexOf(err.response.data.code) !== -1) {
          alert(err.response.data.message);
          history.push('/login');
        } else {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <Fragment>
      {cardType === 'req_card' ? (
        <CardActions>
          <Button
            className={req_type}
            variant="contained"
            color="primary"
            size="large"
            data-equip_no={equip_info.equip_no}
            data-btn_type={btn_type}
            onClick={btnClick}
          >
            {equip_info.btn_nm}
          </Button>
        </CardActions>
      ) : (
        ''
      )}

      {cardType === 'my_card' && equip_info.req_cd === '201002' ? (
        <Fragment>
          <CardActions>
            <Button
              className={classes.reqBtn3}
              variant="contained"
              color="primary"
              size="large"
              onClick={btnClick}
              data-equip_no={equip_info.equip_no}
              data-btn_type="approve"
            >
              승인
            </Button>
          </CardActions>

          <CardActions>
            <Button
              className={classes.myBtn2}
              variant="contained"
              color="primary"
              size="large"
              onClick={btnClick}
              data-equip_no={equip_info.equip_no}
              data-btn_type="reject"
            >
              반려
            </Button>
          </CardActions>
        </Fragment>
      ) : (
        ''
      )}
    </Fragment>
  );
}

export default withStyles(styles)(ButtonComponent);
