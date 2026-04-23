<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Data pasien
const patientData = ref({
  name: 'Ahmad Wijaya',
  mrn: 'MRN001234',
  procedure: 'Laparotomi',
  date: '2024-01-20',
  time: '08:00 WIB',
  status: 'Menunggu Verifikasi'
})

// Checklist dokumen
const checklist = ref([
  { id: 1, label: 'Informed Consent telah ditandatangani', checked: false },
  { id: 2, label: 'Asesmen Pra-Bedah lengkap', checked: false },
  { id: 3, label: 'Digital Marker Site terverifikasi', checked: false },
  { id: 4, label: 'Hasil Laboratorium tersedia', checked: false },
  { id: 5, label: 'Hasil Imaging (Rontgen/CT/MRI)', checked: false }
])

// Status logistik
const logistics = ref([
  {
    id: 'blood',
    icon: 'i-heroicons-beaker',
    title: 'Ketersediaan Darah',
    status: 'available',
    description: '4 kantong tersedia',
    color: 'emerald'
  },
  {
    id: 'pharmacy',
    icon: 'i-heroicons-capsule',
    title: 'Farmasi & Obat',
    status: 'available',
    description: 'Semua item tersedia',
    color: 'emerald'
  },
  {
    id: 'equipment',
    icon: 'i-heroicons-cube',
    title: 'Alat Medis',
    status: 'warning',
    description: '1 item pending sterilisasi',
    color: 'amber'
  },
  {
    id: 'icu',
    icon: 'i-heroicons-building-office',
    title: 'Slot ICU/HCU',
    status: 'available',
    description: '2 bed ICU tersedia',
    color: 'emerald'
  }
])

const allChecked = computed(() => {
  return checklist.value.every(item => item.checked)
})

const checkedCount = computed(() => {
  return checklist.value.filter(item => item.checked).length
})

const progressPercentage = computed(() => {
  return (checkedCount.value / checklist.value.length) * 100
})

const resetChecklist = () => {
  checklist.value.forEach(item => (item.checked = false))
}

const verifyComplete = () => {
  if (!allChecked.value) {
    alert('Harap checklist semua dokumen terlebih dahulu')
    return
  }
  patientData.value.status = 'Terverifikasi'
  alert('Verifikasi berhasil!')
}
</script>

<template>
  <div
    class="min-h-full bg-slate-50 dark:bg-slate-950 p-6 space-y-6 transition-colors duration-300"
  >
    <!-- Header Card dengan Glassmorphism -->
    <UCard
      class="rounded-2xl shadow-sm border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm dark:border dark:border-slate-800"
      :ui="{ body: 'p-6' }"
    >
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/25"
          >
            <span class="text-xl font-bold">AW</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
              {{ patientData.name }}
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              MRN: {{ patientData.mrn }} • {{ patientData.procedure }}
            </p>
          </div>
        </div>

        <div class="text-left sm:text-right">
          <div class="flex items-center gap-2 text-slate-900 dark:text-white">
            <UIcon
              name="i-heroicons-calendar"
              class="w-4 h-4 text-slate-400"
            />
            <span class="font-medium">{{ patientData.date }}</span>
          </div>
          <div
            class="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1"
          >
            <UIcon
              name="i-heroicons-clock"
              class="w-4 h-4"
            />
            <span class="text-sm">{{ patientData.time }}</span>
          </div>
          <UBadge
            :color="
              patientData.status === 'Terverifikasi' ? 'success' : 'warning'
            "
            variant="subtle"
            class="mt-2"
          >
            {{ patientData.status }}
          </UBadge>
        </div>
      </div>
    </UCard>

    <!-- Progress Bar -->
    <div
      class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-4 dark:border dark:border-slate-800"
    >
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Progress Verifikasi</span>
        <span class="text-sm font-bold text-primary-600 dark:text-primary-400">{{ Math.round(progressPercentage) }}%</span>
      </div>
      <div
        class="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
      >
        <div
          class="h-full bg-linear-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out rounded-full"
          :style="{ width: `${progressPercentage}%` }"
        />
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
        {{ checkedCount }} dari {{ checklist.length }} dokumen telah
        diverifikasi
      </p>
    </div>

    <!-- Checklist Dokumen -->
    <UCard
      class="rounded-2xl shadow-sm border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm dark:border dark:border-slate-800"
      :ui="{ body: 'p-6' }"
    >
      <div class="flex items-center gap-3 mb-6">
        <div
          class="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
        >
          <UIcon
            name="i-heroicons-clipboard-document-check"
            class="w-5 h-5"
          />
        </div>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
          Checklist Kelengkapan Dokumen
        </h2>
      </div>

      <div class="space-y-2">
        <div
          v-for="item in checklist"
          :key="item.id"
          class="group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border border-transparent"
          :class="[
            item.checked
              ? 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
              : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
          ]"
          @click="item.checked = !item.checked"
        >
          <!-- Animated Checkbox -->
          <div
            class="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 border-2"
            :class="
              item.checked
                ? 'bg-emerald-500 border-emerald-500 scale-110'
                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-emerald-400'
            "
          >
            <UIcon
              v-if="item.checked"
              name="i-heroicons-check"
              class="w-4 h-4 text-white"
            />
          </div>

          <div class="flex-1">
            <span
              class="text-sm font-medium transition-colors duration-200"
              :class="
                item.checked
                  ? 'text-emerald-700 dark:text-emerald-400 line-through'
                  : 'text-slate-700 dark:text-slate-300'
              "
            >
              {{ item.label }}
            </span>
          </div>

          <UIcon
            v-if="item.checked"
            name="i-heroicons-check-circle"
            class="w-5 h-5 text-emerald-500"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700"
      >
        <UButton
          variant="soft"
          color="neutral"
          @click="resetChecklist"
        >
          Reset
        </UButton>
        <UButton
          color="success"
          :disabled="!allChecked"
          :class="{ 'opacity-50 cursor-not-allowed': !allChecked }"
          class="gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
          @click="verifyComplete"
        >
          <UIcon
            name="i-heroicons-check-circle"
            class="w-5 h-5"
          />
          Verifikasi Lengkap
        </UButton>
      </div>
    </UCard>

    <!-- Status Logistik -->
    <UCard
      class="rounded-2xl shadow-sm border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm dark:border dark:border-slate-800"
      :ui="{ body: 'p-6' }"
    >
      <div class="flex items-center gap-3 mb-6">
        <div
          class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        >
          <UIcon
            name="i-heroicons-cube"
            class="w-5 h-5"
          />
        </div>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
          Status Logistik & Ketersediaan
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="item in logistics"
          :key="item.id"
          class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            :class="{
              'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400':
                item.color === 'emerald',
              'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400':
                item.color === 'amber'
            }"
          >
            <UIcon
              :name="item.icon"
              class="w-6 h-6"
            />
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-slate-900 dark:text-slate-200">
                {{ item.title }}
              </h3>
              <UIcon
                :name="
                  item.status === 'available'
                    ? 'i-heroicons-check-circle'
                    : 'i-heroicons-exclamation-triangle'
                "
                :class="{
                  'text-emerald-500': item.status === 'available',
                  'text-amber-500': item.status === 'warning'
                }"
                class="w-5 h-5"
              />
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Info Banner -->
      <div
        class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-start gap-3 border border-blue-200 dark:border-blue-800"
      >
        <UIcon
          name="i-heroicons-information-circle"
          class="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5"
        />
        <p class="text-sm text-blue-700 dark:text-blue-300">
          Semua logistik harus tersedia sebelum pasien dapat dipindahkan ke area
          IBP.
        </p>
      </div>
    </UCard>
  </div>
</template>
