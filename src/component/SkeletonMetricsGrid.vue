<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
    <div v-for="i in 5" :key="i" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <div class="h-4 bg-gray-200 rounded animate-pulse mb-2 w-24"></div>
          <div class="h-9 bg-gray-200 rounded animate-pulse w-16 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
        </div>
        <div class="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
