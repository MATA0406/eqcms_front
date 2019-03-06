import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import SideBar from './SideBar';

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

export default withStyles(styles, { withTheme: true })(CommonLayout);
