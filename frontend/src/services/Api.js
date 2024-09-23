import axios from "axios";
// const BASE_URL = "http://192.168.1.9:3000/api/v1";
// const BASE_URL = "http://localhost:3000/api/v1";
const BASE_URL = "https://paytm-backend-mv5i.onrender.com/api/v1";

// Function for making POST requests with authentication.
export const postAPIAuth = async (url, body) => {
    const token = localStorage.getItem("AccessToken");
    const response = await axios.post(`${BASE_URL}/${url}`, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    return response;
};

// Function for making POST requests without authentication.
export const postAPI = async (url, body) => {
    const response = await axios.post(`${BASE_URL}/${url}`, body);
    return response;
};

// Function for making GET request without authetication
export const getAPI = async (url) => {
    const response = await axios.get(`${BASE_URL}/${url}`);
    return response;
};

// Function for making GET request with authentication
export const getAPIAuth = async (url) => {
    const token = localStorage.getItem("AccessToken");
    const response = await axios.get(`${BASE_URL}/${url}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    return response;
};

// // patch api with authentication
// export const patchAPIAuth = async (url, body) => {
//   const token = JSON.parse(localStorage.getItem("AccessToken"));
//   const response = await axios.patch(`${BASE_URL}/${urSl}`, body, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//   });
//   return response;
// };

// // put api with authentication
export const putAPIAuth = async (url, body) => {
    const token = localStorage.getItem("AccessToken");
    const response = await axios.put(`${BASE_URL}/${url}`, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    return response;
};

// // delete api with authentication
// export const deleteAPIAuth = async (url) => {
//   const token = JSON.parse(localStorage.getItem("AccessToken"));
//   const response = await axios.delete(`${BASE_URL}/${url}`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//   });
//   return response;
// };