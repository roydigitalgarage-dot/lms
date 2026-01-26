// Mock data service for static LMS
export const mockData = {
  classes: [
    { _id: 'class2', name: 'Class 2', level: 2, subjects: ['English', 'Math', 'EVS', 'Hindi', 'Telugu'] },
    { _id: 'class4', name: 'Class 4', level: 4, subjects: ['English', 'Math', 'Science', 'Social', 'Hindi', 'Telugu'] }
  ],

  lessons: [
    // Telugu Lessons - Using actual video files
    { _id: 'tel1', title: 'అల్లో నేరెడల్లో (Allo Neredallo)', subject: 'Telugu', class: 'class2', unit: 'Unit 1', content: 'అల్లో నేరెడల్లో - బతుకమ్మ పాట నేర్చుకుందాం. Telugu traditional song for children.', duration: '20 mins', videoUrl: '/videos/Telugu/2nd class telugu Allo Neredallo అల్లో నేరెడల్లో _Bathukamma _telugu song _ Bathukamma song.mp4' },
    { _id: 'tel2', title: 'బతుకమ్మ ఆడుదాం (Bathukamma Adudham)', subject: 'Telugu', class: 'class2', unit: 'Unit 2', content: 'బతుకమ్మ ఆడుదాం - Traditional Telugu festival song and dance.', duration: '25 mins', videoUrl: '/videos/Telugu/2nd class telugu bathukamma adudham  బతుకమ్మ ఆడుదాం _ telugu Songs _  Bathukamma song _ Bathukamma.mp4' },
    { _id: 'tel3', title: 'బతుకమ్మ పేరుద్దాం (Bathukamma Perudham)', subject: 'Telugu', class: 'class2', unit: 'Unit 3', content: 'బతుకమ్మ పేరుద్దాం - Learn about Bathukamma festival through songs.', duration: '15 mins', videoUrl: '/videos/Telugu/2nd class telugu Bathukamma perudham బతుకమ్మ పేరుద్దాం !_ Bathukamma _ bathukamma songs.mp4' },
    { _id: 'tel4', title: 'ఎర్రా డబ్బల బండి (Erra Dabbala Bandi)', subject: 'Telugu', class: 'class2', unit: 'Unit 4', content: 'ఎర్రా డబ్బల బండి - Traditional Telugu rhyme for children.', duration: '20 mins', videoUrl: '/videos/Telugu/2nd class telugu Erra dabbala bandi  ఎర్రా డబ్బల బండి _Bathukamma _ bathukamma song.mp4' },
    { _id: 'tel5', title: 'కాళ్ళ గజ్జా (Kalla Gajja)', subject: 'Telugu', class: 'class2', unit: 'Unit 5', content: 'కాళ్ళ గజ్జా - Telugu rhyme about traditional anklets.', duration: '15 mins', videoUrl: '/videos/Telugu/2nd class telugu kalla gajja కాళ్ళ గజ్జా telugu rhymes.mp4' },
    { _id: 'tel6', title: 'ముత్యాల చెమ్మ చెక్క (Muthyala Chemma Chekka)', subject: 'Telugu', class: 'class2', unit: 'Unit 6', content: 'ముత్యాల చెమ్మ చెక్క - Beautiful Telugu rhyme for children.', duration: '18 mins', videoUrl: '/videos/Telugu/2nd class telugu Muthyla chmma chekka ముత్యాల చెమ్మ చెక్క  _ telugu rhymes.mp4' },
    { _id: 'tel7', title: 'లచ్చా గుమ్మడి (Lachha Gummadi)', subject: 'Telugu', class: 'class2', unit: 'Unit 7', content: 'ఓ లచ్చా గుమ్మడి - Traditional Bathukamma song.', duration: '16 mins', videoUrl: '/videos/Telugu/2nd class telugu O Lachha gummadi  ఓ లచ్చా గుమ్మడి _ Bathukamma _ Bathukamma song.mp4' },
    { _id: 'tel8', title: 'పోయిరా గౌరమ్మ (Poyira Gouramma)', subject: 'Telugu', class: 'class2', unit: 'Unit 8', content: 'పోయిరా గౌరమ్మ - Bathukamma festival song.', duration: '17 mins', videoUrl: '/videos/Telugu/2nd class telugu poyira gouramma  పోయిరా గౌరమ్మ  _ Bathukamma _ Bathukamma song.mp4' },
    { _id: 'tel9', title: 'రంగురంగుల పూలు (Rangurangula Poolu)', subject: 'Telugu', class: 'class2', unit: 'Unit 9', content: 'రంగురంగుల పూలు - Colorful flowers Bathukamma song.', duration: '19 mins', videoUrl: '/videos/Telugu/2nd class telugu Rangurangula pulu  రంగురంగుల పూలు _ bathukamma _ bathukamma song.mp4' },

    // Hindi Lessons - Using actual video files
    { _id: 'hin1', title: 'घर कविता (Ghar Kavita)', subject: 'Hindi', class: 'class2', unit: 'Unit 1', content: 'घर कविता कक्षा दो - Learn about home through beautiful Hindi poetry.', duration: '20 mins', videoUrl: '/videos/Hindi/घर कविता कक्षा दो _ Ghar Kavita _ Class 2nd Poem Hindi _ New NCERT Hindi Book Poem With Music.mp4' },
    { _id: 'hin2', title: 'चींटा चींटा (Cheenta Cheenta)', subject: 'Hindi', class: 'class2', unit: 'Unit 2', content: 'चींटा चींटा कविता - Fun Hindi poem about ants for Class 2.', duration: '25 mins', videoUrl: '/videos/Hindi/चींटा चींटा _ Cheenta Cheenta Class 2 Poem_ Hindi Kavita New NCERT Hindi Book  #learnwithmusic.mp4' },
    { _id: 'hin3', title: 'टिल्लू जी कविता (Tillu Ji Kavita)', subject: 'Hindi', class: 'class2', unit: 'Unit 3', content: 'टिल्लू जी कविता - Chapter 7 from New NCERT Hindi book.', duration: '15 mins', videoUrl: '/videos/Hindi/टिल्लू जी कविता _ Tillu Ji Hindi Poem Class 2 _ Chapter 7 _ New NCERT 2023 _#learnwithmusic __.mp4' },
    { _id: 'hin4', title: 'माँ कविता (Maa Kavita)', subject: 'Hindi', class: 'class2', unit: 'Unit 4', content: 'माँ तुम कितनी भोली भली - Beautiful poem about mother.', duration: '20 mins', videoUrl: '/videos/Hindi/माँ कविता कक्षा दो _ Maa Poem Hindi CLASS 2 _ NCERT NEW BOOK _ Maa Tum Kitni Bholi Bhali Hindi poem.mp4' },

    // English Lessons - Using actual video files
    { _id: 'eng1', title: 'Class 2 English Syllabus Overview', subject: 'English', class: 'class2', unit: 'Unit 1', content: 'Complete overview of Class 2 English syllabus with Mridang curriculum.', duration: '25 mins', videoUrl: '/videos/English/Class 2 English (Mridang) - Syllabus Overview.mp4' },

    // Class 4 English - Unit 9
    {
      _id: 'eng9_class4',
      title: 'The Sleeping Beauty',
      subject: 'English',
      class: 'class4',
      unit: 'Unit 9',
      content: `
        <h2>👑 The Sleeping Beauty</h2>
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3">🖼️ Picture Reading</h3>
          <p class="mb-4">Look at the following pictures. Can you identify them? Think and tell your teacher the same.</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>An old King, An old Queen, A beautiful baby 👶</li>
            <li>A Fairy 🧚‍♀️, Spindle, Young and beautiful Princess 👸</li>
            <li>Staircase, Handsome Prince 🤴</li>
            <li>Rusty Key 🗝️, Thorny Bushes 🌹</li>
            <li>Magnificent Wedding 💒</li>
          </ul>
        </div>

        <div class="space-y-8 my-8">
          <div class="bg-blue-50 dark:bg-gray-700 p-4 rounded-xl">
            <h3 class="text-xl font-bold mb-3">🎬 Part 1: The Curse</h3>
            <video controls class="w-full rounded-lg shadow-lg" poster="/images/video-placeholder.jpg">
              <source src="/videos/English/09aThe Sleeping Beauty.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>

          <div class="bg-blue-50 dark:bg-gray-700 p-4 rounded-xl">
            <h3 class="text-xl font-bold mb-3">🎬 Part 2: The Sleep</h3>
            <video controls class="w-full rounded-lg shadow-lg" poster="/images/video-placeholder.jpg">
              <source src="/videos/English/09bThe Sleeping Beauty.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>

          <div class="bg-blue-50 dark:bg-gray-700 p-4 rounded-xl">
            <h3 class="text-xl font-bold mb-3">🎬 Part 3: The Awakening</h3>
            <video controls class="w-full rounded-lg shadow-lg" poster="/images/video-placeholder.jpg">
              <source src="/videos/English/09cThe Sleeping Beauty.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-4">✍️ Grammar: Adjectives of Quality</h2>
          <p class="mb-4 text-lg"><strong>Adjectives</strong> that show the quality, kind or condition of a person or thing are called <span class="text-red-500 font-bold">Adjectives of Quality</span>. They are also called Descriptive Adjectives.</p>
          
          <div class="bg-yellow-50 dark:bg-gray-700 p-6 rounded-xl border border-yellow-200 dark:border-gray-600 mb-6">
            <h3 class="text-xl font-bold mb-4 text-yellow-800 dark:text-yellow-300">🦁 Adjectives in the Animal World</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>• A <span class="text-red-500 font-bold">Lean</span> Hen 🐔</p>
              <p>• A <span class="text-red-500 font-bold">Fat</span> Cat 🐱</p>
              <p>• An <span class="text-red-500 font-bold">Old</span> Owl 🦉</p>
              <p>• A <span class="text-red-500 font-bold">Young</span> Yak 🐂</p>
              <p>• A <span class="text-red-500 font-bold">Tall</span> Giraffe 🦒</p>
              <p>• A <span class="text-red-500 font-bold">White</span> Rabbit 🐇</p>
              <p>• A <span class="text-red-500 font-bold">Pretty</span> Parrot 🦜</p>
              <p>• An <span class="text-red-500 font-bold">Ugly</span> Eagle 🦅</p>
              <p>• A <span class="text-red-500 font-bold">Small</span> Lion 🦁</p>
              <p>• A <span class="text-red-500 font-bold">Clever</span> Fox 🦊</p>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-gray-700 p-6 rounded-xl border border-green-200 dark:border-gray-600">
            <h3 class="text-xl font-bold mb-4 text-green-800 dark:text-green-300">📝 More Examples</h3>
            <ul class="space-y-3">
              <li>• Mumbai is a <span class="text-red-500 font-bold">large</span> city.</li>
              <li>• I ate some <span class="text-red-500 font-bold">ripe</span> mangoes and <span class="text-red-500 font-bold">seedless</span> grapes.</li>
              <li>• The child has a <span class="text-red-500 font-bold">smiling</span> face.</li>
              <li>• They lived in a <span class="text-red-500 font-bold">big red</span> house.</li>
              <li>• Mr. Ramesh is a <span class="text-red-500 font-bold">kind</span> man.</li>
              <li>• The camel is a very <span class="text-red-500 font-bold">useful</span> animal.</li>
              <li>• The dog is a <span class="text-red-500 font-bold">faithful</span> one.</li>
            </ul>
          </div>
        </div>
      `,
      duration: '45 mins',
      videoUrl: '' // Videos embedded in content
    },

    // Mathematics Lessons - Using actual video files
    { _id: 'math1', title: 'Mathematics Fundamentals', subject: 'Mathematics', class: 'class2', unit: 'Unit 1', content: 'Basic mathematics concepts for Class 2 students.', duration: '20 mins', videoUrl: '/videos/Mathematics/videoplayback.mp4' },

    // Science Lessons - Using actual video files
    { _id: 'sci1', title: 'Science Basics', subject: 'Science', class: 'class2', unit: 'Unit 1', content: 'Introduction to science concepts for young learners.', duration: '20 mins', videoUrl: '/videos/Science/videoplayback.mp4' },

    // Social Studies Lessons - Using actual video files
    { _id: 'soc1', title: 'Social Studies Introduction', subject: 'Social Studies', class: 'class2', unit: 'Unit 1', content: 'Basic social studies concepts for Class 2.', duration: '15 mins', videoUrl: '/videos/Social-Studies/videoplayback.mp4' },

    // EVS Lessons - Using actual video files
    { _id: 'evs1', title: 'My Body', subject: 'EVS', class: 'class2', unit: 'Unit 1', content: 'Head, Hands, Legs, Eyes, Ears, Nose, Mouth - Learn body parts and how to take care of them.', duration: '20 mins', videoUrl: '/videos/EVS/videoplayback.mp4' },
    { _id: 'evs2', title: 'Uses of Body Parts', subject: 'EVS', class: 'class2', unit: 'Unit 2', content: 'Learn about different body parts and their uses through interactive content.', duration: '20 mins', videoUrl: '/videos/2nd-unit.mp4' },
    { _id: 'evs3', title: 'Growing Older', subject: 'EVS', class: 'class2', unit: 'Unit 3', content: 'Understanding how we grow and change over time.', duration: '15 mins', videoUrl: '/videos/3rd unit.mp4' },
    { _id: 'evs4', title: 'My Family', subject: 'EVS', class: 'class2', unit: 'Unit 4', content: 'Learn about family members and relationships.', duration: '15 mins', videoUrl: '/videos/4th unit.mp4' }
  ],

  assignments: [
    {
      _id: 'assign1',
      title: 'Math Practice - Numbers',
      subject: 'Math',
      class: 'class2',
      dueDate: '2024-12-20',
      status: 'pending',
      description: 'Practice writing numbers 1-20'
    },
    {
      _id: 'assign2',
      title: 'Body Parts Quiz',
      subject: 'EVS',
      class: 'class2',
      dueDate: '2024-12-18',
      status: 'completed',
      description: 'Identify different body parts'
    },
    // New Class 2 Assignments
    {
      _id: 'assign3',
      title: 'Math: Addition Practice',
      subject: 'Math',
      class: 'class2',
      dueDate: '2024-12-22',
      status: 'pending',
      description: 'Solve the addition problems on page 12'
    },
    {
      _id: 'assign4',
      title: 'English: My Family',
      subject: 'English',
      class: 'class2',
      dueDate: '2024-12-24',
      status: 'pending',
      description: 'Write 5 sentences about your family members'
    },
    {
      _id: 'assign5',
      title: 'EVS: Plant Parts',
      subject: 'EVS',
      class: 'class2',
      dueDate: '2024-12-25',
      status: 'pending',
      description: 'Draw a plant and label its parts (Root, Stem, Leaf, Flower)'
    },
    {
      _id: 'assign6',
      title: 'Hindi: Varnamala',
      subject: 'Hindi',
      class: 'class2',
      dueDate: '2024-12-26',
      status: 'pending',
      description: 'Write Hindi vowels (Swar) from अ to अः'
    },
    {
      _id: 'assign7',
      title: 'Math: Shapes Activity',
      subject: 'Math',
      class: 'class2',
      dueDate: '2024-12-28',
      status: 'pending',
      description: 'Find 3 circular and 3 square objects in your home'
    },
    {
      _id: 'assign8',
      title: 'Telugu: Geetha (Rhyme)',
      subject: 'Telugu',
      class: 'class2',
      dueDate: '2024-12-30',
      status: 'pending',
      description: 'Recite and record the "Chitti Chilakamma" rhyme'
    }
  ],

  grades: [
    {
      _id: 'grade1',
      student: 'Alex Smith',
      subject: 'Math',
      assignment: 'Numbers Practice',
      score: 85,
      maxScore: 100,
      date: '2024-12-10'
    },
    {
      _id: 'grade2',
      student: 'Alex Smith',
      subject: 'EVS',
      assignment: 'Body Parts Quiz',
      score: 92,
      maxScore: 100,
      date: '2024-12-12'
    }
  ],

  events: [
    {
      _id: 'event1',
      title: 'Parent-Teacher Meeting',
      date: '2024-12-25',
      time: '10:00 AM',
      type: 'meeting',
      description: 'Quarterly parent-teacher conference'
    },
    {
      _id: 'event2',
      title: 'Science Fair',
      date: '2024-12-30',
      time: '2:00 PM',
      type: 'event',
      description: 'Annual school science fair'
    }
  ],

  users: [
    {
      _id: '1',
      name: 'Demo Administrator',
      email: 'demo@funlearning.com',
      role: 'administrator'
    },
    {
      _id: '2',
      name: 'Sarah Johnson',
      email: 'teacher1@funlearning.com',
      role: 'teacher',
      subjects: ['Math', 'Science']
    },
    {
      _id: '3',
      name: 'Alex Smith',
      email: 'student1_1@funlearning.com',
      role: 'student',
      class: 'class1'
    },
    {
      _id: '4',
      name: 'John Smith',
      email: 'parent1_1@funlearning.com',
      role: 'parent',
      children: ['3']
    }
  ],

  analytics: {
    totalStudents: 150,
    totalTeachers: 12,
    totalClasses: 8,
    totalLessons: 35,
    averageGrade: 87.5,
    attendanceRate: 94.2
  }
};

// Mock API functions
export const mockAPI = {
  // Auth
  login: (email: string, password: string) =>
    Promise.resolve({ success: true, user: mockData.users.find(u => u.email === email) }),

  // Classes
  getClasses: () => Promise.resolve(mockData.classes),
  getClass: (id: string) => Promise.resolve(mockData.classes.find(c => c._id === id)),

  // Lessons
  getLessons: (classId?: string) =>
    Promise.resolve(classId ? mockData.lessons.filter(l => l.class === classId) : mockData.lessons),
  getLesson: (id: string) => Promise.resolve(mockData.lessons.find(l => l._id === id)),

  // Assignments
  getAssignments: (classId?: string) =>
    Promise.resolve(classId ? mockData.assignments.filter(a => a.class === classId) : mockData.assignments),
  getAssignment: (id: string) => Promise.resolve(mockData.assignments.find(a => a._id === id)),

  // Grades
  getGrades: (studentId?: string) =>
    Promise.resolve(studentId ? mockData.grades.filter(g => g.student === studentId) : mockData.grades),

  // Events
  getEvents: () => Promise.resolve(mockData.events),

  // Users
  getUsers: () => Promise.resolve(mockData.users),
  getUser: (id: string) => Promise.resolve(mockData.users.find(u => u._id === id)),

  // Analytics
  getAnalytics: () => Promise.resolve(mockData.analytics),

  // Dashboard data
  getDashboardData: (role: string, userId: string) => {
    const baseData = {
      user: mockData.users.find(u => u._id === userId),
      recentActivity: [
        { type: 'lesson', title: 'Completed Math Lesson', time: '2 hours ago' },
        { type: 'assignment', title: 'Submitted EVS Assignment', time: '1 day ago' }
      ]
    };

    switch (role) {
      case 'student':
        return Promise.resolve({
          ...baseData,
          upcomingAssignments: mockData.assignments.slice(0, 3),
          recentGrades: mockData.grades.slice(0, 3),
          progress: { completed: 15, total: 20 }
        });
      case 'teacher':
        return Promise.resolve({
          ...baseData,
          students: mockData.users.filter(u => u.role === 'student').slice(0, 5),
          pendingGrades: 8,
          upcomingClasses: 3
        });
      case 'parent':
        return Promise.resolve({
          ...baseData,
          children: mockData.users.filter(u => u.role === 'student').slice(0, 2),
          upcomingEvents: mockData.events.slice(0, 2)
        });
      case 'administrator':
        return Promise.resolve({
          ...baseData,
          ...mockData.analytics,
          recentUsers: mockData.users.slice(0, 5)
        });
      default:
        return Promise.resolve(baseData);
    }
  }
};