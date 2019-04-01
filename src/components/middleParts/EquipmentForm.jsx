import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';

import {
  setEquipmentTpCdList,
  setEquipmentList,
} from 'store/modules/equipment';
import { setCommonCdList200, setCommonCdList201 } from 'store/modules/common';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '15px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  searchBtn: {
    width: '100%',
    height: '55px',
    marginTop: '15px',
    color: '#ffffff',
    backgroundColor: blue.A400,
    '&:hover': {
      backgroundColor: blue[500],
    },
  },
  registerBtn: {
    width: '100%',
    height: '55px',
    marginTop: '15px',
  },
});

class EquipmentForm extends React.Component {
  state = {
    equipment: 'all',
    equipmentStatus: 'all',
    reqStatus: 'all',
  };

  componentDidMount = async () => {
    // 장비 목록 조회
    await this.getEquipmentTpCdList();
    // 공통 코드 목록 조회
    await this.getcommonCdList('200');
    await this.getcommonCdList('201');
  };

  // 장비 구분 코드 목록 조회
  getEquipmentTpCdList = async () => {
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
        this.props.setEquipmentTpCdList(json.data.data.equip_tp_cd_list);
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

  // 장비 목록 조회(검색)
  searchEquipmentList = async e => {
    e.preventDefault();

    if (e.target.equipment.value === 'all') {
      e.target.equipment.value = '';
    }
    if (e.target.equipmentStatus.value === 'all') {
      e.target.equipmentStatus.value = '';
    }
    if (e.target.reqStatus.value === 'all') {
      e.target.reqStatus.value = '';
    }

    // 검색 정보
    const search_info = {
      equip_tp_cd: e.target.equipment.value,
      stat_cd: e.target.equipmentStatus.value,
      req_cd: e.target.reqStatus.value,
      keyword: e.target.keyword.value,
    };

    const params = {
      access_token: localStorage.getItem('access_token'),
      page: 1,
      rows: this.props.rows,
      _search: this.props._search,
      search_info,
    };

    // 장비 목록 조회API(검색)
    await axios
      .get('http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/equip/api-300-0001', {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      })
      .then(json => {
        localStorage.setItem('access_token', json.data.data.access_token);
        this.props.setEquipmentList(json.data.data);
        this.props.changeSearchInfo(search_info);
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

  // 장비 Select box 컨트롤
  equipSelectHandle = e => {
    this.setState(() => ({ equipment: e.target.value }));
  };

  // 장비상태 Select box 컨트롤
  equipStatusSelectHandle = e => {
    this.setState(() => ({ equipmentStatus: e.target.value }));
  };

  // 요청상태 Select box 컨트롤
  reqStatusSelectHandle = e => {
    this.setState(() => ({ reqStatus: e.target.value }));
  };

  render() {
    const {
      classes,
      equip_tp_cd_list,
      cd_list_200,
      cd_list_201,
      handleClickOpen,
    } = this.props;

    return (
      <React.Fragment>
        <form className={classes.root} onSubmit={this.searchEquipmentList}>
          <Grid container spacing={16}>
            <Grid container item xs={12} sm={4} md={2} lg={2} xl={2}>
              <TextField
                select
                label="장비"
                id="equipment"
                name="equipment"
                className={classes.textField}
                value={this.state.equipment}
                onChange={this.equipSelectHandle}
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

            <Grid container item xs={12} sm={4} md={2} lg={2} xl={2}>
              <TextField
                select
                label="장비상태"
                id="equipmentStatus"
                name="equipmentStatus"
                className={classes.textField}
                value={this.state.equipmentStatus}
                onChange={this.equipStatusSelectHandle}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="all">전체</MenuItem>
                {cd_list_200
                  ? cd_list_200.map(item => (
                      <MenuItem value={item.cd} key={item.cd}>
                        {item.cd_nm}
                      </MenuItem>
                    ))
                  : ''}
              </TextField>
            </Grid>

            <Grid container item xs={12} sm={4} md={2} lg={2} xl={2}>
              <TextField
                select
                label="요청상태"
                id="reqStatus"
                name="reqStatus"
                className={classes.textField}
                value={this.state.reqStatus}
                onChange={this.reqStatusSelectHandle}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="all">전체</MenuItem>
                {cd_list_201
                  ? cd_list_201.map(item => (
                      <MenuItem value={item.cd} key={item.cd}>
                        {item.cd_nm}
                      </MenuItem>
                    ))
                  : ''}
              </TextField>
            </Grid>

            <Grid container item xs={12} sm={6} md={2} lg={3} xl={3}>
              <TextField
                id="keyword"
                name="keyword"
                label="Search"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid container item xs={12} sm={3} md={2} lg={1} xl={1}>
              <Button
                type="submit"
                variant="contained"
                className={classes.searchBtn}
                size="large"
                color="primary"
              >
                검색
              </Button>
            </Grid>

            <Grid container item xs={12} sm={3} md={2} lg={2} xl={2}>
              <Button
                type="submit"
                variant="contained"
                className={classes.registerBtn}
                size="large"
                color="primary"
                onClick={handleClickOpen('paper')}
              >
                장비 등록
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

EquipmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    equip_tp_cd_list: state.equipment.equip_tp_cd_list,
    cd_list_200: state.common.cd_list_200,
    cd_list_201: state.common.cd_list_201,
    page: state.equipment.page,
    rows: state.equipment.rows,
    _search: state.equipment._search,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    setEquipmentList: response => dispatch(setEquipmentList(response)),
    setEquipmentTpCdList: response => dispatch(setEquipmentTpCdList(response)),
    setCommonCdList200: response => dispatch(setCommonCdList200(response)),
    setCommonCdList201: response => dispatch(setCommonCdList201(response)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(EquipmentForm)),
);
