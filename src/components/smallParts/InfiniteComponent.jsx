import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import ListComponent from './ListComponent';

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
    fontSize: 18,
  },
});

class InfiniteComponent extends React.Component {
  state = {
    items: Array.from({ length: 20 }),
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState(state => ({
        items: state.items.concat(Array.from({ length: 20 })),
      }));
    }, 1500);
  };

  render() {
    return (
      <InfiniteScroll
        scrollableTarget="scrollDiv"
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore
        loader={<CircularProgress />}
      >
        <Typography color="default">검색결과 (20)</Typography>
        <Divider />
        {this.state.items.map((i, index) => (
          <ListComponent key={index} />
        ))}
      </InfiniteScroll>
    );
  }
}

export default withStyles(styles)(InfiniteComponent);
