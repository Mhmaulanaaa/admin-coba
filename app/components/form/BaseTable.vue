<script setup lang="ts">
import {
  computed,
  useAttrs,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";

/**
 * BaseTable Component
 * Wrapper for Nuxt UI UTable with a clean, professional design.
 * Features:
 * - Soft scrollbars (visible only on hover)
 * - Sticky header with subtle separator
 * - Clean loading overlay with spinner
 * - Minimal empty state with icon slot
 * - Full slot forwarding
 * - Pagination via UPagination (mode="pagination")
 * - Infinite scroll via IntersectionObserver (mode="infinite")
 */

interface Props {
  maxHeight?: string | number;
  sticky?: boolean | "header" | "footer";
  containerClass?: string;
  tableClass?: string;
  loading?: boolean;
  emptyText?: string;

  /** Navigation mode. Default: "none" (no pagination/infinite scroll) */
  mode?: "none" | "pagination" | "infinite";

  // ── Pagination props (mode="pagination") ──────────────────
  /** Current page (v-model:page) */
  page?: number;
  /** Items per page */
  pageSize?: number;
  /** Total number of items */
  total?: number;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Available page size options */
  pageSizeOptions?: number[];

  // ── Infinite scroll props (mode="infinite") ────────────────
  /** Whether there are more items to load */
  hasMore?: boolean;
  /** Loading more items (spinner at bottom) */
  loadingMore?: boolean;
  /** Root margin for IntersectionObserver trigger */
  infiniteRootMargin?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxHeight: "auto",
  sticky: "header",
  containerClass: "",
  tableClass: "",
  loading: false,
  emptyText: "Tidak ada data",
  mode: "none",
  page: 1,
  pageSize: 10,
  total: 0,
  showPageSize: false,
  pageSizeOptions: () => [10, 25, 50, 100],
  hasMore: false,
  loadingMore: false,
  infiniteRootMargin: "0px 0px 80px 0px",
});

const emit = defineEmits<{
  "update:page": [page: number];
  "update:pageSize": [size: number];
  /** Fired when infinite scroll sentinel enters viewport */
  "load-more": [];
}>();

defineOptions({ inheritAttrs: false });

// ── Resolved styles ──────────────────────────────────────────
const resolvedMaxHeight = computed(() => {
  if (props.maxHeight === "auto") return "none";
  return typeof props.maxHeight === "number"
    ? `${props.maxHeight}px`
    : props.maxHeight;
});

const attrs = useAttrs();
const data = computed(() => (attrs.data as any[]) || []);
const isEmpty = computed(() => !props.loading && data.value.length === 0);

// ── UTable UI config ─────────────────────────────────────────
const uiConfig = computed(() => {
  const ext = (attrs.ui as any) || {};
  return {
    ...ext,
    wrapper: cn("bt-scroll", ext.wrapper),
    thead: cn("sticky top-0 z-20 bg-white dark:bg-slate-900", ext.thead),
    th: (column: any) =>
      cn(
        "bg-white dark:bg-slate-900 text-xs font-medium tracking-wide text-gray-400 dark:text-slate-500 uppercase px-4 py-3 border-b border-gray-100 dark:border-slate-800",
        ext.th,
        column?.class ?? "text-left"
      ),
    td: (column: any) =>
      cn(
        "px-4 py-3 text-sm text-gray-700 dark:text-slate-200",
        ext.td,
        column?.tdClass
      ),
    tr: cn(
      "border-b border-gray-50 dark:border-slate-800/60 last:border-0",
      "hover:bg-gray-50/70 dark:hover:bg-slate-800/40 transition-colors duration-100",
      ext.tr
    ),
  };
});

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

// ── Pagination ───────────────────────────────────────────────
const totalPages = computed(() =>
  props.total > 0 ? Math.ceil(props.total / props.pageSize) : 0
);

const paginationFrom = computed(() =>
  props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1
);

const paginationTo = computed(() =>
  Math.min(props.page * props.pageSize, props.total)
);

function onPageChange(newPage: number) {
  emit("update:page", newPage);
}

function onPageSizeChange(event: Event) {
  const size = Number((event.target as HTMLSelectElement).value);
  emit("update:pageSize", size);
  emit("update:page", 1);
}

// ── Infinite scroll ──────────────────────────────────────────
const sentinelEl = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function setupObserver() {
  if (!sentinelEl.value) return;
  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (
        entry?.isIntersecting &&
        props.hasMore &&
        !props.loadingMore &&
        !props.loading
      ) {
        emit("load-more");
      }
    },
    { rootMargin: props.infiniteRootMargin }
  );
  observer.observe(sentinelEl.value);
}

watch(
  () => props.mode,
  async (mode) => {
    if (mode === "infinite") {
      await nextTick();
      setupObserver();
    } else {
      observer?.disconnect();
    }
  },
  { immediate: false }
);

onMounted(() => {
  if (props.mode === "infinite") setupObserver();
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div
    class="bt-root relative w-full rounded-xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col bg-white dark:bg-slate-900 shadow-sm"
    :class="containerClass"
  >
    <!-- LOADING OVERLAY -->
    <Transition name="bt-fade">
      <div
        v-if="loading"
        class="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-[2px]"
      >
        <slot name="loading">
          <div class="bt-spinner" />
          <span class="text-xs text-gray-400 dark:text-slate-500 tracking-wide">
            Memuat data...
          </span>
        </slot>
      </div>
    </Transition>

    <!-- TABLE -->
    <UTable
      v-bind="$attrs"
      :sticky="sticky"
      :ui="uiConfig"
      :style="{ maxHeight: resolvedMaxHeight }"
      class="min-w-full"
      :class="tableClass"
    >
      <!-- EMPTY STATE -->
      <template v-if="isEmpty" #body>
        <tr>
          <td
            :colspan="(attrs.columns as any[])?.length || 1"
            class="py-14 text-center"
          >
            <slot name="empty">
              <div class="flex flex-col items-center gap-2.5">
                <svg
                  class="w-8 h-8 text-gray-250 dark:text-slate-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                >
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span class="text-sm text-gray-400 dark:text-slate-500">
                  {{ emptyText }}
                </span>
              </div>
            </slot>
          </td>
        </tr>
      </template>

      <!-- INFINITE SCROLL: sentinel row injected at end of tbody -->
      <template v-if="mode === 'infinite' && !isEmpty" #body="bodyProps">
        <slot name="body" v-bind="bodyProps || {}" />
        <tr aria-hidden="true">
          <td :colspan="(attrs.columns as any[])?.length || 1" class="p-0">
            <!-- Sentinel element — observed by IntersectionObserver -->
            <div ref="sentinelEl" class="bt-sentinel" />
            <!-- Loading more spinner -->
            <Transition name="bt-fade">
              <div
                v-if="loadingMore"
                class="flex items-center justify-center gap-2 py-4"
              >
                <slot name="loading-more">
                  <div class="bt-spinner bt-spinner--sm" />
                  <span
                    class="text-xs text-gray-400 dark:text-slate-500 tracking-wide"
                  >
                    Memuat lebih banyak...
                  </span>
                </slot>
              </div>
            </Transition>
            <!-- End of data indicator -->
            <Transition name="bt-fade">
              <div
                v-if="!hasMore && !loadingMore && data.length > 0"
                class="flex items-center justify-center gap-2 py-4"
              >
                <slot name="no-more">
                  <span
                    class="text-xs text-gray-300 dark:text-slate-600 tracking-wide"
                  >
                    Semua data sudah ditampilkan
                  </span>
                </slot>
              </div>
            </Transition>
          </td>
        </tr>
      </template>

      <!-- FORWARD ALL OTHER SLOTS -->
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </UTable>

    <!-- PAGINATION FOOTER (mode="pagination") -->
    <div
      v-if="mode === 'pagination' && total > 0"
      class="bt-pagination-footer flex items-center justify-between gap-4 px-4 py-3 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900"
    >
      <!-- Left: info + page size selector -->
      <div class="flex items-center gap-3 min-w-0">
        <span
          class="text-xs text-gray-400 dark:text-slate-500 whitespace-nowrap"
        >
          {{ paginationFrom }}–{{ paginationTo }} dari {{ total }} data
        </span>

        <template v-if="showPageSize">
          <span class="text-gray-200 dark:text-slate-700 select-none">|</span>
          <div class="flex items-center gap-1.5">
            <label
              for="bt-page-size"
              class="text-xs text-gray-400 dark:text-slate-500 whitespace-nowrap"
            >
              Baris per halaman
            </label>
            <select
              id="bt-page-size"
              :value="pageSize"
              class="bt-select"
              @change="onPageSizeChange"
            >
              <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </div>
        </template>
      </div>

      <!-- Right: UPagination -->
      <UPagination
        :model-value="page"
        :total="total"
        :page-count="pageSize"
        :ui="{
          list: 'flex items-center gap-1',
          item: 'min-w-[32px] h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors',
          prev: 'min-w-[32px] h-8 flex items-center justify-center rounded-lg transition-colors',
          next: 'min-w-[32px] h-8 flex items-center justify-center rounded-lg transition-colors',
          ellipsis:
            'min-w-[32px] h-8 flex items-center justify-center text-xs text-gray-400 dark:text-slate-500',
        }"
        @update:model-value="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped>
/* ── Scrollbar ───────────────────────────────────────────────── */
.bt-root :deep(.bt-scroll) {
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-height: inherit;
}

.bt-root :deep(.bt-scroll)::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.bt-root :deep(.bt-scroll)::-webkit-scrollbar-track {
  background: transparent;
}

.bt-root :deep(.bt-scroll)::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 99px;
}

.bt-root:hover :deep(.bt-scroll) {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.25) transparent;
}

.bt-root:hover :deep(.bt-scroll)::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.25);
}

.dark .bt-root:hover :deep(.bt-scroll)::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.18);
}

.bt-root :deep(.bt-scroll)::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.45) !important;
}

/* ── Table layout ────────────────────────────────────────────── */
.bt-root :deep(table) {
  width: 100%;
  border-collapse: collapse;
}

/* ── Loading spinner ─────────────────────────────────────────── */
.bt-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(156, 163, 175, 0.2);
  border-top-color: rgba(156, 163, 175, 0.7);
  border-radius: 50%;
  animation: bt-spin 0.65s linear infinite;
  flex-shrink: 0;
}

.bt-spinner--sm {
  width: 14px;
  height: 14px;
}

@keyframes bt-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Fade transition ─────────────────────────────────────────── */
.bt-fade-enter-active,
.bt-fade-leave-active {
  transition: opacity 0.15s ease;
}

.bt-fade-enter-from,
.bt-fade-leave-to {
  opacity: 0;
}

/* ── Pagination footer ───────────────────────────────────────── */
.bt-pagination-footer {
  flex-shrink: 0;
}

/* ── Page size select ────────────────────────────────────────── */
.bt-select {
  appearance: none;
  background-color: transparent;
  border: 1px solid rgba(156, 163, 175, 0.3);
  border-radius: 6px;
  padding: 2px 22px 2px 8px;
  font-size: 12px;
  color: inherit;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 6px center;
  outline: none;
  transition: border-color 0.15s ease;
}

.bt-select:focus {
  border-color: rgba(99, 102, 241, 0.5);
}

/* ── Infinite scroll sentinel ────────────────────────────────── */
.bt-sentinel {
  height: 1px;
  width: 100%;
  pointer-events: none;
}
</style>
