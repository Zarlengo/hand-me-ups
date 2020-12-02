import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
import TagCheckbox from '../TagCheckbox';
import './style.css';

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
    const [tags, setTags] = useState([]);
    const currentUser = API.getCurrentUser('');
    const [redirect, setRedirect] = useState(false);
    const [toyTags, settoyTags] = useState([]);
    const [clothesTags, setclothesTags] = useState([]);
    const [furnitureTags, setfurnitureTags] = useState([]);
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
            tags,
            ParentId: currentUser.id,
        }).then((response) => {
            if (response.status === 200) {
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
                    tags: tags,
                });
                localStorage.setItem('user', JSON.stringify(currentUser));
                setRedirect(true);
            }
        });
    };

    const handleTagClick = (event, id) => {
        event.preventDefault();
        setTags([...tags, id]);
    };

    useEffect(() => {
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
        <div className="addChild">
            <h2 className="addChildTitle">Add a Child</h2>
            <form className="addChildForm">
                <label htmlFor="fName" className="addChildLabel">
                    First Name:
                </label>
                <input
                    name="fName"
                    className="addChildInput"
                    type="text"
                    value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="lName" className="addChildLabel">
                    Last Name:
                </label>
                <input
                    name="lName"
                    className="addChildInput"
                    type="text"
                    value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="bDay" className="addChildLabel">
                    Birthday:
                </label>
                <input
                    name="bDay"
                    className="addChildInput"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={birthday}
                    onChange={(event) => {
                        setBirthday(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="gender" className="addChildLabel">
                    Gender:
                </label>
                <select
                    className="childSelect"
                    onChange={(event) => {
                        setGender(event.target.value);
                    }}
                >
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <br />
                <label htmlFor="receiveToys" className="addChildLabel">
                    Receive Toys:
                </label>
                <input
                    name="receiveToys"
                    className="addChildCheckbox"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setreceiveToys(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="receiveClothes" className="addChildLabel">
                    Receive Clothes:
                </label>
                <input
                    name="receiveClothes"
                    className="addChildCheckbox"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setreceiveClothes(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="receiveFurniture" className="addChildLabel">
                    Receive Furniture:
                </label>
                <input
                    name="receiveFurniture"
                    className="addChildCheckbox"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setreceiveFurniture(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="donateToys" className="addChildLabel">
                    Donate Toys:
                </label>
                <input
                    name="donateToys"
                    className="addChildCheckbox"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdonateToys(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="donateClothes" className="addChildLabel">
                    Donate Clothes:
                </label>
                <input
                    name="donateClothes"
                    className="addChildCheckbox"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdonateClothes(event.target.value);
                    }}
                />
                <br />
                <label htmlFor="donateFurniture" className="addChildLabel">
                    Donate Furniture:
                </label>
                <input
                    name="donateFurniture"
                    className="addChildCheckbox"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdonateFurniture(event.target.value);
                    }}
                />
                <br />
                <h3>Tell us your child&#8217;s interests:</h3>
                {toyTags.map((tag) => (
                    <TagCheckbox
                        key={tag.id}
                        tag={tag.tag}
                        id={tag.id}
                        onClick={handleTagClick}
                    />
                ))}
                <h3>Tell us what clothes you need:</h3>
                {clothesTags.map((tag) => (
                    <TagCheckbox
                        key={tag.id}
                        tag={tag.tag}
                        id={tag.id}
                        onClick={handleTagClick}
                    />
                ))}
                <h3>Tell us your furniture needs:</h3>
                {furnitureTags.map((tag) => (
                    <TagCheckbox
                        key={tag.id}
                        tag={tag.tag}
                        id={tag.id}
                        onClick={handleTagClick}
                    />
                ))}
                <button onClick={handleClick} className="btn btn-default">
                    Add Child
                </button>
            </form>
        </div>
    );
}
export default AddChild;
