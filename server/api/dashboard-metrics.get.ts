export default defineEventHandler(async (event) => {
  try {
    const { getAuth } = await import("firebase-admin/auth");
    const auth = getAuth();

    let allUsers: any[] = [];

    let nextPageToken: string | undefined;

    do {
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      allUsers = allUsers.concat(listUsersResult.users);
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const yesterdayTimestamp = Math.floor(yesterday.getTime() / 1000);
    const lastMonthTimestamp = Math.floor(lastMonth.getTime() / 1000);

    const totalUsers = allUsers.length;

    const newUsers = allUsers.filter((user) => {
      const createdAt = parseInt(user.metadata.creationTime) / 1000;
      return createdAt >= yesterdayTimestamp;
    }).length;

    const dau = allUsers.filter((user) => {
      if (!user.metadata.lastSignInTime) return false;
      const lastSignIn = parseInt(user.metadata.lastSignInTime) / 1000;
      return lastSignIn >= yesterdayTimestamp;
    }).length;

    const monthlyActiveUser = allUsers.filter((user) => {
      if (!user.metadata.lastSignInTime) return false;
      const lastSignIn = parseInt(user.metadata.lastSignInTime) / 1000;
      return lastSignIn >= lastMonthTimestamp;
    }).length;

    // QT 완료율 데이터 가져오기
    const qtCompletionResponse = await fetch(`${getRequestURL(event).origin}/api/qt-completion-rate`);
    const qtData = qtCompletionResponse.ok
      ? await qtCompletionResponse.json()
      : {
          averageCompletionRate: 0,
          totalSession: 0,
          completedSession: 0,
          overallCompletionRate: 0,
        };

    return {
      totalUsers,
      newUsers,
      dau,
      monthlyActiveUser,
      qtCompletionRate: qtData.averageCompletionRate,
      qtTotalSession: qtData.totalSession,
      qtCompletedSession: qtData.completedSession,
      qtOverallCompletionRate: qtData.overallCompletionRate,
      timestamp: now.toISOString(),
    };
  } catch (error) {
    console.error("Firebase Admin SDK 오류:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "서버 오류가 발생했습니다.",
    });
  }
});
