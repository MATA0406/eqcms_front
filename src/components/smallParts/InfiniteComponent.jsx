import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import ListComponent from './ListComponent';

const styles = () => ({});

class InfiniteComponent extends React.Component {
  state = {
    items: Array.from({ length: 20 }),
  };

  render() {
    const { equip_list, page_info, fetchMoreData, page, rows } = this.props;

    return (
      <InfiniteScroll
        scrollableTarget="scrollDiv"
        dataLength={this.state.items.length}
        next={fetchMoreData}
        hasMore
        loader={<CircularProgress />}
      >
        <Typography color="default">
          검색결과 ({page_info.rows ? page_info.rows : 0})
        </Typography>
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
