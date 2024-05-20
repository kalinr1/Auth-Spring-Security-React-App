import './RegisterPage.css';
import { useState } from "react";
import RegisterButton from "../components/RegisterButton";
import {Link, useNavigate} from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate();


    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validateField = (fieldName, value) => {
        const namePattern = /^[A-Za-z]+$/;
        const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        switch (fieldName) {
            case 'firstName':
                return namePattern.test(value.trim()) ? '' : `Please enter a valid first name`;
            case 'lastName':
                return namePattern.test(value.trim()) ? '' : `Please enter a valid last name`;
            case 'email':
                return emailPattern.test(value) ? '' : 'Please enter a valid email address';
            case 'password':
                return value.length >= 6 ? '' : 'Password must be at least 6 characters long';
            case 'confirmPassword':
                return value === formState.password ? '' : 'Passwords do not match';
            default:
                return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const fieldsToValidate = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
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
                const response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formState)
                });

                if (response.ok) {
                    console.log('Registration successful');
                    navigate("/login")
                } else {
                    const errorData = await response.json();
                    console.error('Registration failed:', errorData);
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
        <div className="register-page-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={formState.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                <input
                    type="text"
                    placeholder="Last Name"
                    value={formState.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formState.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                <button>Register</button>
            </form>
            <div className={"new-register-now-container"}>
                <p>Have an account?</p>
                <Link to={"/login"}>Login now.</Link>
            </div>

        </div>
    );
};

export default RegisterPage;
