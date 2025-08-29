<script setup>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "/src/stores";

const store = useStore();
const currentEditTask = computed(() => store.currentEditTask);
const { updateTask, closeEditTask, deleteTask } = store;

const title = ref("");
const content = ref("");

// 當 currentEditTask 更新時，同步更新 title 和 content
watchEffect(() => {
  title.value = currentEditTask.value.title || "";
  content.value = currentEditTask.value.content || "";
});
</script>

<template>
  <div
    class="h-full bg-slate-800 bg-opacity-70 w-full top-0 left-0 z-100 fixed"
    @click.self="closeEditTask"
  >
    <div
      class="bg-white h-auto mx-auto py-8 px-12 top-[15vh] w-1/2 block relative"
    >
      <div>
        <input
          ref="target"
          type="text"
          class="border text-xl mb-6 w-full p-2"
          v-model="title"
        />
      </div>

      <textarea
        class="border h-[300px] w-full p-3 overflow-x-hidden overflow-y-auto resize-none"
        v-model="content"
      ></textarea>

      <div class="mt-4 text-right">
        <button
          @click="deleteTask(currentEditTask.cardId, currentEditTask.id)"
          class="border bg-rose-500 text-white mr-6 py-2 px-4 hover:bg-rose-700"
        >
          刪除
        </button>
        <button
          @click="
            updateTask(
              currentEditTask.cardId,
              currentEditTask.id,
              title,
              content
            )
          "
          class="border bg-slate-200 py-2 px-4 hover:bg-slate-400 hover:text-slate-100"
        >
          儲存送出
        </button>
      </div>
    </div>
  </div>
</template>
