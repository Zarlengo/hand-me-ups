import React from 'react';

const DonationContext = React.createContext({
    gender: '',
    age: 0,
    toyTags: '',
    clothesTags: '',
    furnitureTags: '',
});

export default DonationContext;
