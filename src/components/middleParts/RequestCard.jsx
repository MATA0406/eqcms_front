import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import orange from '@material-ui/core/colors/orange';
import ReqEquipDialog from 'components/smallParts/ReqEquipDialog';

import { getReqTargetEquipment } from 'store/modules/home';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    width: '100%',
    minHeight: 253,
  },
  cssRoot: {
    color: '#ffffff',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange.A200,
    },
  },
};

class RequestCard extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  // 다이얼로그 오픈
  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  // 다이얼로그 클로즈
  handleClose = () => {
    const data = {
      page_info: {},
      equip_list: [],
    };

    this.props.getReqTargetEquipment(data);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid container item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card className={classes.card}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ minHeight: 250 }}
            >
              <CardActions>
                <Button
                  className={classes.cssRoot}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={this.handleClickOpen('paper')}
                >
                  요청
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>

        <ReqEquipDialog
          open={this.state.open}
          scroll={this.state.scroll}
          handleClose={this.handleClose}
        />
      </Fragment>
    );
  }
}

RequestCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    getReqTargetEquipment: response =>
      dispatch(getReqTargetEquipment(response)),
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapActionToProps,
  )(withRouter(RequestCard)),
);
