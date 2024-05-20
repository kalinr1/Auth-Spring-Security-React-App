import LoginButton from "../components/LoginButton";
import './LoginPage.css'
import {useAuth} from "../auth/AuthContext";

const DashboardPage = () => {

    return (
        <div className="login-page-container">
            DASHBOARD
        </div>
    );
};

export default DashboardPage



//const navigate = useNavigate();
//
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//
//     const validateEmail = () => {
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(email)) {
//             setEmailError('Please enter a valid email address');
//             return false;
//         }
//         return true;
//     };
//
//     const handleLogin = (e) => {
//         e.preventDefault();
//         // Reset previous validation errors
//         setEmailError('');
//         setPasswordError('');
//
//         // Perform validation
//         let isValid = true;
//
//         // Validate email
//         isValid = validateEmail() && isValid;
//
//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             isValid = false;
//         }
//
//         // If form is valid, proceed with login
//         if (isValid) {
//             // Here you can add your authentication logic
//             // For simplicity, just redirect to another page after login
//             navigate('/dashboard');
//         }
//     };