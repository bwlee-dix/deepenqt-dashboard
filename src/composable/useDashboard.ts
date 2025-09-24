export interface DashboardMetrics {
  dau: number;
  newUsers: number;
  totalUsers: number;
  lastUpdated: Date;
}

export const useDashboard = () => {
  const isLoading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const metrics = ref<DashboardMetrics>({
    dau: 0,
    newUsers: 0,
    totalUsers: 0,
    lastUpdated: new Date(),
  });

  const fetchRealUserData = async (): Promise<{ totalUsers: number; newUsers: number; dau: number }> => {
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
      };
    }
  };

  const fetchMetrics = async (): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      const userData = await fetchRealUserData();

      metrics.value = {
        dau: userData.dau,
        newUsers: userData.newUsers,
        totalUsers: userData.totalUsers,
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
    fetchMetrics,
    startAutoRefresh,
  };
};
