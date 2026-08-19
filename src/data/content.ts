export const categories = {
  'Viral Hooks': ['Business','Motivation','Storytelling','History','Finance','Lifestyle','Education','Entertainment'],
  'Script Templates': ['Short Form','Long Form','Storytelling','Educational','Documentary','Promotional'],
  'Caption Vault': ['Engagement','Inspirational','Sales','Educational','Storytelling'],
  'Hashtag Vault': ['TikTok','YouTube Shorts','Instagram Reels','Facebook Reels'],
  'Creator Academy': ['Branding','Content Planning','Audience Growth','Monetization','Consistency'],
} as const

export const contentPlaceholders = Object.fromEntries(Object.entries(categories).map(([library, values]) => [library, values.map(category => ({ library, category, title: `${category} Resources`, body: 'More content coming in future updates.' }))]))
