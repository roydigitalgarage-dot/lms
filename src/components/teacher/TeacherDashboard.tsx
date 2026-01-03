import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface TeacherDashboardData {
  teacher: {
    name: string;
    class: string;
    email: string;
  };
  stats: {
    totalStudents: number;
    totalSubjects: number;
    pendingGrades: number;
    upcomingEvents: number;
  };
  students: any[];
  recentAssignments: any[];
  pendingGrades: any[];
  upcomingEvents: any[];
}

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<TeacherDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/teacher/${user?.id}`);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (!dashboardData) return <div>Error loading dashboard</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome, {dashboardData.teacher.name}!</h1>
        <p className="text-green-100">Class Teacher: {dashboardData.teacher.class}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.stats.totalStudents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Subjects</h3>
          <p className="text-2xl font-bold text-green-600">{dashboardData.stats.totalSubjects}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Pending Grades</h3>
          <p className="text-2xl font-bold text-red-600">{dashboardData.stats.pendingGrades}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Upcoming Events</h3>
          <p className="text-2xl font-bold text-purple-600">{dashboardData.stats.upcomingEvents}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">My Students</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {dashboardData.students.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {student.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Assignments</h2>
          <div className="space-y-3">
            {dashboardData.recentAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-gray-500">{assignment.subject?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {assignment.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Grades */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Pending Grades</h2>
          <div className="space-y-3">
            {dashboardData.pendingGrades.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded">
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-gray-500">{assignment.subject?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">
                    {assignment.submissions?.length || 0} submissions
                  </p>
                  <button className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200">
                    Grade Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {dashboardData.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    event.type === 'exam' ? 'bg-red-100 text-red-800' :
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center">
            <div className="text-2xl mb-2">📝</div>
            <p className="text-sm font-medium">Create Assignment</p>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium">View Analytics</p>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center">
            <div className="text-2xl mb-2">📅</div>
            <p className="text-sm font-medium">Schedule Event</p>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-sm font-medium">Send Message</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;