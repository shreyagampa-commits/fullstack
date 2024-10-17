import React, { useState } from 'react';
import './Upload.css';
import axios from 'axios';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(''); // State for upload status message

  const submit = async () => {
    if (!image) {
      console.log("Please select an image before submitting.");
      return; // Ensure an image is selected before submitting
    }
    
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      // Update the upload status on success
      setUploadStatus('Picture uploaded successfully!'); // Set success message
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.log("Error uploading the image:", error);
      setUploadStatus('Failed to upload picture.'); // Set error message
    }
  };

  return (
    <div className="upload-background">
      <h1>Please Upload Your Picture Here</h1>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImage(e.target.files[0])} 
      />
      <button onClick={submit}>Submit</button>
      {uploadStatus && <p>{uploadStatus}</p>} {/* Display the upload status message */}
    </div>
  );
};

export default Upload;


