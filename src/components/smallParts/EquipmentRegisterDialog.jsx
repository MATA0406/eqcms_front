import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import AWS from 'aws-sdk';

// Material-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';

// Modules
import { getEquipTpCdList } from 'store/modules/home';
import { setEmployeeList } from 'store/modules/employee';

import MaterialUIPickers from 'components/smallParts/MaterialUIPickers';

import * as loadImage from 'blueimp-load-image';

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

class EquipmentRegisterDialog extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    buyDt: new Date().toISOString().split('T')[0],
    equipNm: '',
    serialNo: '',
    equipTpCd: '',
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

    if (this.state.file === '') {
      alert('파일을 선택해주세요.');
      return false;
    }
    if (this.state.equipNm === '') {
      alert('모델명을 입력해주세요.');
      return false;
    }
    if (this.state.equipTpCd === '') {
      alert('장비구분을 선택해주세요.');
      return false;
    }
    if (this.state.serialNo === '') {
      alert('시리얼번호를 입력해주세요.');
      return false;
    }
    if (this.state.buyDt === '') {
      alert('구입일자를 선택해주세요.');
      return false;
    }

    // 장비 이미지 업로드
    return this.imageUpload(this.state.file)
      .then(async fileName => {
        const data = {
          equip_nm: this.state.equipNm,
          serial_no: this.state.serialNo,
          equip_tp_cd: this.state.equipTpCd,
          buy_dt: this.state.buyDt,
          img_url: `/upload/${fileName}`,
        };

        // 장비 등록 API
        await axios
          .post(
            'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/equip/api-300-0003',
            data,
            {
              headers: {
                access_token: localStorage.getItem('access_token'),
              },
            },
          )
          .then(response => {
            console.log('success :: ', response);
            alert('등록이 완료되었습니다.');
            window.location.href = '/equipment';
          })
          .catch(err => {
            console.error(err);

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
      })
      .catch(err => {
        console.error(err);

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

  // 이미지 업로드(S3)
  imageUpload = async _file => {
    const file = _file;
    const date = new Date();
    const min = 1;
    const max = 100000;
    const random = Math.floor(Math.random() * (+max - +min)) + +min;
    const fileName =
      date.getFullYear() +
      '_' +
      (date.getMonth() + 1) +
      '_' +
      date.getDate() +
      '_' +
      date.getHours() +
      '_' +
      date.getMinutes() +
      '_' +
      date.getSeconds() +
      '_' +
      random;

    // 아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
    AWS.config.region = 'ap-northeast-2'; // Seoul
    AWS.config.update({
      accessKeyId: 'AKIAI7QANZMSNH5MWUBA',
      secretAccessKey: '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',
    });

    const s3_params = {
      Bucket: 'penta-equip-upload',
      Key: `upload/${fileName}`,
      ACL: 'public-read',
      ContentType: file.type,
      Body: file,
    };

    const s3obj = new AWS.S3({ params: s3_params });

    return new Promise((resolve, reject) => {
      s3obj
        .upload()
        .on('httpUploadProgress', evt => {
          console.log('evt :: ', evt);
        })
        .send((err, data) => {
          if (err) {
            console.log('err :: ', err);
            reject(new Error('Request is failed'));
          } else {
            console.log('data :: ', data);
            resolve(fileName);
          }
        });
    });
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

  // 이미지 체인지
  _handleImageChange = e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    loadImage(
      file,
      canvas => {
        canvas.toBlob(
          blob => {
            this.setState({
              file: blob,
              imagePreviewUrl: canvas.toDataURL(),
              imgUrl: file.name,
            });
          },
          'image/jpeg',
          0.8,
        );
      },
      { orientation: true, maxWidth: 1000 },
    );

    reader.readAsDataURL(file);
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
                  label="장비 구분"
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
                md={12}
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
                  xs={5}
                  md={5}
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
                  xs={5}
                  md={5}
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
  )(withRouter(EquipmentRegisterDialog)),
);
