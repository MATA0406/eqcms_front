import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ButtonComponent from './ButtonComponent';

const styles = {
  card: {
    minHeight: 262,
    width: '100%',
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
  cardBack: {},
};

function CardComponent(props) {
  const { classes, req_grp, equip_info, history } = props;

  return (
    <Grid container item xs={12} sm={6} md={4} lg={3} xl={2}>
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
                {equip_info.user_id === localStorage.getItem('login_id')
                  ? '내장비'
                  : equip_info.req_cd_nm}
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
            <Grid container alignItems="center">
              <Grid
                container
                item
                xs={4}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
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
                container
                item
                xs={8}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
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
              req_grp={req_grp}
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
