import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Showloading, HideLoading } from '../../redux/rootSlice.js';
import { Form } from 'antd';
import { message } from 'antd';
import API from '../../api/api.js';

const AdminIntro = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const User = useSelector((state) => state.currentUser);

    const onFinish = async (values) => {
        try {
            dispatch(Showloading());
            let res;
            if (portfolioData.intros && portfolioData.intros.userId) {
                // Update existing intro
                res = await API.post("/api/update-intro", {
                    ...values,
                    _id: portfolioData?.intros?._id,
                });
            } else {
                // Add new intro
                res = await API.post("/api/add-intro", {
                    ...values,
                    userId: User?.result?._id,
                });
            }
            dispatch(HideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    }

    return (
        <>{portfolioData && (
                <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.intros}>

                    <Form.Item name="welcomeText" label="Welcome-Text" rules={[{ required: true, message: 'Please input welcome text!' }]}>
                        <input placeholder='Intro' />
                    </Form.Item>
                    <Form.Item name="firstName" label="First-name" rules={[{ required: true, message: 'Please input your first name!' }]}>
                        <input placeholder='Firstname' />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last-name" rules={[{ required: true, message: 'Please input your last name!' }]}>
                        <input placeholder='Lastname' />
                    </Form.Item>
                    <Form.Item name="caption" label="Caption">
                        <input placeholder='Caption' />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input your description!' }]}>
                        <textarea placeholder='Description' />
                    </Form.Item>

                    <div className="flex justify-end w-full">
                        <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
                    </div>
                    
                </Form>
            )}
        </>
    )
}

export default AdminIntro;
