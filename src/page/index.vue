<script setup lang="ts">
  const { isLoading, error, metrics, fetchMetrics, startAutoRefresh } = useDashboard();

  onMounted(async () => {
    await fetchMetrics();
    startAutoRefresh();
  });
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader :is-loading="isLoading" :last-updated="metrics.lastUpdated" @refresh="fetchMetrics" />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ErrorAlert v-if="error" :error="error" />
      <MetricsGrid :metrics="metrics" :is-loading="isLoading" />
      <SystemStatus :qt-completed-session="metrics.qtCompletedSession" :qt-total-session="metrics.qtTotalSession" />
    </main>
  </div>
</template>
