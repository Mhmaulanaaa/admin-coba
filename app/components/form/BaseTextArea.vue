<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    rows?: number | string;
    readonly?: boolean;
  }>(),
  {
    rows: 4,
    readonly: false,
  }
);

const emit = defineEmits(["update:modelValue"]);

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div>
    <label class="text-sm text-gray-600 dark:text-gray-300">
      {{ label }}
    </label>

    <textarea :value="modelValue" @input="onInput" :rows="props.rows" :placeholder="placeholder" :readonly="readonly"
      class="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 transition outline-none"
      :class="{ 'opacity-70 cursor-not-allowed': readonly }"></textarea>
  </div>
</template>
