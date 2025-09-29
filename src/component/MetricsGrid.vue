<script setup lang="ts">
  import { Users, UserPlus, Activity, CheckCircle } from "lucide-vue-next";

  interface MetricData {
    dau: number;
    newUsers: number;
    totalUsers: number;
    monthlyActiveUser: number;
    qtCompletionRate: number;
    qtTotalSession: number;
    qtCompletedSession: number;
    qtOverallCompletionRate: number;
  }

  const _props = defineProps<{
    metrics: MetricData;
  }>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
    <MetricCard
      title="일일 활성 사용자 (DAU)"
      :value="metrics.dau"
      subtitle="최근 24시간"
      :icon="Activity"
      icon-class="text-green-600"
      icon-bg-class="bg-green-100"
    />

    <MetricCard
      title="신규 가입자"
      :value="metrics.newUsers"
      subtitle="최근 24시간"
      :icon="UserPlus"
      icon-class="text-blue-600"
      icon-bg-class="bg-blue-100"
    />

    <MetricCard
      title="전체 사용자"
      :value="metrics.totalUsers"
      subtitle="누적 가입자"
      :icon="Users"
      icon-class="text-purple-600"
      icon-bg-class="bg-purple-100"
    />

    <MetricCard
      title="월간 활성 사용자 (MAU)"
      :value="metrics.monthlyActiveUser"
      subtitle="최근 30일"
      :icon="Activity"
      icon-class="text-orange-600"
      icon-bg-class="bg-orange-100"
    />

    <MetricCard
      title="QT 완료율 평균"
      :value="`${metrics.qtCompletionRate}%`"
      subtitle="사용자별 평균"
      :icon="CheckCircle"
      icon-class="text-emerald-600"
      icon-bg-class="bg-emerald-100"
    />
  </div>
</template>
