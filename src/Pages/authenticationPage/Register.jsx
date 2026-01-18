import '../../styles/authentication/Register_Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; //hook

function Register() {
    const navigate = useNavigate(); // tạo hook
    const [isActive, setIsActive] = useState(false);

    // State cho Register
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    // State cho Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // show password
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    // Chuyển đổi giữa Login/Register
    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    // Toggle ẩn hiện pass
    const toggleLoginPasswordVisibility = () => setShowLoginPassword(!showLoginPassword);
    const toggleRegisterPasswordVisibility = () => setShowRegisterPassword(!showRegisterPassword);

    // Logic đăng ký để lưu thông tin vào LocalStorage
    const handleRegisterSubmit = (e) => {
        e.preventDefault(); // ko load lại trang

        if (!regEmail || !regPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Tạo user
        const user = {
            email: regEmail,
            password: regPassword
        };

        // Lưu vào LocalStorage (chuyển sang JSON)
        localStorage.setItem('userAccount', JSON.stringify(user));

        alert("Đăng ký thành công! Vui lòng đăng nhập.");

        // Chuyển sang form Login và xóa input
        setIsActive(false);
        setRegEmail('');
        setRegPassword('');
    };

    // Logic đăng nhập
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Lấy dữ liệu từ LocalStorage
        const storedUser = JSON.parse(localStorage.getItem('userAccount'));

        if (!storedUser) {
            alert("Chưa có tài khoản nào được đăng ký!");
            return;
        }

        // Check thông tin
        if (loginEmail === storedUser.email && loginPassword === storedUser.password) {
            // chuyển sang trang home
            navigate('/home');
        } else {
            alert("Sai email hoặc mật khẩu!");
        }
    };

    return (
        <div className='registerContainer'>
            <div className={`auth-container ${isActive ? 'active' : ''}`}>
                {/*  LOGIN  */}
                <div className='form-box login'>
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <i><FontAwesomeIcon icon={faUser} /></i>
                        </div>
                        <div className='input-box'>
                            <input
                                type={showLoginPassword ? 'text' : 'password'}
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <i onClick={toggleLoginPasswordVisibility}>
                                <FontAwesomeIcon icon={showLoginPassword ? faEyeSlash : faEye} />
                            </i>
                        </div>

                        <div className='forget-pass'>
                            <Link to="/reset-password">Forget Password</Link>
                        </div>

                        <button type='submit' className='btn'>Login</button>

                        <p>Or login with social platform</p>

                        <div className='social-icon'>
                            <a href='#'> <i><FaGoogle /></i> </a>
                            <a href='#'> <i><FaFacebook /></i> </a>
                        </div>
                    </form>
                </div>

                {/* REGISTER */}
                <div className='form-box register'>
                    <form onSubmit={handleRegisterSubmit}>
                        <h1>Register</h1>
                        <div className='input-box'>
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                            />
                            <i><FontAwesomeIcon icon={faUser} /></i>
                        </div>
                        <div className='input-box'>
                            <input
                                type={showRegisterPassword ? 'text' : 'password'}
                                placeholder='Password'
                                required
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                            />
                            <i onClick={toggleRegisterPasswordVisibility}>
                                <FontAwesomeIcon icon={showRegisterPassword ? faEyeSlash : faEye} />
                            </i>
                        </div>

                        <button type='submit' className='btn'>Register</button>

                        <p>Or register with social platform</p>

                        <div className='social-icon'>
                            <a href='#'> <i><FaGoogle /></i> </a>
                            <a href='#'> <i><FaFacebook /></i> </a>
                        </div>
                    </form>
                </div>

                <div className='toggle-box'>
                    <div className='toggle-box-panel left'>
                        <h1> Hello, Welcome!</h1>
                        <p> Don't have an account?</p>
                        <button type="button" className='btn register-btn' onClick={handleRegisterClick}>Register</button>
                    </div>
                    <div className='toggle-box-panel right'>
                        <h1> Welcome Back!</h1>
                        <p> Already have an account?</p>
                        <button type="button" className='btn login-btn' onClick={handleLoginClick}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;