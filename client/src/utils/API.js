import axios from 'axios';
import headers from './auth';

export default {
    getUser: (id) => {
        return axios.get({
            url: `./api/user/${id}`,
            headers: headers(),
        });
    },

    login: (email, password) => {
        return axios
            .post('./api/auth/login', {
                email,
                password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response;
            });
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => JSON.parse(localStorage.getItem('user')),

    signup: (email, password, address1, city, state, zipcode) => {
        return axios.post('./api/auth/signup', {
            email,
            password,
            address1,
            city,
            state,
            zipcode,
        });
    },

    editUser: function (userData) {
        return axios.put({
            url: `/api/profile/${userData.id}`,
            userData,
            headers: headers(),
        });
    },

    addChild: function (userData) {
        return axios({
            url: `api/profile/addChild/${userData.ParentId}`,
            data: userData,
            method: 'POST',
            headers: headers(),
        });
    },
};
