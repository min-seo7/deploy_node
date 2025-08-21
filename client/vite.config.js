import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "node:path";

const backServer = `http://localhost:3000`;
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 개발용 임시 서버
  server: {
    // Vue.js 실행 시 적용 PORT 변경
    port: 8099,
    // CORS(Cross Origin Resource Sharing) => proxy setting //
    proxy: {
      "^/api": {
        target: backServer,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    //빌드한 결과물을 서버쪽으로 넘겨줌. npm run build 지정된 경로로 build됨. server에 public/index.html생성됨.
   // outDir: "../server/public",
  },
});
