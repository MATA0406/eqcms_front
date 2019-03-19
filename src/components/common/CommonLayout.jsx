import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Header from 'components/common/Header';
import SideBar from 'components/common/SideBar';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class CommonLayout extends React.Component {
  state = {
    open: false,
  };

  // render로 컴포넌트를 DOM에 부착한 후 Mount가 완료된 후
  componentDidMount() {
    if (!localStorage.getItem('access_token')) {
      // this.props.history.push('/login');
      window.location.href = '/login';
    }
  }

  // 업데이트가 일어난 후 render하기 전
  componentWillUpdate() {
    if (!localStorage.getItem('access_token')) {
      // this.props.history.push('/login');
      window.location.href = '/login';
    }
  }

  // SideBar 상태 관리
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  // SideBar 상태 관리
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme, children } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Header open={open} handleDrawerOpen={this.handleDrawerOpen} />

        <SideBar
          open={open}
          handleDrawerClose={this.handleDrawerClose}
          theme={theme}
        />

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    );
  }
}

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    login_info: state.loginReducer.login_info,
  };
};

export default withStyles(styles)(
  connect(mapStateToProps)(withRouter(CommonLayout)),
);
