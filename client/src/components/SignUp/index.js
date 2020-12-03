import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [redirect, setRedirect] = useState('');

    const createUser = (event) => {
        event.preventDefault();

        API.signup({
            email,
            password,
            firstName,
            lastName,
            address1,
            address2,
            city,
            state,
            zipCode,
        }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        id: id,
                        email: email,
                        address1: address1,
                        city: city,
                        state: state,
                        zipCode: zipCode,
                    })
                );
                setRedirect(true);
            }
        });
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="email">Email:</label>
                        </td>
                        <td>
                            <input
                                name="email"
                                type="text"
                                placeholder=""
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="password">Password:</label>
                        </td>
                        <td>
                            <input
                                name="password"
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="firstName">First Name:</label>
                        </td>
                        <td>
                            <input
                                name="firstName"
                                type="text"
                                placeholder=""
                                value={firstName}
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="lastName">Last Name:</label>
                        </td>
                        <td>
                            <input
                                name="lastName"
                                type="text"
                                placeholder=""
                                value={lastName}
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="address1">Address Line 1:</label>
                        </td>
                        <td>
                            <input
                                name="address1"
                                type="text"
                                placeholder=""
                                value={address1}
                                onChange={(event) => {
                                    setAddress1(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="address2">Address Line 2:</label>
                        </td>
                        <td>
                            <input
                                name="address2"
                                type="text"
                                placeholder=""
                                value={address2}
                                onChange={(event) => {
                                    setAddress2(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="city">City:</label>
                        </td>
                        <td>
                            <input
                                name="city"
                                type="text"
                                placeholder=""
                                value={city}
                                onChange={(event) => {
                                    setCity(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="state">State:</label>
                        </td>
                        <td>
                            <input
                                name="state"
                                type="text"
                                placeholder=""
                                value={state}
                                onChange={(event) => {
                                    setState(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="zipCode">Zip Code:</label>
                        </td>
                        <td>
                            <input
                                name="zipCode"
                                type="text"
                                placeholder=""
                                value={zipCode}
                                onChange={(event) => {
                                    setZipCode(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr rowSpan="2">
                        <td>
                            <button onClick={createUser}>Create Account</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SignUp;
