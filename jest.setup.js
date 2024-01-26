import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
// import "@inrupt/jest-jsdom-polyfills";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
