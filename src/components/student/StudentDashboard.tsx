import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardData {
  student: {
    name: string;
    class: string;
    email: string;
  };
  subjects: number;
  recentProgress: any[];
  upcomingAssignments: any[];
  recentGrades: any[];
  upcomingEvents: any[];
  stats: {
    completedLessons: number;
    averageGrade: number;
    totalTimeSpent: number;
  };
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/student/${user?.id}`);
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
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome back, {dashboardData.student.name}!</h1>
        <p className="text-blue-100">Class: {dashboardData.student.class}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Completed Lessons</h3>
          <p className="text-2xl font-bold text-green-600">{dashboardData.stats.completedLessons}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Average Grade</h3>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.stats.averageGrade.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Time Spent</h3>
          <p className="text-2xl font-bold text-purple-600">{dashboardData.stats.totalTimeSpent}min</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">Subjects</h3>
          <p className="text-2xl font-bold text-orange-600">{dashboardData.subjects}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Progress */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Progress</h2>
          <div className="space-y-3">
            {dashboardData.recentProgress.map((progress, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{progress.lesson?.title}</p>
                  <p className="text-sm text-gray-500">{progress.subject?.name}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs ${
                    progress.status === 'completed' ? 'bg-green-100 text-green-800' :
                    progress.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {progress.status.replace('_', ' ')}
                  </span>
                  <p className="text-sm text-gray-500">{progress.completionPercentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Upcoming Assignments</h2>
          <div className="space-y-3">
            {dashboardData.upcomingAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-gray-500">{assignment.subject?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">
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

        {/* Recent Grades */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Grades</h2>
          <div className="space-y-3">
            {dashboardData.recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{grade.assignment?.title}</p>
                  <p className="text-sm text-gray-500">{grade.subject?.name}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    grade.score >= 80 ? 'text-green-600' :
                    grade.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {grade.score}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(grade.gradedAt).toLocaleDateString()}
                  </p>
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
                    event.type === 'assignment' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'holiday' ? 'bg-green-100 text-green-800' :
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
    </div>
  );
};

export default StudentDashboard;