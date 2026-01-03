import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ParentDashboardData {
  parent: {
    name: string;
    email: string;
  };
  children: Array<{
    child: {
      name: string;
      class: string;
      email: string;
    };
    recentGrades: any[];
    progressSummary: {
      completed: number;
      inProgress: number;
      notStarted: number;
    };
  }>;
  upcomingEvents: any[];
}

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<ParentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/parent/${user?.id}`);
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

  const currentChild = dashboardData.children && dashboardData.children.length > 0 ? dashboardData.children[selectedChild] : null;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome, {dashboardData.parent.name}!</h1>
        <p className="text-purple-100">Monitor your children's progress</p>
      </div>

      {/* Children Selector */}
      {dashboardData.children && dashboardData.children.length > 1 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Select Child</h2>
          <div className="flex space-x-2">
            {dashboardData.children.map((childData, index) => (
              <button
                key={index}
                onClick={() => setSelectedChild(index)}
                className={`px-4 py-2 rounded-lg ${
                  selectedChild === index
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {childData.child.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Children Message */}
      {(!dashboardData.children || dashboardData.children.length === 0) && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">No Children Assigned</h2>
          <p className="text-yellow-700">Please contact the school administrator to link your children to your parent account.</p>
        </div>
      )}

      {currentChild ? (
        <>
          {/* Child Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">{currentChild.child.name}'s Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {currentChild.progressSummary.completed}
                </div>
                <p className="text-sm text-gray-600">Completed Lessons</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {currentChild.progressSummary.inProgress}
                </div>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {currentChild.progressSummary.notStarted}
                </div>
                <p className="text-sm text-gray-600">Not Started</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Grades */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Grades</h2>
              <div className="space-y-3">
                {currentChild.recentGrades.length > 0 ? (
                  currentChild.recentGrades.map((grade, index) => (
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
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No grades available yet</p>
                )}
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Learning Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>
                      {Math.round(
                        (currentChild.progressSummary.completed / 
                        (currentChild.progressSummary.completed + 
                         currentChild.progressSummary.inProgress + 
                         currentChild.progressSummary.notStarted)) * 100
                      )}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{
                        width: `${Math.round(
                          (currentChild.progressSummary.completed / 
                          (currentChild.progressSummary.completed + 
                           currentChild.progressSummary.inProgress + 
                           currentChild.progressSummary.notStarted)) * 100
                        )}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="p-2 bg-green-100 rounded">
                    <div className="font-semibold text-green-800">Completed</div>
                    <div className="text-green-600">{currentChild.progressSummary.completed}</div>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded">
                    <div className="font-semibold text-yellow-800">In Progress</div>
                    <div className="text-yellow-600">{currentChild.progressSummary.inProgress}</div>
                  </div>
                  <div className="p-2 bg-gray-100 rounded">
                    <div className="font-semibold text-gray-800">Not Started</div>
                    <div className="text-gray-600">{currentChild.progressSummary.notStarted}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : dashboardData.children && dashboardData.children.length > 0 ? (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <p className="text-blue-700">Please select a child to view their information.</p>
        </div>
      ) : null}

      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Upcoming School Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData.upcomingEvents.map((event, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{event.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  event.type === 'exam' ? 'bg-red-100 text-red-800' :
                  event.type === 'holiday' ? 'bg-green-100 text-green-800' :
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
              <p className="text-sm font-medium text-purple-600">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Communication Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/communication" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-sm font-medium">Message Teacher</p>
          </Link>
          <Link to="/report-cards" className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium">View Report Card</p>
          </Link>
          <Link to="/school-calendar" className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📅</div>
            <p className="text-sm font-medium">School Calendar</p>
          </Link>
          <a href="mailto:admin@vijayschool.com" className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📞</div>
            <p className="text-sm font-medium">Contact School</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;