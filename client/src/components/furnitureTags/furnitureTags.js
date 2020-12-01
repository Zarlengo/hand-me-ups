import React from 'react';

const furnitureTags = ({ tag }) => {
    return (
        <ul className="furnitureTags">
            {tag.map((m) => (
                <li key={m.tag}>{m.tag}</li>
            ))}
        </ul>
    );
};
export default furnitureTags;
