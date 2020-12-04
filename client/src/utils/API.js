import axios from 'axios';
import headers from './auth';

export default {
    getCharts: () => {
        return axios({
            url: './api/charts',
            method: 'GET',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    },

    getUser: (id) => {
        return axios({
            url: `./api/profile/${id}`,
            method: 'GET',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
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

    signup: (userData) => {
        return axios.post('./api/auth/signup', userData);
    },

    editUser: function (userData) {
        return axios({
            url: `/api/profile/${userData.id}`,
            userData,
            method: 'PUT',
            headers: headers(),
        });
    },

    addChild: function (userData) {
        return axios({
            url: '/api/child/addChild',
            data: userData,
            method: 'POST',
            headers: headers(),
        });
    },

    getChildren: function () {
        return axios({
            url: 'api/child/children',
            method: 'GET',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    },

    addDonation: function (userData) {
        return axios({
            url: 'api/donation/create',
            data: userData,
            method: 'POST',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    },

    deleteChild: function (childId) {
        return axios({
            url: `api/child/deleteChild/${childId}`,
            method: 'DELETE',
            headers: headers(),
        });
    },

    editChild: function (userData) {
        return axios({
            url: `api/child/editChild/${userData.id}`,
            data: userData,
            method: 'PUT',
            headers: headers(),
        });
    },

    getTags: function () {
        return axios({
            url: 'api/tags',
            method: 'GET',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                const toyTags = response.data.filter(
                    (element) => element.type === 'toy'
                );
                const clothesTags = response.data.filter(
                    (element) => element.type === 'clothes'
                );
                const furnitureTags = response.data.filter(
                    (element) => element.type === 'furniture'
                );
                return { toyTags, clothesTags, furnitureTags };
            }
            return 'Error getting tags';
        });
    },

    getLocations: function () {
        return axios({
            url: './api/google/locations',
            method: 'GET',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    },
};
