import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EquipmentCard from 'components/middleParts/EquipmentCard';

import { getReqEquipment } from 'store/modules/home';

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
    this.getEqui();
  }

  getEqui = () => {
    const params = {
      access_token: localStorage.getItem('access_token'),
    };

    // 요청 장비 목록 조회

    axios
      .get(
        'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/dashboard/api-200-0003',
        {
          params: {
            params: JSON.stringify(params),
          },
        },
      )
      .then(response => response)
      .then(json => {
        console.log('HomePage :: ', json);
        localStorage.setItem('access_token', json.data.login_info.access_token);
      })
      .catch(err => console.log(err));

  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.requestEquipmentList}>
          요청 장비 목록
        </Typography>
        <EquipmentCard requestCard />
        <Typography className={classes.myEquipmentList}>
          나의 장비 목록
        </Typography>
        <EquipmentCard />
      </React.Fragment>
    );
  }
}

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    getReqEquipment: () => dispatch(getReqEquipment()),
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapActionToProps,
  )(withRouter(HomePage)),
);
