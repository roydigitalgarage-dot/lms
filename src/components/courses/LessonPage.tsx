import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Play, FileText, ArrowLeft, CheckCircle } from 'lucide-react';

export default function LessonPage() {
  const { courseId, unitId } = useParams();
  const [showVideo, setShowVideo] = useState(false);

  const subjectData = {
    telugu: { name: 'Telugu', emoji: '🅰️', color: 'from-red-400 to-pink-500' },
    hindi: { name: 'Hindi', emoji: '🇮🇳', color: 'from-orange-400 to-red-500' },
    english: { name: 'English', emoji: '🇬🇧', color: 'from-blue-400 to-purple-500' },
    maths: { name: 'Mathematics', emoji: '🔢', color: 'from-green-400 to-blue-500' },
    science: { name: 'Science', emoji: '🔬', color: 'from-purple-400 to-pink-500' },
    social: { name: 'Social Studies', emoji: '🌍', color: 'from-yellow-400 to-orange-500' },
    evs: { name: 'EVS', emoji: '🌱', color: 'from-green-400 to-teal-500' }
  };

  const subject = subjectData[courseId as keyof typeof subjectData] || subjectData.english;

  const getVideoPath = (courseId: string, unitNumber: number) => {
    // Get lesson from mock data based on courseId and unitNumber
    const mockData = {
      lessons: [
        // Telugu videos
        { subject: 'Telugu', unit: 'Unit 1', videoUrl: '/videos/Telugu/2nd class telugu Allo Neredallo అల్లో నేరెడల్లో _Bathukamma _telugu song _ Bathukamma song.mp4' },
        { subject: 'Telugu', unit: 'Unit 2', videoUrl: '/videos/Telugu/2nd class telugu bathukamma adudham  బతుకమ్మ ఆడుదాం _ telugu Songs _  Bathukamma song _ Bathukamma.mp4' },
        { subject: 'Telugu', unit: 'Unit 3', videoUrl: '/videos/Telugu/2nd class telugu Bathukamma perudham బతుకమ్మ పేరుద్దాం !_ Bathukamma _ bathukamma songs.mp4' },
        { subject: 'Telugu', unit: 'Unit 4', videoUrl: '/videos/Telugu/2nd class telugu Erra dabbala bandi  ఎర్రా డబ్బల బండి _Bathukamma _ bathukamma song.mp4' },
        { subject: 'Telugu', unit: 'Unit 5', videoUrl: '/videos/Telugu/2nd class telugu kalla gajja కాళ్ళ గజ్జా telugu rhymes.mp4' },
        { subject: 'Telugu', unit: 'Unit 6', videoUrl: '/videos/Telugu/2nd class telugu Muthyla chmma chekka ముత్యాల చెమ్మ చెక్క  _ telugu rhymes.mp4' },
        { subject: 'Telugu', unit: 'Unit 7', videoUrl: '/videos/Telugu/2nd class telugu O Lachha gummadi  ఓ లచ్చా గుమ్మడి _ Bathukamma _ Bathukamma song.mp4' },
        { subject: 'Telugu', unit: 'Unit 8', videoUrl: '/videos/Telugu/2nd class telugu poyira gouramma  పోయిరా గౌరమ్మ  _ Bathukamma _ Bathukamma song.mp4' },
        { subject: 'Telugu', unit: 'Unit 9', videoUrl: '/videos/Telugu/2nd class telugu Rangurangula pulu  రంగురంగుల పూలు _ bathukamma _ bathukamma song.mp4' },
        
        // Hindi videos
        { subject: 'Hindi', unit: 'Unit 1', videoUrl: '/videos/Hindi/घर कविता कक्षा दो _ Ghar Kavita _ Class 2nd Poem Hindi _ New NCERT Hindi Book Poem With Music.mp4' },
        { subject: 'Hindi', unit: 'Unit 2', videoUrl: '/videos/Hindi/चींटा चींटा _ Cheenta Cheenta Class 2 Poem_ Hindi Kavita New NCERT Hindi Book  #learnwithmusic.mp4' },
        { subject: 'Hindi', unit: 'Unit 3', videoUrl: '/videos/Hindi/टिल्लू जी कविता _ Tillu Ji Hindi Poem Class 2 _ Chapter 7 _ New NCERT 2023 _#learnwithmusic __.mp4' },
        { subject: 'Hindi', unit: 'Unit 4', videoUrl: '/videos/Hindi/माँ कविता कक्षा दो _ Maa Poem Hindi CLASS 2 _ NCERT NEW BOOK _ Maa Tum Kitni Bholi Bhali Hindi poem.mp4' },
        
        // English videos
        { subject: 'English', unit: 'Unit 1', videoUrl: '/videos/English/Class 2 English (Mridang) - Syllabus Overview.mp4' },
        
        // Mathematics videos
        { subject: 'Mathematics', unit: 'Unit 1', videoUrl: '/videos/Mathematics/videoplayback.mp4' },
        
        // Science videos
        { subject: 'Science', unit: 'Unit 1', videoUrl: '/videos/Science/videoplayback.mp4' },
        
        // Social Studies videos
        { subject: 'Social Studies', unit: 'Unit 1', videoUrl: '/videos/Social-Studies/videoplayback.mp4' },
        
        // EVS videos
        { subject: 'EVS', unit: 'Unit 1', videoUrl: '/videos/EVS/videoplayback.mp4' },
        { subject: 'EVS', unit: 'Unit 2', videoUrl: '/videos/2nd-unit.mp4' },
        { subject: 'EVS', unit: 'Unit 3', videoUrl: '/videos/3rd unit.mp4' },
        { subject: 'EVS', unit: 'Unit 4', videoUrl: '/videos/4th unit.mp4' }
      ]
    };
    
    const subjectMap: { [key: string]: string } = {
      'telugu': 'Telugu',
      'hindi': 'Hindi', 
      'english': 'English',
      'maths': 'Mathematics',
      'science': 'Science',
      'social': 'Social Studies',
      'evs': 'EVS'
    };
    
    const subjectName = subjectMap[courseId] || courseId;
    const unitName = `Unit ${unitNumber}`;
    
    const lesson = mockData.lessons.find(l => 
      l.subject === subjectName && l.unit === unitName
    );
    
    return lesson ? lesson.videoUrl : null;
  };

  const unitNumber = parseInt(unitId || '1');
  const videoPath = getVideoPath(courseId || 'evs', unitNumber);

  const getUnitTitle = (unitId: number) => {
    if (courseId === 'evs') {
      const evsUnits = [
        'About Me',
        'Uses of Body Parts',
        'Growing Older',
        'My Family',
        'Food We Eat',
        'Clothes We Wear',
        'Our Houses',
        'Safety Habits',
        'Places in My Neighbourhood',
        'Unit 10'
      ];
      return evsUnits[unitId - 1] || `Unit ${unitId}`;
    }
    return `Unit ${unitId}`;
  };

  const unitTitle = getUnitTitle(unitNumber);

  const getEVSContent = (unitId: number) => {
    const evsContent = {
      1: {
        title: 'About Me',
        content: `
          <h2>🙋‍♀️ About Me</h2>
          <img src="/images/lessons/about-me.jpg" alt="About Me" style="width: 100%; max-width: 400px; height: 200px; object-fit: cover; border-radius: 12px; margin: 16px 0;" onerror="this.style.display='none'" />
          <p>Hi! Let's learn about ourselves. Every person is special and unique!</p>
          
          <h3>What makes me special?</h3>
          <ul>
            <li>My name is special to me</li>
            <li>I have my own birthday</li>
            <li>I like different things</li>
            <li>I am good at different things</li>
          </ul>

          <h3>Things I can do</h3>
          <ul>
            <li>I can walk and run</li>
            <li>I can talk and sing</li>
            <li>I can draw and write</li>
            <li>I can help others</li>
          </ul>

          <h3>My feelings</h3>
          <p>I feel happy when I play. I feel sad when I am hurt. It's okay to have different feelings!</p>
        `
      },
      2: {
        title: 'Uses of Body Parts',
        content: `
          <h2>👁️ Uses of Body Parts</h2>
          <img src="/images/lessons/body-parts-main.jpg" alt="Child learning about body parts" style="width: 100%; max-width: 400px; height: auto; object-fit: contain; border-radius: 12px; margin: 16px 0;" onerror="this.style.display='none'" />
          <p>Our body is made up of different parts. Some parts of human body can be seen such as hands, feet, eyes, nose, mouth, etc. These are called external organs. Some parts of the body are covered by skin. We cannot see them. The skin protects these vital organs. These organs are brain, lungs, kidneys, stomach, etc. These are called internal organs.</p>
          
          <h3>🧠 Brain</h3>
          <img src="/images/lessons/brain.jpeg" alt="Brain diagram" style="width: 100%; max-width: 300px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>Brain is the important part of our body. It is located inside our head. It helps us to think and act. It controls the movement of our body.</p>
          <p>Every person in the world has his own distinguished fingerprint pattern.</p>

          <h3>🤍 Lungs</h3>
          <img src="/images/lessons/lungs.jpeg" alt="Lungs diagram" style="width: 100%; max-width: 300px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>The lungs help us to breathe. When we breathe in, the lungs are filled with air.</p>

          <h3>❤️ Heart</h3>
          <img src="/images/lessons/heart.png" alt="Heart diagram" style="width: 100%; max-width: 300px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>The heart pumps and supplies blood to all parts of our body.</p>
          <p>Touch the left side of your chest. Can you feel something beating? That's your heart. Our heart beats about 72 times in a minute.</p>

          <h3>🍽️ Stomach</h3>
          <img src="/images/lessons/stomach.png" alt="Stomach diagram" style="width: 100%; max-width: 300px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>The food that we eat goes into the stomach and is then digested. It is like a bag.</p>
          <p>Besides these, we have liver, kidneys and many other organs inside our body.</p>
          
          <h3>🦠 Liver</h3>
          <img src="/images/lessons/liver.jpeg" alt="Liver diagram" style="width: 100%; max-width: 300px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>The liver helps clean our blood and helps digest food. It is one of the largest organs in our body.</p>

          <h3>👀 Our Sense Organs</h3>
          <p>We have five sense organs which help us to see, hear, smell, taste and feel. All these sense organs make us aware of the things around us.</p>
          
          <h4>My Eyes 👀</h4>
          <img src="/images/lessons/eyes.jpg" alt="Eyes diagram" style="width: 100%; max-width: 250px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>These help us to know the things around us. These are my eyes. These help me to see objects of different shapes and sizes.</p>

          <h4>My Nose 👃</h4>
          <img src="/images/lessons/nose.jpg" alt="Nose diagram" style="width: 100%; max-width: 250px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>This is my nose. It helps me to smell.</p>

          <h4>My Ears 👂</h4>
          <img src="/images/lessons/ears.jpg" alt="Ears diagram" style="width: 100%; max-width: 250px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>These are my ears. These help me to hear loud and soft voices.</p>

          <h4>My Tongue 👅</h4>
          <img src="/images/lessons/tongue.jpg" alt="Tongue diagram" style="width: 100%; max-width: 250px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>This is my tongue. It helps me to taste different food items and their nature like sweet, sour, salty and bitter.</p>

          <h4>My Skin ✋</h4>
          <img src="/images/lessons/skin.jpg" alt="Skin diagram" style="width: 100%; max-width: 250px; height: auto; object-fit: contain; border-radius: 8px; margin: 8px 0;" onerror="this.style.display='none'" />
          <p>This is my skin. It can feel hard, soft, cold, hot, smooth and rough things. It also covers my body.</p>

          <h3>Taking care of my body</h3>
          <p>I wash my hands and brush my teeth to stay healthy!</p>
        `
      },
      3: {
        title: 'Growing Older',
        content: `
          <h2>🌱 Growing Older</h2>
          <img src="https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2" alt="Child growing and learning" style="width: 100%; max-width: 400px; height: 200px; object-fit: cover; border-radius: 12px; margin: 16px 0;" />
          <p>All living things grow. Plants, animals and human beings are living things. When we grow, our body parts also grow. This is true for all living things.</p>
          
          <h3>🌳 Examples of Growth</h3>
          <ul>
            <li>A plant grows into a tree or bush</li>
            <li>A pup grows up to become a dog</li>
            <li>A boy grows and becomes a man</li>
            <li>A girl grows and becomes a woman</li>
          </ul>

          <h3>👶 Stages of Human Growth</h3>
          <p>Children always keep growing. At birth every child is a small baby. The mother takes care of her baby.</p>
          
          <h4>Small Baby 👶</h4>
          <p>From a baby, we grow up to be a young boy/girl.</p>
          
          <h4>Growing Child 🧒</h4>
          <p>With time, a young boy/girl grow up as teenager.</p>
          
          <h4>Teenager 🧑</h4>
          <p>Teenagers grow to become adults.</p>
          
          <h4>Adult 👨👩</h4>
          <p>Adults grow old. Their hair turn grey and body becomes weak.</p>

          <h3>🔄 What Changes and What Stays Same</h3>
          <p>When we grow, some body features change and some remain the same.</p>
          
          <h4>Features that CHANGE:</h4>
          <ul>
            <li>Height - we grow taller</li>
            <li>Weight - we become heavier</li>
            <li>Colour of hair - may change with age</li>
          </ul>
          
          <h4>Features that stay SAME:</h4>
          <ul>
            <li>Colour of eyes - stays the same</li>
            <li>Number of fingers - always 10</li>
          </ul>

          <h3>Growing up is amazing!</h3>
          <p>Every day we learn something new. Growing up means becoming stronger, smarter and more independent!</p>
        `
      },
      4: {
        title: 'My Family',
        content: `
          <h2>👨‍👩‍👧‍👦 My Family</h2>
          <p>Family is very important! They love us and take care of us.</p>
          
          <h3>🏠 Types of Families</h3>
          
          <h4>Nuclear Family 👨👩👧</h4>
          <p>When parents and their children stay together in a house, it is called a nuclear family. A nuclear family can be big or small. Father is the head of a nuclear family.</p>
          
          <h4>Joint Family 👨👩👧👦👴👵</h4>
          <p>When grandparents, parents and their children stay together in a house, it is called a joint family. In a joint family, grandparents, parents, children, aunts, uncles and cousins all live together in the same house.</p>
          
          <h4>Single Parent Family 👩👧</h4>
          <p>A single parent family has children and either of the parents.</p>

          <h3>👥 Our Relations</h3>
          <ul>
            <li><strong>Paternal Grandparents (Dada and Dadi):</strong> Father's parents</li>
            <li><strong>Maternal Grandparents (Nana and Nani):</strong> Mother's parents</li>
            <li><strong>Aunt:</strong> Father's/Mother's sister</li>
            <li><strong>Uncle:</strong> Father's/Mother's brother</li>
            <li><strong>Cousins:</strong> Children of uncle and aunt</li>
          </ul>

          <h3>💼 Role of Family Members</h3>
          <p>Every member of a family performs an important role.</p>
          
          <h4>Parents 👨👩</h4>
          <p>Parents take care of the home and all the needs of their children.</p>
          
          <h4>Father 👨</h4>
          <p>Father earns money for the family. He takes care of all the needs of the family. He helps the children in their studies.</p>
          
          <h4>Mother 👩</h4>
          <p>Mother takes care of all the needs of each family member. She cooks food, washes clothes and takes care of the entire household.</p>

          <h3>🧒 Children's Duties</h3>
          <p>As a family, children also have certain duties to perform:</p>
          <ul>
            <li>They should help the mother in the kitchen</li>
            <li>They should help in keeping the house clean</li>
            <li>They can do small jobs like bringing things from the nearby market</li>
            <li>They can look after the plants</li>
            <li>They should take care of their younger brothers/sisters</li>
          </ul>

          <h3>Family love ❤️</h3>
          <p>My family loves me very much. I love my family too!</p>
        `
      },
      5: {
        title: 'Food We Eat',
        content: `
          <h2>🍎 Food We Eat</h2>
          <p>Food gives us energy to play and grow strong!</p>
          
          <h3>Healthy foods 🥕</h3>
          <ul>
            <li>Fruits like apples and bananas</li>
            <li>Vegetables like carrots and spinach</li>
            <li>Milk and eggs</li>
          </ul>

          <h3>Why we need food</h3>
          <ul>
            <li>To grow big and strong</li>
            <li>To have energy to play</li>
            <li>To stay healthy</li>
          </ul>

          <h3>Good eating habits</h3>
          <ul>
            <li>Wash hands before eating</li>
            <li>Eat at the right time</li>
            <li>Don't waste food</li>
          </ul>

          <h3>My favorite foods</h3>
          <p>I like to eat different foods. Healthy food tastes good and makes me strong!</p>
        `
      },
      6: {
        title: 'Clothes We Wear',
        content: `
          <h2>👕 Clothes We Wear</h2>
          <p>Clothes keep us warm and make us look nice!</p>
          
          <h3>Different types of clothes</h3>
          <ul>
            <li>Shirts and pants</li>
            <li>Dresses and skirts</li>
            <li>Sweaters for cold weather</li>
          </ul>

          <h3>Why we wear clothes</h3>
          <ul>
            <li>To cover our body</li>
            <li>To stay warm or cool</li>
            <li>To look neat and clean</li>
          </ul>

          <h3>Taking care of clothes</h3>
          <ul>
            <li>Keep clothes clean</li>
            <li>Fold them nicely</li>
            <li>Don't tear or dirty them</li>
          </ul>

          <h3>Special clothes</h3>
          <p>We wear different clothes for school, home, and special days!</p>
        `
      },
      7: {
        title: 'Our Houses',
        content: `
          <h2>🏠 Our Houses</h2>
          <p>Houses keep us safe and give us a place to live with our family!</p>
          
          <h3>Parts of a house</h3>
          <ul>
            <li>Rooms where we sleep and eat</li>
            <li>Kitchen where we cook food</li>
            <li>Bathroom where we wash</li>
          </ul>

          <h3>Why we need houses</h3>
          <ul>
            <li>To stay safe from rain and sun</li>
            <li>To keep our things</li>
            <li>To live with our family</li>
          </ul>

          <h3>Keeping our house clean</h3>
          <ul>
            <li>Put toys in their place</li>
            <li>Don't throw garbage anywhere</li>
            <li>Help keep rooms tidy</li>
          </ul>

          <h3>My home</h3>
          <p>My house is special because my family lives there. I feel safe and happy at home!</p>
        `
      },
      8: {
        title: 'Safety Habits',
        content: `
          <h2>🛡️ Safety Habits</h2>
          <p>Being safe is very important! Let's learn how to stay safe.</p>
          
          <h3>At home safety</h3>
          <ul>
            <li>Don't touch hot things</li>
            <li>Don't play with sharp objects</li>
            <li>Tell parents if something is wrong</li>
          </ul>

          <h3>On the road safety</h3>
          <ul>
            <li>Hold an adult's hand when crossing</li>
            <li>Look left and right before crossing</li>
            <li>Don't run on the road</li>
          </ul>

          <h3>At school safety</h3>
          <ul>
            <li>Walk, don't run in corridors</li>
            <li>Play safely with friends</li>
            <li>Tell teacher if someone is hurt</li>
          </ul>

          <h3>Good habits</h3>
          <p>Following safety rules keeps me and my friends safe and happy!</p>
        `
      },
      9: {
        title: 'Places in My Neighbourhood',
        content: `
          <h2>🏪 Places in My Neighbourhood</h2>
          <p>There are many helpful places near our home!</p>
          
          <h3>Important places</h3>
          <ul>
            <li>School - where I learn</li>
            <li>Hospital - where doctors help sick people</li>
            <li>Market - where we buy food</li>
          </ul>

          <h3>Fun places</h3>
          <ul>
            <li>Park - where I can play</li>
            <li>Library - where I can read books</li>
            <li>Temple - where we pray</li>
          </ul>

          <h3>Helpful people</h3>
          <ul>
            <li>Police - they keep us safe</li>
            <li>Shopkeeper - they sell things we need</li>
            <li>Postman - they bring letters</li>
          </ul>

          <h3>My neighbourhood</h3>
          <p>I like my neighbourhood because there are many nice places and helpful people!</p>
        `
      }
    };
    return evsContent[unitId as keyof typeof evsContent];
  };

  const lessonContent = {
    title: `${subject.name} - ${unitTitle}`,
    description: `Learn about ${unitTitle.toLowerCase()} through interactive content and engaging activities.`,
    content: courseId === 'evs' && getEVSContent(unitNumber) ? 
      getEVSContent(unitNumber)!.content : 
      `
        <h2>Welcome to ${unitTitle}</h2>
        <p>In this lesson, you will learn about ${unitTitle.toLowerCase()}. This lesson is designed to help you understand the fundamental principles through practical examples and interactive exercises.</p>
        
        <h3>Learning Objectives</h3>
        <ul>
          <li>Understand the basic concepts and terminology</li>
          <li>Apply knowledge through practical exercises</li>
          <li>Develop problem-solving skills</li>
          <li>Build confidence in the subject matter</li>
        </ul>

        <h3>Study Materials</h3>
        <p>Make sure to review all the materials provided and complete the practice exercises. Take notes as you go through the content to help reinforce your learning.</p>
        
        <h3>Additional Learning Resources</h3>
        <p>Complete the reading materials above, then enhance your understanding with the video lesson below.</p>
      `
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link 
            to={`/courses/${courseId}`}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Course</span>
          </Link>
        </div>

        {/* Lesson Header */}
        <div className={`bg-gradient-to-r ${subject.color} text-white rounded-3xl p-8 shadow-xl`}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-3xl">{subject.emoji}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{lessonContent.title}</h1>
              <p className="text-lg opacity-90 mt-2">{lessonContent.description}</p>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {showVideo && videoPath ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-black aspect-video">
              <video 
                controls 
                className="w-full h-full"
                autoPlay
                muted
                onMouseEnter={(e) => {
                  e.currentTarget.play().catch(console.error);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                }}
                onError={(e) => console.error('Video error:', e)}
              >
                <source src={videoPath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4">
              <button
                onClick={() => setShowVideo(false)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Hide Video
              </button>
            </div>
          </div>
        ) : null}

        {/* Lesson Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: lessonContent.content }}
          />

          {/* Video Button - Always show for all subjects */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {videoPath && !showVideo ? (
              <button
                onClick={() => setShowVideo(true)}
                className={`flex items-center space-x-3 bg-gradient-to-r ${subject.color} text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg mb-4`}
              >
                <Play className="w-6 h-6" />
                <span>🎥 Watch Unit Video</span>
              </button>
            ) : videoPath ? (
              <div className="mb-4">
                <p className="text-green-600 dark:text-green-400 font-medium">✅ Video is playing above</p>
              </div>
            ) : (
              <div className="mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <Play className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">Video content coming soon for this unit</p>
                </div>
              </div>
            )}
            
            {/* Complete Lesson Button */}
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              <CheckCircle className="w-5 h-5" />
              <span>Mark Lesson as Complete</span>
            </button>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Additional Resources</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-900 dark:text-white">Lesson Notes (PDF)</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
              <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-gray-900 dark:text-white">Practice Exercises</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}