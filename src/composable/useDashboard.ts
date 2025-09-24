export interface DashboardMetrics {
  dau: number;
  newUsers: number;
  totalUsers: number;
  monthlyActiveUser: number;
  qtCompletionRate: number;
  qtTotalSession: number;
  qtCompletedSession: number;
  qtOverallCompletionRate: number;
  lastUpdated: Date;
}

export const useDashboard = () => {
  const isLoading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const metrics = ref<DashboardMetrics>({
    dau: 0,
    newUsers: 0,
    totalUsers: 0,
    monthlyActiveUser: 0,
    qtCompletionRate: 0,
    qtTotalSession: 0,
    qtCompletedSession: 0,
    qtOverallCompletionRate: 0,
    lastUpdated: new Date(),
  });

  const fetchRealUserData = async (): Promise<{
    totalUsers: number;
    newUsers: number;
    dau: number;
    monthlyActiveUser: number;
    qtCompletionRate: number;
    qtTotalSession: number;
    qtCompletedSession: number;
    qtOverallCompletionRate: number;
  }> => {
    try {
      const response = await fetch("/api/dashboard-metrics");

      if (!response.ok) {
        throw new Error("서버에서 데이터를 가져올 수 없습니다.");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("실제 사용자 데이터 조회 오류:", err);
      return {
        totalUsers: 0,
        newUsers: 0,
        dau: 0,
        monthlyActiveUser: 0,
        qtCompletionRate: 0,
        qtTotalSession: 0,
        qtCompletedSession: 0,
        qtOverallCompletionRate: 0,
      };
    }
  };

  const fetchMetrics = async (): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      const userData = await fetchRealUserData();

      metrics.value = {
        dau: userData.dau || 0,
        newUsers: userData.newUsers || 0,
        totalUsers: userData.totalUsers || 0,
        monthlyActiveUser: userData.monthlyActiveUser || 0,
        qtCompletionRate: userData.qtCompletionRate || 0,
        qtTotalSession: userData.qtTotalSession || 0,
        qtCompletedSession: userData.qtCompletedSession || 0,
        qtOverallCompletionRate: userData.qtOverallCompletionRate || 0,
        lastUpdated: new Date(),
      };
    } catch (err) {
      error.value = "데이터를 불러오는 중 오류가 발생했습니다.";
      console.error("메트릭 조회 오류:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const startAutoRefresh = (): void => {
    setInterval(() => {
      fetchMetrics();
    }, 5 * 60 * 1000);
  };

  return {
    isLoading,
    error,
    metrics,
    fetchRealUserData,
    fetchMetrics,
    startAutoRefresh,
  };
};
