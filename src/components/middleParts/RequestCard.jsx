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

import { searchOpenAction } from 'store/modules/common';
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
  // 다이얼로그 오픈
  handleClickOpen = () => () => {
    this.props.searchOpenAction(true);
  };

  // 다이얼로그 클로즈
  handleClose = () => {
    const data = {
      page_info: {},
      equip_list: [],
    };

    this.props.getReqTargetEquipment(data);
    this.props.searchOpenAction(false);
  };

  render() {
    const { classes, reqSearchOpen } = this.props;

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

        <ReqEquipDialog open={reqSearchOpen} handleClose={this.handleClose} />
      </Fragment>
    );
  }
}

RequestCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    reqSearchOpen: state.common.reqSearchOpen,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    getReqTargetEquipment: response =>
      dispatch(getReqTargetEquipment(response)),
    searchOpenAction: boolean => dispatch(searchOpenAction(boolean)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(RequestCard)),
);
