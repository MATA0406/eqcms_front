import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

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
import blue from '@material-ui/core/colors/blue';

import {
  getEquipTpCdList,
  getReqTargetEquipment,
  addReqTargetEquipment,
} from 'store/modules/home';

import MaterialUIPickers from 'components/smallParts/MaterialUIPickers';

const styles = theme => ({
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
    backgroundColor: blue.A400,
    '&:hover': {
      backgroundColor: blue[500],
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

class ReqEquipDialog extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    buyDt: new Date().toISOString().split('T')[0],
    equipNm: '',
    serialNo: '',
    equipTpCd: 'all',
    imgUrl: '',
  };

  componentDidMount() {
    // 장비 구분 코드 목록 조회
    this.getEquipTpCdList();
  }

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

  // 장비 등록
  equipmentRegister = e => {
    e.preventDefault();
    console.log('equip_nm :: ', e.target.equip_nm.value);
    console.log('serial_no ::', e.target.serial_no.value);
    console.log('equipTpCd :: ', e.target.equipTpCd.value);
    console.log('buy_dt ::', this.state.buyDt);
    console.log('img_url :: ', e.target.img_url.value);
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

  // 장비명
  _handleEquipNmChange = e => {
    e.preventDefault();

    this.setState({
      equipNm: e.target.value,
    });
  };

  // 시리얼
  _handleSerialNoChange = e => {
    e.preventDefault();
    this.setState({
      serialNo: e.target.value,
    });
  };

  // 장비구분
  _handleEquipTpCdChange = e => {
    e.preventDefault();
    this.setState({
      equipTpCd: e.target.value,
    });
  };

  // 장비 Select box 컨트롤
  selectHandle = item => {
    this.setState(() => ({ equipTpCd: item.target.value }));
  };

  // 데이트피커 value 변환 => setState()
  handleDateChange = date => {
    console.log('dateISO :: ', date.toISOString().split('T')[0]);
    this.setState({ buyDt: date.toISOString().split('T')[0] });
  };

  render() {
    const { open, scroll, handleClose, classes, equip_tp_cd_list } = this.props;

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
                  label="장비구분"
                  className={classes.textField}
                  value={this.state.equipTpCd}
                  onChange={this.selectHandle}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="all">전체</MenuItem>
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
                  label="시리얼번호"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={this._handleSerialNoChange}
                  value={this.state.serialNo}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={2}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
                className={classes.dateArea}
              >
                <Typography component="span" variant="h6">
                  구입일자:
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={9}
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
                    등록
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
    equip_list: state.home.equip_list,
    page_info: state.home.page_info,
    page: state.home.page,
    rows: state.home.rows,
    rest_records: state.home.rest_records,
    list_load_status: state.home.list_load_status,
    _search: state.home._search,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    getEquipTpCdList: equip_tp_cd_list =>
      dispatch(getEquipTpCdList(equip_tp_cd_list)),
    getReqTargetEquipment: response =>
      dispatch(getReqTargetEquipment(response)),
    addReqTargetEquipment: response =>
      dispatch(addReqTargetEquipment(response)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(ReqEquipDialog)),
);
