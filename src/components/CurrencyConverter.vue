<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useCbrStore } from "@/stores/cbr";

interface Valute {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous: number;
  Value: number;
}

export default defineComponent({
  async setup() {
    const store = useCbrStore();

    let isFirstDropdownExpanded = ref(false);
    let isSecondDropdownExpanded = ref(false);
    let firstValuteSelected = ref(undefined as Valute | undefined);
    let secondValuteSelected = ref(undefined as Valute | undefined);

    let setFirstOption = (valute: Valute): void => {
      firstValuteSelected.value = valute;
      isFirstDropdownExpanded.value = false;
    };

    let setSecondOption = (valute: Valute): void => {
      secondValuteSelected.value = valute;
      isSecondDropdownExpanded.value = false;
    };

    let changeValutes = (): void => {
      let first = firstValuteSelected.value;
      let second = secondValuteSelected.value;
      secondValuteSelected.value = first;
      firstValuteSelected.value = second;
    };

    let firstValuteAmount = ref(1);

    let result = (): number | null => {
      let result = null;
      if (firstValuteSelected.value && secondValuteSelected.value) {
        result =
          (firstValuteSelected.value.Value /
            firstValuteSelected.value.Nominal /
            secondValuteSelected.value.Value) *
          firstValuteAmount.value;
      }
      return result;
    };

    return {
      isFirstDropdownExpanded,
      isSecondDropdownExpanded,
      firstValuteSelected,
      secondValuteSelected,
      setFirstOption,
      setSecondOption,
      dropdownList: computed(() => store.valutes),
      changeValutes,
      firstValuteAmount,
      result,
    };
  },
});
</script>

<template>
  <div class="flex justify-start">
    <div class="flex justify-start w-24 mr-4">
      <div class="mb-3 xl:w-96">
        <label for="amountFirstItem" class="text-sm font-medium text-black-900">
          Колличество
        </label>
        <input
          type="number"
          min="1"
          class="form-control block h-12 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="amountFirstItem"
          placeholder="Введите значение"
          v-model="firstValuteAmount"
        />
      </div>
    </div>

    <div class="relative text-lg w-24 position-num-2 mr-4">
      <label class="relative flex-wrap items-center cursor-pointer">
        <span class="text-sm font-medium text-black-900">Валюта #1</span>
      </label>
      <button
        class="text-gray-700 bg-white w-full border border-gray-300 rounded text-sm px-4 py-2.5 text-center inline-flex items-center h-12"
        type="button"
        @click="isFirstDropdownExpanded = !isFirstDropdownExpanded"
        @blur="isFirstDropdownExpanded = false"
      >
        <span>{{ firstValuteSelected?.CharCode }}</span>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-4 w-4 transform transition-transform duration-200 ease-in-out ml-auto"
          :class="isFirstDropdownExpanded ? 'rotate-180' : 'rotate-0'"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <ul
        v-show="isFirstDropdownExpanded"
        class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden h-60 py-2 overflow-y-auto z-20"
      >
        <li
          v-for="(option, index) in dropdownList"
          :key="`second-${index}`"
          class="px-3 py-3 transition-colors duration-300 hover:bg-gray-200 cursor-pointer text-sm"
          @mousedown.prevent="setFirstOption(option)"
        >
          <button>{{ option?.CharCode }}</button>
        </li>
      </ul>
    </div>

    <button
      class="text-gray-700 bg-white border border-gray-300 rounded text-sm px-4 py-2.5 text-center inline-flex items-center h-12 w-12 position-num-3 mr-4"
      type="button"
      @click="changeValutes"
    >
      <span class="text-black-900 text-lg font-bold">&#8646;</span>
    </button>

    <div class="relative text-lg w-24 position-num-4 mr-4">
      <label class="relative flex-wrap items-center cursor-pointer">
        <span class="text-sm font-medium text-black-900">Валюта #2</span>
        <button
          class="text-gray-700 bg-white w-full border border-gray-300 rounded text-sm px-4 py-2.5 text-center inline-flex items-center h-12"
          type="button"
          @click="isSecondDropdownExpanded = !isSecondDropdownExpanded"
          @blur="isSecondDropdownExpanded = false"
        >
          <span>{{ secondValuteSelected?.CharCode }}</span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-4 w-4 transform transition-transform duration-200 ease-in-out ml-auto"
            :class="isSecondDropdownExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </label>

      <ul
        v-show="isSecondDropdownExpanded"
        class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden h-60 py-2 overflow-y-auto z-20"
      >
        <li
          v-for="(option, index) in dropdownList"
          :key="index"
          class="px-3 py-3 transition-colors duration-300 hover:bg-gray-200 cursor-pointer text-sm"
          @mousedown.prevent="setSecondOption(option)"
        >
          <button>{{ option?.CharCode }}</button>
        </li>
      </ul>
    </div>

    <div class="flex justify-center w-24">
      <div class="mb-3 xl:w-96">
        <label for="amountSecondtem" class="text-sm font-medium text-black-900">
          Результат
        </label>
        <input
          type="text"
          class="form-control block h-12 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="amountSecondtem"
          disabled
          :value="result()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.position-num-2 {
  position: relative;
  top: -4px;
}
.position-num-3 {
  position: relative;
  top: 24px;
}
.position-num-4 {
  position: relative;
  top: -4px;
}
</style>