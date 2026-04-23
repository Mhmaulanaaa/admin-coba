<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core"; // 👈 tambahkan ini

const props = defineProps<{
  modelValue?: string;
  label?: string;
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const hours = ref<string>("00");
const minutes = ref<string>("00");
const seconds = ref<string>("00");
const isOpen = ref(false);

const hourOptions = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const minuteOptions = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const secondOptions = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const pickerRef = ref<HTMLElement | null>(null); // 👈 ref ke root element
const hourCol = ref<HTMLElement | null>(null);
const minuteCol = ref<HTMLElement | null>(null);
const secondCol = ref<HTMLElement | null>(null);

// 👇 close ketika klik di luar komponen
onClickOutside(pickerRef, () => {
  isOpen.value = false;
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const [h, m, s] = val.split(":");
      hours.value = h ?? "00";
      minutes.value = m ?? "00";
      seconds.value = s ?? "00";
    }
  },
  { immediate: true }
);

const formattedTime = computed(
  () => `${hours.value}:${minutes.value}:${seconds.value}`
);

watch([hours, minutes, seconds], () => {
  emit("update:modelValue", formattedTime.value);
});

const scrollToSelected = () => {
  nextTick(() => {
    [hourCol.value, minuteCol.value, secondCol.value].forEach((col) => {
      const selected = col?.querySelector(".selected");
      selected?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  });
};

const toggle = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) scrollToSelected();
};

const clearTime = () => {
  hours.value = "00";
  minutes.value = "00";
  seconds.value = "00";
};
const handleClickOutside = (e: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

watch(isOpen, (val) => {
  if (val) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <div ref="pickerRef" class="relative w-full">
    <!-- Label -->
    <label v-if="label"
      class="block text-xs font-medium tracking-wide uppercase mb-1.5 text-gray-500 dark:text-gray-400">
      {{ label }}
    </label>

    <!-- Trigger -->
    <div
      class="border rounded-lg px-3 py-2.5 cursor-pointer flex justify-between items-center transition-all duration-150 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      :class="isOpen
          ? 'border-green-400 ring-2 ring-green-400/20 dark:border-green-500 dark:ring-green-500/20'
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-500'
        " @click="toggle">
      <span class="text-sm font-medium tabular-nums tracking-wide">
        {{ formattedTime || placeholder || "00:00:00" }}
      </span>
      <svg class="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3" />
        <path d="M8 5v3.5l2 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
      </svg>
    </div>

    <!-- Dropdown -->
    <Transition enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0 translate-y-1 scale-95">
      <div v-if="isOpen"
        class="absolute z-50 mt-1.5 w-full rounded-xl overflow-hidden origin-top border shadow-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <!-- Column headers -->
        <div class="flex border-b border-gray-100 dark:border-gray-800">
          <div v-for="(col, i) in ['Jam', 'Menit', 'Detik']" :key="col"
            class="flex-1 text-center py-2 text-[10px] font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500"
            :class="{ 'border-r border-gray-100 dark:border-gray-800': i < 2 }">
            {{ col }}
          </div>
        </div>

        <!-- Scroll columns -->
        <div class="flex">
          <!-- Hours -->
          <div ref="hourCol"
            class="flex-1 max-h-44 overflow-y-auto scrollbar-thin border-r border-gray-100 dark:border-gray-800">
            <div v-for="h in hourOptions" :key="h" @click="hours = h"
              class="py-1.5 text-center text-sm tabular-nums cursor-pointer transition-colors duration-100" :class="[
                h === hours ? 'is-selected' : '',
                h === hours
                  ? 'bg-green-50 text-green-700 font-semibold dark:bg-green-500/15 dark:text-green-300'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
              ]">
              {{ h }}
            </div>
          </div>

          <!-- Minutes -->
          <div ref="minuteCol"
            class="flex-1 max-h-44 overflow-y-auto scrollbar-thin border-r border-gray-100 dark:border-gray-800">
            <div v-for="m in minuteOptions" :key="m" @click="minutes = m"
              class="py-1.5 text-center text-sm tabular-nums cursor-pointer transition-colors duration-100" :class="[
                m === minutes ? 'is-selected' : '',
                m === minutes
                  ? 'bg-green-50 text-green-700 font-semibold dark:bg-green-500/15 dark:text-green-300'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
              ]">
              {{ m }}
            </div>
          </div>

          <!-- Seconds -->
          <div ref="secondCol" class="flex-1 max-h-44 overflow-y-auto scrollbar-thin">
            <div v-for="s in secondOptions" :key="s" @click="seconds = s"
              class="py-1.5 text-center text-sm tabular-nums cursor-pointer transition-colors duration-100" :class="[
                s === seconds ? 'is-selected' : '',
                s === seconds
                  ? 'bg-green-50 text-green-700 font-semibold dark:bg-green-500/15 dark:text-green-300'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
              ]">
              {{ s }}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-between px-3 py-2.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
          <button
            class="text-xs transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            @click="clearTime">
            Hapus
          </button>
          <span class="text-xs font-semibold tabular-nums tracking-wider text-gray-500 dark:text-gray-400">
            {{ hours }} : {{ minutes }} : {{ seconds }}
          </span>
          <button
            class="text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-300 dark:hover:bg-green-500/30"
            @click="isOpen = false">
            Selesai
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
