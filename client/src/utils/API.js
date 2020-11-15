import axios from 'axios';

export default {
    getUser: function (id) {
        return axios.get(`./api/user/${id}`);
    },
    editUser: function (userData) {
        return axios.put('/api/posts', userData);
    },
};
