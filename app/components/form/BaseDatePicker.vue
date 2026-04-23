<script setup lang="ts">
const props = defineProps<{
  modelValue?: string;
  label?: string;
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value || "");
};
</script>

<template>
  <div>
    <label class="text-sm text-gray-600 dark:text-gray-300">
      {{ label }}
    </label>

    <input
      type="date"
      :value="modelValue || ''"
      @input="onInput"
      class="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 transition"
    />
  </div>
</template>
