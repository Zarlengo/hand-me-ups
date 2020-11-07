import axios from 'axios';

export default {
    getUser: function (id) {
        return axios.get(`./api/user/${id}`);
    },
};
