<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Data form
const form = ref({
  // Diagnosis
  preOperativeDiagnosis: '',
  intraOperativeDiagnosis: '',
  icd10: '',

  // Anestesi
  preMedication: '',
  anesthesiaType: 'GA',
  anesthesiaMaterial: '',
  intubation: 'Tidak',
  extubation: 'Tidak',

  // Pembedahan
  startDate: '',
  endDate: '',
  surgeryType: '',
  operationClass: 'Sedang',
  urgency: 'Elektif',
  procedureDescription: '',
  icd9cm: '',

  // Team
  team: [
    {
      name: 'TARMONO Sp.U-K | 196206041988121002',
      ppds: '-',
      role: 'Dokter Operator'
    },
    {
      name: 'NUR AMALIYAH | 199701052025212028',
      ppds: '-',
      role: 'Perawat Instrumen'
    },
    {
      name: 'HENDRO SUBAGIYO | 197607132007011009',
      ppds: '-',
      role: 'Perawat Sirkulator 1'
    }
  ],

  // Details
  round: 'Ronde 1',
  operatingRoom: 'OK 100 - OK 100 - 002',
  preOpNotes: 'tidak ada',
  prophylaxis: 'IC SM (+)',
  position: 'supine',
  desinfection: 'povidone iodine 10%',
  incision: 'sesuai ts bedah umum',
  explorationFindings: '',
  procedureDetails: '',
  operationName: 'Evaluasi zona 2 dan 3',
  complications: 'tidak ada',
  closure: 'sesuai TS bedah umum',
  implant: 'Tidak Ada',
  implantNumber: '',
  tissueSend: 'sesuai ts anestesi',
  specimenDestination: '',
  operationResult: 'operasi selesai',
  postOpInstructions: 'sesuai ts bedah umum',
  patientEvaluation: 'Tidak',
  saveAsTemplate: 'Tidak'
})

const anesthesiaTypes = ['GA', 'Lokal']
const yesNoOptions = ['Ya', 'Tidak']
const operationClasses = ['Sedang', 'Besar', 'Kecil']
const urgencyOptions = ['Elektif', 'Emergensi']
const roundOptions = ['Ronde 1', 'Ronde 2', 'Ronde 3']

const saveDraft = () => {
  console.log('Draft saved', form.value)
}

const saveFinal = () => {
  console.log('Final saved', form.value)
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
      <h1 class="text-2xl font-bold">
        Laporan Operasi
      </h1>
      <p class="text-emerald-100 text-sm mt-1">
        Formulir dokumentasi prosedur operasi
      </p>
    </div>

    <!-- Diagnosis Section -->
    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <h2
        class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2"
      >
        <span
          class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold"
        >1</span>
        Diagnosis
      </h2>

      <div class="grid grid-cols-1 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >A. Pre operasi (preoperative diagnosis)</label>
          <textarea
            v-model="form.preOperativeDiagnosis"
            rows="2"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
            placeholder="Internal bleeding transient respond to resuscitation, Suspek trauma renal D, perforasi hollow organ"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >B. Durante operasi (Intraoperative diagnosis)</label>
          <textarea
            v-model="form.intraOperativeDiagnosis"
            rows="2"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >ICD-10</label>
          <select
            v-model="form.icd10"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
            <option value="">
              Pilih kode ICD10
            </option>
          </select>
        </div>
      </div>

      <!-- ICD Tag -->
      <div class="flex items-center gap-2 mt-3">
        <span
          class="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-medium border border-emerald-200 dark:border-emerald-800"
        >S37.0 : Injury of kidney</span>
        <button
          class="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
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
        </button>
        <button
          class="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Anestesi Section -->
    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <h2
        class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2"
      >
        <span
          class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold"
        >2</span>
        Anestesi
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Pre Medikasi</label>
          <input
            v-model="form.preMedication"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
            placeholder="sesuai ts anestesi"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Jenis</label>
          <div class="flex gap-2">
            <button
              v-for="type in anesthesiaTypes"
              :key="type"
              :class="[
                'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
                form.anesthesiaType === type
                  ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              ]"
              @click="form.anesthesiaType = type"
            >
              {{ type }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Bahan</label>
          <input
            v-model="form.anesthesiaMaterial"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
            placeholder="sesuai ts anestesi"
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >Intubasi</label>
            <div class="flex gap-2">
              <button
                v-for="opt in yesNoOptions"
                :key="opt"
                :class="[
                  'flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all',
                  form.intubation === opt
                    ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                ]"
                @click="form.intubation = opt"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >Ektubasi</label>
            <div class="flex gap-2">
              <button
                v-for="opt in yesNoOptions"
                :key="opt"
                :class="[
                  'flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all',
                  form.extubation === opt
                    ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                ]"
                @click="form.extubation = opt"
              >
                {{ opt }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pembedahan Section -->
    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <h2
        class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2"
      >
        <span
          class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold"
        >3</span>
        Pembedahan
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Tanggal Mulai*</label>
          <input
            v-model="form.startDate"
            type="datetime-local"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Tanggal Selesai*</label>
          <input
            v-model="form.endDate"
            type="datetime-local"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Macam Operasi</label>
          <select
            v-model="form.surgeryType"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
            <option value="">
              Bersih Kontaminasi
            </option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Golongan Operasi</label>
          <select
            v-model="form.operationClass"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
            <option
              v-for="opt in operationClasses"
              :key="opt"
              :value="opt"
            >
              {{ opt }}
            </option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Urgensi Operasi</label>
          <select
            v-model="form.urgency"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
            <option
              v-for="opt in urgencyOptions"
              :key="opt"
              :value="opt"
            >
              {{ opt }}
            </option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Tindakan Operasi</label>
          <textarea
            v-model="form.procedureDescription"
            rows="2"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
            placeholder="Evaluasi zona 2 dan 3"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >ICD9CM</label>
          <select
            v-model="form.icd9cm"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
            <option value="">
              ICD9CM
            </option>
          </select>
        </div>
      </div>

      <!-- ICD9CM Tag -->
      <div class="flex items-center gap-2 mt-3">
        <span
          class="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-medium border border-emerald-200 dark:border-emerald-800"
        >54.11 : Exploratory laparotomy</span>
        <button
          class="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
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
        </button>
        <button
          class="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <!-- Add Team Button -->
      <button
        class="mt-4 bg-emerald-500 dark:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        Tambah Pelaksana
      </button>

      <!-- Team Table -->
      <div
        class="mt-4 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
      >
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Nama Pelaksana
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Nama PPDS Pelaksana
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Posisi
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800"
          >
            <tr
              v-for="(member, index) in form.team"
              :key="index"
              class="hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">
                {{ member.name }}
              </td>
              <td class="px-4 py-3 text-slate-500 dark:text-slate-400">
                {{ member.ppds }}
              </td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">
                {{ member.role }}
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-center gap-2">
                  <button
                    class="p-1.5 bg-amber-400 dark:bg-amber-500 text-white rounded-lg hover:bg-amber-500 dark:hover:bg-amber-600 transition-colors"
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
                  </button>
                  <button
                    class="p-1.5 bg-rose-500 dark:bg-rose-600 text-white rounded-lg hover:bg-rose-600 dark:hover:bg-rose-700 transition-colors"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Detail Operasi Section -->
    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <h2
        class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2"
      >
        <span
          class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold"
        >4</span>
        Detail Operasi
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Ronde</label>
          <select
            v-model="form.round"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
            <option
              v-for="opt in roundOptions"
              :key="opt"
              :value="opt"
            >
              {{ opt }}
            </option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Kamar Operasi</label>
          <select
            v-model="form.operatingRoom"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
            <option value="OK 100 - OK 100 - 002">
              OK 100 - OK 100 - 002
            </option>
          </select>
        </div>
      </div>

      <!-- Numbered Fields -->
      <div class="space-y-4">
        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Catatan Operator pre Operasi*</label>
          <textarea
            v-model="form.preOpNotes"
            rows="2"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >1. Persiapan operasi (Profilaksis, Inform Consent)*</label>
          <textarea
            v-model="form.prophylaxis"
            rows="2"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >2. Posisi Badan*</label>
          <input
            v-model="form.position"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >3. Desinfeksi*</label>
          <input
            v-model="form.desinfection"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >4. Insisi kulit dan pembukaan lapangan operasi*</label>
          <input
            v-model="form.incision"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >5. Pendapatan pada eksplorasi (Procedure findings)*</label>
          <textarea
            v-model="form.explorationFindings"
            rows="3"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
            placeholder="Melanjutkan Operasi TS Digestif..."
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >6. Deskripsi / Uraian Operasi (Procedure performed and
            description)*</label>
          <textarea
            v-model="form.procedureDetails"
            rows="3"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
            placeholder="Melanjutkan Operasi TS Digestif..."
          />
        </div>

        <!-- Upload Photo -->
        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Upload Foto / Video Uraian Operasi</label>
          <input
            type="file"
            class="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 dark:file:bg-emerald-900/50 file:text-emerald-700 dark:file:text-emerald-400 hover:file:bg-emerald-100 dark:hover:file:bg-emerald-900"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >7. Apa yang dikerjakan, Nama Operasi (Name of Operation)*</label>
          <input
            v-model="form.operationName"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >8. Komplikasi / Complications*</label>
          <textarea
            v-model="form.complications"
            rows="2"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >9. Penutupan lapangan operasi*</label>
          <input
            v-model="form.closure"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <!-- Implant Section -->
        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >10. No. Registrasi Implant (registry number of implantable
            devices)*</label>
          <div class="flex gap-2 mb-2">
            <button
              v-for="opt in ['Ada', 'Tidak Ada']"
              :key="opt"
              :class="[
                'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
                form.implant === opt
                  ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              ]"
              @click="form.implant = opt"
            >
              {{ opt }}
            </button>
          </div>
          <input
            v-if="form.implant === 'Ada'"
            v-model="form.implantNumber"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
            placeholder="Nomor registrasi implant"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >11. Jaringan yang dikirim ke lab. Patologi*</label>
          <input
            v-model="form.tissueSend"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >12. Pengiriman jaringan operasi, Berupa*</label>
            <input
              v-model="form.specimenDestination"
              type="text"
              class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
              placeholder="tidak ada"
            >
          </div>
          <div>
            <label
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >Kemana :</label>
            <input
              type="text"
              class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
            >
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >13. Hasil Operasi*</label>
          <input
            v-model="form.operationResult"
            type="text"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          >
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >14. Instruksi Post Operasi</label>
          <textarea
            v-model="form.postOpInstructions"
            rows="2"
            class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
          />
        </div>
      </div>
    </div>

    <!-- Footer Options -->
    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <h2
        class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2"
      >
        <span
          class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold"
        >5</span>
        Konfirmasi
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Evaluasi Pasien</label>
          <div class="flex gap-2">
            <button
              v-for="opt in ['Ya', 'Tidak']"
              :key="opt"
              :class="[
                'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
                form.patientEvaluation === opt
                  ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              ]"
              @click="form.patientEvaluation = opt"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Apakah Laporan Operasi ini Dijadikan Template?</label>
          <div class="flex gap-2">
            <button
              v-for="opt in ['Ya', 'Tidak']"
              :key="opt"
              :class="[
                'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
                form.saveAsTemplate === opt
                  ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              ]"
              @click="form.saveAsTemplate = opt"
            >
              {{ opt }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3">
      <button
        class="px-6 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        Kembali
      </button>
      <button
        class="px-6 py-2.5 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors shadow-sm"
        @click="saveDraft"
      >
        Simpan Draft
      </button>
      <button
        class="px-6 py-2.5 bg-rose-500 dark:bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-600 dark:hover:bg-rose-700 transition-colors shadow-sm"
        @click="saveFinal"
      >
        Simpan Final
      </button>
    </div>
  </div>
</template>
