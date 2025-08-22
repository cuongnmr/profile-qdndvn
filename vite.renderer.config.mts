import * as path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    {
      name: "ignore-db-json-hmr",
      handleHotUpdate({ file }) {
        // Chuẩn hóa đường dẫn và kiểm tra xem có phải file db/db.json không
        const relativePath = path.relative(process.cwd(), file);

        if (relativePath.includes("db.json")) {
          // Ngăn không cho HMR hoặc reload trang
          return [];
        }

        // Ngược lại, cho Vite xử lý như bình thường
        return;
      },
    },
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
