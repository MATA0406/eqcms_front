import React from 'react';
import EquipmentCard from '../components/EquipmentCard';

const Home = () => {
    return (
        <div>
            <h2>요청 장비 목록</h2>
            <EquipmentCard requestCard={true}/>
            <h2>나의 장비 목록</h2>
            <EquipmentCard />
        </div>
    )
}

export default Home;