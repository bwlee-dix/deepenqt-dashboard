import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "src/",
  ssr: false,
  css: ["~/asset/css/tailwind.css"],
  components: [
    {
      path: "~/component",
    },
  ],
  app: {
    head: {
      title: "DeepenQT Dashboard",
      meta: [
        { name: "description", content: "Deepen QT Dashboard" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
      ],
    },
  },
  dir: {
    pages: "page",
    layouts: "layout",
  },
  imports: {
    dirs: ["composable, composable/**"],
  },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image", "shadcn-nuxt"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./lib/ui"
     */
    componentDir: "./lib/ui",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
