import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';

function ChildProfile(child) {
    const [redirect, setRedirect] = useState(false);
    const currentUser = API.getCurrentUser('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [showForm, setShowForm] = useState(false);

    const hideShowForm = () => {
        if (showForm) {
            setShowForm(false);
        } else {
            setShowForm(true);
        }
    };

    const deleteChild = (event) => {
        event.preventDefault();
        API.deleteChild(child.ParentId, child.childId).then((response) => {
            if (response.status === 200) {
                const childArray = currentUser.children;
                currentUser.children = childArray.filter((childObject) => {
                    return childObject.childId !== child.childId;
                });
                localStorage.setItem('user', JSON.stringify(currentUser));
                setRedirect(true);
            }
        });
    };

    const saveChanges = (event) => {
        event.preventDefault();
        API.editChild(
            {
                firstName,
                lastName,
                birthday,
                gender,
                id: child.childId,
            },
            currentUser.id
        ).then((response) => {
            if (response.status === 200) {
                const childArray = currentUser.children;
                currentUser.children = childArray.map((childObject) => {
                    if (childObject.childId !== child.childId) {
                        return childObject;
                    }
                    childObject.firstName = firstName;
                    childObject.lastName = lastName;
                    childObject.birthday = birthday;
                    childObject.gender = gender;
                    return childObject;
                });
                localStorage.setItem('user', JSON.stringify(currentUser));
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        setFirstName(child.firstName);
        setLastName(child.lastName);
        setBirthday(child.birthday);
        setGender(child.gender);
    }, []);

    if (redirect) {
        return <Redirect to="/Profile" />;
    }
    return (
        <div>
            <h2>Edit child profile</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="firstName">Firstname:</label>
                        </td>
                        <td>{child.firstName}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder={child.firstName}
                                    value={firstName}
                                    onChange={(event) => {
                                        setFirstName(event.target.value);
                                    }}
                                />
                            ) : (
                                <div />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="lastName">Last Name:</label>
                        </td>
                        <td>{child.lastName}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder={child.lastName}
                                    value={lastName}
                                    onChange={(event) => {
                                        setLastName(event.target.value);
                                    }}
                                />
                            ) : (
                                <div />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="birthday">Birthday:</label>
                        </td>
                        <td>{child.birthday}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="birthday"
                                    type="text"
                                    placeholder={child.birthday}
                                    value={birthday}
                                    onChange={(event) => {
                                        setBirthday(event.target.value);
                                    }}
                                />
                            ) : (
                                <div />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="gender">Gender:</label>
                        </td>
                        <td>{child.gender}</td>
                        {showForm ? (
                            <td>
                                <select
                                    onChange={(event) => {
                                        setGender(event.target.value);
                                    }}
                                >
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                            </td>
                        ) : (
                            <td></td>
                        )}
                    </tr>
                    <tr rowSpan="3">
                        <td>
                            {showForm ? (
                                <div>
                                    <button onClick={deleteChild}>
                                        Delete Child
                                    </button>
                                    <button onClick={saveChanges}>
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <button onClick={hideShowForm}>
                                    Edit Child
                                </button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default ChildProfile;
