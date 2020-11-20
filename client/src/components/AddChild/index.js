import React, { useState } from 'react';
import API from '../../utils/API';

function AddChild() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const currentUser = API.getCurrentUser('');

    const handleClick = (event) => {
        event.preventDefault();
        API.addChild({
            firstName,
            lastName,
            birthday,
            gender,
            ParentId: currentUser.id,
        });
    };

    return (
        <div>
            Add a Child
            <form>
                <label htmlFor="fName">First Name:</label>
                <input
                    name="fName"
                    type="text"
                    value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="lName">Last Name:</label>
                <input
                    name="lName"
                    type="text"
                    value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="bDay">Birthday:</label>
                <input
                    name="bDay"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={birthday}
                    onChange={(event) => {
                        setBirthday(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="gender">Gender:</label>
                <input
                    name="gender"
                    type="text"
                    value={gender}
                    onChange={(event) => {
                        setGender(event.target.value);
                    }}
                />
                <br />
                <button onClick={handleClick}>Add Child</button>
            </form>
        </div>
    );
}
export default AddChild;
