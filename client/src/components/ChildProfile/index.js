import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTshirt,
    faChair,
    faChess,
    faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';
import EditTagCheckbox from '../EditTagCheckbox';
import './style.css';

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
    const [toyTags, settoyTags] = useState([]);
    const [clothesTags, setclothesTags] = useState([]);
    const [furnitureTags, setfurnitureTags] = useState([]);
    const [tags, setTags] = useState([]);

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
                tags,
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
                    childObject.tags = tags;
                    return childObject;
                });
                localStorage.setItem('user', JSON.stringify(currentUser));
                window.location.reload();
            }
        });
    };

    const handlecheckboxClick = (id) => {
        if (tags.includes(id)) {
            setTags(tags.filter((tag) => tag !== id));
        } else {
            setTags([...tags, id]);
        }
    };

    const reload = () => {
        window.location.reload();
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
        if (child.tags) {
            setTags(child.tags);
        }
        API.getTags().then((response) => {
            console.log(response);
            if (response !== 'Error getting tags') {
                settoyTags(response.toyTags);
                setclothesTags(response.clothesTags);
                setfurnitureTags(response.furnitureTags);
            }
        });
    }, []);

    if (redirect) {
        return <Redirect to="/Profile" />;
    }
    return (
        <div className="childProfile">
            <h2 className="editChildTitle">
                Edit {child.firstName}&#8217;s profile
            </h2>
            <table className="table">
                <tbody id="childTableBody">
                    <tr>
                        <td>
                            <label
                                htmlFor="firstName"
                                className="editChildLabel"
                            >
                                Firstname:
                            </label>
                        </td>
                        <td>{child.firstName}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="firstName"
                                    className="editChildInput"
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
                            <label
                                htmlFor="lastName"
                                className="editChildLabel"
                            >
                                Last Name:
                            </label>
                        </td>
                        <td>{child.lastName}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="lastName"
                                    className="editChildInput"
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
                            <label
                                htmlFor="birthday"
                                className="editChildLabel"
                            >
                                Birthday:
                            </label>
                        </td>
                        <td>{child.birthday}</td>
                        <td>
                            {showForm ? (
                                <input
                                    name="birthday"
                                    className="editChildInput"
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
                            <label htmlFor="gender" className="editChildLabel">
                                Gender:
                            </label>
                        </td>
                        <td>{child.gender}</td>
                        <td>
                            {showForm ? (
                                <select
                                    className="childSelect"
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
                            <label
                                htmlFor="receiveToys"
                                className="editChildLabel"
                            >
                                Receive Toys:
                            </label>
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
                                    className="editChildCheckbox"
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
                            <label
                                htmlFor="receiveClothes"
                                className="editChildLabel"
                            >
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
                                    className="editChildCheckbox"
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
                            <label
                                htmlFor="receiveFurniture"
                                className="editChildLabel"
                            >
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
                                    className="editChildCheckbox"
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
                            <label
                                htmlFor="donateToys"
                                className="editChildLabel"
                            >
                                Donate Toys:
                            </label>
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
                                    className="editChildCheckbox"
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
                            <label
                                htmlFor="donateClothes"
                                className="editChildLabel"
                            >
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
                                    className="editChildCheckbox"
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
                            <label
                                htmlFor="donateFurniture"
                                className="editChildLabel"
                            >
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
                                    className="editChildCheckbox"
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
                    {toyTags.map((tag) => (
                        <EditTagCheckbox
                            tag={tag.tag}
                            tags={tags}
                            id={tag.id}
                            key={tag.id}
                            icon={faCheckSquare}
                            Icon={FontAwesomeIcon}
                            edit={showForm}
                            onClick={handlecheckboxClick}
                        />
                    ))}
                    {clothesTags.map((tag) => (
                        <EditTagCheckbox
                            tag={tag.tag}
                            tags={tags}
                            id={tag.id}
                            key={tag.id}
                            icon={faCheckSquare}
                            Icon={FontAwesomeIcon}
                            edit={showForm}
                            onClick={handlecheckboxClick}
                        />
                    ))}
                    {furnitureTags.map((tag) => (
                        <EditTagCheckbox
                            tag={tag.tag}
                            tags={tags}
                            id={tag.id}
                            key={tag.id}
                            icon={faCheckSquare}
                            Icon={FontAwesomeIcon}
                            edit={showForm}
                            onClick={handlecheckboxClick}
                        />
                    ))}
                    <tr></tr>
                </tbody>
            </table>
            {showForm ? (
                <div className="btnDiv">
                    <button className="btn btn-default" onClick={deleteChild}>
                        Delete Child
                    </button>
                    <button className="btn btn-default" onClick={saveChanges}>
                        Save Changes
                    </button>
                    <button className="btn btn-default" onClick={reload}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="btnDiv">
                    <button className="btn btn-default" onClick={hideShowForm}>
                        Edit Child
                    </button>
                </div>
            )}
        </div>
    );
}
export default ChildProfile;
