import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { goLogout } from 'store/modules/login';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  text: {
    fontSize: 19,
  },
  inputText: {
    width: '100%',
  },
});

class Header extends React.Component {
  state = {
    dialogOpen: false,
  };

  // 비밀번호 수정 창 열기
  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  // 비밀번호 수정 창 닫기
  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  // 로그아웃
  logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      // 로그아웃 API
      axios
        .post(
          'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/login/api-100-0003',
          {},
          {
            headers: {
              access_token: localStorage.getItem('access_token'),
            },
          },
        )
        .then(item => {
          this.props.goLogout();
        })
        .catch(function(err) {
          alert(err.response.data.message);
        });
    }
  };

  render() {
    const { classes, open, handleDrawerOpen } = this.props;

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.grow}
            variant="h6"
            color="inherit"
            noWrap
          >
            EQCMS
          </Typography>

          <Button
            className={classes.text}
            color="inherit"
            size="large"
            onClick={this.handleClickOpen}
          >
            {localStorage.getItem('login_nm')}
          </Button>
          <Button color="inherit" size="large" onClick={this.logout}>
            LogOut
          </Button>
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">비밀번호 수정</DialogTitle>
            <DialogContent>
              <Grid
                container
                item
                xs={12}
                direction="column"
                justify="center"
                alignItems="center"
                zeroMinWidth
              >
                <Typography className={classes.text} color="default">
                  이메일: {localStorage.getItem('login_id')}
                </Typography>
                <TextField
                  className={classes.inputText}
                  id="keyword"
                  name="keyword"
                  type="password"
                  autoComplete="current-password"
                  label="변경할 비밀번호"
                  margin="normal"
                />
                <TextField
                  className={classes.inputText}
                  id="keyword"
                  name="keyword"
                  type="password"
                  autoComplete="current-password"
                  label="비밀번호 확인"
                  margin="normal"
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                취소
              </Button>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                수정
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    );
  }
}

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    goLogout: userInfo => dispatch(goLogout(userInfo)),
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapActionToProps,
  )(withRouter(Header)),
);
