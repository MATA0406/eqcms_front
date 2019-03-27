import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import AWS from 'aws-sdk';

// Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// SelectBox
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Text
import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';
import orange from '@material-ui/core/colors/orange';

import { getEquipTpCdList } from 'store/modules/home';
import { setEmployeeList } from 'store/modules/employee';

import MaterialUIPickers from 'components/smallParts/MaterialUIPickers';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  menu: {
    width: 200,
  },
  registerBtn: {
    height: '55px',
    width: '100%',
    marginTop: '7px',
    color: '#ffffff',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange.A200,
    },
  },
  cancleBtn: {
    height: '55px',
    width: '100%',
    marginTop: '7px',
  },
  fileBtn: {
    width: '100%',
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200,
  },
  dateArea: {
    marginBottom: '15px',
    marginTop: '15px',
  },
});

class EquipmentModifyDialog extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    equipNo: '',
    equipNm: '',
    equipTpCd: '',
    serialNo: '',
    statCd: '',
    userId: '',
    userNm: '',
    reqUserId: '',
    reqUserNm: '',
    reqCd: '',
    reqCdNm: '',
    reqRsn: '',
    buyDt: new Date().toISOString().split('T')[0],
    imgUrl: '',
  };

  componentDidMount() {
    // 장비 구분 코드 목록 조회
    this.getEquipTpCdList();
    // 직원 목록 조회
    this.getEmpList();
    console.log('2222222');
    console.log('this.props.equip_info :: ', this.props.equip_info);

    this.setState({
      equipNo: this.props.equip_info.equip_no,
      equipNm: this.props.equip_info.equip_nm,
      equipTpCd: this.props.equip_info.equip_tp_cd,
      buyDt: this.props.equip_info.buy_dt,
      statCd: this.props.equip_info.stat_cd,
      userId: this.props.equip_info.user_id,
      userNm: this.props.equip_info.user_nm,
      reqUserId: this.props.equip_info.req_user_id,
      reqUserNm: this.props.equip_info.req_user_nm,
      reqCd: this.props.equip_info.req_cd,
      reqCdNm: this.props.equip_info.req_cd_nm,
      reqRsn: this.props.equip_info.req_rsn,
    });
  }

  // componentDidUpdate() {
  //   console.log('33333333');
  //   console.log('this.props.equip_info :: ', this.props.equip_info);
  //   this.setState({
  //     equipNo: this.props.equip_info.equip_no,
  //     equipNm: this.props.equip_info.equipNm,
  //     equipTpCd: this.props.equip_info.equip_tp_cd,
  //     buyDt: this.props.equip_info.buy_dt,
  //     statCd: this.props.equip_info.stat_cd,
  //     userId: this.props.equip_info.user_id,
  //     userNm: this.props.equip_info.user_nm,
  //     reqUserId: this.props.equip_info.req_user_id,
  //     reqUserNm: this.props.equip_info.req_user_nm,
  //     reqCd: this.props.equip_info.req_cd,
  //     reqCdNm: this.props.equip_info.req_cd_nm,
  //     reqRsn: this.props.equip_info.req_rsn,
  //   });
  // }

  // 장비 구분 코드 목록 조회
  getEquipTpCdList = async () => {
    const params = {
      access_token: localStorage.getItem('access_token'),
    };

    // 장비 구분 코드 목록 조회API
    await axios
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
        this.props.getEquipTpCdList(json.data.data.equip_tp_cd_list);
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

  // 직원 목록 조회
  getEmpList = async () => {
    const params = {
      access_token: localStorage.getItem('access_token'),
    };

    // 직원 목록 조회API
    await axios
      .get('http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/emp/api-400-0001', {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      })
      .then(json => {
        localStorage.setItem('access_token', json.data.data.access_token);
        this.props.setEmployeeList(json.data.data.emp_list);
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

  // 장비 수정
  equipmentRegister = e => {
    e.preventDefault();
    console.log('equip_nm :: ', this.state.equipNm);
    console.log('equipTpCd :: ', this.state.equipTpCd);
    console.log('buy_dt ::', this.state.buyDt);
    console.log('img_url :: ', this.state.imgUrl);
  };

  // 장비명
  _handleEquipNmChange = e => {
    e.preventDefault();

    this.setState({
      equipNm: e.target.value,
    });
  };

  // 장비구분
  _handleEquipTpCdChange = e => {
    e.preventDefault();
    this.setState({
      equipTpCd: e.target.value,
    });
  };

  // 사용자
  _handleUser = e => {
    e.preventDefault();
    this.setState({
      userNm: e.target.value,
    });
  };

  // 장비 상태 Select box 컨트롤
  selectStatusHandle = item => {
    this.setState(() => ({ statCd: item.target.value }));
  };

  // 직원 Select box 컨트롤
  userSelectHandle = item => {
    this.setState(() => ({ equipTpCd: item.target.value }));
  };

  // 이미지 체인지
  _handleImageChange = e => {
    e.preventDefault();

    console.log(e.target.value);
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file.name);

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
        imgUrl: file.name,
      });
    };

    reader.readAsDataURL(file);
  };

  // 데이트피커 value 변환 => setState()
  handleDateChange = date => {
    console.log('dateISO :: ', date.toISOString().split('T')[0]);
    this.setState({ buyDt: date.toISOString().split('T')[0] });
  };

  render() {
    const {
      open,
      scroll,
      handleClose,
      classes,
      equip_tp_cd_list,
      emp_list,
      cd_list_200,
    } = this.props;

    // 장비 이미지 미리보기
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = imagePreviewUrl;
    } else {
      $imagePreview = `${process.env.PUBLIC_URL}/images/noImage.gif`;
    }

    return (
      <div>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={open}
          onClose={handleClose}
          scroll={scroll}
          disableBackdropClick
        >
          <Divider />
          <DialogContent>
            <form className={classes.root} onSubmit={this.equipmentRegister}>
              <Grid container justify="center" alignItems="center">
                <Avatar
                  alt="Image"
                  src={$imagePreview}
                  className={classes.bigAvatar}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={3}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
              >
                <Typography component="span" variant="h6">
                  장비 이미지:
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={7}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
              >
                <Button variant="outlined" className={classes.fileBtn}>
                  <input
                    type="file"
                    onChange={e => this._handleImageChange(e)}
                  />
                </Button>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
              >
                <TextField
                  label="모델명"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={this._handleEquipNmChange}
                  value={this.state.equipNm}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
              >
                <TextField
                  select
                  label="장비 구분"
                  className={classes.textField}
                  value={this.state.equipTpCd}
                  onChange={this._handleEquipTpCdChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  {equip_tp_cd_list.map(item => (
                    <MenuItem value={item.equip_tp_cd} key={item.equip_tp_cd}>
                      {item.equip_tp_nm}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
              >
                <TextField
                  select
                  label="사용자"
                  className={classes.textField}
                  value={this.state.userId}
                  onChange={this._handleUser}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  {emp_list.map(item => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.nm}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={3}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
                className={classes.dateArea}
              >
                <Typography component="span" variant="h6">
                  구입 일자:
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={8}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
                className={classes.dateArea}
              >
                <MaterialUIPickers
                  buyDt={this.state.buyDt}
                  handleDateChange={this.handleDateChange}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
              >
                <TextField
                  select
                  label="장비 상태"
                  className={classes.textField}
                  value={this.state.statCd}
                  onChange={this.selectStatusHandle}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  {cd_list_200.map(item => (
                    <MenuItem value={item.cd} key={item.cd}>
                      {item.cd_nm}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                container
                item
                xs={6}
                md={3}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
                className={classes.dateArea}
              >
                <Typography component="span" variant="h6">
                  요청 상태:
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={6}
                md={3}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
                className={classes.dateArea}
              >
                <Typography component="span" variant="h6">
                  {this.state.reqCdNm}
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={6}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
                className={classes.dateArea}
              >
                <Typography component="span" variant="h6">
                  {`${this.state.reqUserNm} -> ${this.state.userNm}`}
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                direction="row"
                justify="space-evenly"
                alignItems="center"
                zeroMinWidth
              >
                <Grid
                  container
                  item
                  xs={4}
                  md={4}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  zeroMinWidth
                >
                  <Button
                    variant="contained"
                    className={classes.cancleBtn}
                    size="large"
                    color="default"
                    onClick={handleClose}
                  >
                    취소
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  md={4}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  zeroMinWidth
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.registerBtn}
                    size="large"
                    color="primary"
                  >
                    수정
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    equip_tp_cd_list: state.home.equip_tp_cd_list,
    emp_list: state.employee.emp_list,
    cd_list_200: state.common.cd_list_200,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    getEquipTpCdList: equip_tp_cd_list =>
      dispatch(getEquipTpCdList(equip_tp_cd_list)),
    setEmployeeList: emp_list => dispatch(setEmployeeList(emp_list)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(EquipmentModifyDialog)),
);
