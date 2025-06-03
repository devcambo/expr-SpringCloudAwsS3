import React, { useState } from 'react';
import { Card, Table, Button, Alert, Modal, Form } from 'react-bootstrap';
import { useFileContext } from '../context/FileContext';

const FileList = () => {
  const { files, loading, error, downloadFile, deleteFile, getFileUrl } = useFileContext();
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileAction, setFileAction] = useState(null);
  const [actionResult, setActionResult] = useState({ success: false, message: '' });
  const [showResult, setShowResult] = useState(false);

  // Since we don't have a real file list from the backend,
  // we'll use a mock list for demonstration
  const mockFiles = [
    { name: 'example1.jpg', size: '1.2 MB', lastModified: '2023-10-15' },
    { name: 'document.pdf', size: '3.5 MB', lastModified: '2023-10-14' },
    { name: 'data.csv', size: '0.8 MB', lastModified: '2023-10-13' }
  ];

  const handleAction = (action, name = '') => {
    setFileAction(action);
    setFileName(name);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    
    try {
      let success = false;
      let message = '';
      
      if (fileAction === 'download') {
        success = await downloadFile(fileName);
        message = success ? 'File downloaded successfully!' : 'Failed to download file.';
      } else if (fileAction === 'delete') {
        success = await deleteFile(fileName);
        message = success ? 'File deleted successfully!' : 'Failed to delete file.';
      } else if (fileAction === 'view') {
        const url = await getFileUrl(fileName);
        if (url) {
          window.open(url, '_blank');
          success = true;
          message = 'File opened in new tab.';
        } else {
          success = false;
          message = 'Failed to get file URL.';
        }
      }
      
      setActionResult({ success, message });
      setShowResult(true);
      
      // Hide result message after 3 seconds
      setTimeout(() => {
        setShowResult(false);
      }, 3000);
      
    } catch (err) {
      console.error('Action error:', err);
      setActionResult({ success: false, message: 'An error occurred.' });
      setShowResult(true);
    }
  };

  const handleManualAction = async (e) => {
    e.preventDefault();
    handleConfirm();
  };

  return (
    <>
      <Card>
        <Card.Header as="h5">Files</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {showResult && (
            <Alert variant={actionResult.success ? 'success' : 'danger'}>
              {actionResult.message}
            </Alert>
          )}
          
          {loading ? (
            <div className="text-center p-4">Loading...</div>
          ) : mockFiles.length === 0 ? (
            <div className="text-center p-4">No files found.</div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Last Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockFiles.map((file) => (
                  <tr key={file.name}>
                    <td>{file.name}</td>
                    <td>{file.size}</td>
                    <td>{file.lastModified}</td>
                    <td>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="me-1"
                        onClick={() => handleAction('download', file.name)}
                      >
                        Download
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleAction('delete', file.name)}
                      >
                        Delete
                      </Button>
                      <Button 
                        variant="info" 
                        size="sm"
                        className="ms-1"
                        onClick={() => handleAction('view', file.name)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          
          <div className="mt-3">
            <h6>Manual File Operations</h6>
            <p className="text-muted small">
              If you know the exact file name, you can perform operations directly:
            </p>
            <Form onSubmit={handleManualAction} className="d-flex">
              <Form.Control 
                type="text" 
                placeholder="Enter file name" 
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="me-2"
              />
              <div className="d-flex">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="me-1"
                  onClick={() => setFileAction('download')}
                  disabled={!fileName}
                  type="submit"
                >
                  Download
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => setFileAction('delete')}
                  disabled={!fileName}
                  type="submit"
                >
                  Delete
                </Button>
                <Button 
                  variant="info" 
                  size="sm"
                  className="ms-1"
                  onClick={() => setFileAction('view')}
                  disabled={!fileName}
                  type="submit"
                >
                  View
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm {fileAction}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {fileAction} the file "{fileName}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant={fileAction === 'delete' ? 'danger' : 'primary'} 
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FileList;