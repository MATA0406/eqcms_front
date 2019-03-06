import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';


function Header(props) {
    const { classes, open, handleDrawerOpen } = props;

    return (
        <AppBar position="fixed" className={classNames(classes.appBar, { [classes.appBarShift]: open, })}>
          <Toolbar disableGutters={!open}>
            <IconButton color="inherit" aria-label="Open drawer" onClick={handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.grow} variant="h6" color="inherit" noWrap>
              EQCMS
            </Typography>
            <Typography variant="h6" color="inherit" noWrap>
              정진호
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
    )
}

export default Header;