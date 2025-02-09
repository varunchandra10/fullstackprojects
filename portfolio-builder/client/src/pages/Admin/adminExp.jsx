import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Showloading, HideLoading, ReloadData } from '../../redux/rootSlice';
import { Form, Modal, message } from 'antd';

import API from '../../api/api';

const AdminExp = () => {
    const dispatch = useDispatch();

    const User = useSelector((state) => state.currentUser);
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    const filteredExperiences = User ? experiences.filter(experience => experience?.userId === User?.result?._id) : [];

    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [type, setType] = useState("add");
    const [form] = Form.useForm();

    useEffect(() => {
        // Reset form fields when modal opens
        if (showAddEditModel) {
            form.resetFields();
            if (selectedItemForEdit) {
                form.setFieldsValue(selectedItemForEdit);
            }
        }
    }, [showAddEditModel, form, selectedItemForEdit]);


    const onFinish = async (values) => {
        try {
            dispatch(Showloading());
            let res;
            if (selectedItemForEdit) {
                res = await API.post("/api/update-experience", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                res = await API.post("/api/add-experience",{
                    ...values,
                    userId: User?.result._id,
                });
            }

            dispatch(HideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(Showloading());
            const res = await API.post("/api/delete-experience", {
                _id: item._id,
            });
            dispatch(HideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        };
    }

    return (
        <>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white'
                    onClick={() => {
                        setSelectedItemForEdit(null);
                        setShowAddEditModel(true);
                        setType("add") ;
                    }}>
                    Add Experience
                </button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1 mb-10'>
                {filteredExperiences.map((experience) => (
                    <div key={experience._id} className='shadow border p-5 border-gray-400 flex flex-col gap-5'>
                        <h1 className='text-primary text-[1.2vw] sm:text-[1rem] font-bold'>{experience.period}</h1>
                        <hr />
                        <h1 className='text-[1vw] sm:text-[0.8rem] sm:flex sm:flex-col'><b>Company: </b>{experience.company}</h1>
                        <h1 className='text-[1vw] sm:text-[0.8rem]'><b>Role:</b> {experience.title}</h1>
                        <h1 className='text-[1vw] sm:text-[0.7rem]'>{experience.description}</h1>

                        <div className='flex justify-end gap-5 sm:flex-col'>
                            <button className='bg-red text-white px-5 py-2' onClick={() => { onDelete(experience); }}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => { setSelectedItemForEdit(experience); setShowAddEditModel(true); setType("edit") }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            {
                (type === "add" || selectedItemForEdit) && (
                    <Modal open={showAddEditModel} title={selectedItemForEdit ? "Edit Experience" : "Add Experience"} footer={null} onCancel={() => { setShowAddEditModel(false); setSelectedItemForEdit(null); }}>
                        <Form form={form} layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit || {}}>

                            <Form.Item name='period' label='Period' rules={type === "add" ? [{ required: true, message: 'Please input period!' }] : []}>
                                <input placeholder='Period' />
                            </Form.Item>

                            <Form.Item name='company' label='Company Name' rules={type === "add" ? [{ required: true, message: 'Please input company name!' }] : []}>
                                <input placeholder='Company/Organization name' />
                            </Form.Item>

                            <Form.Item name='title' label='Job Title' rules={type === "add" ? [{ required: true, message: 'Please input job title!' }] : []}>
                                <input placeholder='Job Title/Role' />
                            </Form.Item>

                            <Form.Item name='description' label='Description' rules={type === "add" ? [{ required: true, message: 'Please input description!' }] : []}>
                                <input placeholder='Description' />
                            </Form.Item>

                            <div className='flex justify-end'>
                                <button className='border-primary text-primary px-5 py-2' onClick={() => { setShowAddEditModel(false); setSelectedItemForEdit(null) }}>
                                    Cancel
                                </button>
                                <button className='bg-primary text-white px-5 py-2' type='submit'>
                                    {selectedItemForEdit ? "Update" : "Add"}
                                </button>
                            </div>

                        </Form>
                    </Modal>
                )
            }
        </>
    )
}

export default AdminExp;
