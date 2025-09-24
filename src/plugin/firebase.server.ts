export default defineNuxtPlugin(async (nuxtApp) => {
  const { initializeApp, getApps, cert } = await import("firebase-admin/app");
  const { getAuth } = await import("firebase-admin/auth");

  const config = useRuntimeConfig();

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: config.firebaseAdminProjectId,
        privateKey: config.firebaseAdminPrivateKey?.replace(/\\n/g, "\n"),
        clientEmail: config.firebaseAdminClientEmail,
      }),
    });
  }

  const auth = getAuth();
});
