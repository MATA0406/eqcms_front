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
  cardImg: {
    width: 70,
  },
};

function CardComponent(props) {
  const { classes, cardType, equip_info, history } = props;

  return (
    <Grid item xs={12} sm={2}>
      {equip_info ? (
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
                {cardType === 'my_card' ? '내장비' : equip_info.req_cd_nm}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {equip_info.req_user_nm
                  ? `${equip_info.user_nm} -> ${equip_info.req_user_nm}`
                  : ''}
              </Typography>
            </Grid>
            <Grid container xs={12} sm={12} alignItems="center">
              <Grid
                xs={4}
                sm={4}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <img
                  className={classes.cardImg}
                  src={`http://d3rg13r6ps3p6u.cloudfront.net${
                    equip_info.equip_tp_img_url
                  }`}
                  alt=""
                />
              </Grid>
              <Grid
                xs={8}
                sm={2}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Typography
                  noWrap
                  variant="h6"
                  component="h2"
                  title={equip_info.equip_nm}
                >
                  {equip_info.equip_nm}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Typography variant="h6">{equip_info.stat_cd_nm}</Typography>
              <Typography variant="h6">{equip_info.user_nm}</Typography>
            </Grid>
          </CardContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
          >
            <ButtonComponent
              cardType={cardType}
              equip_info={equip_info}
              history={history}
            />
          </Grid>
        </Card>
      ) : (
        ''
      )}
    </Grid>
  );
}

CardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardComponent);
