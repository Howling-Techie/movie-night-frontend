import {useEffect} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from 'react-router-dom';

const SignOut = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            logout();
        }
        navigate("/");
    }, [user]);
    return (
        <>Logging out...</>
    );
};

export default SignOut;
