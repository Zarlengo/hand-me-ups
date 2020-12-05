import axios from 'axios';
import headers from './auth';

export default {
    getCharts: () => {
        return axios({
            url: './api/charts',
            method: 'GET',
            baseURL: '/',
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
            baseURL: '/',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    },

    getLoggedOn: () => {
        return axios({
            url: './api/profile/loggedOn',
            method: 'GET',
            baseURL: '/',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    },

    login: (email, password) => {
        return axios({
            url: './api/auth/login',
            method: 'POST',
            baseURL: '/',
            data: {
                email,
                password,
            },
        }).then((response) => {
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
        return axios({
            url: './api/auth/signup',
            method: 'POST',
            baseURL: '/',
            data: userData,
        });
    },

    editUser: function (userData) {
        return axios({
            url: `/api/profile/${userData.id}`,
            data: userData,
            method: 'PUT',
            baseURL: '/',
            headers: headers(),
        });
    },

    addChild: function (userData) {
        return axios({
            url: '/api/child/addChild',
            data: userData,
            method: 'POST',
            baseURL: '/',
            headers: headers(),
        });
    },

    getChildren: function () {
        return axios({
            url: 'api/child/children',
            method: 'GET',
            baseURL: '/',
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
            baseURL: '/',
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
            baseURL: '/',
            headers: headers(),
        });
    },

    editChild: function (userData) {
        return axios({
            url: `api/child/editChild/${userData.id}`,
            data: userData,
            method: 'PUT',
            baseURL: '/',
            headers: headers(),
        });
    },

    getTags: function () {
        return axios({
            url: './api/tags',
            method: 'GET',
            baseURL: '/',
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
            baseURL: '/',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    },

    getShipments: function () {
        return axios({
            url: './api/donation/shipment',
            method: 'GET',
            baseURL: '/',
            headers: headers(),
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    },
};
