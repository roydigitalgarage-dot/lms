import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Edit, Trash2, Mail, Shield, UserCheck } from 'lucide-react';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@school.com',
      role: 'student',
      grade: '2nd Grade',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      status: 'active',
      lastLogin: '2 hours ago',
      joinDate: '2024-09-01'
    },
    {
      id: 2,
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@school.com',
      role: 'teacher',
      grade: 'Math Department',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      status: 'active',
      lastLogin: '1 hour ago',
      joinDate: '2024-08-15'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael.johnson@school.com',
      role: 'parent',
      grade: 'Parent of Alex',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      status: 'active',
      lastLogin: '3 hours ago',
      joinDate: '2024-09-01'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@school.com',
      role: 'student',
      grade: '3rd Grade',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      status: 'inactive',
      lastLogin: '2 days ago',
      joinDate: '2024-09-05'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return '🎓';
      case 'teacher': return '👨🏫';
      case 'parent': return '👨👩👧👦';
      case 'administrator': return '⚙️';
      default: return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'from-blue-400 to-purple-500';
      case 'teacher': return 'from-green-400 to-blue-500';
      case 'parent': return 'from-pink-400 to-red-500';
      case 'administrator': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-700 to-black text-white rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <span className="text-5xl mr-4">👤</span>
              User Management
            </h1>
            <p className="text-gray-300 text-xl">Manage all system users and permissions</p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>➕ Add User</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-gray-200 dark:border-gray-600">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="🔍 Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="pl-12 pr-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-bold"
            >
              <option value="all">👥 All Roles</option>
              <option value="student">🎓 Students</option>
              <option value="teacher">👨🏫 Teachers</option>
              <option value="parent">👨👩👧👦 Parents</option>
              <option value="administrator">⚙️ Administrators</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-blue-200 dark:border-blue-600 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-4 border-blue-300"
                  />
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {user.status === 'active' ? '✓' : '✗'}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-bold">{user.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.grade}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">{getRoleIcon(user.role)}</span>
                    <span className="font-bold text-lg capitalize">{user.role}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl">
                    <p className="font-bold text-gray-700 dark:text-gray-300">Status</p>
                    <p className={`font-bold capitalize ${
                      user.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {user.status}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl">
                    <p className="font-bold text-gray-700 dark:text-gray-300">Last Login</p>
                    <p className="font-bold text-purple-600 dark:text-purple-400">{user.lastLogin}</p>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-2xl">
                  <p className="font-bold text-gray-700 dark:text-gray-300 text-sm">Join Date</p>
                  <p className="font-bold text-orange-600 dark:text-orange-400">{user.joinDate}</p>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Edit className="w-4 h-4 mr-1" />
                  ✏️ Edit
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 px-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-1" />
                  📧 Email
                </button>
                <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-blue-200 dark:border-blue-600">
          <div className="text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{users.length}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-green-200 dark:border-green-600">
          <div className="text-center">
            <UserCheck className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-purple-200 dark:border-purple-600">
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Teachers</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {users.filter(u => u.role === 'teacher').length}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-orange-200 dark:border-orange-600">
          <div className="text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-orange-600 dark:text-orange-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Students</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {users.filter(u => u.role === 'student').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}