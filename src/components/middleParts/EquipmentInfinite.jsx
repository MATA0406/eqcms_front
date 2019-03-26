/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinearProgress from '@material-ui/core/LinearProgress';

import RequestCard from './RequestCard';
import CardComponent from 'components/smallParts/CardComponent';

import EquipmentFormDialog from '../smallParts/EquipmentFormDialog';

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

class EquipmentInfinite extends React.Component {
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
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      req_grp,
      equip_list,
      fetchMoreData,
      list_load_status,
      open,
      scroll,
      handleClickOpen,
    } = this.props;

    return (
      <React.Fragment>
        <InfiniteScroll
          dataLength={equip_list.length}
          next={fetchMoreData}
          hasMore={list_load_status}
          scrollThreshold="99%"
          style={{ overflow: 'inherit' }}
          loader={<LinearProgress />}
        >
          <Grid container spacing={24}>
            {equip_list
              ? equip_list.map((equip_info, index) => (
                  <CardComponent
                    req_grp={equip_info.req_grp}
                    equip_info={equip_info}
                    key={index}
                    handleClickOpen={handleClickOpen}
                  />
                ))
              : ''}
          </Grid>
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

EquipmentInfinite.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentInfinite);
