import React, { useContext } from 'react';
import DonationContext from '../../utils/donationContext';

export const clothesTags = () => {
    const { clothesTags } = useContext(DonationContext)
    return (
        <ul className="clothesTag">{clothesTags.map(m + <li>{m.tag}</li>)}</ul>
    );
};
