// Static API service for LMS
import { mockData } from './mockData';

export const staticAPI = {
  // Dashboard data
  getDashboardData: async (role: string, userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
    
    const user = mockData.users.find(u => u._id === userId);
    
    switch (role) {
      case 'student':
        return {
          student: {
            name: user?.name || 'Alex Smith',
            class: 'Class 1',
            email: user?.email || 'student@funlearning.com'
          },
          subjects: 5,
          upcomingAssignments: mockData.assignments.slice(0, 3),
          recentGrades: mockData.grades.slice(0, 3),
          upcomingEvents: mockData.events.slice(0, 2),
          stats: {
            completedLessons: 15,
            averageGrade: 87.5,
            totalTimeSpent: 120
          }
        };
        
      case 'teacher':
        return {
          teacher: {
            name: user?.name || 'Sarah Johnson',
            email: user?.email || 'teacher@funlearning.com'
          },
          students: mockData.users.filter(u => u.role === 'student').slice(0, 5),
          classes: mockData.classes.slice(0, 3),
          pendingGrades: 8,
          upcomingClasses: 3,
          stats: {
            totalStudents: 25,
            averageGrade: 85.2,
            completionRate: 92
          }
        };
        
      case 'parent':
        return {
          parent: {
            name: user?.name || 'John Smith',
            email: user?.email || 'parent@funlearning.com'
          },
          children: [
            {
              name: 'Alex Smith',
              class: 'Class 1',
              recentGrades: mockData.grades.slice(0, 2),
              attendance: 95
            }
          ],
          upcomingEvents: mockData.events.slice(0, 2),
          messages: 3
        };
        
      case 'administrator':
        return {
          admin: {
            name: user?.name || 'Demo Administrator',
            email: user?.email || 'admin@funlearning.com'
          },
          stats: mockData.analytics,
          recentUsers: mockData.users.slice(0, 5),
          systemHealth: 'Good'
        };
        
      default:
        return {};
    }
  },

  // Other API methods
  getClasses: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.classes;
  },

  getLessons: async (classId?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return classId ? mockData.lessons.filter(l => l.class === classId) : mockData.lessons;
  },

  getAssignments: async (classId?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return classId ? mockData.assignments.filter(a => a.class === classId) : mockData.assignments;
  },

  getGrades: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.grades;
  },

  getEvents: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.events;
  },

  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.users;
  }
};