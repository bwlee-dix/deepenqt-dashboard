<script setup lang="ts">
  const _props = withDefaults(
    defineProps<{
      qtCompletedSession?: number;
      qtTotalSession?: number;
    }>(),
    {
      qtCompletedSession: 0,
      qtTotalSession: 0,
    }
  );
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">시스템 상태</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 class="text-sm font-medium text-gray-700 mb-2">데이터 소스</h3>
        <p class="text-sm text-gray-600">Firebase Authentication & Firestore</p>
      </div>
      <div>
        <h3 class="text-sm font-medium text-gray-700 mb-2">업데이트 주기</h3>
        <p class="text-sm text-gray-600">5분마다 자동 새로고침</p>
      </div>
      <div>
        <h3 class="text-sm font-medium text-gray-700 mb-2">QT 세션 통계</h3>
        <p class="text-sm text-gray-600">{{ qtCompletedSession }} / {{ qtTotalSession }} 완료</p>
      </div>
    </div>
  </div>
</template>
