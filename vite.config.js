import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";

// const logger = createLogger();
// const loggerWarn = logger.warn;

// logger.warn = (msg, options) => {
//   // Ignore empty CSS files warning
//   if (msg.includes("vite:css") && msg.includes(" is empty")) return;
//   loggerWarn(msg, options);
// };
// window.addEventListener("vite:preloadError", (event) => {
//   window.location.assign(window.origin); // for example, refresh the page
// });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: "spa",
  // customLogger: logger,
  publicDir: false,
});
