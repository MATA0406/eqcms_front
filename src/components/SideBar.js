import React from 'react';
import { Link as RouterLink } from 'react-router-dom'

import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';

function SideBar(props) {
    
    const {classes, theme, open, handleDrawerClose} = props;

    return(
        <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper, }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link component={RouterLink} exact to="/">
              <ListItem button key={"home"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link component={RouterLink} exact to="/equipment">
              <ListItem button key={"equipment"}>
                <ListItemIcon>
                  <ComputerIcon />
                </ListItemIcon>
                <ListItemText primary={"장비 관리"} />
              </ListItem>
            </Link>
            <Link component={RouterLink} to="/about/foo">
              <ListItem button key={"foo"}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={"직원 목록"} />
              </ListItem>
            </Link>
            <Link component={RouterLink} to="/posts">
              <ListItem button key={"posts"}>
                <ListItemIcon>
                  <ComputerIcon />
                </ListItemIcon>
                <ListItemText primary={"Posts"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Drawer>
    )
}

export default SideBar;