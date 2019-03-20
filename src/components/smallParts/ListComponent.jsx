import React, { Fragment } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import TextField from '@material-ui/core/TextField';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 100,
  },
  testIcon: {
    fontSize: 60,
  },
  testText: {
    fontSize: 16,
  },
  cardImg: {
    width: 50,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  reqBtn: {
    color: '#ffffff',
    backgroundColor: blue.A400,
    '&:hover': {
      backgroundColor: blue[500],
    },
    width: '100%',
  },
  cancleBtn: {
    color: '#ffffff',
    backgroundColor: grey[700],
    '&:hover': {
      backgroundColor: grey[600],
    },
  },
});

class ListComponent extends React.Component {
  state = {
    req_input_open: false,
  };

  // 장비 요청 등록
  reqEquipRegister = async e => {
    e.preventDefault();

    const data = {
      req_rsn: e.currentTarget.req_rsn.value,
      equip_no: e.currentTarget.registerBtn.dataset.equip_no,
    };

    // 장비 요청 등록 API
    await axios
      .post(
        'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/common/equip/api-102-0002',
        data,
        {
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      )
      .then(item => {
        localStorage.setItem('access_token', item.data.data.access_token);
        alert('등록이 완료되었습니다.');
        window.location.reload();
      })
      .catch(err => {
        console.log('err ', err.response.data);

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

  // 요청란 ON/OFF
  handleReqInput = () => {
    this.setState(state => ({
      req_input_open: state.req_input_open !== true,
    }));
  };

  render() {
    const { classes, equip_info } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.reqEquipRegister}>
          <Grid container item alignItems="center" xs={12}>
            <Grid
              container
              item
              xs={6}
              sm={2}
              className={classes.root}
              direction="row"
              justify="center"
              alignItems="center"
              zeroMinWidth
            >
              <Typography className={classes.testText} color="default">
                {equip_info.user_nm}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={6}
              sm={2}
              className={classes.root}
              direction="row"
              justify="center"
              alignItems="center"
              zeroMinWidth
            >
              <img
                className={classes.cardImg}
                src={`http://d3rg13r6ps3p6u.cloudfront.net${
                  equip_info.equip_tp_img_url
                }`}
                alt={equip_info.equip_tp_nm}
              />
            </Grid>
            <Grid
              container
              item
              xs={6}
              sm={2}
              className={classes.root}
              direction="column"
              justify="center"
              alignItems="center"
              zeroMinWidth
            >
              <Typography className={classes.testText} color="default">
                {equip_info.equip_nm}
              </Typography>
              <Typography className={classes.testText} color="default">
                {equip_info.req_cd_nm}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={6}
              sm={3}
              className={classes.root}
              direction="column"
              justify="center"
              alignItems="center"
              zeroMinWidth
            >
              <Typography className={classes.testText} color="default">
                {equip_info.stat_cd_nm}
              </Typography>
              <Typography className={classes.testText} color="default">
                {equip_info.req_user_nm !== ''
                  ? `${equip_info.req_user_nm} -> ${equip_info.user_nm}`
                  : ''}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={3}
              className={classes.root}
              direction="column"
              justify="center"
              alignItems="center"
              zeroMinWidth
            >
              {equip_info.req_cd === '201001' ? (
                <Button
                  className={classes.reqBtn}
                  variant="contained"
                  color="primary"
                  onClick={this.handleReqInput}
                >
                  요청
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  style={{
                    backgroundColor: red[500],
                    color: '#ffffff',
                  }}
                >
                  요청 불가
                </Button>
              )}
            </Grid>
          </Grid>

          {this.state.req_input_open === true ? (
            <Grid
              container
              item
              direction="row"
              justify="flex-start"
              alignItems="center"
              xs={12}
              sm={12}
            >
              <Grid
                container
                item
                xs={12}
                sm={8}
                direction="row"
                justify="center"
                alignItems="center"
                zeroMinWidth
              >
                <TextField
                  id="req_rsn"
                  name="req_rsn"
                  label="요청사유"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid
                container
                item
                xs={6}
                sm={2}
                className={classes.root}
                direction="row"
                justify="center"
                alignItems="center"
                zeroMinWidth
              >
                <Button
                  id="registerBtn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  data-equip_no={equip_info.equip_no}
                >
                  확인
                </Button>
              </Grid>
              <Grid
                container
                item
                xs={6}
                sm={2}
                className={classes.root}
                direction="row"
                justify="center"
                alignItems="center"
                zeroMinWidth
              >
                <Button
                  className={classes.cancleBtn}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={this.handleReqInput}
                >
                  취소
                </Button>
              </Grid>
            </Grid>
          ) : (
            ''
          )}
        </form>
        <Divider />
      </Fragment>
    );
  }
}

export default withStyles(styles)(ListComponent);
