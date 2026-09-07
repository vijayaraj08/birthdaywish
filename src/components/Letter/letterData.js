// ==========================================================================
// Letter Data Configuration
// Easily editable paragraphs, highlights, and P.S. notes
// ==========================================================================

export const LETTER_OPENING = {
  salutation: 'Dear You,',
  introLead: 'I know...',
  introTimeline: "We haven't known each other for that long.",
  introPause: "Which honestly makes it even more surprising...",
  introClimax:
    "how from one simple Cold Milo at Kosmo Café to our Hyderabad road trip, we've already managed to create a whole story full of memories.",
};

export const LETTER_PARAGRAPHS = [
  {
    id: 1,
    type: 'standard',
    content:
      "It all started with that simple Cold Milo at Kosmo Café — just one outing, one drink, and a moment we probably didn't realize would become the beginning of so many unforgettable memories.",
  },
  {
    id: 2,
    type: 'standard',
    content:
      "Then came our time at Flip Diner with that burger, turning into an unforgettable evening with endless chats, soups, laughter, and all those mischievous little things we did together.",
  },
  {
    id: 3,
    type: 'standard',
    content:
      "But our story isn't just about the fun times. From the very beginning, we've gone through struggles, difficult phases, misunderstandings, and moments that tested us. Somehow, through all of that, we kept moving forward and continued creating memories together.",
  },
  {
    id: 4,
    type: 'highlight', // Special highlight moment
    lead: 'From that first Milo to Hyderabad...',
    climax: 'every single piece made our story unforgettable. 💙',
  },
  {
    id: 5,
    type: 'standard',
    content:
      "And then there is you. You have a natural smile unlike anything I had seen before in my life — so genuine and innocent that even just remembering it can make me smile. Somewhere along the way, you made me your human diary, trusting me with your thoughts, your feelings, and all the little stories you carried inside. Honestly, knowing you trusted me that much meant everything.",
  },
  {
    id: 6,
    type: 'standard',
    content:
      "And whenever you cry or get emotional, it affects me in a way I still haven't learned how to explain. You surprised me by singing songs for me, did things I never saw coming, and made the simplest moments feel different. I don't know if you do these things for everyone, but for me, they felt special. They still do.",
  },
  {
    id: 7,
    type: 'appreciations',
    intro: "I truly appreciate every single part of this journey:",
    points: [
      'That first Cold Milo at Kosmo Café where it all began.',
      'Flip Diner, the burger, the soups, and all our mischievous antics.',
      'Making me your human diary and trusting me with your thoughts.',
      'The unexpected moments you sang songs just for me.',
      'Staying strong through the misunderstandings, struggles, and tough days.',
      'The open road and late night conversations in Hyderabad.',
      'Your natural smile that makes even ordinary days feel special.',
    ],
  },
  {
    id: 8,
    type: 'lines',
    lines: [
      'And yes...',
      "I know it hasn't been that long.",
      "But I don't think every friendship needs years behind it to be meaningful.",
      'Sometimes the connection, and everything you fight through together, matters so much more.',
    ],
  },
  {
    id: 9,
    type: 'standard',
    content:
      "These aren't just places we visited or things we did. They are pieces of our story — from the smallest silly moments to the biggest struggles — and I'm genuinely glad you're part of it.",
  },
  {
    id: 10,
    type: 'birthday_wishes',
    lead: 'So on your birthday...',
    wishes: [
      'I just want you to know that I hope this next year brings you a lot of happiness.',
      'More adventures.',
      'More reasons to laugh and smile your natural smile.',
      'More crazy stories.',
      'More people who appreciate you.',
      'And hopefully...',
      'a lot more memories for us to add to this story.',
    ],
  },
  {
    id: 11,
    type: 'closing',
    signoff: 'Happy Birthday. 💙',
    thankYou: 'And thank you for becoming such an unforgettable part of this journey.',
  },
];

export const POSTSCRIPT_NOTE = {
  header: 'P.S.',
  lines: [
    'Yes, I know this got a little serious.',
    'And yes...',
    "I'll probably go back to annoying you normally after this. 😂",
    'Consider this your one emotional message quota. 😂',
  ],
  signature: '— Me 💙',
};

export const LETTER_FINALE = {
  line1: "That's all I wanted to say.",
  line2: 'For now.',
  line3: 'Because...',
  line4: "the story isn't over yet.",
  buttonLabel: "There's One More Thing",
  buttonHint: "Trust me. You don't want to skip this one. 👀",
};
