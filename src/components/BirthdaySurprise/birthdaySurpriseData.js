// ==========================================================================
// Page 8 — Birthday Surprise Data Configuration
// Easily editable loading, error, reveal, and birthday surprise messages
// ==========================================================================

export const LOADING_MESSAGES = [
  'Initializing...',
  'Preparing something special...',
  'Almost there...',
];

export const ERROR_MESSAGES = [
  { text: 'SYSTEM ERROR // DIAGNOSTIC OVERFLOW ⚠️', isBadge: true },
  { text: '🚨 Abnormal friendship detected.', isBadge: false },
  { text: '💬 Messages unable to load due to millions of records found.', isBadge: false },
  { text: '📈 Mixture of every emotion detected: unable to predict. 😂', isBadge: false },
  { text: '☕ Cold Milo & Flip Diner memory buffer overflow.', isBadge: false },
  { text: '⚡ Chaos level exceeding system threshold (99.9%).', isBadge: false },
  { text: '⚠️ Critical failure: Too many unforgettable memories to calculate.', isBadge: false },
  { text: 'Wait...', isBadge: false },
  { text: "Maybe that's not a bug... maybe that's just us. 👀💙", isBadge: false },
];

export const REVEAL_MESSAGES = [
  'Wait...',
  'I think I found something.',
  'This might actually be for you. 💙',
];

export const BIRTHDAY_SURPRISE_MESSAGE = {
  badge: '🎉 SURPRISE! 🎉',
  heading: 'Happy Birthday! 💙',
  lead: 'Today is your day.',
  body: 'So I hope you laugh a little louder, smile a little more, and make some memories worth keeping.',
  wish1: 'You deserve a really good year ahead.',
  wish2: 'And hopefully...',
  wish3: 'a lot more adventures, conversations, chaos and memories. 😂💙',
  closeButtonText: 'Close the Surprise ✕',
};

