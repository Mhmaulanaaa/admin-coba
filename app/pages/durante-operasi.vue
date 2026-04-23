<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Data pasien dan operasi
const patientData = {
  name: 'Ahmad Wijaya',
  mrn: 'MRN001234',
  procedure: 'Laparotomi',
  room: 'OK 1',
  status: 'Operasi Berlangsung'
}

// Data tim operasi
const surgicalTeam = [
  {
    role: 'Operator',
    name: 'Dr. Budi Santoso, Sp.B',
    icon: '👨‍⚕️'
  },
  {
    role: 'Anestesi',
    name: 'Dr. Andi Wijaya, Sp.An',
    icon: '💉'
  },
  {
    role: 'Perawat Instrumen',
    name: 'Ns. Siti Aminah',
    icon: '🏥'
  },
  {
    role: 'Perawat Sirkuler',
    name: 'Ns. Dewi Lestari',
    icon: '👩‍⚕️'
  }
]

// State untuk checklist
const checklistStatus = ref({
  signIn: false,
  timeOut: false,
  signOut: false
})

const signInTime = ref('')
const timeOutTime = ref('')
const signOutTime = ref('')

const recordTime = (type: 'signIn' | 'timeOut' | 'signOut') => {
  const now = new Date()
  const dateTimeString = now.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  if (type === 'signIn') signInTime.value = dateTimeString
  if (type === 'timeOut') timeOutTime.value = dateTimeString
  if (type === 'signOut') signOutTime.value = dateTimeString

  checklistStatus.value[type] = true
}

const editTime = (type: 'signIn' | 'timeOut' | 'signOut') => {
  checklistStatus.value[type] = false
  if (type === 'signIn') signInTime.value = ''
  if (type === 'timeOut') timeOutTime.value = ''
  if (type === 'signOut') signOutTime.value = ''
}

const insisiTime = ref('')
const pembiusanTime = ref('')
const insisiStatus = ref(false)
const pembiusanStatus = ref(false)

const getDateTimeString = () => {
  const now = new Date()
  return now.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const recordInsisi = () => {
  insisiTime.value = getDateTimeString()
  insisiStatus.value = true
}

const editInsisi = () => {
  insisiStatus.value = false
  insisiTime.value = ''
}

const recordPembiusan = () => {
  pembiusanTime.value = getDateTimeString()
  pembiusanStatus.value = true
}

const editPembiusan = () => {
  pembiusanStatus.value = false
  pembiusanTime.value = ''
}
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 space-y-6 transition-colors duration-300"
  >
    <!-- Header Card -->
    <div
      class="bg-emerald-500 dark:bg-emerald-600 rounded-2xl p-6 text-white shadow-lg"
    >
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold mb-1">
            {{ patientData.name }}
          </h1>
          <p class="text-emerald-100 text-sm">
            MRN: {{ patientData.mrn }} • {{ patientData.procedure }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-emerald-100 text-sm mb-1">
            Ruang
          </p>
          <p class="text-3xl text-white font-bold">
            {{ patientData.room }}
          </p>
          <span
            class="inline-block mt-2 px-3 py-1 bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium backdrop-blur-sm"
          >
            {{ patientData.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- WHO Safety Checklist Section -->
    <div>
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        WHO Safety Checklist
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Sign In -->
        <div
          class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
        >
          <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-1">
            Sign In
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Verifikasi identitas & prosedur
          </p>

          <div v-if="!checklistStatus.signIn">
            <button
              class="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 active:scale-95"
              @click="recordTime('signIn')"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Catat Sekarang
            </button>
          </div>

          <div
            v-else
            class="flex items-center justify-between"
          >
            <span
              class="text-lg font-medium text-emerald-600 dark:text-emerald-400"
            >{{ signInTime }}</span>
            <button
              class="py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 active:scale-95"
              @click="editTime('signIn')"
            >
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </button>
          </div>
        </div>

        <!-- Time Out -->
        <div
          class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
        >
          <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-1">
            Time Out
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Konfirmasi tim & persiapan
          </p>

          <div v-if="!checklistStatus.timeOut">
            <button
              class="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 active:scale-95"
              @click="recordTime('timeOut')"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Catat Sekarang
            </button>
          </div>

          <div
            v-else
            class="flex items-center justify-between"
          >
            <span
              class="text-lg font-medium text-emerald-600 dark:text-emerald-400"
            >{{ timeOutTime }}</span>
            <button
              class="py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 active:scale-95"
              @click="editTime('timeOut')"
            >
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </button>
          </div>
        </div>

        <!-- Sign Out -->
        <div
          class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
        >
          <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-1">
            Sign Out
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Review akhir prosedur
          </p>

          <div v-if="!checklistStatus.signOut">
            <button
              class="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 active:scale-95"
              @click="recordTime('signOut')"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Catat Sekarang
            </button>
          </div>

          <div
            v-else
            class="flex items-center justify-between"
          >
            <span
              class="text-lg font-medium text-emerald-600 dark:text-emerald-400"
            >{{ signOutTime }}</span>
            <button
              class="py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 active:scale-95"
              @click="editTime('signOut')"
            >
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Verification Section -->
    <div>
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Verifikasi Tim Operasi
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(member, index) in surgicalTeam"
          :key="index"
          class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div
            class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              {{ member.role }}
            </p>
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {{ member.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Tracking Section (Waktu Insisi & Pembiusan) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Waktu Insisi -->
      <div
        class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-1">
          Waktu Insisi
        </h3>

        <div
          v-if="!insisiStatus"
          class="flex flex-col items-center text-center"
        >
          <div
            class="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mb-3"
          >
            <svg
              class="w-8 h-8 text-amber-500 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Waktu insisi belum tercatat
          </p>
          <button
            class="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 active:scale-95"
            @click="recordInsisi"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Catat Sekarang
          </button>
        </div>

        <div
          v-else
          class="flex flex-col items-center text-center"
        >
          <div
            class="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-3"
          >
            <svg
              class="w-8 h-8 text-emerald-500 dark:text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p
            class="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4"
          >
            {{ insisiTime }}
          </p>
          <button
            class="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 active:scale-95"
            @click="editInsisi"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </button>
        </div>
      </div>

      <!-- Waktu Pembiusan -->
      <div
        class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-1">
          Waktu Pembiusan
        </h3>

        <div
          v-if="!pembiusanStatus"
          class="flex flex-col items-center text-center"
        >
          <div
            class="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mb-3"
          >
            <svg
              class="w-8 h-8 text-amber-500 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Waktu pembiusan belum tercatat
          </p>
          <button
            class="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 active:scale-95"
            @click="recordPembiusan"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Catat Sekarang
          </button>
        </div>

        <div
          v-else
          class="flex flex-col items-center text-center"
        >
          <div
            class="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-3"
          >
            <svg
              class="w-8 h-8 text-emerald-500 dark:text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p
            class="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4"
          >
            {{ pembiusanTime }}
          </p>
          <button
            class="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 active:scale-95"
            @click="editPembiusan"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
