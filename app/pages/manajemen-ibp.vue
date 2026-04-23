<script setup lang="ts">
// import type { EventClickArg, EventDropArg } from '@fullcalendar/core'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from '@fullcalendar/timegrid'
import type { TableColumn } from '@nuxt/ui'

type OperasiRow = JadwalOperasi & { durasi: number }
definePageMeta({
  layout: 'default',
  title: 'Manajemen IBP - Admin OK',
  pageTransition: false
})

// Dynamic import FullCalendar untuk menghindari SSR issues
// const FullCalendar = defineAsyncComponent(() =>
//   import('@fullcalendar/vue3').then(m => m.default)
// )

// ==================== TYPES ====================

interface JadwalOperasi {
  id: string
  pasien: string
  noRM: string
  operator: string
  asisten: string
  tindakan: string
  ruangOK: string
  ronde: number
  estimasiDurasi: number // menit
  tanggal: string
  start: Date | string
  end: Date | string
  status: 'terjadwal' | 'proses' | 'selesai' | 'batal'
  color: string
  sikompasId?: string
}

interface RuangOK {
  id: string
  nama: string
  kode: string
  color: string
  kapasitasRonde: number
  fasilitas: string[]
  isActive: boolean
}

interface RondeConfig {
  ronde: number
  waktuMulai: string
  waktuSelesai: string
  durasiDefault: number
}

// ==================== DATA ====================

const ruangOKList = ref<RuangOK[]>([
  {
    id: 'ok1',
    kode: 'OK-1',
    nama: 'OK Utama 1',
    color: '#3b82f6',
    kapasitasRonde: 3,
    fasilitas: ['C-Arm', 'Microscope', 'Ventilator'],
    isActive: true
  },
  {
    id: 'ok2',
    kode: 'OK-2',
    nama: 'OK Utama 2',
    color: '#10b981',
    kapasitasRonde: 3,
    fasilitas: ['C-Arm', 'Laparoscopy Set'],
    isActive: true
  },
  {
    id: 'ok3',
    kode: 'OK-3',
    nama: 'OK Emergency',
    color: '#f59e0b',
    kapasitasRonde: 2,
    fasilitas: ['Ventilator', 'Defibrillator'],
    isActive: true
  },
  {
    id: 'ok4',
    kode: 'OK-4',
    nama: 'OK Khusus',
    color: '#8b5cf6',
    kapasitasRonde: 2,
    fasilitas: ['Microscope', 'Neuro Navigation'],
    isActive: true
  },
  {
    id: 'ok5',
    kode: 'OK-5',
    nama: 'OK Bedah Anak',
    color: '#ec4899',
    kapasitasRonde: 2,
    fasilitas: ['Pediatric Set', 'Warmer'],
    isActive: true
  }
])

const rondeConfig = ref<RondeConfig[]>([
  { ronde: 1, waktuMulai: '07:00', waktuSelesai: '12:00', durasiDefault: 180 },
  { ronde: 2, waktuMulai: '12:30', waktuSelesai: '16:00', durasiDefault: 150 },
  { ronde: 3, waktuMulai: '16:30', waktuSelesai: '20:00', durasiDefault: 150 }
])

const jadwalList = ref<JadwalOperasi[]>([])
const selectedEvent = ref<JadwalOperasi | null>(null)
const isEditMode = ref(false)
const activeTab = ref('kalender')
const selectedDate = ref<string>(new Date().toISOString().slice(0, 10))
const calendarKey = ref(0)

// ==================== FORM STATE ====================

const form = reactive({
  pasien: '',
  noRM: '',
  operator: '',
  asisten: '',
  tindakan: '',
  ruangOK: '',
  ronde: 1,
  estimasiDurasi: 120,
  tanggal: '',
  jamMulai: '',
  sikompasId: ''
})
const operasiBerlangsungRows = computed(() => {
  return jadwalList.value
    .filter(j => j.status === 'proses')
    .map(j => ({
      ...j,
      durasi: Math.round((Date.now() - new Date(j.start).getTime()) / 60000)
    }))
})

const operasiBerlangsungColumns: TableColumn<OperasiRow>[] = [
  { accessorKey: 'ruangOK', header: 'Ruang' },
  { accessorKey: 'pasien', header: 'Pasien' },
  { accessorKey: 'tindakan', header: 'Tindakan' },
  { accessorKey: 'operator', header: 'Operator' },
  { accessorKey: 'start', header: 'Mulai' },
  { accessorKey: 'durasi', header: 'Durasi (menit)' },
  { accessorKey: 'estimasiDurasi', header: 'Estimasi' },
  { accessorKey: 'actions', header: 'Aksi' }
]
const prediksiSelesai = computed(() => {
  if (!form.jamMulai || !form.estimasiDurasi || !form.tanggal) {
    return '--:--'
  }

  return formatWaktu(
    calculateEndTime(
      new Date(`${form.tanggal}T${form.jamMulai}`),
      form.estimasiDurasi
    )
  )
})
// ==================== COMPUTED ====================

// const events = computed(() => {
//   return jadwalList.value.map(j => ({
//     id: j.id,
//     title: `${j.ruangOK} - ${j.pasien} (${j.tindakan})`,
//     start: j.start,
//     end: j.end,
//     backgroundColor: j.color,
//     borderColor: j.color,
//     extendedProps: j
//   }))
// })

const jadwalByRuang = computed(() => {
  const grouped: Record<string, JadwalOperasi[]> = {}
  ruangOKList.value.forEach((r) => {
    grouped[r.kode] = jadwalList.value
      .filter(j => j.ruangOK === r.kode && j.status !== 'batal')
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      )
  })
  return grouped
})

const statistikHariIni = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  const hariIni = jadwalList.value.filter(j => j.tanggal === today)

  return {
    total: hariIni.length,
    proses: hariIni.filter(j => j.status === 'proses').length,
    selesai: hariIni.filter(j => j.status === 'selesai').length,
    menunggu: hariIni.filter(j => j.status === 'terjadwal').length
  }
})

const okTersedia = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return ruangOKList.value.filter((r) => {
    const jadwalAktif = jadwalList.value.filter(
      j =>
        j.ruangOK === r.kode
        && j.tanggal === today
        && ['terjadwal', 'proses'].includes(j.status)
    )
    return jadwalAktif.length < r.kapasitasRonde
  })
})

// ==================== METHODS ====================

// const generateId = () =>
//   `IBP-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`

const getRuangColor = (kode: string) => {
  return ruangOKList.value.find(r => r.kode === kode)?.color || '#6b7280'
}

const getRuangName = (kode: string) => {
  return ruangOKList.value.find(r => r.kode === kode)?.nama || kode
}

const calculateEndTime = (start: Date | string, durasiMenit: number) => {
  const startDate = new Date(start)
  return new Date(startDate.getTime() + durasiMenit * 60000)
}

// const checkConflict = (
//   ruang: string,
//   start: Date,
//   end: Date,
//   excludeId?: string
// ) => {
//   return jadwalList.value.some((j) => {
//     if (j.ruangOK !== ruang) return false
//     if (excludeId && j.id === excludeId) return false
//     if (j.status === 'batal') return false

//     const jStart = new Date(j.start).getTime()
//     const jEnd = new Date(j.end).getTime()
//     const newStart = new Date(start).getTime()
//     const newEnd = new Date(end).getTime()

//     return newStart < jEnd && newEnd > jStart
//   })
// }

const getSlotRonde = (ruangKode: string, tanggal: string, ronde: number) => {
  const rondeData = rondeConfig.value.find(r => r.ronde === ronde)
  if (!rondeData) return null

  const existing = jadwalList.value.filter(
    j =>
      j.ruangOK === ruangKode
      && j.tanggal === tanggal
      && j.ronde === ronde
      && j.status !== 'batal'
  )

  const totalDurasi = existing.reduce(
    (sum, j) => sum + (j.estimasiDurasi ?? 0),
    0
  )

  const toMinutes = (time?: string) => {
    if (!time) return 0
    const [h = '0', m = '0'] = time.split(':')
    return Number(h) * 60 + Number(m)
  }

  const rondeDurasi
    = toMinutes(rondeData.waktuSelesai) - toMinutes(rondeData.waktuMulai)

  return {
    tersedia:
      existing.length
      < (ruangOKList.value.find(r => r.kode === ruangKode)?.kapasitasRonde
        ?? 0),
    sisaWaktu: rondeDurasi - totalDurasi,
    jumlahJadwal: existing.length
  }
}

// const autoSchedule = () => {
//   if (!form.tanggal || !form.estimasiDurasi) return

//   // Cari slot kosong otomatis
//   for (const ruang of okTersedia.value) {
//     for (const ronde of rondeConfig.value) {
//       const slot = getSlotRonde(ruang.kode, form.tanggal, ronde.ronde)
//       if (slot && slot.tersedia && slot.sisaWaktu >= form.estimasiDurasi) {
//         form.ruangOK = ruang.kode
//         form.ronde = ronde.ronde
//         form.jamMulai = ronde.waktuMulai

//         // Hitung jam selesai berdasarkan jadwal existing di ronde ini
//         const existingInRonde = jadwalList.value.filter(
//           j =>
//             j.ruangOK === ruang.kode
//             && j.tanggal === form.tanggal
//             && j.ronde === ronde.ronde
//             && j.status !== 'batal'
//         )

//         if (existingInRonde.length > 0) {
//           const lastEnd = Math.max(
//             ...existingInRonde.map(j => new Date(j.end).getTime())
//           )
//           const startTime = new Date(lastEnd)
//           form.jamMulai = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`
//         }

//         return
//       }
//     }
//   }
// }

// const tambahJadwal = () => {
//   if (!form.pasien || !form.ruangOK || !form.tanggal || !form.jamMulai) {
//     toast.add({
//       title: 'Error',
//       description: 'Lengkapi data wajib!',
//       color: 'error'
//     })
//     return
//   }

//   const start = new Date(`${form.tanggal}T${form.jamMulai}`)
//   const end = calculateEndTime(start, form.estimasiDurasi)

//   if (checkConflict(form.ruangOK, start, end)) {
//     toast.add({
//       title: 'Konflik!',
//       description: 'Jadwal bertabrakan dengan operasi lain',
//       color: 'error'
//     })
//     return
//   }

//   const newJadwal: JadwalOperasi = {
//     id: generateId(),
//     pasien: form.pasien,
//     noRM: form.noRM,
//     operator: form.operator,
//     asisten: form.asisten,
//     tindakan: form.tindakan,
//     ruangOK: form.ruangOK,
//     ronde: form.ronde,
//     estimasiDurasi: form.estimasiDurasi,
//     tanggal: form.tanggal,
//     start,
//     end,
//     status: 'terjadwal',
//     color: getRuangColor(form.ruangOK),
//     sikompasId: form.sikompasId || `SK-${Date.now()}`
//   }

//   jadwalList.value.push(newJadwal)
//   toast.add({
//     title: 'Sukses',
//     description: 'Jadwal operasi berhasil ditambahkan',
//     color: 'success'
//   })
//   resetForm()
//   calendarKey.value++
// }

// const updateJadwal = () => {
//   if (!selectedEvent.value) return

//   const start = new Date(`${form.tanggal}T${form.jamMulai}`)
//   const end = calculateEndTime(start, form.estimasiDurasi)

//   if (checkConflict(form.ruangOK, start, end, selectedEvent.value.id)) {
//     toast.add({
//       title: 'Konflik!',
//       description: 'Jadwal bertabrakan',
//       color: 'error'
//     })
//     return
//   }

//   const index = jadwalList.value.findIndex(
//     j => j.id === selectedEvent.value!.id
//   )
//   if (index !== -1) {
//     jadwalList.value[index] = {
//       ...selectedEvent.value,
//       ...form,
//       tanggal: form.tanggal,
//       start,
//       end,
//       color: getRuangColor(form.ruangOK)
//     }
//     toast.add({
//       title: 'Sukses',
//       description: 'Jadwal berhasil diupdate',
//       color: 'success'
//     })
//     resetForm()
//     calendarKey.value++
//   }
// }

// const hapusJadwal = (id: string) => {
//   const jadwal = jadwalList.value.find(j => j.id === id)

//   if (!jadwal) return

//   jadwal.status = 'batal'

//   toast.add({
//     title: 'Info',
//     description: 'Jadwal dibatalkan',
//     color: 'warning'
//   })

//   if (selectedEvent.value?.id === id) resetForm()
// }

const _mulaiOperasi = (id: string) => {
  const jadwal = jadwalList.value.find(j => j.id === id)
  if (jadwal) {
    jadwal.status = 'proses'
    jadwal.start = new Date() // Real-time start
    toast.add({
      title: 'Operasi Dimulai',
      description: `${jadwal.pasien} - ${jadwal.tindakan}`,
      color: 'primary'
    })
  }
}

// const selesaiOperasi = (id: string) => {
//   const jadwal = jadwalList.value.find(j => j.id === id)
//   if (jadwal) {
//     jadwal.status = 'selesai'
//     jadwal.end = new Date() // Actual end time
//     const actualDurasi = Math.round(
//       (new Date(jadwal.end).getTime() - new Date(jadwal.start).getTime())
//       / 60000
//     )
//     toast.add({
//       title: 'Operasi Selesai',
//       description: `Durasi: ${actualDurasi} menit (Estimasi: ${jadwal.estimasiDurasi})`,
//       color: 'success'
//     })
//   }
// }

const editJadwal = (jadwal: JadwalOperasi) => {
  selectedEvent.value = jadwal
  const startDate = new Date(jadwal.start)
  Object.assign(form, {
    pasien: jadwal.pasien,
    noRM: jadwal.noRM,
    operator: jadwal.operator,
    asisten: jadwal.asisten,
    tindakan: jadwal.tindakan,
    ruangOK: jadwal.ruangOK,
    ronde: jadwal.ronde,
    estimasiDurasi: jadwal.estimasiDurasi,
    tanggal: jadwal.tanggal,
    jamMulai: `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`,
    sikompasId: jadwal.sikompasId
  })
  isEditMode.value = true
  activeTab.value = 'form'
}

// const resetForm = () => {
//   Object.assign(form, {
//     pasien: '',
//     noRM: '',
//     operator: '',
//     asisten: '',
//     tindakan: '',
//     ruangOK: '',
//     ronde: 1,
//     estimasiDurasi: 120,
//     tanggal: selectedDate.value,
//     jamMulai: '',
//     sikompasId: ''
//   })
//   isEditMode.value = false
//   selectedEvent.value = null
// }

// ==================== CALENDAR HANDLERS ====================

// const handleEventDrop = (info: EventDropArg) => {
//   const jadwal = jadwalList.value.find(j => j.id === info.event.id)
//   if (!jadwal || !info.event.start || !info.event.end) return

//   if (
//     checkConflict(jadwal.ruangOK, info.event.start, info.event.end, jadwal.id)
//   ) {
//     info.revert()
//     toast.add({
//       title: 'Gagal',
//       description: 'Slot waktu tidak tersedia',
//       color: 'error'
//     })
//     return
//   }

//   jadwal.start = info.event.start
//   jadwal.end = info.event.end
//   jadwal.tanggal = info.event.start.toISOString().slice(0, 10)
//   toast.add({
//     title: 'Jadwal Dipindahkan',
//     description: 'Waktu operasi diupdate',
//     color: 'primary'
//   })
// }

// const handleEventClick = (info: EventClickArg) => {
//   const jadwal = jadwalList.value.find(j => j.id === info.event.id)
//   if (jadwal) editJadwal(jadwal)
// }

// ==================== UTILS ====================

const formatWaktu = (date: Date | string) => {
  const d = new Date(date)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const _formatTanggal = (date: Date | string) => {
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusColor = (
  status: string
): 'neutral' | 'primary' | 'success' | 'error' => {
  const colors: Record<string, 'neutral' | 'primary' | 'success' | 'error'> = {
    terjadwal: 'neutral',
    proses: 'primary',
    selesai: 'success',
    batal: 'error'
  }
  return colors[status] || 'neutral'
}

// ==================== LIFECYCLE ====================

onMounted(() => {
  form.tanggal = selectedDate.value ?? ''
})

onUnmounted(() => {
  jadwalList.value = []
})

const toast = useToast()
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 space-y-6 transition-colors duration-300"
  >
    <!-- Statistik Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <UCard
        class="bg-linear-to-br from-blue-500 to-blue-600 text-white border-0"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">
              Total Jadwal Hari Ini
            </p>
            <p class="text-3xl font-bold">
              {{ statistikHariIni.total }}
            </p>
          </div>
          <UIcon
            name="i-heroicons-calendar"
            class="w-8 h-8 text-blue-200"
          />
        </div>
      </UCard>

      <UCard
        class="bg-linear-to-br from-amber-500 to-amber-600 text-white border-0"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-amber-100 text-sm">
              Menunggu
            </p>
            <p class="text-3xl font-bold">
              {{ statistikHariIni.menunggu }}
            </p>
          </div>
          <UIcon
            name="i-heroicons-clock"
            class="w-8 h-8 text-amber-200"
          />
        </div>
      </UCard>

      <UCard
        class="bg-linear-to-br from-green-500 to-green-600 text-white border-0"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">
              Selesai
            </p>
            <p class="text-3xl font-bold">
              {{ statistikHariIni.selesai }}
            </p>
          </div>
          <UIcon
            name="i-heroicons-check-circle"
            class="w-8 h-8 text-green-200"
          />
        </div>
      </UCard>

      <UCard
        class="bg-linear-to-br from-purple-500 to-purple-600 text-white border-0"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm">
              OK Tersedia
            </p>
            <p class="text-3xl font-bold">
              {{ okTersedia.length }}/{{ ruangOKList.length }}
            </p>
          </div>
          <UIcon
            name="i-heroicons-home"
            class="w-8 h-8 text-purple-200"
          />
        </div>
      </UCard>
    </div>

    <!-- Navigation Tabs -->
    <UTabs
      v-model="activeTab"
      :items="[
        {
          label: 'Kalender Operasi',
          icon: 'i-heroicons-calendar-days',
          slot: 'kalender'
        },
        {
          label: 'Plotting Ruangan',
          icon: 'i-heroicons-map',
          slot: 'plotting'
        },
        {
          label: 'Input Jadwal',
          icon: 'i-heroicons-plus-circle',
          slot: 'form'
        },
        { label: 'SiKompas', icon: 'i-heroicons-clock', slot: 'sikompas' }
      ]"
      class="mb-6"
    >
      <!-- TAB: KALENDER -->
      <template #kalender>
        <div class="grid lg:grid-cols-3 gap-6">
          <UCard class="lg:col-span-2 shadow-sm">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">
                  Timeline Operasi
                </h3>
                <UInput
                  v-model="selectedDate"
                  type="date"
                  class="w-40"
                  @change="calendarKey++"
                />
              </div>
            </template>

            <!-- <ClientOnly>
                <FullCalendar
                  :key="calendarKey"
                  :plugins="[dayGridPlugin, timeGridPlugin, interactionPlugin]"
                  :initial-date="selectedDate"
                  initial-view="timeGridDay"
                  :events="events"
                  :editable="true"
                  :selectable="true"
                  :header-toolbar="{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,timeGridWeek,dayGridMonth'
                  }"
                  :slot-min-time="'06:00:00'"
                  :slot-max-time="'22:00:00'"
                  :slot-duration="'00:30:00'"
                  :all-day-slot="false"
                  :height="'650px'"
                  locale="id"
                  @event-drop="handleEventDrop"
                  @event-click="handleEventClick"
                />
                <template #fallback>
                  <div class="h-162.5 flex items-center justify-center">
                    <UIcon
                      name="i-heroicons-arrow-path"
                      class="w-8 h-8 animate-spin text-gray-400"
                    />
                  </div>
                </template>
              </ClientOnly> -->
          </UCard>

          <!-- Daftar Jadwal Hari Ini -->
          <div class="space-y-4">
            <UCard class="shadow-sm">
              <template #header>
                <h3
                  class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Jadwal Hari Ini
                </h3>
              </template>

              <div class="space-y-3 max-h-150 overflow-y-auto">
                <div
                  v-for="(jadwalGroup, ruangKode) in jadwalByRuang"
                  :key="ruangKode"
                  class="border-l-4 rounded-r-lg p-3 bg-gray-50 dark:bg-gray-800"
                  :style="{
                    borderLeftColor: getRuangColor(ruangKode)
                  }"
                >
                  <h4
                    class="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-200"
                  >
                    {{ getRuangName(ruangKode) }}
                  </h4>

                  <div class="space-y-2">
                    <div
                      v-for="j in jadwalGroup"
                      :key="j.id"
                      class="bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700 text-xs cursor-pointer hover:shadow-md dark:hover:shadow-gray-800 transition-shadow"
                      @click="editJadwal(j)"
                    >
                      <div class="flex justify-between items-start">
                        <span
                          class="font-medium text-gray-800 dark:text-gray-200"
                        >
                          {{ formatWaktu(j.start) }}
                        </span>

                        <UBadge
                          :color="getStatusColor(j.status)"
                          size="xs"
                        >
                          {{ j.status }}
                        </UBadge>
                      </div>

                      <p
                        class="font-semibold mt-1 truncate text-gray-800 dark:text-gray-100"
                      >
                        {{ j.pasien }}
                      </p>

                      <p class="text-gray-500 dark:text-gray-400 truncate">
                        {{ j.tindakan }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </template>

      <!-- TAB: PLOTTING RUANGAN -->
      <template #plotting>
        <div class="space-y-6">
          <!-- Konfigurasi Ronde -->
          <UCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-800 dark:text-gray-100"
              >
                Konfigurasi Ronde Operasi
              </h3>
            </template>

            <div class="grid md:grid-cols-3 gap-4">
              <div
                v-for="ronde in rondeConfig"
                :key="ronde.ronde"
                class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
              >
                <div class="flex items-center gap-3 mb-3">
                  <div
                    class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-bold"
                  >
                    {{ ronde.ronde }}
                  </div>

                  <div>
                    <h4 class="font-semibold text-gray-800 dark:text-gray-100">
                      Ronde {{ ronde.ronde }}
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ ronde.waktuMulai }} - {{ ronde.waktuSelesai }}
                    </p>
                  </div>
                </div>

                <div class="text-sm text-gray-600 dark:text-gray-300">
                  <p>Durasi Default: {{ ronde.durasiDefault }} menit</p>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Matrix Plotting -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-800 dark:text-gray-100"
                >
                  Matrix Plotting Ruangan
                </h3>
                <UInput
                  v-model="selectedDate"
                  type="date"
                />
              </div>
            </template>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th
                      class="text-left p-4 font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Ruang OK
                    </th>

                    <th
                      v-for="ronde in rondeConfig"
                      :key="ronde.ronde"
                      class="text-center p-4 font-semibold text-gray-700 dark:text-gray-200 w-1/4"
                    >
                      Ronde {{ ronde.ronde }}
                      <div
                        class="text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        {{ ronde.waktuMulai }} - {{ ronde.waktuSelesai }}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="ruang in ruangOKList"
                    :key="ruang.id"
                    class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-4 h-4 rounded-full"
                          :style="{ backgroundColor: ruang.color }"
                        />
                        <div>
                          <p
                            class="font-semibold text-gray-800 dark:text-gray-100"
                          >
                            {{ ruang.nama }}
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            Kapasitas: {{ ruang.kapasitasRonde }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td
                      v-for="ronde in rondeConfig"
                      :key="ronde.ronde"
                      class="p-4 align-top"
                    >
                      <div class="space-y-2">
                        <div
                          v-for="j in jadwalList.filter(
                            (j) =>
                              j.ruangOK === ruang.kode
                              && j.ronde === ronde.ronde
                              && j.tanggal === selectedDate
                              && j.status !== 'batal'
                          )"
                          :key="j.id"
                          class="bg-white dark:bg-gray-900 border-l-4 border border-gray-200 dark:border-gray-700 p-2 rounded shadow-sm text-xs cursor-pointer hover:shadow-md dark:hover:shadow-gray-800 transition-all"
                          :style="{ borderLeftColor: ruang.color }"
                          @click="editJadwal(j)"
                        >
                          <div class="flex justify-between items-center mb-1">
                            <span
                              class="font-semibold text-gray-800 dark:text-gray-100"
                            >
                              {{ formatWaktu(j.start) }}
                            </span>

                            <UBadge
                              :color="getStatusColor(j.status)"
                              size="xs"
                              variant="soft"
                            >
                              {{ j.status }}
                            </UBadge>
                          </div>

                          <p
                            class="truncate font-medium text-gray-800 dark:text-gray-100"
                          >
                            {{ j.pasien }}
                          </p>

                          <p class="truncate text-gray-500 dark:text-gray-400">
                            {{ j.tindakan }}
                          </p>

                          <div
                            class="mt-1 flex items-center gap-1 text-gray-400 dark:text-gray-500"
                          >
                            <UIcon
                              name="i-heroicons-clock"
                              class="w-3 h-3"
                            />
                            <span>{{ j.estimasiDurasi }}m</span>
                          </div>
                        </div>

                        <!-- Slot Kosong -->
                        <div
                          v-if="
                            getSlotRonde(ruang.kode, selectedDate, ronde.ronde)
                              ?.jumlahJadwal === 0
                          "
                          class="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded p-4 text-center text-gray-400 dark:text-gray-500 text-xs"
                        >
                          <UIcon
                            name="i-heroicons-plus"
                            class="w-5 h-5 mx-auto mb-1"
                          />
                          Slot Tersedia
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </UCard>
        </div>
      </template>

      <!-- TAB: FORM INPUT -->
      <template #form>
        <div class="space-y-6">
          <UCard class="shadow-xl">
            <!-- ================= HEADER ================= -->
            <template #header>
              <div class="flex items-start gap-4">
                <!-- Icon -->
                <div
                  class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  :class="
                    isEditMode
                      ? 'bg-warning/10 text-warning'
                      : 'bg-primary/10 text-primary'
                  "
                >
                  <UIcon
                    :name="
                      isEditMode
                        ? 'i-heroicons-pencil-square'
                        : 'i-heroicons-plus'
                    "
                    class="w-6 h-6"
                  />
                </div>

                <!-- Title -->
                <div class="flex-1">
                  <h3 class="text-xl font-semibold text-default leading-tight">
                    {{
                      isEditMode ? "Edit Jadwal Operasi" : "Tambah Jadwal Baru"
                    }}
                  </h3>

                  <p class="text-sm text-muted mt-1">
                    {{
                      isEditMode
                        ? "Modifikasi data operasi yang sudah terjadwal"
                        : "Input jadwal operasi baru dengan plotting otomatis"
                    }}
                  </p>
                </div>
              </div>
            </template>

            <!-- ================= CONTENT ================= -->
            <div class="space-y-8">
              <!-- INFORMASI PASIEN -->
              <div class="space-y-4">
                <h4
                  class="text-sm font-semibold text-muted uppercase tracking-wider"
                >
                  Informasi Pasien
                </h4>

                <div class="grid md:grid-cols-2 gap-6">
                  <UFormGroup
                    label="Nama Pasien"
                    required
                  >
                    <UInput
                      v-model="form.pasien"
                      placeholder="Nama lengkap pasien"
                      icon="i-heroicons-user"
                      size="lg"
                    />
                  </UFormGroup>

                  <UFormGroup label="Nomor RM">
                    <UInput
                      v-model="form.noRM"
                      placeholder="Nomor Rekam Medis"
                      icon="i-heroicons-identification"
                      size="lg"
                    />
                  </UFormGroup>
                </div>
              </div>

              <!-- TIM OPERASI -->
              <div class="space-y-4">
                <h4
                  class="text-sm font-semibold text-muted uppercase tracking-wider"
                >
                  Tim Operasi
                </h4>

                <div class="grid md:grid-cols-2 gap-6">
                  <UFormGroup
                    label="Operator (Dokter)"
                    required
                  >
                    <USelectMenu
                      v-model="form.operator"
                      :options="[
                        'Dr. Ahmad',
                        'Dr. Budi',
                        'Dr. Citra',
                        'Dr. Diana',
                        'Dr. Eko'
                      ]"
                      placeholder="Pilih dokter operator"
                      icon="i-heroicons-user-circle"
                      size="lg"
                    />
                  </UFormGroup>

                  <UFormGroup label="Asisten">
                    <UInput
                      v-model="form.asisten"
                      placeholder="Nama asisten/PPA"
                      icon="i-heroicons-users"
                      size="lg"
                    />
                  </UFormGroup>
                </div>
              </div>

              <!-- DETAIL TINDAKAN -->
              <div class="space-y-4">
                <h4
                  class="text-sm font-semibold text-muted uppercase tracking-wider"
                >
                  Detail Tindakan
                </h4>

                <div class="grid md:grid-cols-2 gap-6">
                  <UFormGroup
                    label="Tindakan Operasi"
                    required
                  >
                    <USelectMenu
                      v-model="form.tindakan"
                      :options="[
                        'Appendektomi',
                        'Herniorafi',
                        'Laparoskopi',
                        'Mastektomi',
                        'Thyroidectomy',
                        'Lainnya'
                      ]"
                      placeholder="Pilih tindakan"
                      icon="i-heroicons-clipboard-document-list"
                      size="lg"
                    />
                  </UFormGroup>

                  <UFormGroup label="ID SiKompas">
                    <UInput
                      v-model="form.sikompasId"
                      placeholder="Auto-generate jika kosong"
                      icon="i-heroicons-link"
                      size="lg"
                    >
                      <template #trailing>
                        <UBadge
                          color="primary"
                          variant="soft"
                          size="xs"
                        >
                          SiKompas
                        </UBadge>
                      </template>
                    </UInput>
                  </UFormGroup>
                </div>
              </div>

              <!-- PLOTTING -->
              <div
                class="bg-muted/40 border border-default rounded-2xl p-6 space-y-6"
              >
                <h4
                  class="text-sm font-semibold text-muted uppercase tracking-wider"
                >
                  Plotting Ruang & Waktu
                </h4>

                <div class="grid md:grid-cols-4 gap-6">
                  <UFormGroup
                    label="Tanggal"
                    required
                  >
                    <UInput
                      v-model="form.tanggal"
                      type="date"
                      size="lg"
                    />
                  </UFormGroup>

                  <UFormGroup
                    label="Ruang OK"
                    required
                  >
                    <USelectMenu
                      v-model="form.ruangOK"
                      :options="
                        ruangOKList
                          .filter((r) => r.isActive)
                          .map((r) => ({ label: r.nama, value: r.kode }))
                      "
                      placeholder="Pilih ruang"
                      size="lg"
                    />
                  </UFormGroup>

                  <UFormGroup label="Ronde">
                    <USelectMenu
                      v-model="form.ronde"
                      :options="
                        rondeConfig.map((r) => ({
                          label: `Ronde ${r.ronde}`,
                          value: r.ronde
                        }))
                      "
                      size="lg"
                    />
                  </UFormGroup>

                  <UFormGroup label="Estimasi (menit)">
                    <UInput
                      v-model.number="form.estimasiDurasi"
                      type="number"
                      min="30"
                      step="30"
                      size="lg"
                    />
                  </UFormGroup>
                </div>
              </div>

              <!-- WAKTU -->
              <div class="grid md:grid-cols-2 gap-6">
                <UFormGroup
                  label="Jam Mulai"
                  required
                >
                  <UInput
                    v-model="form.jamMulai"
                    type="time"
                    size="lg"
                  />
                </UFormGroup>

                <UFormGroup label="Prediksi Selesai">
                  <UInput
                    :model-value="prediksiSelesai"
                    disabled
                    icon="i-heroicons-calculator"
                  />
                </UFormGroup>
              </div>
            </div>

            <!-- ================= FOOTER ================= -->
            <template #footer>
              <div
                class="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
              >
                <UButton
                  v-if="isEditMode && selectedEvent"
                  color="error"
                  variant="soft"
                  icon="i-heroicons-trash"
                >
                  Batalkan Jadwal
                </UButton>

                <div class="flex gap-3 justify-end">
                  <UButton
                    variant="soft"
                    color="neutral"
                  >
                    Reset
                  </UButton>

                  <UButton
                    v-if="isEditMode"
                    color="primary"
                    icon="i-heroicons-check"
                  >
                    Update Jadwal
                  </UButton>

                  <UButton
                    v-else
                    color="primary"
                    icon="i-heroicons-plus"
                  >
                    Simpan Jadwal
                  </UButton>
                </div>
              </div>
            </template>
          </UCard>
        </div>
      </template>

      <!-- TAB: SIKOMPAS -->
      <template #sikompas>
        <div class="space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">
                    Integrasi SiKompas
                  </h3>
                  <p class="text-sm text-gray-500">
                    Sistem Komputerisasi Pelaporan dan Administrasi Operasi
                    Sentral
                  </p>
                </div>
                <UBadge
                  color="primary"
                  size="lg"
                >
                  Terhubung
                </UBadge>
              </div>
            </template>

            <div class="grid md:grid-cols-3 gap-6">
              <UCard
                class="bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-blue-700"
              >
                <div class="text-center">
                  <UIcon
                    name="i-heroicons-clock"
                    class="w-12 h-12 text-blue-500 mx-auto mb-3"
                  />
                  <h4 class="font-semibold text-gray-900">
                    Real-time Tracking
                  </h4>
                  <p class="text-sm text-gray-600 mt-2">
                    Monitoring durasi operasi aktual vs estimasi
                  </p>
                  <div class="mt-4 text-2xl font-bold text-blue-600">
                    {{ jadwalList.filter((j) => j.status === "proses").length }}
                    <span class="text-sm font-normal text-gray-500">operasi berlangsung</span>
                  </div>
                </div>
              </UCard>

              <UCard
                class="bg-linear-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:border-green-700"
              >
                <div class="text-center">
                  <UIcon
                    name="i-heroicons-chart-bar"
                    class="w-12 h-12 text-green-500 mx-auto mb-3"
                  />
                  <h4 class="font-semibold text-gray-900">
                    Efisiensi Waktu
                  </h4>
                  <p class="text-sm text-gray-600 mt-2">
                    Analisis utilization ruang OK
                  </p>
                  <div class="mt-4 text-2xl font-bold text-green-600">
                    87%
                    <span class="text-sm font-normal text-gray-500">rata-rata</span>
                  </div>
                </div>
              </UCard>

              <UCard
                class="bg-linear-to-br from-purple-50 to-pink-50 border-purple-200 dark:from-purple-900/30 dark:to-pink-900/30 dark:border-purple-700"
              >
                <div class="text-center">
                  <UIcon
                    name="i-heroicons-document-text"
                    class="w-12 h-12 text-purple-500 mx-auto mb-3"
                  />
                  <h4 class="font-semibold text-gray-900">
                    Laporan Otomatis
                  </h4>
                  <p class="text-sm text-gray-600 mt-2">
                    Generate Laporan Operasi Harian
                  </p>
                  <UButton
                    size="sm"
                    color="info"
                    variant="soft"
                    class="mt-4"
                    block
                  >
                    Download Laporan
                  </UButton>
                </div>
              </UCard>
            </div>

            <!-- Tabel Monitoring Real-time -->
            <div class="mt-6">
              <h4 class="font-semibold mb-4">
                Monitoring Operasi Berlangsung
              </h4>
              <UTable
                :rows="operasiBerlangsungRows"
                :columns="operasiBerlangsungColumns"
              >
                <!-- <template
                    #start-data="{
                      row
                    }: {
                      row: JadwalOperasi & { durasi: number };
                    }"
                  >
                    {{ formatWaktu(row.start) }}
                  </template> -->
                <!-- <template
                    #durasi-data="{
                      row
                    }: {
                      row: JadwalOperasi & { durasi: number };
                    }"
                  >
                    <UBadge
                      :color="
                        row.durasi > row.estimasiDurasi ? 'error' : 'success'
                      "
                      variant="soft"
                    >
                      {{ row.durasi }} / {{ row.estimasiDurasi }}
                    </UBadge>
                  </template> -->
                <!-- <template
                    #actions-data="{
                      row
                    }: {
                      row: JadwalOperasi & { durasi: number };
                    }"
                  >
                    <UButton
                      size="xs"
                      color="success"
                      icon="i-heroicons-check"
                      @click="selesaiOperasi(row.id)"
                    >
                      Selesai
                    </UButton>
                  </template> -->
              </UTable>
            </div>
          </UCard>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<style scoped>
:deep(.fc) {
  font-family: "Inter", sans-serif;
}

:deep(.fc-event) {
  border-radius: 8px;
  border: none;
  font-size: 0.85rem;
  padding: 4px 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.fc-timegrid-slot) {
  height: 50px !important;
}

:deep(.fc-button-primary) {
  background-color: rgb(var(--color-primary-600));
  border-color: rgb(var(--color-primary-600));
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
}

:deep(.fc-button-primary:hover) {
  background-color: rgb(var(--color-primary-700));
  border-color: rgb(var(--color-primary-700));
}

:deep(.fc-button-active) {
  background-color: rgb(var(--color-primary-800)) !important;
  border-color: rgb(var(--color-primary-800)) !important;
}

:deep(.fc-col-header-cell) {
  padding: 12px;
  font-weight: 600;
  background-color: rgb(var(--color-gray-50));
}

:deep(.fc-timegrid-axis) {
  font-weight: 500;
  color: rgb(var(--color-gray-600));
}
</style>
