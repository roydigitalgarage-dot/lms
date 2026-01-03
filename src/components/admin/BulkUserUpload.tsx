import React, { useState } from 'react';
import { Upload, Download, Users, CheckCircle, AlertCircle, FileSpreadsheet, Table } from 'lucide-react';
import UserCreationTable from './UserCreationTable';

export default function BulkUserUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'table' | 'upload'>('table');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const response = await fetch('http://localhost:5000/api/admin/bulk-create-users', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/user-template');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_template.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <span className="text-5xl mr-4">📊</span>
              User Management
            </h1>
            <p className="text-blue-100 text-xl">Create users directly or upload Excel file</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('table')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Table className="w-5 h-5" />
              <span>📝 Direct Entry</span>
            </button>
            <button
              onClick={() => setViewMode('upload')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'upload'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>📤 Excel Upload</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <UserCreationTable />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">📤</span>
                Upload Excel File
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl border-2 border-green-200 dark:border-green-600">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">📋 Step 1: Download Template</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Download the Excel template with required columns</p>
                  <div className="space-y-3">
                    <button
                      onClick={downloadTemplate}
                      className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2 w-full justify-center"
                    >
                      <Download className="w-5 h-5" />
                      <span>📥 Download Empty Template</span>
                    </button>
                    <button
                      onClick={() => window.open('http://localhost:5000/api/template/demo-template', '_blank')}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2 w-full justify-center"
                    >
                      <Download className="w-5 h-5" />
                      <span>🎯 Download Demo Template</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl border-2 border-purple-200 dark:border-purple-600">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">📁 Step 2: Upload File</h3>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileSelect}
                      className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    
                    {file && (
                      <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-2xl border-2 border-purple-300 dark:border-purple-500">
                        <FileSpreadsheet className="w-6 h-6 text-green-600 dark:text-green-400" />
                        <span className="font-bold text-gray-900 dark:text-white">{file.name}</span>
                      </div>
                    )}

                    <button
                      onClick={handleUpload}
                      disabled={!file || uploading}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:scale-100"
                    >
                      <Upload className="w-5 h-5" />
                      <span>{uploading ? '⏳ Uploading...' : '🚀 Create Users'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">📊</span>
                Upload Results
              </h2>

              {!results ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Upload an Excel file to see results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{results.total}</p>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Total Rows</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{results.success.length}</p>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Success</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-2xl">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{results.errors.length}</p>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Errors</p>
                    </div>
                  </div>

                  {results.success.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        ✅ Successfully Created Users
                      </h3>
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {results.success.map((user: any, index: number) => (
                          <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-600">
                            <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email} - {user.role}</p>
                            <p className="text-xs text-green-600 dark:text-green-400">Password: {user.generatedPassword}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.errors.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        ❌ Errors
                      </h3>
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {results.errors.map((error: any, index: number) => (
                          <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-600">
                            <p className="font-bold text-red-600 dark:text-red-400">Row {error.row}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{error.error}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-yellow-200 dark:border-yellow-600 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">📋</span>
              Excel Format Instructions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">📝 Required Columns:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> name (Full Name)</li>
                  <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> email (Unique Email)</li>
                  <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> role (student/teacher/parent/administrator)</li>
                  <li className="flex items-center"><span className="text-blue-600 mr-2">○</span> class (Optional - for students)</li>
                  <li className="flex items-center"><span className="text-blue-600 mr-2">○</span> password (Optional - auto-generated if empty)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">⚠️ Important Notes:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center"><span className="text-yellow-600 mr-2">!</span> Email must be unique</li>
                  <li className="flex items-center"><span className="text-yellow-600 mr-2">!</span> Role must be exact (lowercase)</li>
                  <li className="flex items-center"><span className="text-yellow-600 mr-2">!</span> Class name must match existing classes</li>
                  <li className="flex items-center"><span className="text-yellow-600 mr-2">!</span> Maximum file size: 5MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}