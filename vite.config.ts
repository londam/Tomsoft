import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/datasnap": {
        target: "http://apidemo.luceed.hr", // Target API URL
        changeOrigin: true, // Make sure the target's CORS headers are respected
        secure: false, // If using HTTP instead of HTTPS
      },
    },
  },
});
