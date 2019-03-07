import React from 'react';

import CommonLayout from 'components/common/CommonLayout';
import EmployeeListPage from 'components/largeParts/EmployeeListPage';

class EmployeeList extends React.Component {
  render() {
    return (
      <CommonLayout>
        <EmployeeListPage />
      </CommonLayout>
    );
  }
}

export default EmployeeList;
