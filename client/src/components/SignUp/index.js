import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
import './style.css';

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
        <div className="signupDiv">
            <h1 className="signupTitle">Create an account</h1>
            <table className="signupTable">
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="email" className="signupLabel">
                                Email:
                            </label>
                        </td>
                        <td>
                            <input
                                name="email"
                                type="text"
                                placeholder=""
                                className="signupInput"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="password" className="signupLabel">
                                Password:
                            </label>
                        </td>
                        <td>
                            <input
                                name="password"
                                type="password"
                                placeholder=""
                                className="signupInput"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="firstName" className="signupLabel">
                                First Name:
                            </label>
                        </td>
                        <td>
                            <input
                                name="firstName"
                                type="text"
                                placeholder=""
                                className="signupInput"
                                value={firstName}
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="lastName" className="signupLabel">
                                Last Name:
                            </label>
                        </td>
                        <td>
                            <input
                                name="lastName"
                                type="text"
                                placeholder=""
                                className="signupInput"
                                value={lastName}
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="address1" className="signupLabel">
                                Address Line 1:
                            </label>
                        </td>
                        <td>
                            <input
                                name="address1"
                                type="text"
                                placeholder=""
                                className="signupInput"
                                value={address1}
                                onChange={(event) => {
                                    setAddress1(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="address2" className="signupLabel">
                                Address Line 2:
                            </label>
                        </td>
                        <td>
                            <input
                                name="address2"
                                type="text"
                                placeholder=""
                                className="signupInput"
                                value={address2}
                                onChange={(event) => {
                                    setAddress2(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="city" className="signupLabel">
                                City:
                            </label>
                        </td>
                        <td>
                            <input
                                name="city"
                                type="text"
                                placeholder=""
                                className="signupInput"
                                value={city}
                                onChange={(event) => {
                                    setCity(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="state" className="signupLabel">
                                State:
                            </label>
                        </td>
                        <td>
                            <input
                                name="state"
                                type="text"
                                placeholder=""
                                className="signupInput"
                                value={state}
                                onChange={(event) => {
                                    setState(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="zipCode" className="signupLabel">
                                Zip Code:
                            </label>
                        </td>
                        <td>
                            <input
                                name="zipCode"
                                type="text"
                                placeholder=""
                                className="signupInput"
                                value={zipCode}
                                onChange={(event) => {
                                    setZipCode(event.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr rowSpan="2">
                        <td>
                            <button
                                onClick={createUser}
                                className="btn btn-default"
                                id="createBtn"
                            >
                                Create Account
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SignUp;
