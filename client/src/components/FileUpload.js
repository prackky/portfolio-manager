import React, { useState } from 'react';
import { uploadFile } from '../services/api';

function FileUpload({ onSuccess }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await uploadFile(file);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept=".xlsx,.pdf" required />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUpload;