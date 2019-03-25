/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinearProgress from '@material-ui/core/LinearProgress';

import RequestCard from './RequestCard';
import CardComponent from 'components/smallParts/CardComponent';

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
  render() {
    const {
      classes,
      req_grp,
      equip_list,
      fetchMoreData,
      list_load_status,
    } = this.props;

    return (
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
                />
              ))
            : ''}
        </Grid>
      </InfiniteScroll>
    );
  }
}

EquipmentInfinite.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentInfinite);
