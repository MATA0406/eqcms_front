import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EquipmentInfinite from 'components/middleParts/EquipmentInfinite';
import EquipmentForm from 'components/middleParts/EquipmentForm';
import EquipmentFormDialog from '../smallParts/EquipmentFormDialog';

import { setEquipmentList, addEquipmentList } from 'store/modules/equipment';

const styles = {
  title: {
    fontSize: 24,
  },
};

class EquipmentPage extends React.Component {
  state = {
    search_info: {},
    open: false,
    scroll: 'paper',
  };

  componentDidMount() {
    this.getEquipmentList();
  }

  // 장비 목록 조회(최초)
  getEquipmentList = async () => {
    const search_info = {};

    const params = {
      access_token: localStorage.getItem('access_token'),
      page: 1,
      rows: this.props.rows,
      _search: this.props._search,
      search_info,
    };

    // 장비 목록 조회API
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

  // 스크롤 List API 추가 호출
  fetchMoreData = async () => {
    if (this.props.rest_records < 1) {
      return false;
    }

    const params = {
      access_token: localStorage.getItem('access_token'),
      page: this.props.page + 1,
      rows: this.props.rows,
      _search: this.props._search,
      search_info: this.state.search_info,
    };

    // 요청 대상 장비 목록 조회(검색)API
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
        this.props.addEquipmentList(json.data.data);
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

  // search_info 변경
  changeSearchInfo = search_info => {
    // state에 search_info 저장
    this.setState({
      search_info,
    });
  };

  // 다이얼로그 오픈
  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  // 다이얼로그 클로즈
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, equip_list, list_load_status } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.title}>장비 관리</Typography>
        <EquipmentForm
          changeSearchInfo={this.changeSearchInfo}
          handleClickOpen={this.handleClickOpen}
        />
        <EquipmentInfinite
          equip_list={equip_list}
          fetchMoreData={this.fetchMoreData}
          list_load_status={list_load_status}
          handleClickOpen={this.handleClickOpen}
        />
        <EquipmentFormDialog
          open={this.state.open}
          scroll={this.state.scroll}
          handleClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    equip_list: state.equipment.equip_list,
    page: state.equipment.page,
    rows: state.equipment.rows,
    _search: state.equipment._search,
    list_load_status: state.equipment.list_load_status,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    setEquipmentList: response => dispatch(setEquipmentList(response)),
    addEquipmentList: response => dispatch(addEquipmentList(response)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(EquipmentPage)),
);
