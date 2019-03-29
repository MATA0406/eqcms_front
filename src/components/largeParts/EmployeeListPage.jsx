import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import EmployeeList from 'components/middleParts/EmployeeList';
import EmployeeListDialog from 'components/middleParts/EmployeeListDialog';

import { setEmployeeEquipList } from 'store/modules/employee';

const styles = {
  title: {
    fontSize: '24px',
  },
  user: {
    width: '100%',
    height: '250px',
    fontSize: '24px',
  },
  grow: {
    flexGrow: 1,
    fontSize: '24px',
    marginBottom: '30px',
  },
  regiBtn: {
    marginBottom: '30px',
    fontSize: '20px',
  },
};

class EmployeeListPage extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = select_id => () => {
    this.getEmpEquipInfo(select_id);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getEmpEquipInfo = async select_id => {
    const params = {
      access_token: localStorage.getItem('access_token'),
      id: select_id,
    };

    // 장비 목록 조회API
    await axios
      .get('http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/emp/api-400-0003', {
        params: {
          params: JSON.stringify(params),
        },
        headers: {
          'contents-type': 'application/json',
        },
      })
      .then(json => {
        console.log('info :: ', json);
        localStorage.setItem('access_token', json.data.data.access_token);
        this.props.setEmployeeEquipList(json.data.data);
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
    const { classes, emp_info, emp_equip_list } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          item
        >
          <Typography noWrap className={classes.grow}>
            직원 목록
          </Typography>
          {/* <Button
            className={classes.regiBtn}
            variant="contained"
            color="primary"
            size="large"
          >
            등록
          </Button> */}
        </Grid>
        <EmployeeList handleClickOpen={this.handleClickOpen} />
        {this.state.open && (
          <EmployeeListDialog
            open={open}
            handleClose={this.handleClose}
            emp_info={emp_info}
            emp_equip_list={emp_equip_list}
          />
        )}
      </React.Fragment>
    );
  }
}

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    emp_info: state.employee.emp_info,
    emp_equip_list: state.employee.emp_equip_list,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    setEmployeeEquipList: response => dispatch(setEmployeeEquipList(response)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(EmployeeListPage)),
);
