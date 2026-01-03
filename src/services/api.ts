// Centralized API service for static LMS
import { mockData } from './mockData';

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Mock fetch wrapper
  async fetch(url: string, options?: RequestInit) {
    await delay();
    
    // Parse the URL to determine what data to return
    if (url.includes('/api/dashboard/student/')) {
      return {
        ok: true,
        json: async () => ({
          student: { name: 'Alex Smith', class: 'Class 1', email: 'student@funlearning.com' },
          subjects: 5,
          upcomingAssignments: mockData.assignments.slice(0, 3),
          recentGrades: mockData.grades.slice(0, 3),
          upcomingEvents: mockData.events.slice(0, 2),
          stats: { completedLessons: 15, averageGrade: 87.5, totalTimeSpent: 120 }
        })
      };
    }
    
    if (url.includes('/api/dashboard/teacher/')) {
      return {
        ok: true,
        json: async () => ({
          teacher: { name: 'Sarah Johnson', email: 'teacher@funlearning.com' },
          students: mockData.users.filter(u => u.role === 'student').slice(0, 5),
          classes: mockData.classes.slice(0, 3),
          stats: { totalStudents: 25, averageGrade: 85.2, completionRate: 92 }
        })
      };
    }
    
    if (url.includes('/api/dashboard/parent/')) {
      return {
        ok: true,
        json: async () => ({
          parent: { name: 'John Smith', email: 'parent@funlearning.com' },
          children: [{ name: 'Alex Smith', class: 'Class 1', recentGrades: mockData.grades.slice(0, 2), attendance: 95 }],
          upcomingEvents: mockData.events.slice(0, 2)
        })
      };
    }
    
    if (url.includes('/api/classes')) {
      return { ok: true, json: async () => mockData.classes };
    }
    
    if (url.includes('/api/events')) {
      return { ok: true, json: async () => mockData.events };
    }
    
    if (url.includes('/api/assignments')) {
      return { ok: true, json: async () => mockData.assignments };
    }
    
    if (url.includes('/api/grades')) {
      return { ok: true, json: async () => ({ grades: mockData.grades, stats: { average: 87.5, total: 10 } }) };
    }
    
    if (url.includes('/api/users')) {
      return { ok: true, json: async () => mockData.users };
    }
    
    if (url.includes('/api/diary')) {
      return { ok: true, json: async () => ({ entries: [], homework: [] }) };
    }
    
    if (url.includes('/api/parent') && url.includes('/children')) {
      return { ok: true, json: async () => [{ _id: '3', name: 'Alex Smith', class: 'Class 1' }] };
    }
    
    if (url.includes('/api/analytics')) {
      return { ok: true, json: async () => mockData.analytics };
    }
    
    // Default response
    return { ok: true, json: async () => ({ success: true, data: [] }) };
  }
};

// Replace global fetch for static version
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  (window as any).fetch = (url: string, options?: RequestInit) => {
    if (typeof url === 'string' && url.includes('localhost:5000')) {
      return api.fetch(url, options);
    }
    return originalFetch(url, options);
  };
}