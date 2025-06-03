import React, { useState } from 'react';
import { Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { useFileContext } from '../context/FileContext';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { uploadFile, loading, error } = useFileContext();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      return;
    }
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        return newProgress >= 90 ? 90 : newProgress;
      });
    }, 300);
    
    const success = await uploadFile(selectedFile);
    
    clearInterval(progressInterval);
    
    if (success) {
      setUploadProgress(100);
      setUploadSuccess(true);
      setSelectedFile(null);
      
      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(0);
      }, 2000);
    } else {
      setUploadProgress(0);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Upload File</Card.Header>
      <Card.Body>
        <Form onSubmit={handleUpload}>
          <Form.Group className="mb-3">
            <Form.Label>Select File</Form.Label>
            <Form.Control 
              type="file" 
              onChange={handleFileChange}
              disabled={loading}
            />
            <Form.Text className="text-muted">
              Choose a file to upload to S3 bucket.
            </Form.Text>
          </Form.Group>
          
          {uploadProgress > 0 && (
            <ProgressBar 
              className="mb-3" 
              now={uploadProgress} 
              label={`${uploadProgress}%`} 
              variant={uploadProgress === 100 ? "success" : "primary"}
            />
          )}
          
          {error && <Alert variant="danger">{error}</Alert>}
          {uploadSuccess && <Alert variant="success">File uploaded successfully!</Alert>}
          
          <Button 
            variant="primary" 
            type="submit" 
            disabled={!selectedFile || loading}
            className="w-100"
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FileUpload;