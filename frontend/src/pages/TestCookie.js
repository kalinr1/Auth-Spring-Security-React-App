import './RegisterPage.css';
import { useState } from "react";
import RegisterButton from "../components/RegisterButton";
import {Link, useNavigate} from "react-router-dom";

const TestCookie = () => {



    const handleSubmit = async (e) => {
        e.preventDefault();


            try {
                const response = await fetch('http://localhost:8080/cookie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    console.log('cookie');
                    localStorage.setItem("test", 'cookie');
                } else {
                    console.log('no cookie')
                }
            } catch (error) {
                console.error('Error registering:', error);
            }

    };

    return (
        <div className="register-page-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <button>Get Cookie</button>
            </form>


        </div>
    );
};

export default TestCookie;
