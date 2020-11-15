import React, { useState, useEffect } from 'react';
// import API from '../../utils/API';

function Profiles() {
    const [id, setId] = useState();
    const [userName, setUsername] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipcode, setZipcode] = useState();
    const getProfile = () => {
        fetch(`api/profile/${id}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result[0]);
                setUsername(result[0].userName);
                setAddress(result[0].address1);
                setCity(result[0].city);
                setState(result[0].state);
                setZipcode(result[0].zipcode);
            })
            .catch((error) => console.log(error));
    };
    // const editProfile = (id) => {
    //     API.editUser()
    //         .then(() => {
    //             dispatch({
    //                 type: ,
    //                 _id: id,
    //             });
    //         })
    //         .catch((err) => console.log(err));
    // };

    useEffect(() => {
        setId(1);
        getProfile();
        // editProfile();
    }, []);

    return (
        <div>
            <h2>Edit your profile</h2>
            <tr>
                <th>Username:{userName} </th>
                <th>Address:{address} </th>
                <th>City:{city} </th>
                <th>State:{state} </th>
                <th>Zipcode:{zipcode} </th>
                <button>Edit</button>
            </tr>

            <form>
                <th>Username:</th>
                <input type="text" />
                <th>Address:</th>
                <input type="text" />
                <th>City:</th>
                <input type="text" />
                <th>State:</th>
                <input type="text" />
                <th>Zipcode:</th>
                <input type="text" />
                <button>Update</button>
            </form>
        </div>
    );
}

export default Profiles;
