import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Showloading, HideLoading } from '../../redux/rootSlice.js';
import API from '../../api/api.js';
import ImageUpload from '../../components/ImageUpload.jsx';
import { Form, message } from 'antd';

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const User = useSelector((state) => state.currentUser);
  const [imageUrl, setImageUrl] = useState('');

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",").map(skill => skill.trim());
      values.skills = tempSkills;
      values.lottieUrl = imageUrl;

      dispatch(Showloading());
      let res;
      if (portfolioData.about && portfolioData.about.userId) {
        res = await API.post("/api/update-about", {
          ...values,
          _id: portfolioData?.about?._id,
        });
      } else {
        res = await API.post("/api/add-about", {
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
  };

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  return (
    <>
      {portfolioData && (
        <Form onFinish={onFinish} layout='vertical' initialValues={{
          ...portfolioData?.about,
          skills: portfolioData?.about?.skills?.join(", "),
        }}>
          <Form.Item label="Upload Image" name="lottieUrl">
            <ImageUpload onImageUrlChange={handleImageUrlChange} currentUserId={User?.result?._id} folderName='about' />
          </Form.Item>

          <Form.Item name="description1" label="Description-1" rules={[{ required: true, message: 'Please input description 1!' }]}>
            <input placeholder='Description' />
          </Form.Item>

          <Form.Item name="description2" label="Description-2">
            <input placeholder='Description' />
          </Form.Item>

          <Form.Item name="skills" label="Skills" rules={[{ required: true, message: 'Please add your skills!' }]}>
            <input placeholder='Skills' />
          </Form.Item>

          <p className='text-red text-[12px] mb-10 sm:text-[10px]'><b>Note:- </b>Add the languages name separately with 1st letter capital [for ex:- Html, Css, C++, Python] and if you want to add <br/> Machine learning libraries try to add it in the end [for ex- Html, Css, Javascript, C++, ML/DL, Tensorflow technologies]</p>

          <div className="flex justify-end w-full">
            <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
          </div>
        </Form>
      )}
    </>
  )
}

export default AdminAbout;
