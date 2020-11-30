import React from 'react';

const DonationContext = React.createContext({
    gender: '',
    birthday: 0,
    toyTags: [],
    clothesTags: [],
    furnitureTags: [],
});

export default DonationContext;
