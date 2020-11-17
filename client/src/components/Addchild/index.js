import React, { useState } from 'react';
import API from '../../utils/API';

function AddChild() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState();
    const currentUser = API.getCurrentUser();

    const handleClick = () => {
        API.addChild({
            firstName,
            lastName,
            birthday,
            gender,
            parentId: currentUser.id,
        });
    };

    return (
        <div>
            Add a Child
            <form>
                <th>First Name:</th>
                <input
                    type="text"
                    value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value);
                    }}
                />
                <th>Last Name:</th>
                <input
                    type="text"
                    value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value);
                    }}
                />
                <th>Birthday:</th>
                <input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={birthday}
                    onChange={(event) => {
                        setBirthday(event.target.value);
                    }}
                />
                <th>Gender:</th>
                <input
                    type="text"
                    value={gender}
                    onChange={(event) => {
                        setGender(event.target.value);
                    }}
                />
                <button onClick={handleClick}>Add Child</button>
            </form>
        </div>
    );
}
export default AddChild;
