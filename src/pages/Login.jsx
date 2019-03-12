import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { goLogin } from 'store/modules/login';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends React.Component {
  componentDidMount() {
    localStorage.clear();
  }

  // 로그인 버튼 클릭
  submit = event => {
    event.preventDefault();

    const userInfo = {
      login_id: event.target.login_id.value,
      login_pw: event.target.login_pw.value,
    };

    // ------------------------------------------------------------------------------

    // 중복 로그인 체크

    // 로그인
    axios
      .post(
        'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/login/api-100-0002',
        userInfo,
      )
      .then(item => {
        console.log('Login item :: ', item);
        localStorage.setItem(
          'access_token',
          item.data.data.login_info.access_token,
        );
        localStorage.setItem('login_nm', item.data.data.login_info.login_nm);
        this.props.goLogin(item.data.data.login_info);
        this.props.history.push('/');
      })
      .catch(function(err) {
        alert(err.response.data.message);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.submit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="login_id"
                name="login_id"
                autoComplete="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="login_pw"
                type="password"
                id="login_pw"
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    goLogin: userInfo => dispatch(goLogin(userInfo)),
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapActionToProps,
  )(withRouter(Login)),
);
