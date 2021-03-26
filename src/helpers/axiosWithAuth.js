// Library imports
import axios from "axios";

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: `http://localhost:5000/`,
        headers: {
            authorization: token,
        },
    });
}

// Default export
export default axiosWithAuth;

//Task List:
//Build and export a function used to send in our authorization token