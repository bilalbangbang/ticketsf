import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

export default function config(phase) {
 return {
  // Keep a production build from overwriting the running local preview.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  devIndicators: false,
 };
}
