import React, { useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  class?: { name: string };
}

interface Parent extends User {
  children: User[];
}

const ParentChildManagement: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedParent, setSelectedParent] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [parentsRes, studentsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/parent/parent-child-relationships'),
        fetch('http://localhost:5000/api/users?role=student')
      ]);
      
      const parentsData = await parentsRes.json();
      const studentsData = await studentsRes.json();
      
      setParents(parentsData);
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const assignChild = async () => {
    if (!selectedParent || !selectedStudent) return;
    
    try {
      await fetch('http://localhost:5000/api/admin/parent/assign-child', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentId: selectedParent,
          childId: selectedStudent
        })
      });
      
      fetchData();
      setSelectedParent('');
      setSelectedStudent('');
    } catch (error) {
      console.error('Error assigning child:', error);
    }
  };

  const removeChild = async (parentId: string, childId: string) => {
    try {
      await fetch('http://localhost:5000/api/admin/parent/remove-child', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentId, childId })
      });
      
      fetchData();
    } catch (error) {
      console.error('Error removing child:', error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Parent-Child Management</h1>

      {/* Assign Child Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Assign Child to Parent</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">Select Parent</option>
            {parents.map(parent => (
              <option key={parent._id} value={parent._id}>
                {parent.name} ({parent.email})
              </option>
            ))}
          </select>
          
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>
                {student.name} - {student.class?.name || 'No Class'}
              </option>
            ))}
          </select>
          
          <button
            onClick={assignChild}
            disabled={!selectedParent || !selectedStudent}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
          >
            Assign Child
          </button>
        </div>
      </div>

      {/* Current Relationships */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Current Parent-Child Relationships</h2>
        </div>
        <div className="divide-y">
          {parents.map(parent => (
            <div key={parent._id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{parent.name}</h3>
                  <p className="text-sm text-gray-600">{parent.email}</p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {parent.children.length} children
                </span>
              </div>
              
              {parent.children.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {parent.children.map(child => (
                    <div key={child._id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <div>
                        <span className="font-medium">{child.name}</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {child.class?.name || 'No Class'}
                        </span>
                      </div>
                      <button
                        onClick={() => removeChild(parent._id, child._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-2">No children assigned</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentChildManagement;