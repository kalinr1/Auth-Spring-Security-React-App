import {useNavigate} from "react-router-dom";



function RegisterButton(){

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/register")}>Register</button>
    );
}

export default RegisterButton;