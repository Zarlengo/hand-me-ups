import axios from 'axios';
import authHeader from './auth-header';

export default {
    getPublicContent: () => {
        return axios.get('/all');
    },

    getUserBoard: () => {
        return axios.get('/user', { headers: authHeader() });
    },

    getModeratorBoard: () => {
        return axios.get('/mod', { headers: authHeader() });
    },

    getAdminBoard: () => {
        return axios.get('/admin', { headers: authHeader() });
    },
};
