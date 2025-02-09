import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Showloading, HideLoading, ReloadData } from '../../redux/rootSlice';
import { Form, Modal, message } from 'antd';

import API from '../../api/api';
import ImageUpload from '../../components/ImageUpload';

const AdminProj = () => {
    const dispatch = useDispatch();

    const User = useSelector((state) => state.currentUser);
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const filteredProjects = User ? projects.filter(project => project?.userId === User?.result?._id) : [];

    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
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
            const tempTechnologies = values.technologies?.split(", ") || {};
            values.technologies = tempTechnologies;
            values.image = imageUrl;
            dispatch(Showloading());
            let res;
            if (selectedItemForEdit) {
                res = await API.post("/api/update-project", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                res = await API.post("/api/add-project", {
                    ...values,
                    userId: User?.result._id,
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
            const res = await API.post("/api/delete-project", {
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

    const handleImageUrlChange = (url) => {
        setImageUrl(url);
    };

    return (
        <>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white'
                    onClick={() => {
                        setSelectedItemForEdit(null);
                        setShowAddEditModel(true);
                        setType("add");
                    }}>
                    Add Project
                </button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1 mb-10'>
                {filteredProjects.map((project) => (
                    <div key={project._id} className='shadow border p-5 border-gray-400 flex flex-col gap-5'>
                        <h1 className='text-primary text-xl text-[1.2vw] sm:text-[1rem]  font-bold'>{project.title}</h1>
                        <hr />
                        <img src={project.image} alt='project-img' className='h-50 w-80 m-auto' />
                        <h1 className='text-[1vw] sm:text-[0.8rem]'>{project.description}</h1>
                        <h1 className='text-[1vw] sm:text-[0.8rem]'><b>Technologies used: </b>{project.technologies.join(", ")}.</h1>
                        <div className='flex justify-end sm:flex-col mt-4'>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => window.open(project.link)}> Demo <i className='bx bx-link-external'></i>  </button>
                        </div>
                        <div className='flex justify-end gap-5 sm:flex-col'>
                            <button className='bg-red text-white px-5 py-2' onClick={() => onDelete(project)}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => {
                                setSelectedItemForEdit(project);
                                setShowAddEditModel(true);
                                setType("edit");
                            }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            {(type === "add" || selectedItemForEdit) && (
                <Modal open={showAddEditModel} title={selectedItemForEdit ? "Edit Project" : "Add Project"} footer={null} onCancel={() => { setShowAddEditModel(false); setSelectedItemForEdit(null); }}>
                    <Form  form={form} layout='vertical' onFinish={onFinish} initialValues={{
                        ...selectedItemForEdit,
                        technologies: selectedItemForEdit?.technologies.join(", ")
                    } || {}}>

                        <Form.Item name='image' label='Project Image Url'>
                            <ImageUpload onImageUrlChange={handleImageUrlChange} currentUserId={User?.result?._id} folderName='projects' />
                        </Form.Item>

                        <Form.Item name='title' label='Project Title' rules={type === "add" ? [{ required: true, message: 'Please input project title!' }] : []}>
                            <input placeholder='Project Title' />
                        </Form.Item>

                        <Form.Item name='description' label='Description' rules={type === "add" ? [{ required: true, message: 'Please input project description!' }] : []}>
                            <textarea placeholder='Description' />
                        </Form.Item>

                        <Form.Item name='link' label='Project Demo Link' rules={type === "add" ? [{ required: true, message: 'Please input project demo link!' }] : []}>
                            <input placeholder='Demo link / Github link' />
                        </Form.Item>

                        <Form.Item name='technologies' label='Technologies Used' rules={type === "add" ? [{ required: true, message: 'Please input technologies used!' }] : []}>
                            <input placeholder='Technologies Used' />
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
            )}
        </>
    );
};

export default AdminProj;
