<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const _router = useRouter()

const mainRef = ref<HTMLElement | null>(null)
const showButton = ref(false)

const handleScroll = () => {
  if (!mainRef.value) return
  showButton.value = mainRef.value.scrollTop > 200
}

const scrollToTop = () =>
  mainRef.value?.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  mainRef.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  mainRef.value?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500"
  >
    <AppSidebar />

    <div class="flex-1 flex flex-col relative">
      <header
        class="shrink-0 sticky top-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300"
      >
        <AppHeader
          title="Dashboard"
          subtitle="Monitoring & Sistem Informasi"
        />
      </header>

      <main
        ref="mainRef"
        class="flex-1 overflow-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6 bg-slate-50 dark:bg-slate-950 scroll-smooth min-h-0"
      >
        <div class="w-full h-full">
          <slot />
        </div>
      </main>

      <div
        class="pointer-events-none fixed bottom-0 left-0 right-0 h-20 bg-linear-to-t from-slate-50 dark:from-slate-950 to-transparent z-10 transition-colors duration-500"
      />
    </div>

    <Transition
      enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      enter-from-class="opacity-0 translate-y-10 scale-50 rotate-12"
      enter-to-class="opacity-100 translate-y-0 scale-100 rotate-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-10 scale-75"
    >
      <button
        v-if="showButton"
        class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group"
        @click="scrollToTop"
      >
        <div
          class="absolute inset-0 bg-primary-500/30 rounded-full blur-xl animate-pulse"
        />
        <div
          class="absolute inset-0 bg-primary-400/20 rounded-full blur-lg scale-150 group-hover:scale-175 transition-transform duration-500"
        />
        <div
          class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 text-white shadow-2xl shadow-primary-500/30 dark:shadow-primary-500/20 flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 hover:shadow-primary-500/50"
        >
          <Icon
            name="heroicons:arrow-up-20-solid"
            class="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-y-0.5 transition-transform duration-300"
          />
          <div
            class="absolute inset-0 rounded-2xl bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
main::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

main::-webkit-scrollbar-track {
  background: transparent;
}

main::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.3);
  border-radius: 20px;
  border: 2px solid transparent;
  background-clip: content-box;
}

main::-webkit-scrollbar-thumb:hover {
  background-color: rgba(148, 163, 184, 0.5);
}

.dark main::-webkit-scrollbar-thumb {
  background-color: rgba(71, 85, 105, 0.4);
}

.dark main::-webkit-scrollbar-thumb:hover {
  background-color: rgba(71, 85, 105, 0.6);
}
</style>
