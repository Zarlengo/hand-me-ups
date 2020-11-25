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
                        <td>Email:</td>
                        <td>{currentUser.email}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{currentUser.address1}</td>
                    </tr>
                    <tr>
                        <td>City:</td>
                        <td>{currentUser.city}</td>
                    </tr>
                    <tr>
                        <td>State:</td>
                        <td>{currentUser.state}</td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="zipCode">Zip Code:</label>
                        </td>
                        <td>{currentUser.zipCode}</td>
                        {showForm ? (
                            <td>
                                <input
                                    name="zipCode"
                                    type="text"
                                    placeholder={zipCode}
                                    value={zipCode}
                                    onChange={(event) => {
                                        setZipCode(event.target.value);
                                    }}
                                />
                            </td>
                        ) : (
                            <td></td>
                        )}
                    </tr>
                    <tr rowSpan="2">
                        <td>
                            <button onClick={hideShowForm}>Edit</button>
                            <button onClick={addChild}>Add Child</button>
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
            {showForm ? (
                <form>
                    <label htmlFor="email">Email:</label>
                    <input
                        name="email"
                        type="text"
                        placeholder={email}
                        value={email}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <label htmlFor="address">Address:</label>
                    <input
                        name="address"
                        type="text"
                        placeholder={address1}
                        value={address1}
                        onChange={(event) => {
                            setAddress(event.target.value);
                        }}
                    />
                    <label htmlFor="city">City:</label>
                    <input
                        name="city"
                        type="text"
                        placeholder={city}
                        value={city}
                        onChange={(event) => {
                            setCity(event.target.value);
                        }}
                    />
                    <label htmlFor="state">State:</label>
                    <input
                        name="state"
                        type="text"
                        placeholder={state}
                        value={state}
                        onChange={(event) => {
                            setState(event.target.value);
                        }}
                    />
                    <label htmlFor="zipCode">Zip Code:</label>
                    <input
                        name="zipCode"
                        type="text"
                        placeholder={zipCode}
                        value={zipCode}
                        onChange={(event) => {
                            setZipCode(event.target.value);
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
