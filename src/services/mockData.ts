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
        <h2 class="text-3xl font-bold mb-6">👑 The Sleeping Beauty</h2>
        
        <div class="mb-8 bg-purple-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-2xl font-bold mb-4">🖼️ Picture Reading</h3>
          <p class="mb-4 text-lg">Look at the following pictures. Can you identify them? Think and tell your teacher the same.</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">👑 An old King</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">👑 An old Queen</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">👶 A beautiful baby</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">🧚‍♀️ A Fairy</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">🧵 Spindle</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">👸 Princess</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">🏰 Staircase</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">🗝️ Rusty Key</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">🌹 Thorny Bushes</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">💒 Wedding</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">🤴 Prince</div>
          </div>
        </div>

        <div class="space-y-6 my-8">
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold mb-3">🎬 Part 1: The Curse</h3>
            <iframe 
              src="https://drive.google.com/file/d/1LbCw177n3Z3vPwMZGWKSloS5fe6lUHKF/preview" 
              width="100%" 
              height="480"
              allow="autoplay"
              class="rounded-lg shadow-lg"
              style="border: none;"
              frameborder="0"
            ></iframe>
          </div>

          <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold mb-3">🎬 Part 2: The Sleep</h3>
            <iframe 
              src="https://drive.google.com/file/d/1KiURuCTlqFZ3eYUc9Nu7rgelaFeYjx-n/preview" 
              width="100%" 
              height="480"
              allow="autoplay"
              class="rounded-lg shadow-lg"
              style="border: none;"
              frameborder="0"
            ></iframe>
          </div>

          <div class="bg-gradient-to-r from-pink-50 to-red-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold mb-3">🎬 Part 3: The Awakening</h3>
            <iframe 
              src="https://drive.google.com/file/d/1UNEhP-gjVqFt7cBqAT4h5IcvfQ_657zN/preview" 
              width="100%" 
              height="480"
              allow="autoplay"
              class="rounded-lg shadow-lg"
              style="border: none;"
              frameborder="0"
            ></iframe>
          </div>
        </div>

        <div class="my-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-2xl font-bold mb-4">📖 The Story</h3>
          <div class="space-y-4 text-base leading-relaxed">
            <p>Long, long ago, there lived a king and a queen who longed for a baby. One day, when the queen was bathing in the lake, a frog jumped out of the water and said, "Before the end of this year, your wish to have a baby will be granted."</p>
            
            <p>A few days later the prediction of the frog came true and the Queen gave birth to a beautiful baby girl and she decided to have a grand christening ceremony. They have not only invited their relatives and friends, but also invited the twelve good fairies to be godmothers. However, there were thirteen fairies in the land, but the king had forgotten the thirteenth as she lived alone faraway in a castle and she was not invited. That proved a grave mistake for the King and Queen and they soon realized their mistake.</p>
            
            <p>The christening was held grandly and when it was almost over, the good fairies went up to the cradle and bestowed gifts on the baby. One gave her gift of virtue, another, beauty and another, wealth and the baby Princess had all the gifts. When the eleventh fairy had bestowed her gift, the thirteenth fairy came and said, "I am going to give her a gift which will never allow her to forget me." She shouted and wailed, "On her sixteenth birthday, the Princess will prick herself with a spindle and will die."</p>
            
            <p>All the members were dumbstruck but the twelfth fairy came and as she had the power to lift the wicked curse, she eased it saying, "Take comfort. The Princess won't die, but falls into deep sleep for hundred years when she pricks her finger on the spindle."</p>
            
            <p>The king ordered all the spindles to be banned and burnt as the hope that he would save his daughter from the magic spell of the thirteenth fairy. He regretted not inviting her to the christening.</p>
            
            <p>The years flew and the princess grew up to be kind and beautiful and was loved by all. On her sixteenth birthday her parents were away for part of the day. So the princess was alone for most of the day.</p>
            
            <p>She wandered all over the palace and had a look at all the places where she had never been before. Finally, she came to a winding staircase which led to a tower. She climbed up the staircase and reached a little door with a rusty key in the lock. When she turned it, the door opened and she found an old woman busily spinning flax on a spindle.</p>
            
            <p>The old woman greeted her and invited her. The princess asked her, "What are you doing?" The old woman replied, "I'm spinning yarn." The princess then asked, "What is that thing that is jumping up and down?". "That's a spindle," replied the old woman, "Will you try it?" The princess took the spindle and began to spin.</p>
            
            <p>As soon as she touched the spindle, she fell asleep. The whole palace along with her parents who have just arrived also fell asleep. There was not even the rustle of the dry leaf as everybody and everything have slept peacefully.</p>
            
            <p>A hedge of thorns grew up around the palace. Every year the hedge grew higher and thicker and eventually the flag on the palace roof could no longer be seen.</p>
            
            <p>The story of the sleeping beauty became a legend in that land. From time to time princes went to cut the thorns, but they failed in their attempts. So almost all of them gave up the idea of searching for the Sleeping Beauty.</p>
            
            <p>After a hundred years, a prince heard about the story of the Sleeping Beauty. He knew about the attempts of the other princes who have failed and he thought, "I want to go and find the lovely Sleeping Beauty for myself," saying so he rode to the hedge of thorns and a mysterious thing happened.</p>
            
            <p>When he was about to cut the wild hedge of thorns a path opened up, and the prince rode straight into the palace. The wild thorns closed up to form a hedge once more.</p>
            
            <p>The prince saw the horses, dogs, birds asleep. He looked around and saw the king and queen also fast asleep.</p>
            
            <p>Finally, he came to the tower and opened the door to the little room where the princess lay sleeping. She looked so beautiful that he bent down to kiss her on the lips. As his lips touched hers, the Sleeping Beauty awoke and fell in love with the prince at first sight.</p>
            
            <p>The rest of the palace awoke after their long sleep. It seemed as though time had stood still and those long, long years had never passed.</p>
            
            <p class="font-semibold">The spell was lifted at last and the darkest days were finished. Soon everyone enjoyed the magnificent Wedding Reception of Sleeping Beauty. The prince and the Sleeping Beauty lived happily thereafter. No one ever saw or heard about that troublesome thirteenth fairy.</p>
          </div>
        </div>

        <div class="my-8 bg-yellow-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-2xl font-bold mb-4">🎭 Listening & Speaking</h3>
          <div class="bg-white dark:bg-gray-700 p-4 rounded-lg space-y-2">
            <p><strong>Witch:</strong> The princess will never forget me in her life.</p>
            <p><strong>Queen:</strong> Please forgive us. Do not bestow a curse on our princess.</p>
            <p><strong>King:</strong> We beg for your pardon. Don't do it to our daughter.</p>
            <p><strong>Witch:</strong> The princess in her sixteenth year will prick herself with a spindle and die.</p>
          </div>
        </div>

        <div class="my-8 bg-green-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-2xl font-bold mb-4">📚 Glossary</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Predict:</strong> to tell in advance, foretell</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Christened:</strong> a ceremony conducted for naming a child</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Bestow:</strong> present</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Castle:</strong> palace</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Virtue:</strong> goodness</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Curse:</strong> evil, misfortune</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Prick:</strong> drive a sharp point into</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Hedge:</strong> a fence formed by bushes</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Wander:</strong> walk aimlessly</div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg"><strong>Attempt:</strong> try</div>
          </div>
        </div>

        <div class="my-8">
          <h2 class="text-3xl font-bold mb-6">✍️ Grammar: Adjectives of Quality</h2>
          <p class="mb-4 text-lg bg-blue-100 dark:bg-gray-700 p-4 rounded-lg"><strong>Adjectives</strong> that show the quality, kind or condition of a person or thing are called <span class="text-red-500 font-bold">Adjectives of Quality</span>. They are also called <span class="text-blue-600 dark:text-blue-400 font-bold">Descriptive Adjectives</span>.</p>
          
          <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:bg-gray-700 p-6 rounded-xl border-2 border-yellow-300 dark:border-gray-600 mb-6">
            <h3 class="text-2xl font-bold mb-4 text-yellow-800 dark:text-yellow-300">🦁 Adjectives in the Animal World</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Lean</span> Hen 🐔</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Fat</span> Cat 🐱</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">An <span class="text-red-600 font-bold">Old</span> Owl 🦉</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Young</span> Yak 🐂</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Tall</span> Giraffe 🦒</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">White</span> Rabbit 🐇</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Pretty</span> Parrot 🦜</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">An <span class="text-red-600 font-bold">Ugly</span> Eagle 🦅</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Dirty</span> Dog 🐕</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Neat</span> Dove 🕊️</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Big</span> Pig 🐷</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Small</span> Lion 🦁</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Clever</span> Fox 🦊</div>
              <div class="bg-white dark:bg-gray-600 p-3 rounded-lg">A <span class="text-red-600 font-bold">Foolish</span> Camel 🐫</div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:bg-gray-700 p-6 rounded-xl border-2 border-green-300 dark:border-gray-600 mb-6">
            <h3 class="text-2xl font-bold mb-4 text-green-800 dark:text-green-300">📝 More Examples</h3>
            <ul class="space-y-2">
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">Mumbai is a <span class="text-red-600 font-bold">large</span> city.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">I ate some <span class="text-red-600 font-bold">ripe</span> mangoes and <span class="text-red-600 font-bold">seedless</span> grapes.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">The child has a <span class="text-red-600 font-bold">smiling</span> face.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">They lived in a <span class="text-red-600 font-bold">big red</span> house.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">Mr. Ramesh is a <span class="text-red-600 font-bold">kind</span> man.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">The camel is a very <span class="text-red-600 font-bold">useful</span> animal.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">The dog is a <span class="text-red-600 font-bold">faithful</span> one.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">These <span class="text-red-600 font-bold">small</span> apples have a <span class="text-red-600 font-bold">sweet</span> taste.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">Mr. Suman bought a <span class="text-red-600 font-bold">new</span> car.</li>
              <li class="bg-white dark:bg-gray-600 p-3 rounded-lg">We have <span class="text-red-600 font-bold">warm</span> weather in Summer.</li>
            </ul>
            <p class="mt-4 p-3 bg-yellow-100 dark:bg-gray-600 rounded-lg font-semibold">📌 NOTE: Adjectives of quality always answer the question, "Of what kind?"</p>
          </div>
        </div>

        <div class="my-8 bg-purple-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-2xl font-bold mb-4">❓ Comprehension Questions</h3>
          <ol class="space-y-3 list-decimal list-inside">
            <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">What did the frog tell the queen?</li>
            <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">What is the mistake committed by the king and queen?</li>
            <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">What is the curse given by the thirteenth fairy?</li>
            <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">What happened on the princess' sixteenth birthday?</li>
            <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">At last, who had woken up the princess?</li>
          </ol>
        </div>

        <div class="my-8 bg-orange-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-2xl font-bold mb-4">🎨 Vocabulary Exercises</h3>
          
          <div class="mb-6">
            <h4 class="text-xl font-bold mb-3">Watch & Match</h4>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Match the words that go together:</p>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg">1. big → building</div>
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg">2. wise → owl</div>
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg">3. strong → elephant</div>
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg">4. ugly → Solomon</div>
              <div class="bg-white dark:bg-gray-700 p-3 rounded-lg">5. healthy → cow</div>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="text-xl font-bold mb-3">Fill & Drill</h4>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Fill in the blanks with Adjectives of Quality:</p>
            <ol class="space-y-2 list-decimal list-inside">
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">He is an ________ man. (honest)</li>
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">The child fell down from a ________ tree. (tall)</li>
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">Swimming is a ________ exercise. (good)</li>
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">The elephant is a ________ animal. (big)</li>
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">Ram is an ________ boy. (intelligent)</li>
            </ol>
          </div>

          <div>
            <h4 class="text-xl font-bold mb-3">Pick & Tick</h4>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Pick out the Adjectives of Quality:</p>
            <ol class="space-y-2 list-decimal list-inside">
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">The thirteenth fairy was a <span class="text-red-600 font-bold">wicked</span> woman.</li>
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">Chocolates are very <span class="text-red-600 font-bold">sweet</span>.</li>
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">The <span class="text-red-600 font-bold">greedy</span> man killed the <span class="text-red-600 font-bold">golden</span> hen for money.</li>
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">Chennai is a <span class="text-red-600 font-bold">large</span> city.</li>
              <li class="bg-white dark:bg-gray-700 p-3 rounded-lg">The prince was very <span class="text-red-600 font-bold">handsome</span>.</li>
            </ol>
          </div>
        </div>

        <div class="my-8 bg-pink-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 class="text-2xl font-bold mb-4">🎨 Fun Time - Become An Artist!</h3>
          <p class="mb-4">Show the following Descriptive Adjectives by drawing pictures:</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
              <div class="text-4xl mb-2">🐱</div>
              <p>A fat cat</p>
            </div>
            <div class="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
              <div class="text-4xl mb-2">😊</div>
              <p>A smiling face</p>
            </div>
            <div class="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
              <div class="text-4xl mb-2">🥚</div>
              <p>A broken egg</p>
            </div>
            <div class="bg-white dark:bg-gray-700 p-4 rounded-lg text-center">
              <div class="text-4xl mb-2">🚲</div>
              <p>A small bicycle</p>
            </div>
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