import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create the context
const FileContext = createContext();

// Custom hook to use the file context
export const useFileContext = () => useContext(FileContext);

// Provider component
export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to upload a file
  const uploadFile = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await axios.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // After successful upload, refresh the file list
      await fetchFiles();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file');
      console.error('Upload error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to download a file
  const downloadFile = async (fileName) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/files/${fileName}`, {
        responseType: 'blob'
      });
      
      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error downloading file');
      console.error('Download error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a file
  const deleteFile = async (fileName) => {
    setLoading(true);
    setError(null);
    
    try {
      await axios.delete(`/api/files/${fileName}`);
      
      // After successful deletion, refresh the file list
      await fetchFiles();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting file');
      console.error('Delete error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to get a viewable URL for a file
  const getFileUrl = async (fileName) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/files/url/${fileName}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error getting file URL');
      console.error('Get URL error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the list of files
  // Note: This is a mock function as the backend doesn't provide a list files endpoint
  // In a real application, you would implement this to fetch the actual file list
  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock implementation - in a real app, you would call an API endpoint
      // that returns the list of files
      // For now, we'll just keep the existing files in state
      
      // If there was a real endpoint, it would look something like:
      // const response = await axios.get('/api/files');
      // setFiles(response.data);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching files');
      console.error('Fetch error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialize by fetching files
  React.useEffect(() => {
    fetchFiles();
  }, []);

  // Context value
  const value = {
    files,
    loading,
    error,
    uploadFile,
    downloadFile,
    deleteFile,
    getFileUrl,
    fetchFiles
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};