import React, { useContext } from 'react';
import DonationContext from '../../utils/donationContext';

export const toyTags = () => {
    const { toyTags } = useContext(DonationContext);
    return <ul className="toyTags">{toyTags.map(m + <li>{m.tag}</li>)}</ul>;
};
