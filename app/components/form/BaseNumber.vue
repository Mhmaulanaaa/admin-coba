<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  label?: string;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
}>();

const emit = defineEmits(["update:modelValue"]);

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let value = Number(target.value);

  // Enforce min/max in script as well if needed, but native input handles it mostly
  if (props.min !== undefined && value < Number(props.min))
    value = Number(props.min);
  if (props.max !== undefined && value > Number(props.max))
    value = Number(props.max);

  emit("update:modelValue", value);
};
</script>

<template>
  <div>
    <label class="text-sm text-gray-600 dark:text-gray-300">
      {{ label }}
    </label>

    <input
      type="number"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      class="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 transition"
    />
  </div>
</template>
