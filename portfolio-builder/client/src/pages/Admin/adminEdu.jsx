import React, { useState, useEffect } from 'react';
import { Form, message, Modal} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Showloading, HideLoading, ReloadData } from '../../redux/rootSlice';
import API from '../../api/api';

const AdminEdu = () => {
    const dispatch = useDispatch();
    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [type, setType] = useState("add");
    const [form] = Form.useForm(); // Create a form instance

    const { portfolioData } = useSelector((state) => state.root);
    const user = useSelector((state) => state.currentUser);
    const { educations } = portfolioData;
    const filteredEducations = user ? educations.filter(education => education.userId === user?.result?._id) : [];

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
                res = await API.post("/api/update-education", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                res = await API.post("/api/add-education", {
                    ...values,
                    userId: user?.result._id,
                });
            }

            dispatch(HideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
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
            const res = await API.post("/api/delete-education", {
                _id: item._id,
            });
            dispatch(HideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                dispatch(ReloadData(true));
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white' onClick={() => { setSelectedItemForEdit(null); setShowAddEditModel(true); setType("add") }}>
                    Add Education
                </button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1 mb-10'>
                {filteredEducations.map((education) => (
                    <div key={education._id} className='shadow border p-5 border-gray-400 flex flex-col gap-5'>
                        <h1 className='text-primary text-[1.2vw] sm:text-[1.2rem] font-bold'>{education.period}</h1>
                        <hr />
                        <h1 className='text-[1vw] sm:text-[1rem] sm:flex sm:flex-col'>Standard: {education.standard}</h1>
                        <h1 className='text-[1vw] sm:text-[0.8rem] sm:flex sm:flex-col'>College Name: {education.collegeName}</h1>
                        <h2 className='text-[1vw] sm:text-[0.8rem] sm:flex sm:flex-col'>Course: {education.course}</h2>
                        <h1 className='italic font-bold'>{education.gpa}</h1>

                        <div className='flex justify-end gap-5 sm:flex-col'>
                            <button className='bg-red text-white px-5 py-2' onClick={() => { onDelete(education) }}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => {setSelectedItemForEdit(education); setShowAddEditModel(true); setType("edit") }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            {(type === "add" || selectedItemForEdit) && (
                <Modal visible={showAddEditModel} title={selectedItemForEdit ? "Edit education" : "Add education"} footer={null} onCancel={() => { setShowAddEditModel(false); setSelectedItemForEdit(null); }}>
                        <Form form={form} layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit || {}}>

                            <Form.Item name='period' label='Period' rules={type === "add" ? [{ required: true, message: 'Please input period!' }] : []}>
                                <input placeholder='Period' />
                            </Form.Item>

                            <Form.Item name='standard' label='Standard' rules={type === "add" ? [{ required: true, message: 'Please input standard!' }] : []}>
                                <input placeholder='Standard' />
                            </Form.Item>

                            <Form.Item name='collegeName' label='College/Institute/University Name' rules={type === "add" ? [{ required: true, message: 'Please input college/institute/university name!' }] : []}>
                                <input placeholder='College/Institute/University Name' />
                            </Form.Item>

                            <Form.Item name='course' label='Course' rules={type === "add" ? [{ required: true, message: 'Please input your course' }] : []}>
                                <input placeholder='Course' />
                            </Form.Item>

                            <Form.Item name='gpa' label='GPA/Marks' rules={type === "add" ? [{ required: true, message: 'Please input GPA/marks!' }] : []}>
                                <input placeholder='8.0/10 GPA or 800/1000 marks' />
                            </Form.Item>

                            <div className='flex justify-end'>
                                <button className='border-primary text-primary px-5 py-2' onClick={() => { setShowAddEditModel(false); setSelectedItemForEdit(null); }}>
                                    Cancel
                                </button>
                                <button className='bg-primary text-white px-5 py-2' type='submit'>
                                    {selectedItemForEdit ? "Update" : "Add"}
                                </button>
                            </div>

                        </Form>
                </Modal>
            )}
        </>
    );
};

export default AdminEdu;
