import React from 'react';
import CommonLayout from 'components/common/CommonLayout';
import HomePage from 'components/largeParts/HomePage';

class Home extends React.Component {
  render() {
    return (
      <CommonLayout>
        <HomePage />
      </CommonLayout>
    );
  }
}

export default Home;
