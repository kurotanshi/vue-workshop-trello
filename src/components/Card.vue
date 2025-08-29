<script setup>
import { ref, watch, computed } from "vue";
import { useFocus } from "@vueuse/core";
import { vOnClickOutside } from "@vueuse/components";
import { useStore } from "/src/stores";
import draggable from "vuedraggable";

const props = defineProps({
  id: String,
  title: String,
  tasks: Array,
});

const title = ref(props.title);
const isTitleEditing = ref(false);

const target = ref();
useFocus(target, { initialValue: true });

const store = useStore();
const { updateListTitle, openEditTask } = store;

// 建立一個 computed 來處理 tasks 的雙向綁定
const localTasks = computed({
  get: () => props.tasks,
  set: (value) => {
    // 找到對應的 list 並更新其 tasks
    const list = store.lists.find(l => l.id === props.id);
    if (list) {
      list.tasks = value;
    }
  }
});

watch(isTitleEditing, () => {
  updateListTitle(props.id, title.value);
});
</script>

<template>
  <div
    class="border rounded-sm bg-slate-200 border-gray-500 mx-2 min-w-[300px] p-2 block"
  >
    <!-- column -->
    <div
      v-if="!isTitleEditing"
      @click="isTitleEditing = true"
      class="text-ellipsis text-lg w-4/5 block overflow-hidden"
    >
      {{ title }}
    </div>
    <textarea
      v-else
      v-model="title"
      ref="target"
      @keydown.enter="isTitleEditing = false"
      v-on-click-outside="() => (isTitleEditing = false)"
      class="border-none h-8 w-full p-1 resize-none overflow-hidden block"
    ></textarea>

    <!-- tasks -->
    <!-- <TaskItem
      v-for="task in tasks"
      :key="task.id"
      @click="openEditTask(props.id, task.id)"
      v-bind="task"
    /> -->

    <draggable v-model="localTasks" group="task" itemKey="id" ghost-class="opacity-30">
      <template #item="{ element }">
        <TaskItem
          @click="openEditTask(props.id, element.id)"
          v-bind="element"
        />
      </template>
    </draggable>

    <!-- add new task -->
    <AddNewTask :id="props.id" />
  </div>
</template>
