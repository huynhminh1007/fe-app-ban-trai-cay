import '../../styles/authentication/Register_Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { faUser, faEye, faEyeSlash, faPhone, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; //hook
import DatePicker from 'react-datepicker';

function Register() {
    const navigate = useNavigate(); // tạo hook
    const [isActive, setIsActive] = useState(false);

    // State cho Register
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    // State cho Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [regDob, setRegDob] = useState(null); // state lịch
    const [regPhone, setRegPhone] = useState(''); // state SĐT

    // show password
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    // Chuyển đổi giữa Login/Register
    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    // Toggle ẩn hiện pass
    const toggleLoginPasswordVisibility = () => setShowLoginPassword(!showLoginPassword);
    const toggleRegisterPasswordVisibility = () => setShowRegisterPassword(!showRegisterPassword);

    // Logic đăng ký 
    const handleRegisterSubmit = (e) => {
        e.preventDefault(); // ko load lại trang

        const formattedDate = regDob ? regDob.toLocaleDateString('en-GB') : '';

        if (!regEmail || !regPassword || !regDob || !regPhone) {
            alert("Vui lòng nhập đầy đủ thông tin: Email, Mật khẩu, Ngày sinh và SĐT!");
            return;
        }

        const user = {
            email: regEmail,
            password: regPassword,
            dob: formattedDate,
            phone: regPhone
        };

        // Lưu vào LocalStorage (chuyển sang JSON)
        localStorage.setItem('userAccount', JSON.stringify(user));

        // Chuyển sang form Login và xóa input
        setIsActive(false);
        setRegEmail('');
        setRegPassword('');

        navigate('/otp-confirm');
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
                            <Link to="/reset-password">Quên mật khẩu ?</Link>
                        </div>

                        <button type='submit' className='btn'>Login</button>

                        <p>Hoặc đăng nhập với mạng xã hội</p>

                        <div className='social-icon'>
                            <a href='#'> <i className='google'><FaGoogle /></i> </a>
                            <a href='#'> <i className='facebook'><FaFacebook /></i> </a>
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

                        <div className='input-box'>
                            <DatePicker
                                selected={regDob}
                                onChange={(date) => setRegDob(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/mm/yyyy"
                                className="custom-datepicker"
                                open={false}
                                required
                            />
                            <i style={{ pointerEvents: 'none', zIndex: 10 }}><FontAwesomeIcon icon={faCalendar} /></i>
                        </div>

                        <div className='input-box'>
                            <input
                                type='tel'
                                placeholder='Phone Number'
                                required
                                pattern="[0-9]{10}"
                                title="Vui lòng nhập 10 chữ số"
                                value={regPhone}
                                onChange={(e) => setRegPhone(e.target.value)}
                            />
                            <i><FontAwesomeIcon icon={faPhone} /></i>
                        </div>

                        <button type='submit' className='btn'>
                            Đăng ký
                        </button>

                        <p>Hoặc đăng ký với mạng xã hội</p>

                        <div className='social-icon'>
                            <a href='#'> <i className='google'><FaGoogle /></i> </a>
                            <a href='#'> <i className='facebook'><FaFacebook /></i> </a>
                        </div>
                    </form>
                </div>

                <div className='toggle-box'>
                    <div className='toggle-box-panel left'>
                        <h1> Hello, Chào Mừng!</h1>
                        <p> Không có tài khoản?</p>
                        <button type="button" className='btn register-btn' onClick={handleRegisterClick}>Đăng ký</button>
                    </div>
                    <div className='toggle-box-panel right'>
                        <h1> Xin chào</h1>
                        <p> Đã có tài khoản?</p>
                        <button type="button" className='btn login-btn' onClick={handleLoginClick}>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;