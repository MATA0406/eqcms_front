import React from 'react';
// import queryString from 'query-string';
import CommonLayout from '../components/common/CommonLayout';
import EquipmentPage from '../components/largeParts/EquipmentPage';

class Equipment extends React.Component {
  render() {
    return (
      <CommonLayout>
        <EquipmentPage />
      </CommonLayout>
    );
  }
}

export default Equipment;
