import React from 'react';

const toyTags = ({ tag }) => {
    return (
        <ul className="toyTags">
            {tag.map((m) => (
                <li key={m.tag}>{m.tag}</li>
            ))}
        </ul>
    );
};
export default toyTags;
