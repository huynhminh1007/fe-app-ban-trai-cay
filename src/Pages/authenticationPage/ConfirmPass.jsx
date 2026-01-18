import '../../styles/authentication/ConfirmPass_Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmPass() {
    const navigate = useNavigate();

    const [shownResetPassword, setResetPassword] = useState(false);
    const [shownConfirrmPassword, setConfirmPassword] = useState(false);

    // State lưu mật khẩu mới
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const ResetPasswordVisibility = () => setResetPassword(!shownResetPassword);
    const ConfirmPasswordVisibility = () => setConfirmPassword(!shownConfirrmPassword);

    const handleConfirmSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu 
        if (newPass !== confirmPass) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        // Lấy user cũ ra
        const storedUser = JSON.parse(localStorage.getItem('userAccount'));

        if (storedUser) {
            // Cập nhật mk mới vào user cũ
            storedUser.password = newPass;

            // Lưu lại vào LocalStorage
            localStorage.setItem('userAccount', JSON.stringify(storedUser));

            alert("Đổi mật khẩu thành công! Hãy đăng nhập lại.");
            navigate('/'); // back về trang Login
        }
    };

    return (
        <div className = 'formConfirmPass' >
            <div className='form-ResetPass'>
                <form onSubmit={handleConfirmSubmit}>
                    <h1>Confirm password</h1>
                    <p>Remember your password? <a href='/'> Login here</a></p>

                    <div className='input'>
                        <div className='input-box'>
                            <input
                                type={shownResetPassword ? 'text' : 'password'}
                                placeholder='New password'
                                required
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                            <i onClick={ResetPasswordVisibility}>
                                <FontAwesomeIcon icon={shownResetPassword ? faEyeSlash : faEye} />
                            </i>
                        </div>

                        <div className='input-box'>
                            <input
                                type={shownConfirrmPassword ? 'text' : 'password'}
                                placeholder='Confirm new password'
                                required
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                            />
                            <i onClick={ConfirmPasswordVisibility}>
                                <FontAwesomeIcon icon={shownConfirrmPassword ? faEyeSlash : faEye} />
                            </i>
                        </div>

                        <button type='submit' className='btn-input'>Update Password</button>
                    </div>
                </form>
            </div>
        </div >
    );
}
export default ConfirmPass;