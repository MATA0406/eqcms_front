/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ComputerIcon from '@material-ui/icons/Computer';

import RequestCard from './RequestCard';

const styles = {
  root: {
    flexGrow: 1,
  },
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

function EquipmentCard(props) {
  const { classes, requestCard } = props;
  const _status = 'ok';

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
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
                  상태
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {_status === 'ok' ? '김펜타 -> 이쿠폰' : ''}
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
                  모델명
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Typography variant="h6">사용중</Typography>
                <Typography variant="h6">김펜타</Typography>
              </Grid>
            </CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <CardActions>
                <Button variant="contained" color="primary" size="large">
                  버튼
                </Button>
              </CardActions>
              <CardActions>
                <Button variant="contained" color="secondary" size="large">
                  버튼
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
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
                  상태
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  김펜타 -> 이쿠폰
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
                  모델명
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Typography variant="h6">사용중</Typography>
                <Typography variant="h6">김펜타</Typography>
              </Grid>
            </CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <CardActions>
                <Button variant="contained" color="primary" size="large">
                  버튼
                </Button>
              </CardActions>
              <CardActions>
                <Button variant="contained" color="secondary" size="large">
                  버튼
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
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
                  상태
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  김펜타 -> 이쿠폰
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
                  모델명
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Typography variant="h6">사용중</Typography>
                <Typography variant="h6">김펜타</Typography>
              </Grid>
            </CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <CardActions>
                <Button variant="contained" color="primary" size="large">
                  버튼
                </Button>
              </CardActions>
              <CardActions>
                <Button variant="contained" color="secondary" size="large">
                  버튼
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
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
                  상태
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  김펜타 -> 이쿠폰
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
                  모델명
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Typography variant="h6">사용중</Typography>
                <Typography variant="h6">김펜타</Typography>
              </Grid>
            </CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <CardActions>
                <Button variant="contained" color="primary" size="large">
                  버튼
                </Button>
              </CardActions>
              <CardActions>
                <Button variant="contained" color="secondary" size="large">
                  버튼
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>

        {requestCard === true ? <RequestCard /> : ''}
      </Grid>
    </div>
  );
}

EquipmentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentCard);
