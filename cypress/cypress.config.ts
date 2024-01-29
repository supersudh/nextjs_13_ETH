import { defineConfig } from "cypress";
import synpressPlugins from '@synthetixio/synpress/plugins';

export default defineConfig({
  // component: {
  //   devServer: {
  //     framework: "next",
  //     bundler: "webpack",
  //   },
  // },

  // e2e: {
  //   setupNodeEvents(on, config) {
  //     // implement node event listeners here
  //   },
  // },
  userAgent: "synpress",
  chromeWebSecurity: true,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  e2e: {
    testIsolation: true,
    setupNodeEvents(on, config) {
      synpressPlugins(on, config);
    },
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
  },
});
