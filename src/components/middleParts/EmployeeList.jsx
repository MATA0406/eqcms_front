import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { setEmployeeList } from 'store/modules/employee';

const styles = {
  user: {
    width: '100%',
    height: '250px',
    fontSize: '24px',
  },
};

class EmployeeList extends React.Component {
  componentDidMount() {
    this.getEmpList();
  }

  // 장비 목록 조회(최초)
  getEmpList = async () => {
    const params = {
      access_token: localStorage.getItem('access_token'),
    };

    // 장비 목록 조회API
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
        console.log(err);

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
    const { classes, emp_list, handleClickOpen } = this.props;

    return (
      <Grid container spacing={24}>
        {emp_list &&
          emp_list.map(emp => (
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={emp.id}
            >
              <Button
                className={classes.user}
                variant="contained"
                color="default"
                size="large"
                onClick={handleClickOpen(emp.id)}
              >
                {emp.nm}
              </Button>
            </Grid>
          ))}
      </Grid>
    );
  }
}

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    emp_list: state.employee.emp_list,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    setEmployeeList: emp_list => dispatch(setEmployeeList(emp_list)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(EmployeeList)),
);
