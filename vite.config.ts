import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true,
        // hmr: {
        //   host: 'hechie.com',
        //   port: 5101,
        //   protocol: 'wss',
        // }
    },
    plugins: [react()],
    base: "/movies",
});
