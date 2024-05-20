import LoginButton from "../components/LoginButton";
import './LoginPage.css'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";
import Cookies from 'js-cookie';

const LoginPage = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});


    const validateField = (fieldName, value) => {
        const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        switch (fieldName) {
            case 'email':
                return emailPattern.test(value) ? '' : 'Please enter a valid email address';
            case 'password':
                return value.length >= 6 ? '' : 'Password must be at least 6 characters long';
            default:
                return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const fieldsToValidate = ['email', 'password'];
        const newErrors = {};
        let isValid = true;

        fieldsToValidate.forEach(fieldName => {
            const fieldError = validateField(fieldName, formState[fieldName]);
            if (fieldError) {
                newErrors[fieldName] = fieldError;
                isValid = false;
            }
        });

        if (isValid) {
            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(formState)
                });

                if (response.ok) {
                    const authTokenCookie = Cookies.get('auth_token');
                    login(authTokenCookie)
                    navigate("/")
                } else {
                    const errorData = await response.json();
                    console.error('Login failed:', errorData);
                    const formattedErrors = {};
                    errorData.forEach(error => {
                        formattedErrors[error.field] = error.defaultMessage;
                    });
                    setErrors(formattedErrors);
                    console.log(formattedErrors)
                }
            } catch (error) {
                console.error('Error registering:', error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleChange = (fieldName, value) => {
        setFormState(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    return (
        <div className="login-page-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
                <input
                    type="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
                <LoginButton />
            </form>
            <div className={"new-register-now-container"}>
                <p>New?</p>
                <Link to={"/register"}>Register now.</Link>
            </div>
        </div>
    );
};

export default LoginPage