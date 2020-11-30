import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
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
    const [dolls, setdolls] = useState(false);
    const [actionFigures, setactionFigures] = useState(false);
    const [sports, setsports] = useState(false);
    const [buildingEngineering, setbuildingengineering] = useState(false);
    const [gamesPuzzles, setgamesPuzzles] = useState(false);
    const [artSupplies, setartSupplies] = useState(false);
    const [bikeTrikeScooter, setbikeTrikeScooter] = useState(false);
    const [bouncerWalker, setbouncerWalker] = useState(false);
    const [educationStem, seteducationStem] = useState(false);
    const [toys0, settoys0] = useState(false);
    const [dressupCostumes, setdressupCostumes] = useState(false);
    const [books01, setbooks01] = useState(false);
    const [books23, setbooks23] = useState(false);
    const [books45, setbooks45] = useState(false);
    const [books68, setbooks68] = useState(false);
    const [books9, setbooks9] = useState(false);
    const [pants, setpants] = useState(false);
    const [shirts, setshirts] = useState(false);
    const [sweaterSweatshirt, setsweaterSweatshirt] = useState(false);
    const [jacketsSnowpants, setjacketsSnowpants] = useState(false);
    const [hatsGlovesScarves, sethatsGlovesScarves] = useState(false);
    const [snowboots, setsnowboots] = useState(false);
    const [dressupHoliday, setdressupHoliday] = useState(false);
    const [cribs, setcribs] = useState(false);
    const [changingTable, setchangingTable] = useState(false);
    const [dresser, setdresser] = useState(false);
    const [toddlerBed, settoddlerBed] = useState(false);
    const [twinBed, settwinBed] = useState(false);
    const [organizingShelving, setorganizingShelving] = useState(false);
    const [desk, setdesk] = useState(false);
    const [chairs, setchairs] = useState(false);
    const [stepStools, setstepStools] = useState(false);
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
            dolls,
            actionFigures,
            sports,
            buildingEngineering,
            gamesPuzzles,
            artSupplies,
            bikeTrikeScooter,
            bouncerWalker,
            educationStem,
            toys0,
            dressupCostumes,
            books01,
            books23,
            books45,
            books68,
            books9,
            pants,
            shirts,
            sweaterSweatshirt,
            jacketsSnowpants,
            hatsGlovesScarves,
            snowboots,
            dressupHoliday,
            cribs,
            changingTable,
            dresser,
            toddlerBed,
            twinBed,
            organizingShelving,
            desk,
            chairs,
            stepStools,
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
                <label htmlFor="dolls">Dolls:</label>
                <input
                    name="dolls"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdolls(event.target.value);
                    }}
                />
                <label htmlFor="actionFigures">Action Figures:</label>
                <input
                    name="actionFigures"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setactionFigures(event.target.value);
                    }}
                />
                <label htmlFor="sports">Sports:</label>
                <input
                    name="sports"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setsports(event.target.value);
                    }}
                />
                <label htmlFor="buildingEngineering">
                    Building&#47;Engineering:
                </label>
                <input
                    name="buildingengineering"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setbuildingengineering(event.target.value);
                    }}
                />
                <label htmlFor="gamesPuzzles">Games&#47;Puzzles:</label>
                <input
                    name="gamesPuzzles"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setgamesPuzzles(event.target.value);
                    }}
                />
                <label htmlFor="artSupplies">Art Supplies:</label>
                <input
                    name="artSupplies"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setartSupplies(event.target.value);
                    }}
                />
                <label htmlFor="bikeTrikeScooter">
                    Bike&#47;Trike&#47;Scooter:
                </label>
                <input
                    name="bikeTrikeScooter"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setbikeTrikeScooter(event.target.value);
                    }}
                />
                <label htmlFor="bouncerWalker">Bouncer&#47;Walker:</label>
                <input
                    name="bouncerWalker"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setbouncerWalker(event.target.value);
                    }}
                />
                <label htmlFor="educationStem">Education&#47;Stem:</label>
                <input
                    name="educationStem"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        seteducationStem(event.target.value);
                    }}
                />
                <label htmlFor="toys0">Toys 0-2 yrs old:</label>
                <input
                    name="toys0"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        settoys0(event.target.value);
                    }}
                />
                <label htmlFor="dressupCostumes">Dress-up&#47;Costumes:</label>
                <input
                    name="dressupCostumes"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdressupCostumes(event.target.value);
                    }}
                />
                <label htmlFor="books01">Books 0-1:</label>
                <input
                    name="books01"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setbooks01(event.target.value);
                    }}
                />
                <label htmlFor="books23">Books 2-3:</label>
                <input
                    name="books23"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setbooks23(event.target.value);
                    }}
                />
                <label htmlFor="books45">Books 4-5:</label>
                <input
                    name="books45"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setbooks45(event.target.value);
                    }}
                />
                <label htmlFor="books68">Books 6-8:</label>
                <input
                    name="books68"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setbooks68(event.target.value);
                    }}
                />
                <label htmlFor="books9">Books 9+:</label>
                <input
                    name="books9"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setbooks9(event.target.value);
                    }}
                />
                <br />
                <h3>Tell us what clothes you need:</h3>
                <label htmlFor="pants">Pants:</label>
                <input
                    name="pants"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setpants(event.target.value);
                    }}
                />
                <label htmlFor="shirts">Shirts:</label>
                <input
                    name="shirts"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setshirts(event.target.value);
                    }}
                />
                <label htmlFor="sweaterSweatshirt">
                    Sweater&#47;Sweatshirt:
                </label>
                <input
                    name="sweaterSweatshirt"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setsweaterSweatshirt(event.target.value);
                    }}
                />
                <label htmlFor="jacketsSnowpants">Jackets&#47;Snowpants:</label>
                <input
                    name="jacketsSnowpants"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setjacketsSnowpants(event.target.value);
                    }}
                />
                <label htmlFor="hatsGlovesScarves">
                    Hats&#47;Gloves&#47;Scarves:
                </label>
                <input
                    name="hatsGlovesScarves"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        sethatsGlovesScarves(event.target.value);
                    }}
                />
                <label htmlFor="snowboots">Snowboots:</label>
                <input
                    name="snowboots"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setsnowboots(event.target.value);
                    }}
                />
                <label htmlFor="dressupHoliday">Dress-up&#47;Holiday:</label>
                <input
                    name="dressupHoliday"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdressupHoliday(event.target.value);
                    }}
                />
                <br />
                <h3>Tell us your furniture needs:</h3>
                <label htmlFor="cribs">Crib&#47;Convertable Crib:</label>
                <input
                    name="cribs"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setcribs(event.target.value);
                    }}
                />
                <label htmlFor="changingTable">Changing Table:</label>
                <input
                    name="changingTable"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setchangingTable(event.target.value);
                    }}
                />
                <label htmlFor="dresser">Dresser:</label>
                <input
                    name="dresser"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdresser(event.target.value);
                    }}
                />
                <label htmlFor="toddlerBed">Toddler bed:</label>
                <input
                    name="toddlerBed"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        settoddlerBed(event.target.value);
                    }}
                />
                <label htmlFor="twinBed">Twin bed:</label>
                <input
                    name="twinBed"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        settwinBed(event.target.value);
                    }}
                />
                <label htmlFor="organizingShelving">
                    Organizing&#47;Shelving:
                </label>
                <input
                    name="organizingShelving"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setorganizingShelving(event.target.value);
                    }}
                />
                <label htmlFor="desk">Desk:</label>
                <input
                    name="desk"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setdesk(event.target.value);
                    }}
                />
                <label htmlFor="chairs">
                    Chairs&#47;Highchairs&#47;Storytime chairs:
                </label>
                <input
                    name="chairs"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setchairs(event.target.value);
                    }}
                />
                <label htmlFor="stepStools">Step Stools:</label>
                <input
                    name="stepStools"
                    type="checkbox"
                    value={true}
                    onChange={(event) => {
                        setstepStools(event.target.value);
                    }}
                />
                <br />
                <button onClick={handleClick} className="btn btn-default">
                    Add Child
                </button>
            </form>
        </div>
    );
}
export default AddChild;
