interface AttendRecord {
  id: string;
  uid: string;
  qt_id: string;
  status: "START" | "FINISH";
  is_visible: boolean;
  start_at: any;
  create_at: any;
  update_at: any;
  finish_at?: any;
}

export default defineEventHandler(async (event) => {
  try {
    const { getFirestore } = await import("firebase-admin/firestore");

    const db = getFirestore();

    const attendSnapshot = await db.collection("u_attend").get();
    const attendData: AttendRecord[] = attendSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AttendRecord[];

    const userStat = new Map<string, { total: number; completed: number }>();
    attendData.forEach((record) => {
      const uid = record.uid;
      if (!userStat.has(uid)) {
        userStat.set(uid, { total: 0, completed: 0 });
      }

      const stat = userStat.get(uid)!;
      stat.total += 1;

      if (record.status === "FINISH") {
        stat.completed += 1;
      }
    });

    // 각 사용자별 완료율 계산
    const completionRates: number[] = [];
    userStat.forEach((stat, uid) => {
      if (stat.total > 0) {
        const completionRate = (stat.completed / stat.total) * 100;
        completionRates.push(completionRate);
      }
    });

    // 전체 평균 완료율 계산 (각 사용자별 완료율의 평균)
    const averageCompletionRate =
      completionRates.length > 0 ? completionRates.reduce((sum, rate) => sum + rate, 0) / completionRates.length : 0;

    // 추가 통계
    const totalUser = userStat.size;
    const totalSession = attendData.length;
    const completedSession = attendData.filter((record) => record.status === "FINISH").length;
    const overallCompletionRate = totalSession > 0 ? (completedSession / totalSession) * 100 : 0;

    return {
      averageCompletionRate: Math.round(averageCompletionRate * 100) / 100,
      totalUser,
      totalSession,
      completedSession,
      overallCompletionRate: Math.round(overallCompletionRate * 100) / 100,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("QT 완료율 계산 오류:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "QT 완료율 계산 중 오류가 발생했습니다.",
    });
  }
});
