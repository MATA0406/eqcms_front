import React from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

//import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class Login extends React.Component {
  submit = event => {
    event.preventDefault();

    const userInfo = {
      login_id: event.target.login_id.value,
      login_pw: event.target.login_pw.value,
    };

    const myHeaders = new Headers({
      'Content-Type': 'application/json',
    });

    const data = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(userInfo),
    };

    fetch(
      'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/login/api-100-0002',
      data,
    )
      .then(response => response.json())
      .then(json => {
        console.log(json.data.login_info.access_token);
        localStorage.setItem('access_token', json.data.login_info.access_token);
        this.goPage('/');
        //this.props.history.push('/');
      }) // 화살표 fucntion은 return을 작성할 필요가 없다.(자동!)
      .catch(err => console.log(err));
  };

  goPage = url => {
    this.props.history.push(url);
  };

  render() {
    const { classes, login_id, login_pw } = this.props;

    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.submit}
      >
        <TextField
          id="login_id"
          name="login_id"
          label="Name"
          className={classes.textField}
          value={'test1@test.com'}
          margin="normal"
        />
        <TextField
          id="login_pw"
          name="login_pw"
          label="Name"
          className={classes.textField}
          value={1111}
          margin="normal"
        />
        <Button type="submit" variant="contained" className={classes.button}>
          Default
        </Button>
      </form>
    );
  }
}
export default withStyles(styles)(connect()(withRouter(Login)));
//export default connet()withStyles(styles)(withRouter(Login));
//export default connect()(withRouter(Login))(withStyles(styles)(Login));
