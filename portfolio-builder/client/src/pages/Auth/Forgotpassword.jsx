import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import Loader from '../../components/Loader';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ visible, onCancel }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            message.info("Enter email to send the reset link");
            return;
        }
        setLoading(true);

        API.post('/user/forgot-password', {
            email,
        }).then(response => {
            if (response.data.status) {
                message.success(`Password reset link is sent to ${email}`);
                navigate('/');
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false); // Move setLoading to finally block to ensure it's reset whether the request succeeds or fails
            onCancel(); // Always close the modal after request completion
            setEmail(''); // Reset email field
        });
    };

    return (
        <Modal
            title="Forgot Password"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                </Button>,
            ]}
        >
            {loading ? <Loader /> : ( // Render Loader conditionally
                <div>
                    <p>Please enter your email address:</p>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
            )}
        </Modal>
    );
};

export default ForgotPassword;
