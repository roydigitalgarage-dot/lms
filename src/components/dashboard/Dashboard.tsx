import React from 'react';
import Layout from '../layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import ParentDashboard from './ParentDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'administrator':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
}