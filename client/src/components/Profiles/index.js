import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

function Profiles() {
    const [id, setId] = useState();
    const [userName, setUsername] = useState();
    const [address1, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipcode, setZipcode] = useState();
    const [showForm, setshowForm] = useState(false);
    const currentUser = API.getCurrentUser();

    const hideShowForm = () => {
        if (showForm) {
            setshowForm(false);
        } else {
            setshowForm(true);
        }
    };
    const updateInfo = (event) => {
        event.preventDefault();
        console.log(address1);
        API.editUser({
            userName,
            id,
            address1,
            city,
            state,
            zipcode,
        }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        id: id,
                        userName: userName,
                        address1: address1,
                        city: city,
                        state: state,
                        zipcode: zipcode,
                    })
                );
                setshowForm(false);
            }
        });
    };

    useEffect(() => {
        setId(currentUser.id);
        setUsername(currentUser.userName);
        setAddress(currentUser.address1);
        setCity(currentUser.city);
        setState(currentUser.state);
        setZipcode(currentUser.zipcode);
    }, []);

    return (
        <div>
            <h2>Edit your profile</h2>
            <table>
                <tr>
                    <td>Username:</td> <td>{currentUser.userName}</td>
                </tr>
                <tr>
                    <td>Address:</td> <td>{currentUser.address1}</td>
                </tr>
                <tr>
                    <td>City:</td> <td>{currentUser.city} </td>
                </tr>
                <tr>
                    <td>State:</td> <td>{currentUser.state} </td>
                </tr>
                <tr>
                    <td>Zipcode:</td> <td>{currentUser.zipcode} </td>
                </tr>
                <tr rowSpan="2">
                    <button onClick={hideShowForm}>Edit</button>
                </tr>
            </table>
            {showForm ? (
                <form>
                    <th>Username:</th>
                    <input
                        type="text"
                        placeholder={userName}
                        value={userName}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <th>Address:</th>
                    <input
                        type="text"
                        placeholder={address1}
                        value={address1}
                        onChange={(event) => {
                            setAddress(event.target.value);
                        }}
                    />
                    <th>City:</th>
                    <input
                        type="text"
                        placeholder={city}
                        value={city}
                        onChange={(event) => {
                            setCity(event.target.value);
                        }}
                    />
                    <th>State:</th>
                    <input
                        type="text"
                        placeholder={state}
                        value={state}
                        onChange={(event) => {
                            setState(event.target.value);
                        }}
                    />
                    <th>Zipcode:</th>
                    <input
                        type="text"
                        placeholder={zipcode}
                        value={zipcode}
                        onChange={(event) => {
                            setZipcode(event.target.value);
                        }}
                    />
                    <button onClick={updateInfo}>Update</button>
                </form>
            ) : (
                <div />
            )}
        </div>
    );
}

export default Profiles;
