import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // faCheckSquare,
    faTshirt,
    faChair,
    faChess,
} from '@fortawesome/free-solid-svg-icons';
function ChildProfile(child) {
    const [redirect, setRedirect] = useState(false);
    const currentUser = API.getCurrentUser('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [receiveToys, setreceiveToys] = useState();
    const [receiveClothes, setreceiveClothes] = useState();
    const [receiveFurniture, setreceiveFurniture] = useState();
    const [donateToys, setdonateToys] = useState();
    const [donateClothes, setdonateClothes] = useState();
    const [donateFurniture, setdonateFurniture] = useState();
    const [showForm, setShowForm] = useState(false);
    console.log(receiveToys);

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
                receiveToys,
                receiveClothes,
                receiveFurniture,
                donateToys,
                donateClothes,
                donateFurniture,
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
                    childObject.receiveToys = receiveToys;
                    childObject.receiveClothes = receiveClothes;
                    childObject.receiveFurniture = receiveFurniture;
                    childObject.donateToys = donateToys;
                    childObject.donateClothes = donateClothes;
                    childObject.donateFurniture = donateFurniture;
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
        setreceiveToys(child.receiveToys);
        setreceiveClothes(child.receiveClothes);
        setreceiveFurniture(child.receiveFurniture);
        setdonateToys(child.donateToys);
        setdonateClothes(child.donateClothes);
        setdonateFurniture(child.donateFurniture);
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
                        <td>
                            {showForm ? (
                                <select
                                    onChange={(event) => {
                                        setGender(event.target.value);
                                    }}
                                >
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="receiveToys">Receive Toys:</label>
                        </td>
                        <td>
                            {child.receiveToys ? (
                                <FontAwesomeIcon icon={faChess} />
                            ) : (
                                ''
                            )}
                        </td>
                        <td>
                            {showForm ? (
                                <input
                                    name="receiveToys"
                                    type="checkbox"
                                    checked={receiveToys}
                                    onChange={(event) => {
                                        setreceiveToys(event.target.checked);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="receiveClothes">
                                Receive Clothes:
                            </label>
                        </td>
                        <td>
                            {child.receiveClothes ? (
                                <FontAwesomeIcon icon={faTshirt} />
                            ) : (
                                ''
                            )}
                        </td>
                        <td>
                            {showForm ? (
                                <input
                                    name="receiveClothes"
                                    type="checkbox"
                                    checked={receiveClothes}
                                    onChange={(event) => {
                                        setreceiveClothes(event.target.checked);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="receiveFurniture">
                                Receive Furniture:
                            </label>
                        </td>
                        <td>
                            {child.receiveFurniture ? (
                                <FontAwesomeIcon icon={faChair} />
                            ) : (
                                ''
                            )}
                        </td>
                        <td>
                            {showForm ? (
                                <input
                                    name="receiveFurniture"
                                    type="checkbox"
                                    checked={receiveFurniture}
                                    onChange={(event) => {
                                        setreceiveFurniture(
                                            event.target.checked
                                        );
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="donateToys">Donate Toys:</label>
                        </td>
                        <td>
                            {child.donateToys ? (
                                <FontAwesomeIcon icon={faChess} />
                            ) : (
                                ''
                            )}
                        </td>
                        <td>
                            {showForm ? (
                                <input
                                    name="donateToys"
                                    type="checkbox"
                                    checked={donateToys}
                                    onChange={(event) => {
                                        setdonateToys(event.target.checked);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="donateClothes">
                                Donate Clothes:
                            </label>
                        </td>
                        <td>
                            {child.donateClothes ? (
                                <FontAwesomeIcon icon={faTshirt} />
                            ) : (
                                ''
                            )}
                        </td>
                        <td>
                            {showForm ? (
                                <input
                                    name="donateClothes"
                                    type="checkbox"
                                    checked={donateClothes}
                                    onChange={(event) => {
                                        setdonateClothes(event.target.checked);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="donateFurniture">
                                Donate Furniture:
                            </label>
                        </td>
                        <td>
                            {child.donateFurniture ? (
                                <FontAwesomeIcon icon={faChair} />
                            ) : (
                                ''
                            )}
                        </td>
                        <td>
                            {showForm ? (
                                <input
                                    name="donateFurniture"
                                    type="checkbox"
                                    checked={donateFurniture}
                                    onChange={(event) => {
                                        setdonateFurniture(
                                            event.target.checked
                                        );
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr></tr>
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
