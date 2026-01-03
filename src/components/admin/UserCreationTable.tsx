import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Download, Upload } from 'lucide-react';

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  class: string;
  password: string;
}

export default function UserCreationTable() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchClasses();
    addEmptyRow();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const addEmptyRow = () => {
    const newUser: UserRow = {
      id: Date.now().toString(),
      name: '',
      email: '',
      role: 'student',
      class: '',
      password: ''
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, field: keyof UserRow, value: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, [field]: value } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const saveUsers = async () => {
    const validUsers = users.filter(user => user.name && user.email && user.role);
    
    if (validUsers.length === 0) {
      alert('Please add at least one valid user');
      return;
    }

    setSaving(true);
    const results = { success: [], errors: [] };

    for (const user of validUsers) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            role: user.role,
            password: user.password || 'defaultPassword123',
            class: user.class || null
          })
        });

        if (response.ok) {
          const userData = await response.json();
          results.success.push({
            ...user,
            id: userData.user.id,
            generatedPassword: user.password || 'defaultPassword123'
          });
        } else {
          const error = await response.json();
          results.errors.push({ user: user.name, error: error.message });
        }
      } catch (error) {
        results.errors.push({ user: user.name, error: 'Network error' });
      }
    }

    setSaving(false);
    
    // Show detailed results
    let message = `✅ Created ${results.success.length} users successfully!\n`;
    if (results.success.length > 0) {
      message += '\nLogin Details:\n';
      results.success.forEach(user => {
        const className = classes.find(c => c._id === user.class)?.name || 'No Class';
        message += `• ${user.name} (${user.role}) - Class: ${className}\n  Email: ${user.email}\n  Password: ${user.generatedPassword}\n\n`;
      });
    }
    if (results.errors.length > 0) {
      message += `\n❌ ${results.errors.length} errors occurred.`;
    }
    
    alert(message);
    
    if (results.success.length > 0) {
      setUsers([]);
      addEmptyRow();
    }
  };

  const exportToExcel = () => {
    const csvContent = [
      ['name', 'email', 'role', 'class', 'password'],
      ...users.map(user => [user.name, user.email, user.role, user.class, user.password])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <span className="text-5xl mr-4">📝</span>
          Create Users
        </h1>
        <p className="text-green-100 text-xl">Add users directly or upload Excel file</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={addEmptyRow}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>➕ Add Row</span>
        </button>
        
        <button
          onClick={saveUsers}
          disabled={saving}
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? '⏳ Saving...' : '💾 Save All'}</span>
        </button>

        <button
          onClick={exportToExcel}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>📥 Export CSV</span>
        </button>
      </div>

      {/* Excel-like Table */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <tr>
                <th className="px-4 py-4 text-left font-bold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600">
                  👤 Name *
                </th>
                <th className="px-4 py-4 text-left font-bold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600">
                  📧 Email *
                </th>
                <th className="px-4 py-4 text-left font-bold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600">
                  🎭 Role *
                </th>
                <th className="px-4 py-4 text-left font-bold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600">
                  🏫 Class
                </th>
                <th className="px-4 py-4 text-left font-bold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600">
                  🔑 Password
                </th>
                <th className="px-4 py-4 text-center font-bold text-gray-900 dark:text-white">
                  ⚡ Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : 'bg-white dark:bg-gray-800'}`}>
                  <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => updateUser(user.id, 'name', e.target.value)}
                      placeholder="Enter full name"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => updateUser(user.id, 'email', e.target.value)}
                      placeholder="user@school.com"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                    <select
                      value={user.role}
                      onChange={(e) => updateUser(user.id, 'role', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="student">🎓 Student</option>
                      <option value="teacher">👨🏫 Teacher</option>
                      <option value="parent">👨👩👧👦 Parent</option>
                      <option value="administrator">⚙️ Administrator</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                    <select
                      value={user.class}
                      onChange={(e) => updateUser(user.id, 'class', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      disabled={user.role !== 'student'}
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls._id} value={cls._id}>{cls.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                    <input
                      type="text"
                      value={user.password}
                      onChange={(e) => updateUser(user.id, 'password', e.target.value)}
                      placeholder="Auto-generated if empty"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-2 rounded-lg hover:scale-110 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-yellow-200 dark:border-yellow-600 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="text-3xl mr-3">💡</span>
          Instructions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">📝 Required Fields:</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center"><span className="text-red-600 mr-2">*</span> Name - Full name of the user</li>
              <li className="flex items-center"><span className="text-red-600 mr-2">*</span> Email - Must be unique</li>
              <li className="flex items-center"><span className="text-red-600 mr-2">*</span> Role - Select appropriate role</li>
              <li className="flex items-center"><span className="text-blue-600 mr-2">○</span> Class - Required only for students</li>
              <li className="flex items-center"><span className="text-blue-600 mr-2">○</span> Password - Auto-generated if empty</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🚀 Quick Actions:</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center"><span className="text-green-600 mr-2">+</span> Click "Add Row" to add more users</li>
              <li className="flex items-center"><span className="text-blue-600 mr-2">💾</span> Click "Save All" to create accounts</li>
              <li className="flex items-center"><span className="text-purple-600 mr-2">📥</span> Export to CSV for backup</li>
              <li className="flex items-center"><span className="text-red-600 mr-2">🗑️</span> Delete unwanted rows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}