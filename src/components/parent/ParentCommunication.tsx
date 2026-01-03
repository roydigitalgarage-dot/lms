import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Communication {
  _id: string;
  sender: { name: string; role: string };
  recipient: { name: string; role: string };
  subject: string;
  message: string;
  relatedStudent?: { name: string };
  createdAt: string;
}

interface Child {
  _id: string;
  name: string;
  class: { name: string };
}

const ParentCommunication: React.FC = () => {
  const { user } = useAuth();
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessage, setNewMessage] = useState({
    subject: '',
    message: '',
    childId: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunications();
    fetchChildren();
  }, []);

  const fetchCommunications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/parent/${user?.id}/communications`);
      const data = await response.json();
      setCommunications(data);
    } catch (error) {
      console.error('Error fetching communications:', error);
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/parent/${user?.id}/children`);
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/parent/${user?.id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
      
      setShowNewMessage(false);
      setNewMessage({ subject: '', message: '', childId: '' });
      fetchCommunications();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Communication</h1>
        <button
          onClick={() => setShowNewMessage(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          New Message
        </button>
      </div>

      {showNewMessage && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Send Message to Class Teacher</h2>
          <form onSubmit={sendMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Child</label>
              <select
                value={newMessage.childId}
                onChange={(e) => setNewMessage({...newMessage, childId: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Child</option>
                {children.map(child => (
                  <option key={child._id} value={child._id}>
                    {child.name} - {child.class.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Message will be sent to your child's class teacher</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                className="w-full p-2 border rounded-lg h-32"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Send Message
              </button>
              <button
                type="button"
                onClick={() => setShowNewMessage(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className="divide-y">
          {communications.map(comm => (
            <div key={comm._id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{comm.subject}</h3>
                  <p className="text-sm text-gray-600">
                    {comm.sender.name} → {comm.recipient.name}
                    {comm.relatedStudent && ` (Re: ${comm.relatedStudent.name})`}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(comm.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comm.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentCommunication;