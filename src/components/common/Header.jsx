import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import PwModifyDialog from 'components/smallParts/PwModifyDialog';

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
      // 로그아웃 Action
      this.props.goLogout();
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
            <Link href="/" color="inherit">
              펜타웍스
            </Link>
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
          <PwModifyDialog
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            dialogOpen={this.state.dialogOpen}
          />
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
