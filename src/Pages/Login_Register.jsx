import '../styles/RegisterStyle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa"; 
import { useState } from 'react';

function Register() {
    //handle change the interface login - register 
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };


    // handle eyes in password
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    
    const toggleLoginPasswordVisibility = () => {
        setShowLoginPassword(!showLoginPassword);
    };

    const toggleRegisterPasswordVisibility = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };

    return (
        <>
            <div className={`container ${isActive ? 'active' : ''}`}>
                <div className='form-box login'>
                    <form>
                        <h1>Login</h1>

                        <div className='input-box'>
                            <input type='email' placeholder='Email' required></input>
                            <i><FontAwesomeIcon icon={faUser} /></i>
                        </div>

                        <div className='input-box'>
                            <input
                                type={showLoginPassword ? 'text' : 'password'}
                                placeholder='Password'
                                required>
                            </input>
                            <i onClick={toggleLoginPasswordVisibility}>
                                <FontAwesomeIcon icon={showLoginPassword ? faEyeSlash : faEye} />
                            </i>
                        </div>

                        <div className='forget-pass'>
                            <a href='#'>Forget Password</a>
                        </div>

                        <button type='submit' className='btn'>Login</button>

                        <p>Or login with social platform</p>

                        <div className='social-icon'>
                            <a href='#'> <i><FontAwesomeIcon icon={faEye} /></i> </a>
                            <a href='#'> <i><FontAwesomeIcon icon={faEyeSlash} /></i> </a>
                        </div>
                    </form>
                </div>


                <div className='form-box register'>
                    <form>
                        <h1>Register</h1>

                        <div className='input-box'>
                            <input type='email' placeholder='Email' required></input>
                            <i><FontAwesomeIcon icon={faUser} /></i>
                        </div>

                        <div className='input-box'>
                            <input
                                type={showRegisterPassword ? 'text' : 'password'}
                                placeholder='Password'
                                required>
                            </input>
                            <i onClick={toggleRegisterPasswordVisibility}>
                                <FontAwesomeIcon icon={showRegisterPassword ? faEyeSlash : faEye} />
                            </i>
                        </div>

                        <div className='forget-pass link'>
                            <a href='#'>Forget Password</a>
                        </div>

                        <button type='submit' className='btn'>Register</button>

                        <p>Or register with social platform</p>
                        <div className='social-icon'>
                            <a href='#'> <FaFacebook /> </a>
                            <a href='#'> <FaYoutube /></a>
                            <a href='#'> <FaTiktok /></a>
                        </div>
                    </form>
                </div>

                <div className='toggle-box'>
                    <div className='toggle-box-panel left'>
                        <h1> Hello, Wellcome!</h1>
                        <p> Don't have an account?</p>
                        <button type="button" className='btn register-btn' onClick={handleRegisterClick}>Register</button>
                    </div>

                    <div className='toggle-box-panel right'>
                        <h1> Wellcome Back!</h1>
                        <p> Already have an account?</p>
                        <button type="button" className='btn login-btn' onClick={handleLoginClick}>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login_Register;