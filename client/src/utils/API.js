import axios from 'axios';

export default {
    getUser: (id) => {
        return axios.get(`./api/user/${id}`);
    },

    login: (userName, password) => {
        return axios
            .post('./api/auth/login', {
                userName,
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

    signup: (userName, password, address1, city, state, zipcode) => {
        return axios.post('./api/auth/signup', {
            userName,
            password,
            address1,
            city,
            state,
            zipcode,
        });
    },

    editUser: function (userData) {
        return axios.put(`/api/profile/${userData.id}`, userData);
    },

    addChild: function (userData) {
        return axios.post(
            `api/profile/addChild/${userData.parentId}`,
            userData
        );
    },
};
