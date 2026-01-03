import React, { useState, useEffect } from 'react';
import { Upload, File, Trash2, Download, Eye, Search, Filter } from 'lucide-react';

interface FileInfo {
  filename: string;
  originalName?: string;
  size: number;
  created: string;
  modified: string;
  url: string;
  mimetype?: string;
}

export default function FileManager() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    loadFiles();
  }, [selectedType]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/files/list/${selectedType}`);
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (fileList: FileList) => {
    const formData = new FormData();
    Array.from(fileList).forEach(file => {
      formData.append('files', file);
    });
    formData.append('type', selectedType);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/files/upload-multiple', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        loadFiles();
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/files/${filename}?type=${selectedType}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        loadFiles();
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return '🖼️';
      case 'mp4':
      case 'avi': return '🎥';
      case 'mp3':
      case 'wav': return '🎵';
      default: return '📁';
    }
  };

  const filteredFiles = files.filter(file =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (file.originalName && file.originalName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <span className="text-5xl mr-4">📁</span>
          File Manager
        </h1>
        <p className="text-blue-100 text-xl">Manage and organize your files</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General</option>
            <option value="assignments">Assignments</option>
            <option value="lessons">Lessons</option>
            <option value="documents">Documents</option>
            <option value="media">Media</option>
          </select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <label className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer flex items-center space-x-2 transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload Files</span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </label>
      </div>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-600 mb-2">
          Drag and drop files here, or click to upload
        </p>
        <p className="text-sm text-gray-500">
          Supports: Images, Documents, Videos, Audio (Max 10MB each)
        </p>
      </div>

      {/* Files Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <div key={file.filename} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{getFileIcon(file.filename)}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(`http://localhost:5000${file.url}`, '_blank')}
                    className="p-1 text-blue-500 hover:text-blue-700"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = `http://localhost:5000${file.url}`;
                      link.download = file.originalName || file.filename;
                      link.click();
                    }}
                    className="p-1 text-green-500 hover:text-green-700"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(file.filename)}
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 truncate" title={file.originalName || file.filename}>
                {file.originalName || file.filename}
              </h3>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>Size: {formatFileSize(file.size)}</p>
                <p>Created: {new Date(file.created).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredFiles.length === 0 && !loading && (
        <div className="text-center py-12">
          <File className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No files found</h3>
          <p className="text-gray-500">Upload some files to get started!</p>
        </div>
      )}
    </div>
  );
}