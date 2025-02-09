import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { PlusOutlined, CloseOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons'; // Import additional icons
import { storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const ImageUpload = ({ onImageUrlChange, folderName, currentUserId }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false); // Track upload status

  const handleImageChange = (info) => {
    if (info.file.status !== 'uploading') {
      setImage(info.file.originFileObj);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      message.error("No image selected.");
      return;
    }

    const storageRef = ref(storage, `${folderName}/${currentUserId}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    try {
      setUploading(true); // Set uploading to true when upload starts
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);
      message.success("Image uploaded successfully.");
      onImageUrlChange(downloadURL);
      setImage(null); // Reset image state
      setPreviewUrl(null); // Reset previewUrl state
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Failed to upload image.");
    } finally {
      setUploading(false); // Set uploading back to false when upload finishes
    }
  };

  const handleCancel = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <Upload
        accept='image/*'
        onChange={handleImageChange}
        showUploadList={false}
      >
        <Button icon={uploading ? <LoadingOutlined /> : previewUrl ? <CheckOutlined /> : <PlusOutlined />} disabled={uploading}>{uploading ? 'Uploading' : 'Select Image'}</Button>
      </Upload>
      {previewUrl && (
        <>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px', marginTop:'10px' }} />
          <Button type="primary" onClick={handleImageUpload} style={{ marginLeft: '10px' }} disabled={uploading}>Save Image</Button>
          <Button onClick={handleCancel} style={{ marginLeft: '10px' }} disabled={uploading}><CloseOutlined />Cancel</Button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
