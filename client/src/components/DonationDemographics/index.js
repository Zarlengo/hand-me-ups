/* eslint-disable react/prop-types */
import React from 'react';
import Tags from '../Tags';
import './style.css';

function DonationDemographics({ child }) {
    const toyTags = child.tags.filter((element) => element.type === 'toy');
    const clothesTags = child.tags.filter(
        (element) => element.type === 'clothes'
    );
    const furnitureTags = child.tags.filter(
        (element) => element.type === 'furniture'
    );
    return (
        <div className="DonationDemographics">
            <div className="card">
                <h3>{child.gender}</h3>
                <h3>{child.age}</h3>
                <Tags tag={toyTags} className="toyTags" />
                <Tags tag={clothesTags} className="clothesTags" />
                <Tags tag={furnitureTags} className="furnitureTags" />
            </div>
        </div>
    );
}

export default DonationDemographics;
