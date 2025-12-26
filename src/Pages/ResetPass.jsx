import '../styles/ResetPass_Style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ResetPass() {
    return (
        <>
            <div className='form-ResetPass'>
                <form>
                    <h1>Forgot password?</h1>
                    <p>Remember your password? <a href='/Login_Register'> Login here</a></p>

                    <div className='input'>
                        <p>Email Address</p>
                        <input type='email' id='email' required></input> 
                        <button type='submit' className='btn-input'>Reset password</button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default ResetPass;