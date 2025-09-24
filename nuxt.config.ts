import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  srcDir: "src/",
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
    plugins: "plugin",
  },
  imports: {
    dirs: ["composable", "composable/**"],
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
    componentDir: "~/lib/ui",
  },
  runtimeConfig: {
    firebaseAdminType: process.env.FIREBASE_ADMIN_TYPE,
    firebaseAdminProjectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    firebaseAdminPrivateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    firebaseAdminPrivateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    firebaseAdminClientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    firebaseAdminClientId: process.env.FIREBASE_ADMIN_CLIENT_ID,
    firebaseAdminAuthUri: process.env.FIREBASE_ADMIN_AUTH_URI,
    firebaseAdminTokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    firebaseAdminAuthProviderX509CertUrl: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    firebaseAdminClientX509CertUrl: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
    firebaseAdminUniverseDomain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,

    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
  },
});
