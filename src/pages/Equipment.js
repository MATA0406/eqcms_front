import React from 'react';
import queryString from 'query-string';
import EquipmentCard from '../components/EquipmentCard';
import SelectController from '../components/SelectController'

const Equipment = ({location, match}) => {
    // const query = queryString.parse(location.search);
    // const detail = query.detail === 'true';

    return (
        <div>
            <h2>장비 관리</h2>
            <SelectController />
            <EquipmentCard/>
        </div>
    )
}

export default Equipment;