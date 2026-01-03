import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Calendar, Mail, Video, Settings, Check, X } from 'lucide-react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    { name: 'Google Calendar', icon: Calendar, connected: false, description: 'Sync events and assignments' },
    { name: 'Email Notifications', icon: Mail, connected: true, description: 'Send automated email updates' },
    { name: 'Zoom Meetings', icon: Video, connected: false, description: 'Create virtual classroom sessions' }
  ]);

  const toggleIntegration = (index: number) => {
    const updated = [...integrations];
    updated[index].connected = !updated[index].connected;
    setIntegrations(updated);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Settings className="w-12 h-12 mr-4" />
            Integrations
          </h1>
          <p className="text-green-100 text-xl">Connect with external services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-12 h-12 text-blue-500" />
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    integration.connected ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {integration.connected ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-gray-600" />}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{integration.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{integration.description}</p>
                
                <button
                  onClick={() => toggleIntegration(index)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    integration.connected
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}