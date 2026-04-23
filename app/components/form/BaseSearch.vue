<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  debounce?: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const search = ref(props.modelValue || "");
const delay = props.debounce ?? 500;

let timeout: any = null;

// debounce
watch(search, (val) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    emit("update:modelValue", val);
  }, delay);
});
</script>

<template>
  <div class="relative w-full md:w-80 group">
    <!-- ICON -->
    <UIcon
      name="heroicons:magnifying-glass"
      class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition"
    />

    <!-- INPUT -->
    <input
      v-model="search"
      type="text"
      :placeholder="placeholder || 'Cari data...'"
      class="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400"
    />

    <!-- CLEAR BUTTON -->
    <button
      v-if="search"
      @click="search = ''"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
    >
      <UIcon name="heroicons:x-mark" class="w-4 h-4" />
    </button>
  </div>
</template>
