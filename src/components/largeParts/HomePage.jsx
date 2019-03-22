import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EquipmentCard from 'components/middleParts/EquipmentCard';

import { getReqEquipment, getMyEquipment } from 'store/modules/home';

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
  componentDidMount() {
    this.f_getReqEquipment();
  }

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

  render() {
    const { classes, req_equip_list, my_equip_list } = this.props;

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
          />
        ) : (
          <EquipmentCard req_grp="R" />
        )}

        <Typography className={classes.myEquipmentList}>
          나의 장비 목록
        </Typography>
        {my_equip_list.length ? (
          <EquipmentCard
            history={this.props.history}
            req_grp="M"
            equip_list={my_equip_list}
          />
        ) : (
          ''
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
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    getReqEquipment: req_equip_list =>
      dispatch(getReqEquipment(req_equip_list)),
    getMyEquipment: my_equip_list => dispatch(getMyEquipment(my_equip_list)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(HomePage)),
);
