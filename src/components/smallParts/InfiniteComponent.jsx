import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8,
};

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
        {this.state.items.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    );
  }
}

export default InfiniteComponent;
