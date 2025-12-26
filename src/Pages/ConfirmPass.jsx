import '../styles/ConfirmPass_Style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function ConfirmPass() {

    // handle eyes in password
    const [shownResetPassword, setResetPassword] = useState(false);
    const [shownConfirrmPassword, setConfirmPassword] = useState(false);

    const ResetPasswordVisibility = () => {
        setResetPassword(!shownResetPassword);
    };

    const ConfirmPasswordVisibility = () => {
        setConfirmPassword(!shownConfirrmPassword);
    };


    return (
        <>
            <div className='form-ResetPass'>
                <form>
                    <h1>Confirm password</h1>
                    <p>Remember your password? <a href='/Login_Register'> Login here</a></p>

                    <div className='input'>
                        <div className='input-box'>
                            <input
                                type={shownResetPassword ? 'text' : 'password'}
                                placeholder='Reset password'
                                required>
                            </input>
                            <i onClick={ResetPasswordVisibility}>
                                <FontAwesomeIcon icon={shownResetPassword ? faEyeSlash : faEye} />
                            </i>
                        </div>



                        <div className='input-box'>
                            <input
                                type={shownConfirrmPassword ? 'text' : 'password'}
                                placeholder='Confirm password'
                                required>
                            </input>
                            <i onClick={ConfirmPasswordVisibility}>
                                <FontAwesomeIcon icon={shownConfirrmPassword ? faEyeSlash : faEye} />
                            </i>
                        </div>

                        <button type='submit' className='btn-input'>Reset password</button>
                    </div>

                </form>
            </div>
        </>
    );
}
export default ConfirmPass;