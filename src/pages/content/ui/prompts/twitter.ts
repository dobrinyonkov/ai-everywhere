export const getTwitterPrompts = (context: string, task: string) => {
  return `This is the tweet: ${context}
and you're prompt to do the following: ${task}`;
};

export const preDefinedPrompts = [
  'Generate a reply in a friendly tone',
  'Generate a tweet as a continuation of this tweet',
  'Generate a tweet that critiques this one',
  'Generate a tweet that agrees with this one',
  'Generate a tweet that offers an alternative viewpoint to this one',
];
