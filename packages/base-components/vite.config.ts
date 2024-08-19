import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      getJSON: function (cssFileName, json, outputFileName) {
        console.log(cssFileName, json, outputFileName);
      },
      exportGlobals: true,
      // scopeBehaviour: "global",
      localsConvention: "dashesOnly",
    },
  },
});
