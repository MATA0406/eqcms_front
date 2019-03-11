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
});

class Header extends React.Component {
  logout = () => {
    this.props.goLogout();
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
          <Typography variant="h6" color="inherit" noWrap>
            {localStorage.getItem('login_nm')}
          </Typography>
          <Button color="inherit" onClick={this.logout}>
            LogOut
          </Button>
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
