import { defineStore } from "pinia";

// eslint-disable-next-line no-unused-vars
const defaultList = [
  {
    id: "61bblwnux0tlb1vp3qk",
    title: "Hello Vue.js!",
    tasks: [
      {
        id: "79bcdufvlfdlb1voaq5",
        title: "Vue.js 測試",
        content: "內文區塊",
      },
      {
        id: "4ffywwh2sfelb1vob44",
        title: "Vue.js 測試2",
        content: "內文區塊2",
      },
    ],
  },
  {
    id: "1ix2wxwsldblb1vpa4h",
    title: "Hello Laravel!",
    tasks: [
      {
        id: "zm3frri5a4lb0l8c2e",
        title: "Laravel 測試",
        content: "內文區塊",
      },
      {
        id: "b8ijxyk2o9lb1vnzio",
        title: "Laravel 測試2",
        content: "內文區塊2",
      },
    ],
  },
];

export const useStore = defineStore("store", () => {
  return {};
});
