import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",

  build: {
    rolldownOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        notFound: resolve(__dirname, "404.html"),
        productList: resolve(__dirname, "productList.html"),
        detail: resolve(__dirname, "detail.html"),
        cart: resolve(__dirname, "cart.html"),
        login: resolve(__dirname, "login.html"),
        signup: resolve(__dirname, "signup.html"),
      },
    },
  },

  plugins: [tailwindcss()],
});
