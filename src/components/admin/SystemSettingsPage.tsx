import React, { useState } from 'react';
import { Shield, Database, Mail, Bell, Users, Lock, Save, RefreshCw } from 'lucide-react';

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: '⚙️ General', icon: Shield },
    { id: 'database', name: '💾 Database', icon: Database },
    { id: 'email', name: '📧 Email', icon: Mail },
    { id: 'notifications', name: '🔔 Notifications', icon: Bell },
    { id: 'security', name: '🔒 Security', icon: Lock }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-800 to-black text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <span className="text-5xl mr-4">⚙️</span>
          System Settings
        </h1>
        <p className="text-gray-300 text-xl">Configure and manage system-wide settings</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-gray-200 dark:border-gray-600 overflow-hidden">
        <div className="flex border-b-4 border-gray-200 dark:border-gray-600">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 p-6 font-bold text-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon className="w-6 h-6" />
                  <span>{tab.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-8">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏫 General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">School Name</label>
                  <input
                    type="text"
                    defaultValue="Vijay School"
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Time Zone</label>
                  <select className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg">
                    <option>UTC+05:30 (India Standard Time)</option>
                    <option>UTC+00:00 (GMT)</option>
                    <option>UTC-05:00 (EST)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">💾 Database Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
                  <Database className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Backup Status</h3>
                  <p className="text-green-600 dark:text-green-400 font-bold">✅ Last backup: 2 hours ago</p>
                  <button className="mt-4 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                    🔄 Backup Now
                  </button>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <RefreshCw className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Database Size</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-bold">📊 2.4 GB</p>
                  <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                    🧹 Optimize
                  </button>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                  <Users className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Active Connections</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-bold">🔗 47 connections</p>
                  <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                    📊 Monitor
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📧 Email Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">SMTP Server</label>
                  <input
                    type="text"
                    defaultValue="smtp.gmail.com"
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Port</label>
                  <input
                    type="number"
                    defaultValue="587"
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔔 Notification Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'New User Registration', enabled: true },
                  { label: 'Assignment Submissions', enabled: true },
                  { label: 'System Alerts', enabled: true },
                  { label: 'Grade Updates', enabled: false }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/80 dark:to-blue-900/20 border-2 border-blue-200 dark:border-blue-600">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{setting.label}</span>
                    <button className={`w-16 h-8 rounded-full transition-all duration-300 ${
                      setting.enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <div className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                        setting.enabled ? 'translate-x-9' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔒 Security Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 border-2 border-green-200 dark:border-green-600">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔐 Password Policy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Minimum Length</span>
                      <span className="font-bold text-green-600 dark:text-green-400">8 characters</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Require Special Characters</span>
                      <span className="font-bold text-green-600 dark:text-green-400">✅ Enabled</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-200 dark:border-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🛡️ Security Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">SSL Certificate</span>
                      <span className="font-bold text-green-600 dark:text-green-400">✅ Valid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Firewall Status</span>
                      <span className="font-bold text-green-600 dark:text-green-400">✅ Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end space-x-4">
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg">
              <Save className="w-5 h-5" />
              <span>💾 Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}