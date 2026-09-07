// ==========================================================================
// About Her - Personality Traits, Learned Items, and Friendship Analysis Data
// Easily configurable and editable
// ==========================================================================

export const PERSONALITY_TRAITS = [
  {
    id: 'smile',
    icon: '✨',
    accentColor: 'rgba(250, 204, 21, 0.35)',
    title: 'Your Natural Smile',
    description: 'A smile unlike anything I had seen before. So genuine and innocent that even just remembering it can make me smile.',
    tag: 'One of a kind ✨',
  },
  {
    id: 'humandiary',
    icon: '📖',
    accentColor: 'rgba(96, 165, 250, 0.45)',
    title: 'My Role as Your "Human Diary"',
    description: 'You share your thoughts, your feelings, your little stories, and the things you carry inside. Knowing you trust me that much means the world.',
    tag: 'Deeply trusted 💙',
  },
  {
    id: 'songs',
    icon: '🎵',
    accentColor: 'rgba(167, 139, 250, 0.35)',
    title: 'The Songs You Sang For Me',
    description: 'Surprising me in unexpected ways, singing songs, and creating moments I never saw coming. They felt truly special.',
    tag: 'Special & unexpected 🎶',
  },
  {
    id: 'sensitive',
    icon: '🫶',
    accentColor: 'rgba(244, 114, 182, 0.35)',
    title: 'Incredibly Sensitive & Real',
    description: "Charming, emotional, and caring. Seeing you hurt or emotional affects me in a way I still haven't learned how to explain.",
    tag: 'Charming & genuine 🌸',
  },
  {
    id: 'understanding',
    icon: '🌙',
    accentColor: 'rgba(52, 211, 153, 0.35)',
    title: 'Understanding Without Words',
    description: 'Noticing the little things, remembering what makes you happy, and wanting to understand you without you having to explain everything.',
    tag: 'Unspoken bond 💫',
  },
  {
    id: 'authentic',
    icon: '💙',
    accentColor: 'rgba(59, 130, 246, 0.45)',
    title: 'Difficult to Describe in Words',
    description: "It isn't just big gestures — it's the little things, your emotions, the surprises, and just having you in my story.",
    tag: '100% irreplaceable',
  },
];

export const LEARNED_ITEMS = [
  { id: 1, num: '01', text: 'Her natural smile can instantly brighten up any random moment.' },
  { id: 2, num: '02', text: 'She will make me her human diary and share the most genuine stories.' },
  { id: 3, num: '03', text: 'She will unexpectedly sing songs and surprise me when I least expect it. 🎵' },
  { id: 4, num: '04', text: 'She is deeply sensitive, and her emotions affect me more than she realizes.' },
  { id: 5, num: '05', text: 'With her, some things happen without asking — you just understand them.' },
];

export const FRIENDSHIP_METERS = [
  { id: 'randomness', label: 'Randomness', percentage: 100, barColor: '#60a5fa' },
  { id: 'chaos', label: 'Chaos', percentage: 95, barColor: '#38bdf8' },
  { id: 'fun', label: 'Fun', percentage: 100, barColor: '#93c5fd' },
  { id: 'vibes', label: 'Good Vibes', percentage: 100, barColor: '#bae6fd' },
  { id: 'normal', label: 'Normal Behavior', percentage: 20, barColor: '#f87171', note: 'overrated anyway 😂' },
];
