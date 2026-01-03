import React, { useState, useRef, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Send, GraduationCap, User, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { getChatResponse } from '../../services/chatgpt';

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export default function AITutorPage() {
  const [selectedSubject, setSelectedSubject] = useState("English");
  const [selectedLanguage, setSelectedLanguage] = useState<
    "English" | "Telugu" | "Hindi"
  >("English");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: "bot",
      content: "Hi! I'm your English tutor! Ask me anything about English!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const subjects = [
    "English",
    "Telugu",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "EVS",
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Update language for Speech Recognition
  useEffect(() => {
    if (recognitionRef.current) {
      const langMap: Record<string, string> = {
        'English': 'en-US',
        'Hindi': 'hi-IN',
        'Telugu': 'te-IN'
      };
      recognitionRef.current.lang = langMap[selectedLanguage] || 'en-US';
    }
  }, [selectedLanguage]);

  // Auto-sync language to subject if subject is a language
  useEffect(() => {
    if (
      selectedSubject === "English" ||
      selectedSubject === "Telugu" ||
      selectedSubject === "Hindi"
    ) {
      setSelectedLanguage(selectedSubject as any);
    }
  }, [selectedSubject]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset chat when subject changes
  useEffect(() => {
    const freshStartParams = {
      id: 0,
      type: "bot" as const,
      content: `Hi! I'm your ${selectedSubject} tutor! Ask me anything about ${selectedSubject}!`,
      timestamp: new Date()
    };
    setMessages([freshStartParams]);

    // Announce the greeting if voice is enabled
    setTimeout(() => {
      speak(freshStartParams.content);
    }, 500);
  }, [selectedSubject]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setInputValue("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if (!voiceEnabled) return;

    // Cancel any current speech
    window.speechSynthesis.cancel();

    let rate = 0.85; // Natural "Teacher" pace for English
    let pitch = 1.05; // Friendly and engaging tone
    let spokenText = text;

    // CLEANUP FOR SPEECH ONLY:
    // 1. Remove Markdown bold (**)
    spokenText = spokenText.replace(/\*\*/g, "");
    // 2. Remove common emojis and symbols so they aren't read out
    spokenText = spokenText.replace(/[\u{1F300}-\u{1F9FF}]/gu, ""); // Symbols & Pictographs
    spokenText = spokenText.replace(/[\u{1F600}-\u{1F64F}]/gu, ""); // Emoticons
    spokenText = spokenText.replace(/[\u{2700}-\u{27BF}]/gu, "");   // Dingbats
    spokenText = spokenText.replace(/[#*]/g, "");                    // Remove headings hash or bullet stars

    // Special handling for Telugu Alphabet
    if (text.includes("అ ఆ ఇ")) {
      rate = 0.6; // Even slower for alphabet to be very clear
      spokenText = text.replace(/([\u0C00-\u0C7F]+)\s/g, "$1, ");
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);

    // Voice Selection: Priority list for the best "Tutor" voices
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = null;

    if (selectedLanguage === 'English') {
      const voicePriorities = [
        "Google US English", "Microsoft Zira", "Samantha", "Victoria", "Google UK English Female"
      ];
      for (const name of voicePriorities) {
        preferredVoice = voices.find(v => v.name.includes(name));
        if (preferredVoice) break;
      }
      if (!preferredVoice) {
        preferredVoice = voices.find(v => v.name.toLowerCase().includes("female"));
      }
    } else {
      // For Indian Languages (Hindi/Telugu)
      // Google voices are much better at pronunciation and mixed-language content
      const langCode = selectedLanguage === 'Hindi' ? 'hi' : 'te';
      preferredVoice = voices.find(v => v.name.includes("Google") && v.lang.includes(langCode)) ||
        voices.find(v => v.lang.includes(langCode));

      // Reduce rate slightly for Indian languages for better clarity
      if (!text.includes("అ ఆ ఇ")) {
        rate = 0.8;
      }
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    const langMap: Record<string, string> = {
      'English': 'en-US',
      'Hindi': 'hi-IN',
      'Telugu': 'te-IN'
    };
    utterance.lang = langMap[selectedLanguage] || 'en-US';
    utterance.rate = rate;
    utterance.pitch = pitch;

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    const userMsg: Message = {
      id: messages.length,
      type: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    const fallbackResponses = {
      Science: {
        basics: "Let me explain the basics of Science. \n\nScience is basically studying the world around us. Think of it like being a detective! 🕵️‍♂️ We look at plants, animals, and even the stars to understand how they work.\n\nFor example, we ask 'Why is the sky blue?' or 'How do plants eat?'. \n\nDoes that sound interesting to you?",
        brain: "Let's talk about the Brain! 🧠\n\nThink of your brain like the 'Captain' of a ship or the CPU of a computer. It sits heavily protected inside your head.\n\nIts job is to control everything you do—thinking, moving, and feeling. When you want to kick a ball, your brain sends a message to your leg saying 'Kick now!'.\n\nDoes that make sense?",
        heart: "Let me explain the Heart. ❤️\n\nImagine a water pump in a garden that keeps water flowing. Your heart is exactly like that pump, but for blood!\n\nIt works day and night to push blood to every part of your body so you have energy. If you put your hand on your chest, you can feel it working: 'Lub-dub, lub-dub'.\n\nCan you feel your heartbeat?",
        plant: "Let me explain how Plants grow. 🌱\n\nPlants are like living factories. To grow, they need three main ingredients: Sunlight ☀️, Water 💧, and Air 🌬️.\n\nThey mix these together to make their own food! This process gives us the oxygen we breathe. So, they feed themselves and help us live too!\n\nUse your imagination—can you see a plant drinking water?",
        sun: "Think of the Sun like a giant, glowing ball of hot gas in space. ☀️\n\nIt's actually a Star, just like the tiny ones at night, but it's very close to us. It creates all the light and warmth we have on Earth. Without it, everything would be dark and frozen!\n\nDoes that help you understand what the Sun is?",
        moon: "The Moon is Earth's best friend in space! 🌙\n\nIt's a big rock that goes round and round our Earth. It doesn't have its own light; it just reflects the Sun's light, like a mirror in the dark.\n\nHave you noticed how it changes shape from a full circle to a tiny slice?",
        water: "Water is the most important thing for life! 💧\n\nThink of it as the fuel for all living things. Humans, animals, and plants all need it to survive. It covers most of our Earth in oceans and rivers.\n\nWe must save it because we can't make new water. Does that make sense?",
        default: "Science is amazing! I can explain things like the Brain 🧠, the Heart ❤️, or how Plants grow 🌱. What are you curious about?"
      },
      Mathematics: {
        basics: "Math is basically playing with numbers! 🔢\n\nIt helps us count things, like how many candies you have, or measure things, like how tall you are. We start with 1, 2, 3 and learn to add and subtract.\n\nDoes that sound fun?",
        add: "Let me explain Addition. \n\nAddition is just 'putting things together'. Imagine you have 2 chocolates 🍫, and I give you 3 more. If you put them all in one bowl, how many do you have?\n\n2 + 3 = 5! You have 5 chocolates now. Simple, right?",
        subtract: "Let's understand Subtraction. \n\nThink of it as 'taking away'. Imagine you have 5 apples 🍎 in a basket. If you eat 2 of them, how many are left?\n\n5 - 2 = 3! You have 3 apples left. Does that make sense?",
        multiply: "Multiplication is a faster way to add! ✖️\n\nImagine you have 3 boxes, and each box has 2 toys inside. Instead of counting one by one (1,2...3,4...), you just say '3 boxes of 2' is 6!\n\nIt helps us count big groups quickly. Do you see how that works?",
        circle: "Let me describe a Circle. 🔴\n\nA Circle is a shape that is perfectly round, like a ball or a coin. It has no corners and no straight lines. If you start drawing it and go all the way around, you end up exactly where you started!\n\nCan you think of something else that is a circle?",
        triangle: "Think of a Triangle like a slice of pizza! 🍕\n\nIt is a shape with exactly 3 corners and 3 straight sides. The word 'Tri' actually means three! It's a very strong shape.\n\nDoes that help you picture it?",
        square: "Let me explain a Square. 🟥\n\nImagine a box. A Square is a shape where all 4 sides are exactly the same length. It has 4 sharp corners. It looks the same no matter which way you turn it!\n\nDoes that description make sense?",
        default: "Math is like a puzzle! I can help you with Adding, Subtracting, or Shapes like Circles and Squares. What do you want to learn?"
      },
      English: {
        basics: "Let's look at the basics of English. 📚\n\nIt starts with the Alphabet (A, B, C...). Every word we speak is built from these letters. Once we know words, we learn 'Grammar' which is just the rules for putting words together properly.\n\nShall we start with the Alphabet?",
        alphabet: "The Alphabet is the set of building blocks for English! 🧱\n\nHere is the full list of 26 letters:\n\n**Uppercase (Big):**\nA B C D E F G H I J K L M N O P Q R S T U V W X Y Z\n\n**Lowercase (Small):**\na b c d e f g h i j k l m n o p q r s t u v w x y z\n\nEvery word is made from these! Shall we try spelling your name?",
        grammar: "Grammar is like the 'traffic rules' for language! 🚦\n\nJust like cars need rules to drive safely, words need rules to make sense. If I say 'Cat run fast', it sounds broken. Grammar helps us fix it to 'The cat runs fast'.\n\nDoes that explain why we need it?",
        noun: "Let me explain Nouns simply. \n\nA Noun is just a 'Naming Word'. Look around you—everything has a name.\n\n• A person? (Teacher)\n• A place? (School)\n• A thing? (Pencil)\n\nAll these names are Nouns! Can you tell me a Noun you see right now?",
        verb: "Let's learn about Verbs. \n\nA Verb is an 'Action Word'. It describes doing something.\n\nThink of what you do all day: Run 🏃, Sleep 😴, Eat 🍎. All these action words are Verbs. Without a verb, nothing happens in a sentence!\n\nDoes that make sense?",
        adjective: "Adjectives are 'Describing Words'. \n\nThey add color to our sentences! Instead of just saying 'A dog', you can say 'A BIG, FLUFFY dog'.\n\n'Big' and 'Fluffy' are adjectives because they tell us more about the dog. Do you get it?",
        default: "English is fun! I can explain Nouns, Verbs, or the Alphabet. What should we talk about?"
      },
      Telugu: {
        basics: "Telugu is a beautiful language! 🍯\n\nWe start with 'Aksharalu' (Letters). Telugu is special because we write exactly what we say. After letters, we learn 'Guninthalu' to make different sounds.\n\nShall I show you the letters?",
        aksharalu: "Let me show you the full Telugu Aksharalu (Letters). ✍️\n\n**అచ్చులు (Vowels):**\nఅ ఆ ఇ ఈ ఉ ఊ ఋ ౠ\nఎ ఏ ఐ ఒ ఓ ఔ అం అః\n\n**హల్లులు (Consonants):**\nక ఖ గ ఘ ఙ\nచ ఛ జ ఝ ఞ\nట ఠ డ ఢ ణ\nత థ ద ధ న\nప ఫ బ భ మ\nయ ర ల వ శ ష స హ ళ క్ష ఱ\n\nThese are the beautiful sounds of Telugu! Shall we practice saying them?",
        gununthalu: "Guninthalu are like magic accessories for letters! ✨\n\nTake the letter 'Ka' (క). If we add different sounds to it, it changes:\n• Ka + aa = Kaa (కా)\n• Ka + i = Ki (కి)\n\nIt helps us make all the sounds in words. Does that make sense?",
        amma: "The word 'Amma' (అమ్మ) means Mother. ❤️\n\nIt is often the first word a baby says. It starts with the first letter 'A' (అ) and ends with 'Ma' (మ). It's a very special word full of love.\n\nCan you say 'Amma'?",
        default: "Telugu is sweet like honey! Ask me about 'Aksharalu' or words like 'Amma'. What do you want to know?"
      },
      Hindi: {
        basics: "Hindi is our national language! 🇮🇳\n\nIt starts with 'Varnamala' (The garland of letters). We have Swar (Vowels) and Vyanjan (Consonants). Knowing Hindi helps us talk to people all over India!\n\nShall we look at the letters?",
        varnamala: "Let me show you the full Hindi Varnamala. 🕉️\n\n**स्वर (Vowels):**\nअ आ इ ई उ ऊ ऋ\nए ऐ ओ औ अं अः\n\n**व्यंजन (Consonants):**\nक ख ग घ ङ\nच छ ज झ ञ\nट ठ ड ढ ण\nत थ द ध न\nप फ ब भ म\nय र ल व श ष स ह क्ष त्र ज्ञ\n\nKnowing these lets you read anything in Hindi! Does this look familiar?",
        barakhadi: "Barakhadi is how we mix sounds in Hindi! 🎶\n\nImagine the letter 'Ka' (क).\n• Add an 'Ah' sound -> Kaa (का)\n• Add an 'E' sound -> Ki (कि)\n\nThis list of changes is called Barakhadi. use it to write any name! Does that make sense?",
        namaste: "Namaste (नमस्ते) is how we say Hello in India! 🙏\n\nIt literally means 'I bow to you'. It's a very respectful way to greet elders or teachers. You fold your hands and bow your head slightly.\n\nTry doing it now!",
        default: "Hindi is great to learn! Ask me about 'Varnamala' or 'Namaste'. What shall we discuss?"
      },
      EVS: {
        basics: "EVS stands for Environmental Science. 🌍\n\nIt's basically the study of Nature and our surroundings. We learn how to keep our Earth happy by planting trees and not throwing trash. \n\nDo you like spending time in nature?",
        environment: "The Environment is everything around us. 🌳\n\nIt includes the air we breathe, the water we drink, and the land we walk on. Imagine Earth is our home; we must keep it clean, right?\n\nThat's why we say 'Save the Environment'! Does that explain it?",
        pollution: "Let me explain Pollution. 😷\n\nImagine if someone threw dirt in your drinking water. Yuck, right? Pollution is exactly that—making our air, water, or land dirty.\n\nSmoke from cars and throwing plastic on the road causes pollution. We should stop doing that! Do you agree?",
        food: "Why do we eat Food? 🍎\n\nThink of your body like a car. A car needs petrol to run. You need Food to run, play, and study!\n\nHealthy food like fruits and veggies gives you 'Super Power' energy. Junk food makes you tired. Which one do you prefer?",
        default: "Nature is wonderful! I can tell you about Pollution, Food, or the Environment. What topic do you like?"
      },
      "Social Studies": {
        basics: "Social Studies helps us understand people and how we live together. 🤝\n\nWe learn about our Family, our Community (like police and doctors), and our Country. It teaches us how to be good citizens.\n\nShall we talk about Family?",
        family: "Let's talk about Family. 👨‍👩‍👧‍👦\n\nYour family is your first team! It's the people who live with you and love you—like parents, brothers, sisters, and grandparents.\n\nThey help you when you are small and take care of you. Everyone's family is special. Does that make sense?",
        community: "What is a Community? 🏘️\n\nA Community is like a big team of people living in one place. We all help each other.\n• The Doctor heals us.\n• The Policeman keeps us safe.\n• The Teacher helps us learn.\n\nWe all work together to make life happy. Do you see how it works?",
        country: "We live in a big country called India! 🇮🇳\n\nIt's our home on the world map. We have many different languages, foods, and clothes, but we are all Indians. Our flag has three beautiful colors: Saffron, White, and Green.\n\nAre you proud of our country?",
        festival: "Festivals are celebrations! 🎉\n\nThey are special days where we feel happy, wear new clothes, and eat sweet dishes. \n• Diwali is the festival of lights.\n• Holi is for colors.\n• Christmas is for gifts.\n\nIt brings family and friends together. What is your favorite festival?",
        school: "School is a place for learning and friendship! 🏫\n\nIt's not just about books. It's where you learn to share, play games, and work in a team. Your teachers are there to guide you like second parents.\n\nDo you like going to school?",
        gandhi: "Mahatma Gandhi is a very special person in our history. 👴\n\nWe call him the 'Father of the Nation'. He taught us that we can win fights without hitting anyone—just by telling the Truth and being peaceful.\n\nThat is called 'Non-violence'. Isn't that a powerful idea?",
        ocean: "An Ocean is a super-giant body of salty water. 🌊\n\nIt's much, much bigger than a river. It covers most of our Earth! Whales, sharks, and millions of fish live there.\n\nThere are 5 big oceans. The biggest one is the Pacific. Can you imagine that much water?",
        default: "Social Studies connects us all! Ask about Family, Gandhi, or Festivals. What connects with you?"
      }
    };

    const getLocalResponse = (text: string, subject: string) => {
      const lower = text.toLowerCase();

      // Math Logic (Dynamic)
      if (lower.includes('add') || lower.includes('plus') || lower.includes('+') ||
        lower.includes('sub') || lower.includes('minus') || lower.includes('-') ||
        lower.includes('mul') || lower.includes('times') || lower.includes('x') || lower.includes('*') ||
        lower.includes('div') || lower.includes('/') || /\d+/.test(lower)) {

        const numbers = text.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
          const num1 = parseInt(numbers[0]);
          const num2 = parseInt(numbers[1]);
          if (lower.includes('add') || lower.includes('plus') || lower.includes('+')) {
            return `${num1} + ${num2} = ${num1 + num2}! Great job! 🔢`;
          } else if (lower.includes('sub') || lower.includes('minus') || lower.includes('-')) {
            return `${num1} - ${num2} = ${num1 - num2}! Well done! ➖`;
          } else if (lower.includes('mul') || lower.includes('times') || lower.includes('x') || lower.includes('*')) {
            return `${num1} × ${num2} = ${num1 * num2}! Excellent! ✖️`;
          } else if (lower.includes('div') || lower.includes('divide') || lower.includes('/')) {
            if (num2 !== 0) {
              const result = num1 / num2;
              return `${num1} ÷ ${num2} = ${result % 1 === 0 ? result : result.toFixed(2)}! Amazing! ➗`;
            }
            return "Cannot divide by zero! Try a different number! 😅";
          }
          // Default to addition if just numbers
          return `${num1} + ${num2} = ${num1 + num2}! (Addition) 🔢`;
        }
      }

      // Keyword matching
      for (const [key, value] of Object.entries((fallbackResponses as any)[subject] || {})) {
        if (key !== 'default' && lower.includes(key.toLowerCase())) {
          return value as string;
        }
      }

      return null;
    };

    // Try local response first for speed
    let botContent: string = getLocalResponse(trimmed, selectedSubject) || "";

    // If no local response, try API or fallback
    if (!botContent) {
      try {
        // Check if we have an API key configured (simple check)
        // Note: In a real app, we'd check usage quota too
        // Attempt to call the AI service
        const response = await getChatResponse({
          message: trimmed,
          subject: selectedSubject,
          language: selectedLanguage
        });

        if (response.success && response.content) {
          botContent = response.content;
        } else {
          // API failed or no key, use default fallback
          botContent = (fallbackResponses as any)[selectedSubject]?.default ||
            `I'm your ${selectedSubject} tutor! Ask me anything! 😊`;
        }
      } catch (e) {
        console.error("Chat error:", e);
        botContent = (fallbackResponses as any)[selectedSubject]?.default ||
          `I'm your ${selectedSubject} tutor! Ask me anything! 😊`;
      }
    }

    const botMsg: Message = {
      id: messages.length + 1,
      type: "bot",
      content: botContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
    speak(botContent);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-120px)] max-w-3xl mx-auto flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 md:p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">AI Tutor</h1>
                <p className="text-sm md:text-base opacity-90">
                  Learning {selectedSubject}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white"
                title={voiceEnabled ? "Mute Bot Voice" : "Enable Bot Voice"}
              >
                {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 bg-white/20 text-white rounded-lg border border-white/30 text-sm focus:outline-none"
              >
                {subjects.map((s) => (
                  <option key={s} value={s} className="text-black">
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as any)}
                className="px-3 py-2 bg-white/20 text-white rounded-lg border border-white/30 text-sm focus:outline-none"
              >
                <option value="English" className="text-black">
                  English
                </option>
                <option value="Telugu" className="text-black">
                  Telugu
                </option>
                <option value="Hindi" className="text-black">
                  Hindi
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === "user"
                  ? "bg-blue-500 text-white"
                  : msg.isError
                    ? "bg-red-500 text-white"
                    : "bg-purple-500 text-white"
                  }`}
              >
                {msg.type === "user" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <GraduationCap className="w-5 h-5" />
                )}
              </div>

              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${msg.type === "user"
                  ? "bg-blue-500 text-white"
                  : msg.isError
                    ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
              >
                <div className="text-sm break-words whitespace-pre-wrap">{msg.content}</div>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {/* Replay button for bot messages */}
                {msg.type === "bot" && (
                  <button
                    onClick={() => speak(msg.content)}
                    className="mt-1 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors opacity-50 hover:opacity-100"
                    title="Read aloud"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 md:p-6 bg-gray-50 dark:bg-gray-800">
          <div className="flex gap-3">
            <button
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition-all ${isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? "Listening..." : "Type your question... 💭"}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium rounded-2xl transition-colors flex items-center gap-2 flex-shrink-0"
            >
              <Send className="w-5 h-5" />
              <span className="hidden md:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
