import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.tsx";

const SignOut = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (authContext && authContext.loaded) {
            if (authContext.user) {
                authContext.logout();
            }
            navigate("/");
        }
    }, [authContext, navigate]);
    return (
        <>Logging out...</>
    );
};

export default SignOut;
