import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
import ChildProfile from '../ChildProfile';

function Profiles() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [address1, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [showForm, setShowForm] = useState(false);
    const currentUser = API.getCurrentUser('');
    const [redirect, setRedirect] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [children, setChildren] = useState([]);
    const hideShowForm = () => {
        if (showForm) {
            setShowForm(false);
        } else {
            setShowForm(true);
        }
    };
    const updateInfo = (event) => {
        event.preventDefault();
        API.editUser({
            email,
            id,
            address1,
            city,
            state,
            zipCode,
        }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        ...currentUser,
                        email: email,
                        address1: address1,
                        city: city,
                        state: state,
                        zipCode: zipCode,
                    })
                );
                setShowForm(false);
            }
        });
    };
    const addChild = () => {
        setRedirect(true);
    };

    useEffect(() => {
        setId(currentUser.id);
        setEmail(currentUser.email);
        setAddress(currentUser.address1);
        setCity(currentUser.city);
        setState(currentUser.state);
        setZipCode(currentUser.zipCode);
        setChildren(currentUser.children);
    }, []);

    if (redirect) {
        return <Redirect to="/AddChild" />;
    }

    if (refresh) {
        setRefresh(false);
        return <Redirect to="/Profile" />;
    }

    return (
        <div>
            <h2>Edit your profile</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="email">Email:</label>
                        </td>
                        <td>{currentUser.email}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="email"
                                    type="text"
                                    placeholder={email}
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="address1">Address:</label>
                        </td>
                        <td>{currentUser.address1}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="address1"
                                    type="text"
                                    placeholder={address1}
                                    value={address1}
                                    onChange={(event) => {
                                        setAddress1(event.target.value);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="city">City:</label>
                        </td>
                        <td>{currentUser.city}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="city"
                                    type="text"
                                    placeholder={city}
                                    value={city}
                                    onChange={(event) => {
                                        setCity(event.target.value);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="state">State:</label>
                        </td>
                        <td>{currentUser.state}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="state"
                                    type="text"
                                    placeholder={state}
                                    value={state}
                                    onChange={(event) => {
                                        setState(event.target.value);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="zipCode">Zip Code:</label>
                        </td>
                        <td>{currentUser.zipCode}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="zipCode"
                                    type="text"
                                    placeholder={zipCode}
                                    value={zipCode}
                                    onChange={(event) => {
                                        setZipCode(event.target.value);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr rowSpan="3">
                        <td>
                            {showForm ? (
                                <div>
                                    <button onClick={updateInfo}>Update</button>
                                </div>
                            ) : (
                                <div>
                                    <button onClick={hideShowForm}>Edit</button>
                                    <button onClick={addChild}>
                                        Add Child
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            {children.map((child) => (
                <ChildProfile
                    key={'childId-' + child.childId}
                    {...child}
                    refresh={setRefresh}
                    ParentId={currentUser.id}
                />
            ))}
        </div>
    );
}

export default Profiles;
