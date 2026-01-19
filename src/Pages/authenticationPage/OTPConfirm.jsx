import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/authentication/OTPConfirm.css';

const OTPConfirm = () => {
    const navigate = useNavigate();
    const [otpInput, setOtpInput] = useState('');

    // State lưu OTP 
    const [currentDisplayOTP, setCurrentDisplayOTP] = useState(() => {
        const savedOTP = localStorage.getItem('currentOTP');
        const maxValue = 999999;
        const minValue = 100000;
        return savedOTP ? savedOTP : Math.floor(Math.random() * (maxValue - minValue + 1) + minValue).toString();
    });

    const [timeLeft, setTimeLeft] = useState(30); // đếm ngược 30s

    // OTP ngẫu nhiên
    const generateNewOTP = () => {
        const maxValue = 999999;
        const minValue = 100000;
        const newOTP = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue).toString();
        return newOTP;
    };

    useEffect(() => {
        localStorage.setItem('currentOTP', currentDisplayOTP);
    }, [currentDisplayOTP]);

    // Tự đếm ngược và đổi mã
    useEffect(() => {
        //  bộ đếm chạy 1 giây
        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    const newCode = generateNewOTP();// Tạo mã OTP mới

                    setCurrentDisplayOTP(newCode);

                    localStorage.setItem('currentOTP', newCode); //update LocalStorage

                    return 30;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timerInterval);
    }, []);

    const handleOTPSubmit = (e) => {
        e.preventDefault();

        if (otpInput === currentDisplayOTP) {
            const useOTP = localStorage.getItem('userAccount');

            if (useOTP) {
                localStorage.setItem('currentUser', useOTP); 
            }

            localStorage.removeItem('currentOTP');

            navigate('/');
        } else {
            alert("Mã OTP không đúng vui lòng kiểm tra lại.");
        }
    };

    return (
        <div className="otpContainer">
            <div className="form-OTP">
                <form onSubmit={handleOTPSubmit}>
                    <h1>Xác thực OTP</h1>

                    <div className="otp-display-box">
                        <p className="otp-text">
                            Mã OTP của bạn là: <span className="highlight-otp">{currentDisplayOTP}</span>
                        </p>
                        <p className="timer-text">
                            Thời gian còn lại: <span className="highlight-timer">{timeLeft}s</span>
                        </p>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder=""
                            maxLength="6"
                            required
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn-otp">
                        Xác nhận & Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OTPConfirm;