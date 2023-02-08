<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useCbrStore } from "@/stores/cbr";

export default defineComponent({
  async setup() {
    const store = useCbrStore();

    onMounted(async () => {
      await store.fetchDaily();
    });

    const filterValue = computed({
      get() {
        return store.filterValue;
      },
      set(val: string) {
        store.filterValue = val;
      },
    });

    const isShowMainValute = computed({
      get() {
        return store.isShowMainValute;
      },
      set(val: boolean) {
        store.isShowMainValute = val;
      },
    });

    return {
      valutes: computed(() => store.valutes),
      filteredValutes: computed(() => store.filteredValutes),
      filterValue,
      isShowMainValute,
    };
  },
});
</script>

<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input v-model="isShowMainValute" type="checkbox" class="sr-only peer" />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    />
    <span class="ml-3 text-sm font-medium text-black-900">
      Поменять основную валюту
    </span>
  </label>

  <div class="flex flex-col mb-2">
    <div class="flex justify-start">
      <div class="mb-3 xl:w-96">
        <label for="filter" class="text-sm font-medium text-black-900">
          Фильтр
        </label>
        <input
          type="text"
          class="form-control block h-12 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="filter"
          placeholder="Введите названию валюты или ее код"
          v-model="filterValue"
        />
      </div>
    </div>

    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <tbody>
              <template v-if="isShowMainValute">
                <tr
                  v-for="(valute, idx) in filteredValutes"
                  :key="idx"
                  class="border-b"
                >
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    1 RUB
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ (1 / valute.Value * valute.Nominal).toFixed(4) }} {{ valute.CharCode }}
                    <div
                      class="inline-block"
                      :class="{
                        'text-green-600': valute.Previous > valute.Value,
                        'text-red-600': valute.Previous < valute.Value,
                      }"
                    >
                      <i v-if="valute.Previous > valute.Value" aria-hidden="true">&#8593;</i>
                      <i v-else-if="valute.Previous < valute.Value" aria-hidden="true">&#8595;</i>
                      ({{ (valute.Previous - valute.Value).toFixed(2) }})
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(valute, idx) in filteredValutes" :key="idx" class="border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ valute.Nominal }} {{ valute.CharCode }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ valute.Value }} RUB
                    <div
                      class="inline-block"
                      :class="{
                        'text-green-600': valute.Previous < valute.Value,
                        'text-red-600': valute.Previous > valute.Value,
                      }"
                    >
                      <i v-if="valute.Previous < valute.Value" aria-hidden="true">&#8593;</i>
                      <i v-else-if="valute.Previous > valute.Value" aria-hidden="true">&#8595;</i>
                      ({{ (valute.Value - valute.Previous).toFixed(2) }})
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
