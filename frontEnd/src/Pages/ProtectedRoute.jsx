import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';


const ProtectedRoute = () => {
    const [person, setPerson] = useState();
    // const [cookies, setCookies] = useCookies(["accessToken"]);
    // console.log(cookies)
    // const token = Cookies.get("accessToken");
    // console.log(token)

    useEffect(() => {
        fetchProtectedData();
    }, []);

    const fetchProtectedData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/auth/protectedRoute",
               { withCredentials:true}
        );
        console.log(response)
            const result = await response.data.username;
            // const result = await res.json();
            console.log(result);
            // if(res.data.message)
            setPerson(result);
            // if (token) {
            // }
        } catch (error) {
            console.log({ error: "invalid token" });

            alert("not authorized");
        }
    };
    return (
        <div>
            <h1>My page</h1>
            <h4>Welcome: {person}</h4>
        </div>
    )
}

export default ProtectedRoute
