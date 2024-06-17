import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (authContext && authContext.loaded && !authContext.user) {
            authContext.login();
        }
        navigate("/");
    }, [authContext, navigate]);
    return (
        <>Logging in...</>
    );
};

export default SignIn;
