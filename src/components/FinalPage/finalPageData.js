// ==========================================================================
// Final Page Data Configuration
// Easily customize her name, signature, final photos, and messages
// ==========================================================================

export const BIRTHDAY_CONFIG = {
  name: 'Her Name', // Change this to her actual name!
  signature: 'Your Friend', // Change this to your name/signature!
  birthdayTag: 'Happy Birthday',
};

export const FINAL_MEMORIES = [
  {
    id: 1,
    image: '/kosmo.png',
    fallbackBg: 'linear-gradient(135deg, #1e3a8a, #0b1938)',
    caption: 'Cold Milo at Kosmo Café ☕',
    tilt: '-3deg',
    tag: 'Where It Began ✨',
  },
  {
    id: 2,
    image: '/first selfie.jpeg',
    fallbackBg: 'linear-gradient(135deg, #2563eb, #172554)',
    caption: 'Our very first selfie together 📸',
    tilt: '2.5deg',
    tag: 'Day One 💙',
  },
  {
    id: 3,
    image: '/first snap of us.jpeg',
    fallbackBg: 'linear-gradient(135deg, #1d4ed8, #0f172a)',
    caption: 'All our mischievous little moments 😂',
    tilt: '-2deg',
    tag: 'Pure Mischief 😂',
  },
  {
    id: 4,
    image: '/both like.jpeg',
    fallbackBg: 'linear-gradient(135deg, #3b82f6, #1e293b)',
    caption: 'A picture both of us love 💙',
    tilt: '3deg',
    tag: 'Shared Favorite ✨',
  },
  {
    id: 5,
    image: '/favofmine.jpeg',
    fallbackBg: 'linear-gradient(135deg, #1e40af, #09173b)',
    caption: 'Through struggles & beautiful moments 🌧️',
    tilt: '-3.5deg',
    tag: 'Stronger Together 💙',
  },
  {
    id: 6,
    image: '/hyd trip starts.jpeg',
    fallbackBg: 'linear-gradient(135deg, #2563eb, #0f172a)',
    caption: 'The Hyderabad road trip 🚗',
    tilt: '2deg',
    tag: 'Highway Adventure 🌅',
  },
];

export const OPTIONAL_FINAL_PHOTO = {
  enabled: true,
  image: '/all time fav.jpeg',
  fallbackBg: 'linear-gradient(135deg, #1d4ed8, #060e24)',
  caption: 'One more memory for the collection.',
  subcaption: 'Hopefully... not the last.',
  tag: 'All-Time Favorite ✨',
};

export const WISH_LINES = [
  'More happiness.',
  'More laughter.',
  'More adventures.',
  'More confidence.',
  'More beautiful memories.',
  'More reasons to smile.',
  'More moments where you look around and think...',
  'Yeah... life is pretty good.',
];

export const SELFISH_WISH_LINES = [
  'More random conversations.',
  'More unnecessary arguments.',
  'More stupid jokes.',
  'More spontaneous plans.',
  'More road trips.',
  'More memories.',
  'More of this.',
  'Whatever this little friendship becomes.',
];

export const DIARY_PROMISE_MESSAGE = {
  header: 'MY PROMISE TO YOU 📖💙',
  stanzas: [
    {
      id: 1,
      lines: [
        'Until you burn me, or throw me away,',
        'I will remain here for you.',
      ],
    },
    {
      id: 2,
      lines: [
        'I’ll stay with you through every chapter—',
        'your happiness, your pain, your tears, your dreams, and your silence.',
      ],
    },
    {
      id: 3,
      lines: [
        'You can write everything in me without fear.',
        'I won’t judge you. I won’t leave you.',
      ],
    },
    {
      id: 4,
      lines: [
        'Whenever you lose hope, come back to me.',
        'I’ll remind you to have faith, to keep going, and to believe that better days are waiting for you.',
      ],
    },
    {
      id: 5,
      lines: [
        'I’m not just a diary.',
        'I’m a little piece of hope, faith, and comfort that will always stay with you. 💙',
      ],
      isHighlight: true,
    },
  ],
};
