import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Components/UserComponents/Loading/Loading";

export const Protected = () => {
   
    const [isVerified, setIsVerified] = useState(null);

   
    useEffect(() => {
        const verifySession = async () => {
            
            await axios.get('http://localhost:3333/api/v2/createResetSession')
                .then((res) => {
                    if (res.data.flag === true) {
                        setIsVerified(true);
                    } else {
                        setIsVerified(false);
                    }
                })
                .catch((err) => {
                       
                    setIsVerified(false);
                })
        };

        verifySession();
    }, []);

   

    if (isVerified === null) {
       
        return <div className="h-screen"><Loading /></div>;
    }

    return isVerified ? <Outlet /> : <Navigate to={'/forgot-password'}></Navigate>
};


export const LoginProtectedRoute = () => {
    const user = useSelector((state) => state.auth.auth.user);
   

    return !user ? <Outlet /> : <Navigate to={'/'}></Navigate>
}