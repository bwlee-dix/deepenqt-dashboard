<script setup lang="ts">
  import Card from "@/lib/ui/card/Card.vue";

  const props = withDefaults(
    defineProps<{
      title: string;
      value?: number | string;
      subtitle?: string;
      icon: Component;
      iconClass?: string;
      iconBgClass?: string;
      trend?: number;
      isLoading?: boolean;
    }>(),
    {
      value: 0,
      subtitle: "",
      trend: 0,
      iconClass: "text-blue-600",
      iconBgClass: "bg-blue-100",
    }
  );

  const formattedValue = computed(() => {
    if (props.value === undefined || props.value === null) {
      return "0";
    }

    if (typeof props.value === "string") {
      return props.value;
    }

    if (props.value >= 1000000) {
      return `${(props.value / 1000000).toFixed(1)}M`;
    } else if (props.value >= 1000) {
      return `${(props.value / 1000).toFixed(1)}K`;
    }
    return props.value.toLocaleString();
  });
</script>

<template>
  <Card>
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <div v-if="isLoading" class="h-9 bg-gray-200 rounded animate-pulse w-20" />
        <p v-else class="text-3xl font-bold text-gray-900">{{ formattedValue }}</p>
        <p v-if="subtitle" class="text-xs text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="iconBgClass">
          <component :is="props.icon" class="w-6 h-6" :class="iconClass" />
        </div>
      </div>
    </div>
    <div v-if="trend !== undefined" class="mt-4 flex items-center">
      <span
        class="text-sm font-medium"
        :class="trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'"
      >
        {{ trend > 0 ? "↗" : trend < 0 ? "↘" : "→" }} {{ Math.abs(trend) }}%
      </span>
      <span class="text-sm text-gray-500 ml-2">전일 대비</span>
    </div>
  </Card>
</template>
