import { genkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

// This will look for GOOGLE_API_KEY in the environment variables.
export const ai = genkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
