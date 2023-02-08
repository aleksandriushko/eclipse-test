import { defineStore } from "pinia";
import axios from "axios";

interface Valute {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous: number;
  Value: number;
}

export const useCbrStore = defineStore({
  id: "cbr",
  state: () => ({
    isShowMainValute: false,
    valutes: undefined as Array<Valute>,
    filterValue: "",
  }),
  getters: {
    filteredValutes(): Array<Valute> {
      if (this.filterValue === "") {
        return this.valutes;
      }
      return this.valutes.filter(
        (valute) =>
          valute.CharCode.toLowerCase().includes(this.filterValue.toLowerCase()) ||
          valute.Name.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    },
    dropdownOptions(): Array<Valute> {
      return this.valutes.map((valute) => valute.CharCode);
    },
  },
  actions: {
    async fetchDaily() {
      try {
        const result = await axios.get(
          "https://www.cbr-xml-daily.ru/daily_json.js"
        );
        const valutes = [];
        for (const code in result.data.Valute) {
          valutes.push(result.data.Valute[code]);
        }
        this.valutes = valutes;
      } catch (e) {
        console.error(e);
      }
    },
  },
});
