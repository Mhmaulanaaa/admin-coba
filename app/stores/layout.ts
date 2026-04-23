import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const collapsed = ref(false)
  const mobileOpen = ref(false)

  // INIT otomatis saat client mount
  if (import.meta.client) {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved !== null) {
      collapsed.value = saved === 'true'
    }
  }

  const toggleCollapse = () => {
    collapsed.value = !collapsed.value
    if (import.meta.client) {
      localStorage.setItem('sidebar-collapsed', String(collapsed.value))
    }
  }

  const toggleMobile = () => {
    mobileOpen.value = !mobileOpen.value
  }

  const closeMobile = () => {
    mobileOpen.value = false
  }

  return {
    collapsed,
    mobileOpen,
    toggleCollapse,
    toggleMobile,
    closeMobile
  }
})
