import {useEffect} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from 'react-router-dom';

const SignIn = () => {
    const {user, login} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            login();
        }
        navigate("/");
    }, [user]);
    return (
        <>Logging in...</>
    );
};

export default SignIn;
