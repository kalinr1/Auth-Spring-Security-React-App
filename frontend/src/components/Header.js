import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RegisterButton from "./RegisterButton";
import './Header.css'
import { useAuth } from "../auth/AuthContext";

function Header(){

    const {isAuthenticated} = useAuth();

    return(
        <nav>
            {!isAuthenticated && <LoginButton/>}
            {!isAuthenticated && <RegisterButton/>}
            {isAuthenticated && <LogoutButton/>}

        </nav>
    );
}

export default Header