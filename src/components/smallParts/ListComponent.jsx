import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

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
  cardImg: {
    width: 50,
  },
});

class ListComponent extends React.Component {
  render() {
    const { classes, equip_info, page_info } = this.props;
    console.log(equip_info);
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
              {equip_info.user_nm}
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
            <img
              className={classes.cardImg}
              src={`http://d3rg13r6ps3p6u.cloudfront.net${
                equip_info.equip_tp_img_url
              }`}
              alt={equip_info.equip_tp_nm}
            />
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
              {equip_info.equip_nm}
            </Typography>
            <Typography className={classes.testText} color="default">
              {equip_info.req_cd_nm}
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
              {equip_info.stat_cd_nm}
            </Typography>
            <Typography className={classes.testText} color="default">
              {equip_info.req_user_nm !== ''
                ? `${equip_info.req_user_nm} -> ${equip_info.user_nm}`
                : ''}
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
            {equip_info.req_cd === '201001' ? (
              <Button variant="contained" color="primary">
                요청
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={equip_info.req_cd !== '201001'}
                style={{
                  backgroundColor: red[500],
                  color: '#ffffff',
                }}
              >
                요청 불가
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider />
      </Fragment>
    );
  }
}

export default withStyles(styles)(ListComponent);
