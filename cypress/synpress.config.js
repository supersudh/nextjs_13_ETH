const { defineConfig } = require('cypress');
const synpressPlugins = require('@synthetixio/synpress/plugins');

const defaultConfig = {
  "userAgent": "synpress",
  "retries": { "runMode": 0, "openMode": 0 },
  "video": false,
  "chromeWebSecurity": true,
  "viewportWidth": 1366,
  "viewportHeight": 850,
  "component": {
    "componentFolder": "app",
    "testFiles": "cypress/e2e/*cy.{ts,tsx}"
  },
  "env": {
    "coverage": false
  },
  "defaultCommandTimeout": 30000,
  "pageLoadTimeout": 30000,
  "requestTimeout": 30000,
  e2e: {
    "specPattern": "cypress/e2e/*.cy.ts",
    "screenshotsFolder": "cypress/screenshots",
    "videosFolder": "cypress/videos",
    "baseUrl": "http://localhost:3000",
    "supportFile": "cypress/support/index.ts",
    testIsolation: true,
    setupNodeEvents(on, config) {
      synpressPlugins(on, config);
    },
  },
}

module.exports = defineConfig(defaultConfig);
