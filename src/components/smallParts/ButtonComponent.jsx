import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

import classNames from 'classnames/bind';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
  },
  iconSize: {
    fontSize: 100,
  },
  cssRoot2: {
    color: '#ffffff',
    backgroundColor: blue.A400,
    '&:hover': {
      backgroundColor: blue[500],
    },
  },
  cssRoot3: {
    color: '#ffffff',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green.A400,
    },
  },
  cssRoot4: {
    color: '#ffffff',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red.A400,
    },
  },
};

function ButtonComponent(props) {
  const { classes, cardType, req_equip_list } = props;

  let req_type;

  if (req_equip_list.req_cd === '201003') {
    req_type = classes.cssRoot4;
  }

  return (
    <Fragment>
      <CardActions>
        <Button
          className={req_type}
          variant="contained"
          color="primary"
          size="large"
          vlaue={req_equip_list.req_cd}
        >
          {req_equip_list.req_cd_nm}
        </Button>
      </CardActions>
    </Fragment>
  );
}

export default withStyles(styles)(ButtonComponent);
