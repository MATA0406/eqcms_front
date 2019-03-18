import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ComputerIcon from '@material-ui/icons/Computer';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 100,
  },
  testIcon: {
    fontSize: 60,
  },
  testText: {
    fontSize: 17,
  },
});

class ListComponent extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid container item alignItems="center" xs={12}>
          <Grid
            container
            item
            xs={6}
            sm={2}
            className={classes.root}
            direction="row"
            justify="center"
            alignItems="center"
            zeroMinWidth
          >
            <Typography className={classes.testText} color="default">
              정진호
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            sm={2}
            className={classes.root}
            direction="row"
            justify="center"
            alignItems="center"
            zeroMinWidth
          >
            <ComputerIcon className={classes.testIcon} />
          </Grid>
          <Grid
            container
            item
            xs={6}
            sm={2}
            className={classes.root}
            direction="column"
            justify="center"
            alignItems="center"
            zeroMinWidth
          >
            <Typography className={classes.testText} color="default">
              모델명
            </Typography>
            <Typography className={classes.testText} color="default">
              요청가능
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            sm={3}
            className={classes.root}
            direction="column"
            justify="center"
            alignItems="center"
            zeroMinWidth
          >
            <Typography className={classes.testText} color="default">
              사용중
            </Typography>
            <Typography className={classes.testText} color="default">
              김펜타 -> 빅마트
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={3}
            className={classes.root}
            direction="column"
            justify="center"
            alignItems="center"
            zeroMinWidth
          >
            <Button variant="contained" color="primary">
              요청
            </Button>
          </Grid>
        </Grid>
        <Divider />
      </Fragment>
    );
  }
}

export default withStyles(styles)(ListComponent);
