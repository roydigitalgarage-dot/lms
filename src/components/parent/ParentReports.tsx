import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Child {
  _id: string;
  name: string;
  class: { name: string };
}

interface Grade {
  _id: string;
  assignment: { title: string };
  subject: { name: string };
  score: number;
  gradedAt: string;
}

interface SubjectStat {
  average: number;
  total: number;
  count: number;
  grades: Grade[];
}

interface ReportData {
  child: {
    name: string;
    class: string;
    email: string;
  };
  grades: Grade[];
  subjectStats: Record<string, SubjectStat>;
  overallAverage: number;
}

const ParentReports: React.FC = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      fetchReport(selectedChild);
    }
  }, [selectedChild]);

  const fetchChildren = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/parent/${user?.id}/children`);
      const data = await response.json();
      setChildren(data);
      if (data.length > 0) {
        setSelectedChild(data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReport = async (childId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/parent/${user?.id}/children/${childId}/report`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Report Cards</h1>
        {children.length > 0 && (
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="p-2 border rounded-lg"
          >
            {children.map(child => (
              <option key={child._id} value={child._id}>
                {child.name} - {child.class.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {children.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">No Children Assigned</h2>
          <p className="text-yellow-700">Please contact the school administrator to link your children to your parent account.</p>
        </div>
      )}

      {reportData && children.length > 0 && (
        <>
          {/* Student Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{reportData.child.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {reportData.overallAverage.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600">Overall Average</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {Object.keys(reportData.subjectStats).length}
                </div>
                <p className="text-sm text-gray-600">Subjects</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {reportData.grades.length}
                </div>
                <p className="text-sm text-gray-600">Total Assessments</p>
              </div>
            </div>
          </div>

          {/* Subject-wise Performance */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Subject-wise Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(reportData.subjectStats).length > 0 ? (
                Object.entries(reportData.subjectStats).map(([subject, stats]) => (
                  <div key={subject} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{subject}</h3>
                    <div className={`text-2xl font-bold mb-2 ${getGradeColor(stats.average)}`}>
                      {stats.average.toFixed(1)}%
                    </div>
                    <p className="text-sm text-gray-600">{stats.count} assessments</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${stats.average}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No subject performance data available yet
                </div>
              )}
            </div>
          </div>

          {/* Recent Grades */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Grades</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Assignment</th>
                    <th className="text-left p-2">Subject</th>
                    <th className="text-left p-2">Score</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.grades && reportData.grades.length > 0 ? (
                    reportData.grades.slice(0, 10).map(grade => (
                      <tr key={grade._id} className="border-b">
                        <td className="p-2">{grade.assignment.title}</td>
                        <td className="p-2">{grade.subject.name}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded ${getGradeColor(grade.score)}`}>
                            {grade.score}%
                          </span>
                        </td>
                        <td className="p-2">{new Date(grade.gradedAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        No grades available yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ParentReports;