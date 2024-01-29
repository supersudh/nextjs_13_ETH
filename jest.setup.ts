import { loadEnvConfig } from '@next/env';
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
(async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
})();