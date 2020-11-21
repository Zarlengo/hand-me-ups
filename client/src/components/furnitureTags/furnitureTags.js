import React from 'react';
import DonationContext from '../../utils/donationContext';

export const furnitureTags = () => {
    const { furnitureTags } = useContext(DonationContext);
    return (
        <ul className="furnitureTags">
            {furnitureTags.map(m + <li>{m.tag}</li>)}
        </ul>
    );
};
