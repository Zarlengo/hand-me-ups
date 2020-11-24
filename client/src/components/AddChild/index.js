import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';

function AddChild() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [receiveToys, setreceiveToys] = useState(false);
    const [receiveClothes, setreceiveClothes] = useState(false);
    const [receiveFurniture, setreceiveFurniture] = useState(false);
    const [donateToys, setdonateToys] = useState(false);
    const [donateClothes, setdonateClothes] = useState(false);
    const [donateFurniture, setdonateFurniture] = useState(false);
    const currentUser = API.getCurrentUser('');
    const [redirect, setRedirect] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        API.addChild({
            firstName,
            lastName,
            birthday,
            gender,
            receiveToys,
            receiveClothes,
            receiveFurniture,
            donateToys,
            donateClothes,
            donateFurniture,
            ParentId: currentUser.id,
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log(currentUser);
                currentUser.children.push({
                    childId: response.data.id,
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    gender: gender,
                    receiveToys: receiveToys,
                    receiveClothes: receiveClothes,
                    receiveFurniture: receiveFurniture,
                    donateToys: donateToys,
                    donateClothes: donateClothes,
                    donateFurniture: donateFurniture,
                });
                localStorage.setItem('user', JSON.stringify(currentUser));
                setRedirect(true);
            }
        });
    };

    if (redirect) {
        return <Redirect to="/Profile" />;
    }

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
                <select
                    onChange={(event) => {
                        setGender(event.target.value);
                    }}
                >
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <br />
                <label htmlFor="receiveToys">Receive Toys:</label>
                <input
                    name="receiveToys"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setreceiveToys(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="receiveClothes">Receive Clothes:</label>
                <input
                    name="receiveClothes"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setreceiveClothes(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="receiveFurniture">Receive Furniture:</label>
                <input
                    name="receiveFurniture"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setreceiveFurniture(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="donateToys">Donate Toys:</label>
                <input
                    name="donateToys"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdonateToys(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="donateClothes">Donate Clothes:</label>
                <input
                    name="donateClothes"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdonateClothes(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="donateFurniture">Donate Furniture:</label>
                <input
                    name="donateFurniture"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdonateFurniture(event.target.value);
                    }}
                />
                <br />
                <button onClick={handleClick}>Add Child</button>
            </form>
        </div>
    );
}
export default AddChild;
