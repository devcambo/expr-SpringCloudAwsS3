import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FileProvider } from './context/FileContext';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <FileProvider>
      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center">S3 File Manager</h1>
            <p className="text-center text-muted">
              Upload, download, and manage your files stored in AWS S3
            </p>
          </Col>
        </Row>
        
        <Row>
          <Col md={4}>
            <FileUpload />
          </Col>
          <Col md={8}>
            <FileList />
          </Col>
        </Row>
      </Container>
    </FileProvider>
  );
}

export default App;