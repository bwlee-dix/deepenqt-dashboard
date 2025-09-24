<script setup lang="ts">
  import Button from "@/lib/ui/button/Button.vue";

  const emits = defineEmits<{
    (e: "refresh"): void;
  }>();

  const props = defineProps<{
    isLoading: boolean;
    lastUpdated: Date;
  }>();
</script>

<template>
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
              {{ props.lastUpdated.toLocaleTimeString() }}
            </ClientOnly>
          </div>
          <Button @click="emits('refresh')" :disabled="props.isLoading">
            {{ isLoading ? "새로고침 중..." : "새로고침" }}
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
