import React, { useState, useEffect } from 'react';
import { HiRefresh } from "react-icons/hi";
const CaptchaComponent = ({ onChangeCaptcha }) => {
    const [captcha, setCaptcha] = useState('');

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(result);
        onChangeCaptcha(result);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    return (
        <div className="gap-2 d-flex">
            <div style={{
                background: '#eee',
                padding: '5px 15px',
                display: 'inline-block',
                fontFamily: 'monospace',
                letterSpacing: '3px',
                fontSize: '25px',
                minWidth: '150px',
                textAlign: 'center',
            }}>
                {captcha}
            </div>
            <button className="btn btn-primary" type="button" onClick={generateCaptcha}
                style={{ marginLeft: '10px' }}>
                <HiRefresh />
            </button>
        </div>
    );
};

export default CaptchaComponent;

