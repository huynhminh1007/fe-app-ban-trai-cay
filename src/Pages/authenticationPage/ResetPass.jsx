import '../../styles/authentication/ResetPass_Style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPass() {
    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');

    const handleResetSubmit = (e) => {
        e.preventDefault();

        // Lấy dữ liệu từ LocalStorage
        const storedUser = JSON.parse(localStorage.getItem('userAccount'));

        // Check email 
        if (storedUser && storedUser.email === emailInput) {
            navigate('/confirm-password');
        } else {
            alert("Email không tồn tại trong hệ thống!");
        }
    };

    return (

         <div className = 'formResetPass' >
            <div className='form-ResetPass'>
            <form onSubmit={handleResetSubmit}>
                <h1>Forgot password?</h1>
                <p>Remember your password? <a href='/'> Login here</a></p>

                <div className='input'>
                    <p>Email Address</p>
                    <input 
                        type='email' 
                        id='email' 
                        required 
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    /> 
                    <button type='submit' className='btn-input'>Reset password</button>
                </div>
            </form>
        </div>
         </div>
    );
}
export default ResetPass;