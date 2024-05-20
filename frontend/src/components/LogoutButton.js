import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";


function LogoutButton(){

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();

        navigate('/')
    }

    const navigate = useNavigate();

    return (
        <button onClick={() => handleLogout()}>Logout</button>
    );
}

export default LogoutButton;