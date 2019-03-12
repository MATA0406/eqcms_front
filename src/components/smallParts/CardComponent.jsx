import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ComputerIcon from '@material-ui/icons/Computer';

import ButtonComponent from './ButtonComponent';

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
};

function CardComponent(props) {
  const { classes, _status, cardType, req_equip_list } = props;
  console.log('req_equip_list :: ', req_equip_list);

  return (
    <Grid item xs={12} sm={2}>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {req_equip_list.stat_cd_nm}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {_status === 'ok'
                ? `${req_equip_list.user_nm} -> ${req_equip_list.req_user_nm}`
                : ''}
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.iconSize} />
            </ListItemIcon>
            <Typography variant="h5" component="h2">
              {req_equip_list.equip_nm}
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Typography variant="h6">사용중</Typography>
            <Typography variant="h6">{req_equip_list.user_nm}</Typography>
          </Grid>
        </CardContent>
        <Grid container direction="row" justify="center" alignItems="flex-end">
          <ButtonComponent req_equip_list={req_equip_list} />
        </Grid>
      </Card>
    </Grid>
  );
}

CardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardComponent);
