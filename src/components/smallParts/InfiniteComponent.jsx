import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import ListComponent from './ListComponent';

const styles = () => ({});

class InfiniteComponent extends React.Component {
  render() {
    const {
      equip_list,
      page_info,
      fetchMoreData,
      list_load_status,
    } = this.props;

    return (
      <InfiniteScroll
        scrollableTarget="scrollDiv"
        dataLength={equip_list.length}
        next={fetchMoreData}
        hasMore={list_load_status}
        loader={<LinearProgress />}
      >
        <Typography color="default">검색결과 ({page_info.records})</Typography>
        <Divider />
        {equip_list.map(equip_info => (
          <ListComponent
            equip_info={equip_info}
            page_info={page_info}
            key={equip_info.equip_no}
          />
        ))}
      </InfiniteScroll>
    );
  }
}

export default withStyles(styles)(InfiniteComponent);
