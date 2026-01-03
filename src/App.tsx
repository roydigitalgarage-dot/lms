import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import CoursePage from './components/courses/CoursePage';
import AssignmentsPage from './components/assignments/AssignmentsPage';
import GradesPage from './components/grades/GradesPage';
import CalendarPage from './components/calendar/CalendarPage';
import AITutorPage from './components/ai-tutor/AITutorPage';

import EVSAssignmentPage from './components/assignments/EVSAssignmentPage';
import MathAssignmentPage from './components/assignments/MathAssignmentPage';
import EnglishAssignmentPage from './components/assignments/EnglishAssignmentPage';
import HindiAssignmentPage from './components/assignments/HindiAssignmentPage';
import TeluguAssignmentPage from './components/assignments/TeluguAssignmentPage';
import CoursesListPage from './components/courses/CoursesListPage';
import SubjectAssignmentsPage from './components/assignments/SubjectAssignmentsPage';
import EVSUnit2Quiz from './components/assignments/EVSUnit2Quiz';
import LessonPage from './components/courses/LessonPage';
import SettingsPage from './components/settings/SettingsPage';
import DiaryPage from './components/diary/DiaryPage';
// Teacher Components
import StudentsPage from './components/teacher/StudentsPage';
import AnalyticsPage from './components/teacher/AnalyticsPage';
import QuestionPaperGenerator from './components/teacher/QuestionPaperGenerator';
// Parent Components
import ChildrenPage from './components/parent/ChildrenPage';
import MessagesPage from './components/parent/MessagesPage';
import ParentCommunication from './components/parent/ParentCommunication';
import ParentReports from './components/parent/ParentReports';
import ParentCalendar from './components/parent/ParentCalendar';
// Admin Components
import UsersPage from './components/admin/UsersPage';
import ReportsPage from './components/admin/ReportsPage';
import SystemSettingsPage from './components/admin/SystemSettingsPage';
import BulkUserUpload from './components/admin/BulkUserUpload';
import ParentChildManagement from './components/admin/ParentChildManagement';
import AchievementsPage from './components/gamification/AchievementsPage';
import IntegrationsPage from './components/integrations/IntegrationsPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MobileNavigation from './components/layout/MobileNavigation';

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/courses" element={<CoursesListPage />} />
      <Route path="/courses/:courseId" element={<CoursePage />} />
      <Route path="/courses/:courseId/unit/:unitId" element={<LessonPage />} />
      <Route path="/assignments" element={<AssignmentsPage />} />
      <Route path="/assignments/:subjectId" element={<SubjectAssignmentsPage />} />
      <Route path="/grades" element={<GradesPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/ai-tutor" element={<AITutorPage />} />

      <Route path="/assignments/evs-body-parts" element={<EVSAssignmentPage />} />
      <Route path="/assignments/evs-unit2-quiz" element={<EVSUnit2Quiz />} />
      <Route path="/assignments/math-basics" element={<MathAssignmentPage />} />
      <Route path="/assignments/english-grammar" element={<EnglishAssignmentPage />} />
      <Route path="/assignments/hindi-basics" element={<HindiAssignmentPage />} />
      <Route path="/assignments/telugu-basics" element={<TeluguAssignmentPage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      {/* Teacher Routes */}
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/question-paper" element={<QuestionPaperGenerator />} />
      {/* Parent Routes */}
      <Route path="/children" element={<ChildrenPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/communication" element={<ParentCommunication />} />
      <Route path="/report-cards" element={<ParentReports />} />
      <Route path="/school-calendar" element={<ParentCalendar />} />
      {/* Admin Routes */}
      <Route path="/users" element={<UsersPage />} />
      <Route path="/bulk-upload" element={<BulkUserUpload />} />
      <Route path="/parent-management" element={<ParentChildManagement />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/system" element={<SystemSettingsPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ios-safe-area safari-fix pb-16 md:pb-0">
            <AppRoutes />
            <MobileNavigation />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;