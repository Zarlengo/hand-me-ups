import React, { useContext } from 'react';
import DonationContext from '../../utils/donationContext';
import ToyTags from '../toyTags/toyTags';
import ClothesTags from '../clothesTags/clothesTags';
import FurnitureTags from '../furnitureTags/furnitureTags';

function DonationDemographics() {
    const { gender, age, tags } = useContext(DonationContext);
    const toytags = tags.filter((element) => element.type === 'toy');
    const clothestags = tags.filter((element) => element.type === 'clothes');
    const furnituretags = tags.filter(
        (element) => element.type === 'furniture'
    );
    return (
        <div className="DonationDemographics">
            <h3>{gender}</h3>
            <h3>{age}</h3>
            <ToyTags tag={toytags} />
            <ClothesTags tag={clothestags} />
            <FurnitureTags tag={furnituretags} />
        </div>
    );
}

export default DonationDemographics;
