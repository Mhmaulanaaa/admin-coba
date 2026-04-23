<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: any;
  label?: string;
  options: { label: string; value: any }[];
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div>
    <!-- LABEL -->
    <label v-if="label" class="text-sm text-gray-600 dark:text-gray-300">
      {{ label }}
    </label>

    <!-- SELECT -->
    <div class="mt-1">
      <USelect
        v-model="model"
        :items="options"
        :placeholder="placeholder || 'Pilih data'"
        filterable
        :ui="{
          base: `
            w-full px-3 py-2 rounded-xl text-sm
            bg-gray-50 dark:bg-slate-900
            border border-gray-200 dark:border-slate-700
            focus:ring-2 focus:ring-green-500
            transition-all duration-200
          `,
        }"
      />
    </div>
  </div>
</template>
