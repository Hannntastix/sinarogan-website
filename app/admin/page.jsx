'use client';

import { useState } from 'react';

export default function AdminUpload() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please select a PDF file');
            return;
        }

        setUploading(true);
        setMessage('');
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('description', description);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Document uploaded successfully');
                setFile(null);
                setDescription('');
                const fileInput = document.getElementById('fileInput');
                if (fileInput) fileInput.value = '';
            } else {
                setMessage(result.message || 'Upload failed');
            }
        } catch (error) {
            setMessage('Error uploading document: ' + error.message);
        }

        setUploading(false);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            if (files[0].type === 'application/pdf') {
                setFile(files[0]);
                setMessage('');
            } else {
                setMessage('Only PDF files are permitted');
            }
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                    <div className="px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Document Upload</h1>
                                <p className="text-sm text-gray-600 mt-1">Upload PDF documents for public access</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* File Upload Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    PDF Document <span className="text-red-500">*</span>
                                </label>

                                <div
                                    className={`
                                        relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                                        ${dragActive
                                            ? 'border-blue-400 bg-blue-50'
                                            : file
                                                ? 'border-green-400 bg-green-50'
                                                : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                                        }
                                    `}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => {
                                            const selectedFile = e.target.files?.[0] || null;
                                            setFile(selectedFile);
                                            if (selectedFile && selectedFile.type !== 'application/pdf') {
                                                setMessage('Only PDF files are permitted');
                                                setFile(null);
                                                e.target.value = '';
                                            } else {
                                                setMessage('');
                                            }
                                        }}
                                        className="hidden"
                                    />

                                    {!file ? (
                                        <div>
                                            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="text-sm text-gray-600">
                                                <p className="font-medium text-gray-900 mb-1">Click to select PDF file</p>
                                                <p>or drag and drop your document here</p>
                                                <p className="text-xs text-gray-500 mt-2">Maximum file size: 10MB</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <svg className="mx-auto h-12 w-12 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div className="text-sm">
                                                <p className="font-medium text-gray-900 mb-1">{file.name}</p>
                                                <p className="text-gray-600 mb-3">{formatFileSize(file.size)}</p>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFile(null);
                                                        document.getElementById('fileInput').value = '';
                                                    }}
                                                    className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Remove File
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Document Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter a brief description of the document (optional)"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={uploading || !file}
                                    className={`
                                        w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white
                                        ${uploading || !file
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                        }
                                        transition-colors duration-200
                                    `}
                                >
                                    {uploading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Uploading Document...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            Upload Document
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Message */}
                        {message && (
                            <div className={`
                                mt-6 rounded-md p-4 border
                                ${message.includes('successfully')
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : 'bg-red-50 border-red-200 text-red-800'
                                }
                            `}>
                                <div className="flex items-center">
                                    {message.includes('successfully') ? (
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <p className="text-sm font-medium">{message}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}