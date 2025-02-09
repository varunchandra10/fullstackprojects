import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Showloading, HideLoading } from '../../redux/rootSlice.js';
import { Form, message } from 'antd';
import API from '../../api/api.js';

const AdminCon = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const User = useSelector((state) => state.currentUser);
    const currentUserId = User?.result?._id;

    const shareableLink = `${window.location.origin}/portfolio/${currentUserId}`

    const onFinish = async (values) => {
        try {
            dispatch(Showloading());
            let res;
            if (portfolioData.contacts && portfolioData.contacts.userId) {
                res = await API.post("/api/update-contact", {
                    ...values,
                    _id: portfolioData?.contacts?._id,
                });
            } else {
                res = await API.post("/api/add-contact", {
                    ...values,
                    userId: User?.result?._id,
                })
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
        <>
            {portfolioData && (
                <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.contacts} className='pb-10'>

                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                        <input placeholder='Name' />
                    </Form.Item>
                    <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <input placeholder='E-mail' />
                    </Form.Item>
                    <Form.Item name="mobile" label="Mobile number" rules={[{ required: true, message: 'Please input your mobile number!' }]}>
                        <input placeholder='Mobile number' />
                    </Form.Item>
                    <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input your age!' }]}>
                        <input placeholder='Age' />
                    </Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
                        <input placeholder='Address' />
                    </Form.Item>
                    <Form.Item name="resume" label="Shareable Resume link" rules={[{ required: true, message: 'Please input your Resume link!' }]}>
                        <input placeholder='Paste your Resume link' />
                    </Form.Item>
                    <Form.Item name="github" label="Github profile" rules={[{ required: true, message: 'Please input your Github profile link!' }]}>
                        <input placeholder='Paste your Github profile link' />
                    </Form.Item>
                    <Form.Item name="linkedIn" label="LinkedIn profile" rules={[{ required: true, message: 'Please input your LinkedIn profile link!' }]}>
                        <input placeholder='Paste your LinkedIn profile link' />
                    </Form.Item>
                    <Form.Item name="instagram" label="Instagram profile" rules={[{ required: true, message: 'Please input your Instagram profile link!' }]}>
                        <input placeholder='Paste your Instagram profile link' />
                    </Form.Item>

                    <div className="flex gap-4 justify-end w-full">
                        <button className='px-4 py-2 bg-blue-500  hover:bg-blue-800 '><a href={shareableLink} target='_blank' rel="noreferrer" className='text-white hover:text-white'>Portfolio Link</a></button>
                        <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
                    </div>
                </Form>
            )}
        </>
    )
}

export default AdminCon;
