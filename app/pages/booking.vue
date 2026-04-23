<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

interface BookingForm {
  mrn: string
  ksm: string
  dokter: string
  prosedur: string
  estimasi: number
  tanggal: string
  catatan: string
}

const form = reactive<BookingForm>({
  mrn: '',
  ksm: '',
  dokter: '',
  prosedur: '',
  estimasi: 2,
  tanggal: '',
  catatan: ''
})

const ksmOptions = [
  { label: 'Bedah Umum', value: 'bedah-umum' },
  {
    label: 'Bedah Toraks, Kardiak dan Vaskular',
    value: 'bedah-toraks-kardiak-vaskular'
  },
  { label: 'Radioterapi', value: 'radioterapi' },
  {
    label: 'Bedah Plastik Rekonstruksi dan Estetik',
    value: 'bedah-plastik-rekonstruksi-estetik'
  },
  { label: 'Bedah Syaraf', value: 'bedah-syaraf' },
  { label: 'Orthopedi dan Traumatologi', value: 'orthopedi-traumatologi' },
  { label: 'Urologi', value: 'urologi' },
  { label: 'Obstetri Ginekologi', value: 'obstetri-ginekologi' },
  { label: 'Ilmu Kesehatan Anak', value: 'ilmu-kesehatan-anak' },
  { label: 'Penyakit Dalam', value: 'penyakit-dalam' },
  {
    label: 'Kardiologi dan Kedokteran Vaskular',
    value: 'kardiologi-kedokteran-vaskular'
  },
  {
    label: 'Pulmonologi dan Ilmu Kedokteran Respirasi',
    value: 'pulmonologi-kedokteran-respirasi'
  },
  { label: 'Ilmu Kesehatan Mata', value: 'ilmu-kesehatan-mata' },
  { label: 'THT-KL', value: 'tht-kl' },
  { label: 'Kesehatan Kulit dan Kelamin', value: 'kulit-dan-kelamin' },
  { label: 'Neurologi', value: 'neurologi' },
  { label: 'Andrologi', value: 'andrologi' },
  { label: 'Kedokteran Jiwa', value: 'kedokteran-jiwa' },
  { label: 'Mikrobiologi Klinik', value: 'mikrobiologi-klinik' },
  { label: 'Radiologi', value: 'radiologi' },
  { label: 'Kesehatan Gigi dan Mulut', value: 'kesehatan-gigi-mulut' },
  { label: 'Patologi Klinik', value: 'patologi-klinik' },
  { label: 'Patologi Anatomi', value: 'patologi-anatomi' },
  { label: 'Anestesiologi dan Reanimasi', value: 'anestesiologi-reanimasi' },
  { label: 'Dokter Umum', value: 'dokter-umum' },
  {
    label: 'Kedokteran Fisik dan Rehabilitasi',
    value: 'kedokteran-fisik-rehabilitasi'
  },
  {
    label: 'Kedokteran Forensik dan Medikolegal',
    value: 'forensik-medikolegal'
  },
  { label: 'Paliatif', value: 'paliatif' }
]

const dokterByKsm: Record<string, { label: string, value: string }[]> = {
  'bedah-umum': [
    { label: 'Dr. Ahmad Sp.B', value: 'ahmad' },
    { label: 'Dr. Rina Sp.B', value: 'rina' }
  ],
  'bedah-toraks-kardiak-vaskular': [
    { label: 'Dr. Surya Sp.BTKV', value: 'surya' }
  ],
  'radioterapi': [{ label: 'Dr. Lestari Sp.Onk.Rad', value: 'lestari' }],
  'bedah-plastik-rekonstruksi-estetik': [
    { label: 'Dr. Maya Sp.BP-RE', value: 'maya' }
  ],
  'bedah-syaraf': [{ label: 'Dr. Andika Sp.BS', value: 'andika' }],
  'orthopedi-traumatologi': [{ label: 'Dr. Dedi Sp.OT', value: 'dedi' }],
  'urologi': [{ label: 'Dr. Fajar Sp.U', value: 'fajar' }],
  'obstetri-ginekologi': [{ label: 'Dr. Sinta Sp.OG', value: 'sinta' }],
  'ilmu-kesehatan-anak': [{ label: 'Dr. Rudi Sp.A', value: 'rudi' }],
  'penyakit-dalam': [{ label: 'Dr. Hasan Sp.PD', value: 'hasan' }],
  'kardiologi-kedokteran-vaskular': [
    { label: 'Dr. Taufik Sp.JP', value: 'taufik' }
  ],
  'pulmonologi-kedokteran-respirasi': [
    { label: 'Dr. Dimas Sp.P', value: 'dimas' }
  ],
  'ilmu-kesehatan-mata': [{ label: 'Dr. Yuli Sp.M', value: 'yuli' }],
  'tht-kl': [{ label: 'Dr. Bagus Sp.THT-KL', value: 'bagus' }],
  'kulit-dan-kelamin': [{ label: 'Dr. Nita Sp.KK', value: 'nita' }],
  'neurologi': [{ label: 'Dr. Bima Sp.N', value: 'bima' }],
  'andrologi': [{ label: 'Dr. Yoga Sp.And', value: 'yoga' }],
  'kedokteran-jiwa': [{ label: 'Dr. Rani Sp.KJ', value: 'rani' }],
  'mikrobiologi-klinik': [{ label: 'Dr. Anton Sp.MK', value: 'anton' }],
  'radiologi': [{ label: 'Dr. Fina Sp.Rad', value: 'fina' }],
  'kesehatan-gigi-mulut': [{ label: 'Dr. Aldi Sp.KG', value: 'aldi' }],
  'patologi-klinik': [{ label: 'Dr. Sari Sp.PK', value: 'sari' }],
  'patologi-anatomi': [{ label: 'Dr. Dewa Sp.PA', value: 'dewa' }],
  'anestesiologi-reanimasi': [{ label: 'Dr. Putra Sp.An', value: 'putra' }],
  'dokter-umum': [{ label: 'Dr. Lina', value: 'lina' }],
  'kedokteran-fisik-rehabilitasi': [
    { label: 'Dr. Joko Sp.KFR', value: 'joko' }
  ],
  'forensik-medikolegal': [{ label: 'Dr. Rizal Sp.FM', value: 'rizal' }],
  'paliatif': [{ label: 'Dr. Eva Sp.Paliatif', value: 'eva' }]
}

/* =======================
   COMPUTED DOKTER
======================= */
const dokterOptions = computed(() => {
  return dokterByKsm[form.ksm] || []
})

/* Reset dokter jika KSM berubah */
watch(
  () => form.ksm,
  () => {
    form.dokter = ''
  }
)

/* ================= UPLOAD STATE ================= */
const files = ref<Record<string, File[]>>({
  mrs: [],
  rto: [],
  penunjang: []
})

const previewFile = ref<string | null>(null)
const activePreview = ref<File | null>(null)

/* ================= HANDLER ================= */
const handleFile = (event: Event, key: string) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return
  files.value[key]!.push(...Array.from(target.files))
  target.value = ''
}

const removeFile = (key: string, index: number) => {
  files.value[key]!.splice(index, 1)
}

const openPreview = (file: File) => {
  previewFile.value = URL.createObjectURL(file)
  activePreview.value = file
}
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 space-y-6 transition-colors duration-300"
  >
    <!-- ================= EMR ================= -->
    <UCard
      class="w-full rounded-2xl shadow-none border-0 bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:border dark:border-slate-800"
      :ui="{ header: 'border-0 pb-6' }"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div
            class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
          >
            <UIcon
              name="i-heroicons-magnifying-glass"
              class="w-5 h-5"
            />
          </div>
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">
            Cari Data Pasien (EMR)
          </h2>
        </div>
      </template>

      <div class="grid md:grid-cols-6 gap-4 items-end -mt-6">
        <!-- INPUT -->
        <div class="md:col-span-5">
          <UFormField
            label="Nomor Rekam Medis"
            name="mrn"
            :ui="{
              label:
                'text-sm font-medium text-slate-700 dark:text-slate-300 mb-0.5'
            }"
          >
            <UInput
              v-model="form.mrn"
              size="lg"
              class="w-full"
              placeholder="Masukkan Nomor Rekam Medis pasien"
              :ui="{
                base: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500'
              }"
            />
          </UFormField>
        </div>

        <!-- BUTTON -->
        <div class="md:col-span-1 flex items-end">
          <UButton
            size="lg"
            icon="i-heroicons-magnifying-glass"
            color="primary"
            class="w-full justify-center shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
          >
            Cari
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- ================= DETAIL ================= -->
    <UCard
      class="w-full rounded-2xl shadow-none border-0 bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:border dark:border-slate-800"
      :ui="{ header: 'border-0 pb-6' }"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div
            class="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
          >
            <UIcon
              name="i-heroicons-clipboard-document-list"
              class="w-5 h-5"
            />
          </div>
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">
            Detail Permintaan Operasi
          </h2>
        </div>
      </template>

      <div class="grid md:grid-cols-6 gap-4 -mt-4">
        <!-- BARIS 1 -->
        <div class="md:col-span-3">
          <UFormField
            label="KSM"
            name="ksm"
            required
            :ui="{
              label: 'text-sm font-medium text-slate-700 dark:text-slate-300'
            }"
          >
            <USelectMenu
              v-model="form.ksm"
              :items="ksmOptions"
              value-key="value"
              option-attribute="label"
              searchable
              placeholder="Pilih KSM"
              class="w-full"
              size="lg"
            />
          </UFormField>
        </div>

        <div class="md:col-span-3">
          <UFormField
            label="Dokter Operator"
            name="dokter"
            required
            :ui="{
              label: 'text-sm font-medium text-slate-700 dark:text-slate-300'
            }"
          >
            <USelectMenu
              v-model="form.dokter"
              :items="dokterOptions"
              value-key="value"
              option-attribute="label"
              searchable
              placeholder="Pilih Dokter"
              size="lg"
              class="w-full"
              :disabled="!form.ksm"
            />
          </UFormField>
        </div>

        <!-- BARIS 2 -->
        <div class="md:col-span-2">
          <UFormField
            label="Jenis Prosedur"
            name="prosedur"
            required
            :ui="{
              label: 'text-sm font-medium text-slate-700 dark:text-slate-300'
            }"
          >
            <UInput
              v-model="form.prosedur"
              size="lg"
              class="w-full"
              :ui="{
                base: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
              }"
            />
          </UFormField>
        </div>

        <div class="md:col-span-2">
          <UFormField
            label="Estimasi Waktu (jam)"
            name="estimasi"
            required
            :ui="{
              label: 'text-sm font-medium text-slate-700 dark:text-slate-300'
            }"
          >
            <UInput
              v-model="form.estimasi"
              type="number"
              size="lg"
              class="w-full"
              :ui="{
                base: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
              }"
            />
          </UFormField>
        </div>

        <div class="md:col-span-2">
          <UFormField
            label="Tanggal Preferensi"
            name="tanggal"
            :ui="{
              label: 'text-sm font-medium text-slate-700 dark:text-slate-300'
            }"
          >
            <UInput
              v-model="form.tanggal"
              type="date"
              size="lg"
              class="w-full"
              :ui="{
                base: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white [color-scheme:dark]'
              }"
            />
          </UFormField>
        </div>

        <!-- BARIS 3 -->
        <div class="md:col-span-6">
          <UFormField
            label="Catatan Khusus"
            name="catatan"
            :ui="{
              label: 'text-sm font-medium text-slate-700 dark:text-slate-300'
            }"
          >
            <UTextarea
              v-model="form.catatan"
              :rows="4"
              size="lg"
              class="w-full"
              :ui="{
                base: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none'
              }"
            />
          </UFormField>
        </div>
      </div>
    </UCard>

    <!-- ================= UPLOAD ================= -->
    <UCard
      class="w-full rounded-2xl shadow-none border-0 bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:border dark:border-slate-800"
      :ui="{ header: 'border-0 pb-2' }"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div
            class="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
          >
            <UIcon
              name="i-heroicons-cloud-arrow-up"
              class="w-5 h-5"
            />
          </div>
          <h2 class="text-xl font-semibold text-slate-800 dark:text-white">
            Upload Dokumen
          </h2>
        </div>
      </template>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="doc in [
            { label: 'Surat MRS', key: 'mrs', required: true },
            { label: 'Surat RTO', key: 'rto', required: true },
            { label: 'Hasil Penunjang', key: 'penunjang', required: false }
          ]"
          :key="doc.key"
          :class="[
            'rounded-xl p-6 border-2 border-dashed transition-all duration-300 bg-slate-50 dark:bg-slate-800/50',
            'hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10',
            files[doc.key]!.length > 0
              ? 'border-primary-500 bg-primary-50/30 dark:bg-primary-900/20'
              : 'border-slate-300 dark:border-slate-700'
          ]"
        >
          <div class="text-center">
            <div
              class="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-cloud-arrow-up"
                class="w-7 h-7 text-primary-600 dark:text-primary-400"
              />
            </div>

            <p class="font-medium mb-1 text-slate-800 dark:text-slate-200">
              {{ doc.label }}
              <span
                v-if="doc.required"
                class="text-red-500 dark:text-red-400"
              >*</span>
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Drag & drop atau pilih file
            </p>

            <label class="cursor-pointer inline-block">
              <UButton
                size="sm"
                variant="soft"
                color="primary"
                as="span"
                class="hover:shadow-md transition-all"
              >
                Pilih File
              </UButton>

              <input
                type="file"
                multiple
                class="hidden"
                @change="handleFile($event, doc.key)"
              >
            </label>

            <!-- FILE LIST -->
            <div
              v-if="files[doc.key]!.length > 0"
              class="mt-4 space-y-2 text-sm"
            >
              <div
                v-for="(file, index) in files[doc.key]"
                :key="index"
                class="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <UIcon
                    :name="
                      file.type.includes('image')
                        ? 'i-heroicons-photo'
                        : 'i-heroicons-document-text'
                    "
                    class="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0"
                  />
                  <span class="truncate text-slate-700 dark:text-slate-300">
                    {{ file.name }}
                  </span>
                </div>

                <div class="flex gap-1 shrink-0">
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="primary"
                    icon="i-heroicons-eye"
                    @click="openPreview(file)"
                  />
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="error"
                    icon="i-heroicons-x-mark"
                    @click="removeFile(doc.key, index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PREVIEW MODAL -->
      <UModal
        v-model="previewFile"
        :ui="{ wrapper: 'z-50' }"
      >
        <div class="p-4 bg-white dark:bg-slate-900 rounded-xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-semibold text-slate-800 dark:text-white">
              Preview Dokumen
            </h3>
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-heroicons-x-mark"
              @click="previewFile = null"
            />
          </div>

          <template v-if="activePreview?.type?.includes('image')">
            <img
              v-if="previewFile"
              :src="previewFile"
              class="w-full rounded-lg"
            >
          </template>

          <template v-else>
            <iframe
              v-if="previewFile"
              :src="previewFile"
              class="w-full h-96 rounded-lg bg-slate-100 dark:bg-slate-800"
            />
          </template>
        </div>
      </UModal>
    </UCard>

    <div class="flex justify-end pt-4">
      <UButton
        size="lg"
        color="primary"
        class="px-10 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all"
        trailing-icon="i-heroicons-paper-airplane"
      >
        Ajukan Permintaan
      </UButton>
    </div>
  </div>
</template>
