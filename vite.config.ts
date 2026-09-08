import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "فروشگاه",
        short_name: "فروشگاه",
        description:
          "فروشگاه، مرجع خرید آنلاین محصولات متنوع شامل دیجیتال، مد، ورزش، خانه و آشپزخانه با بهترین قیمت و کیفیت",

        theme_color: "#ffffff",
        background_color: "#ffffff",

        display: "standalone",
        lang: "fa",
        dir: "rtl",

        icons: [
          {
            src: "assets/logo/Logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/logo/Logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  server: {
    port: 3000,
  },

  base: process.env.NODE_ENV === "production" ? "/shop-react/" : "/",
});
