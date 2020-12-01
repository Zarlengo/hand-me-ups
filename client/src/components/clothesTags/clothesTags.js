import React from 'react';

const clothesTags = ({ tag }) => {
    return (
        <ul className="clothesTags">
            {tag.map((m) => (
                <li key={m.tag}>{m.tag}</li>
            ))}
        </ul>
    );
};
export default clothesTags;
