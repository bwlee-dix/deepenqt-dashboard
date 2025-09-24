<script setup lang="ts">
  import Button from "@/lib/ui/button/Button.vue";
  import MetricCard from "@/lib/ui/metric-card/MetricCard.vue";
  import { UsersIcon, UserPlusIcon, ActivityIcon } from "@/lib/ui/icons";

  const { isLoading, error, metrics, fetchMetrics, startAutoRefresh } = useDashboard();

  onMounted(async () => {
    await fetchMetrics();
    startAutoRefresh();
  });
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">DeepenQT Dashboard</h1>
            <p class="text-gray-600 mt-1">실시간 핵심 지표 모니터링</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              마지막 업데이트:
              <ClientOnly>
                {{ metrics.lastUpdated.toLocaleTimeString() }}
              </ClientOnly>
            </div>
            <Button @click="fetchMetrics" :disabled="isLoading">
              {{ isLoading ? "새로고침 중..." : "새로고침" }}
            </Button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="error" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">오류 발생</h3>
            <div class="mt-2 text-sm text-red-700">{{ error }}</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="일일 활성 사용자 (DAU)"
          :value="metrics.dau"
          subtitle="최근 24시간"
          :icon="ActivityIcon"
          icon-class="text-green-600"
          icon-bg-class="bg-green-100"
        />

        <MetricCard
          title="신규 가입자"
          :value="metrics.newUsers"
          subtitle="최근 24시간"
          :icon="UserPlusIcon"
          icon-class="text-blue-600"
          icon-bg-class="bg-blue-100"
        />

        <MetricCard
          title="전체 사용자"
          :value="metrics.totalUsers"
          subtitle="누적 가입자"
          :icon="UsersIcon"
          icon-class="text-purple-600"
          icon-bg-class="bg-purple-100"
        />
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">시스템 상태</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">데이터 소스</h3>
            <p class="text-sm text-gray-600">Firebase Authentication</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">업데이트 주기</h3>
            <p class="text-sm text-gray-600">5분마다 자동 새로고침</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
