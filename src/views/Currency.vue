<script setup lang="ts">
import { ref } from "vue";
import CurrenciesList from '@/components/CurrenciesList.vue'
import CurrencyConverter from '@/components/CurrencyConverter.vue'

const tabs = ref(["Список валют", "Конвертер"]);
let activeTab = ref("Список валют");
const changeTab = (tabName: string) => (activeTab.value = tabName);
</script>

<template>
  <div class="mx-auto grid max-w-4xl grid-cols-12 p-1 pt-8">
    <header class="header col-span-12 rounded-lg">
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500">
        <li v-for="tab in tabs" :key="tab" class="mr-2">
          <button
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            :class="{ 'active text-blue-600 bg-gray-100 hover:text-blue-600 hover:bg-gray-100 ': tab === activeTab }"
            @click="changeTab(tab)"
          >
            {{ tab }}
          </button>
        </li>
      </ul>
    </header>
    <div class="content col-span-8 rounded-lg rounded-tl-none border border-gray-300 p-6">
      <Suspense>
        <CurrenciesList v-if="activeTab === 'Список валют'" />
        <CurrencyConverter v-else-if="activeTab === 'Конвертер'" />
      </Suspense>
    </div>
  </div>
</template>
