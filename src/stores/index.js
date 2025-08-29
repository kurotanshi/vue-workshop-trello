import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const uid = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

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
  const $router = useRouter();

  const lists = ref(
    JSON.parse(localStorage.getItem("trello-lists")) || defaultList
  );

  const currentEditTask = ref({});

  // 開啟編輯燈箱
  const openEditTask = (cardId, taskId) => {
    const card = lists.value.find((list) => list.id === cardId);
    const task = card.tasks.find((task) => task.id === taskId);

    $router.push(`/task/${cardId}/${taskId}`);

    currentEditTask.value = {
      cardId,
      ...task,
    };
  };

  // 清空 currentEditTask 代表關閉燈箱
  const closeEditTask = () => {
    currentEditTask.value = {};
    $router.push(`/`);
  };

  // 更新 task 內容
  const updateTask = (cardId, taskId, title = "", content = "") => {
    const card = lists.value.find((list) => list.id === cardId);
    const task = card.tasks.find((task) => task.id === taskId);
    task.title = title;
    task.content = content;
    closeEditTask();
  };

  // 修改標題
  const updateListTitle = (cardId = "", title = "") => {
    const card = lists.value.find((list) => list.id === cardId);
    card.title = title;
  };

  // 新增任務
  const addTask = (cardId = "", title = "") => {
    if (!cardId || !title) return;

    const card = lists.value.find((list) => list.id === cardId);
    card.tasks.push({
      id: uid(),
      title,
      content: "",
    });
  };

  // 刪除任務
  const deleteTask = (cardId, taskId) => {
    const card = lists.value.find((list) => list.id === cardId);
    card.tasks = card.tasks.filter((task) => task.id !== taskId);
    closeEditTask();
  };

  // 新增卡片
  const addNewCard = (title = "") => {
    if (!title) return;

    lists.value.push({
      id: uid(),
      title,
      tasks: [],
    });
  };

  // 更新列表順序（拖放卡片後）
  const updateListOrder = () => {
    // vuedraggable 會自動更新 lists 陣列順序
    // 這裡只需要觸發 watch 來儲存到 localStorage
    // watch 已經設定 deep: true，會自動偵測到變化
  };

  // 更新任務順序（拖放任務後）
  const updateTaskOrder = (cardId) => {
    // vuedraggable 會自動更新 tasks 陣列順序
    // 這裡只需要觸發 watch 來儲存到 localStorage
    // watch 已經設定 deep: true，會自動偵測到變化
  };

  // 為 lists 加入 watch 監聽
  watch(
    lists,
    (val) => {
      // 當 list 變動時，將變動後的值存入 localStorage
      localStorage.setItem("trello-lists", JSON.stringify(val));
    },
    { deep: true }
  );

  return {
    lists,
    currentEditTask,
    openEditTask,
    closeEditTask,
    updateTask,
    updateListTitle,
    addTask,
    deleteTask,
    addNewCard,
    updateListOrder,
    updateTaskOrder,
  };
});
