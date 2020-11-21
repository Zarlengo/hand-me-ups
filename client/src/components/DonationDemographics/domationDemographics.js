import React from 'react';
import DonationContext from '../../utils/donationContext';

function DonationDemographics() {
  const { gender, age } = useContext(DonationContext);

    return (
        <div className="DonationDemographics">
            <h3>{gender}</h3>
            <h3>{age}</h3>
            <toyTags />
            <clothesTags />
            <furnitureTags />
           
        </div>
    );
}

export default DonationDemographics;
