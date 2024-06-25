import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DocumentUpload = () => {
    const [file, setFile] = useState(null);
    const [content, setContent] = useState(''); // State to store document content
    const [documents, setDocuments] = useState([]);
    const [errors, setErrors] = useState({}); // State to store validation errors
    const [successMessage, setSuccessMessage] = useState(''); // State to store success message
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        clearMessages(); // Clear messages when file changes
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        clearMessages(); // Clear messages when content changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearMessages(); // Clear messages before submitting
        const formData = new FormData();
        formData.append('document', file);
        formData.append('content', content); // Add content to form data

        try {
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage(response.data.message); // Set success message
            fetchDocuments();
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // Clear success message after 3 seconds
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors); // Set validation errors
            } else {
                setErrorMessage('Error uploading document. Please try again.'); // Set general error message
                console.error('Error uploading document:', error);
            }
            setTimeout(() => {
                setErrorMessage('');
            }, 3000); // Clear error message after 3 seconds
        }
    };

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/documents');
            setDocuments(response.data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const clearMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
        setErrors({});
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Document Upload</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className='row bg-danger-subtle p-5 mb-5'>
                <form onSubmit={handleSubmit} className="col-6 mx-auto">
                    <div className="form-group mb-3">
                        <input
                            type="file"
                            name="document"
                            onChange={handleFileChange}
                            className="form-control"
                        />
                        {errors.document && <div className="text-danger mt-2">{errors.document[0]}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            className="form-control"
                            placeholder="Enter content..."
                        />
                        {errors.content && <div className="text-danger mt-2">{errors.content[0]}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Upload</button>
                </form>
            </div>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">Document Name</th>
                        <th scope="col">Content</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc, index) => (
                        <tr key={doc.id}>
                            <td>{index + 1}</td>
                            <td>{doc.name}</td>
                            <td>{doc.content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentUpload;
