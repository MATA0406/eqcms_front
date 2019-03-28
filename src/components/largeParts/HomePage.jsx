import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EquipmentCard from 'components/middleParts/EquipmentCard';

import { getReqEquipment, getMyEquipment } from 'store/modules/home';
import { setEquipmentInfo } from 'store/modules/equipment';
import { setCommonCdList200 } from 'store/modules/common';

import EquipmentModifyDialog from '../smallParts/EquipmentModifyDialog';

const styles = {
  requestEquipmentList: {
    fontSize: 24,
  },
  myEquipmentList: {
    fontSize: 24,
    paddingTop: 50,
  },
};

class HomePage extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  componentDidMount = async () => {
    await this.f_getReqEquipment();
    // 공통 코드 목록 조회
    await this.getcommonCdList('200');
  };

  // 공통 코드 목록 조회
  getcommonCdList = async grp_cd => {
    const params = {
      access_token: localStorage.getItem('access_token'),
      grp_cd_list: [grp_cd],
    };

    // 공통 코드 목록 조회API
    await axios
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
      .then(async json => {
        localStorage.setItem('access_token', json.data.data.access_token);

        if (grp_cd === '200') {
          await this.props.setCommonCdList200(json.data.data.cd_list);
        } else if (grp_cd === '201') {
          await this.props.setCommonCdList201(json.data.data.cd_list);
        }
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

  // 요청 장비 목록 조회
  f_getReqEquipment = async () => {
    const params = {
      access_token: localStorage.getItem('access_token'),
    };

    // 요청 장비 목록 조회API
    await axios
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
        this.props.getReqEquipment(json.data.data.req_equip_list);

        // 나의 장비 목록 조회API
        this.f_getMyEquipment();
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

  // 나의 장비 목록 조회
  f_getMyEquipment = async () => {
    const params = {
      access_token: localStorage.getItem('access_token'),
    };

    // 나의 장비 목록 조회API
    await axios
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
        this.props.getMyEquipment(json.data.data.my_equip_list);
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

  // 장비 상세 조회
  getEquipInfo = async equip_no => {
    const params = {
      access_token: localStorage.getItem('access_token'),
      equip_no,
    };

    // 요청 대상 장비 목록 조회(검색)API
    await axios
      .get('http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/equip/api-300-0002', {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      })
      .then(async json => {
        localStorage.setItem('access_token', json.data.data.access_token);
        console.log('json :: ', json);
        await this.props.setEquipmentInfo(json.data.data.equip_info);
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

  // 다이얼로그 오픈
  handleClickOpen = (scroll, selectEquipNo) => () => {
    console.log('selectEquipNo :: ', selectEquipNo);
    if (selectEquipNo) {
      // 장비 상세 정보 호출
      this.getEquipInfo(selectEquipNo).then(() => {
        this.setState({ open: true, scroll, selectEquipNo });
      });
    }
  };

  // 다이얼로그 클로즈
  handleClose = () => {
    this.setState({ open: false, selectEquipNo: '' });
  };

  render() {
    const { classes, req_equip_list, my_equip_list, equip_info } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.requestEquipmentList}>
          요청 장비 목록
        </Typography>
        {req_equip_list.length ? (
          <EquipmentCard
            history={this.props.history}
            req_grp="R"
            equip_list={req_equip_list}
            handleClickOpen={this.handleClickOpen}
          />
        ) : (
          <EquipmentCard req_grp="R" handleClickOpen={this.handleClickOpen} />
        )}

        <Typography className={classes.myEquipmentList}>
          나의 장비 목록
        </Typography>
        {my_equip_list.length ? (
          <EquipmentCard
            history={this.props.history}
            req_grp="M"
            equip_list={my_equip_list}
            handleClickOpen={this.handleClickOpen}
          />
        ) : (
          ''
        )}
        {this.state.open && (
          <EquipmentModifyDialog
            open={this.state.open}
            scroll={this.state.scroll}
            handleClose={this.handleClose}
            equip_info={equip_info}
            parentsComponent="home"
          />
        )}
      </React.Fragment>
    );
  }
}

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    req_equip_list: state.home.req_equip_list,
    my_equip_list: state.home.my_equip_list,
    equip_info: state.equipment.equip_info,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    getReqEquipment: req_equip_list =>
      dispatch(getReqEquipment(req_equip_list)),
    getMyEquipment: my_equip_list => dispatch(getMyEquipment(my_equip_list)),
    setCommonCdList200: response => dispatch(setCommonCdList200(response)),
    setEquipmentInfo: equip_info => dispatch(setEquipmentInfo(equip_info)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(HomePage)),
);
