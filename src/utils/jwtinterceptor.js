import axios from "axios";

function jwtInterceptor() {
    axios.interceptors.request.use((req) => {
        const hasToken = Boolean(localStorage.getItem("token"));

        if (hasToken) {
            req.headers= {
                ...req.headers,
                Authorization: `Bearer ${localStorage.getItem("token")}`
            };
        }
        return req;
    });
    axios.interceptors.response.use((res) => {
        return res;
    }, (error) => {
        if (error.response && 
            error.response.status === 401 && 
            error.response.data.error.includes("Unauthorized")
        ){
            localStorage.removeItem("token");
            window.location.replace("/login");
        } 
        return Promise.reject(error);
    });
}

export default jwtInterceptor;