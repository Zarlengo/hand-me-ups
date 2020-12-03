/* eslint-disable react/prop-types */
import React from 'react';
import ToyTags from '../toyTags/toyTags';
import ClothesTags from '../clothesTags/clothesTags';
import FurnitureTags from '../furnitureTags/furnitureTags';
import './style.css';

function DonationDemographics({ child }) {
    const toytags = child.tags.filter((element) => element.type === 'toy');
    const clothestags = child.tags.filter(
        (element) => element.type === 'clothes'
    );
    const furnituretags = child.tags.filter(
        (element) => element.type === 'furniture'
    );
    return (
        <div className="DonationDemographics">
            <div className="card">
                <h3>{child.gender}</h3>
                <h3>{child.age}</h3>
                <ToyTags tag={toytags} />
                <ClothesTags tag={clothestags} />
                <FurnitureTags tag={furnituretags} />
            </div>
        </div>
    );
}

export default DonationDemographics;
