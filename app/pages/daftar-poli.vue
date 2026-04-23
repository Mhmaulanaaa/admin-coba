<template>
  <!-- Start Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <UCard class="bg-linear-to-br from-blue-500 to-blue-600 text-white border-0">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-blue-100 text-sm">Total Daftar Poli</p>
          <p class="text-3xl font-bold">
            {{ statistikHariIni.totaldaftarpoli }}
          </p>
        </div>
        <UIcon name="i-heroicons-user-plus" class="w-8 h-8 text-blue-200" />
      </div>
    </UCard>

    <UCard class="bg-linear-to-br from-amber-500 to-amber-600 text-white border-0">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-amber-100 text-sm">Total Daftar Poli Aktif</p>
          <p class="text-3xl font-bold">
            {{ statistikHariIni.totaldaftarpoliaktif }}
          </p>
        </div>
        <UIcon name="i-heroicons-user-plus" class="w-8 h-8 text-amber-200" />
      </div>
    </UCard>

    <UCard class="bg-linear-to-br from-green-500 to-green-600 text-white border-0">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-green-100 text-sm">Total Daftar Poli Tidak Aktif</p>
          <p class="text-3xl font-bold">
            {{ statistikHariIni.totaldaftarpolitidakatif }}
          </p>
        </div>
        <UIcon name="i-heroicons-user-plus" class="w-8 h-8 text-green-200" />
      </div>
    </UCard>
  </div>
  <!-- End Start Section -->
  <!-- TOP ACTION -->
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
  >
    <!-- Add Team Button -->
    <!-- TOP ACTION -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <!-- SEARCH -->
      <div class="relative w-full sm:w-72 group">
        <!-- SEARCH ICON -->
        <UIcon
          name="i-heroicons-magnifying-glass"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition"
        />

        <!-- CLEAR BUTTON -->
        <button
          v-if="search"
          @click="search = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
        >
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
        </button>

        <!-- INPUT -->
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama dokter atau ksm..."
          class="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm transition focus:ring-2 focus:ring-blue-500 hover:shadow-md"
        />
      </div>

      <!-- ADD BUTTON -->
      <button
        @click="showModal = true"
        class="bg-emerald-500 dark:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 dark:hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm"
      >
        <UIcon name="i-heroicons-plus-circle" class="w-5 h-5 text-white" />
        Tambah
      </button>
    </div>
    <!-- Team Table -->
    <div
      class="mt-4 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
    >
      <table class="w-full text-sm">
        <thead class="bg-slate-50 dark:bg-slate-900/50">
          <tr>
            <th
              class="px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-400"
            >
              Nama Poli
            </th>
            <th
              class="px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-400"
            >
              Divisi
            </th>
            <th
              class="px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-400"
            >
              Status
            </th>
            <th
              class="px-4 py-3 text-center text-sm font-semibold text-slate-800 dark:text-slate-400"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800"
        >
          <tr
            v-for="(member, index) in paginatedUsers"
            :key="index"
            class="hover:bg-slate-50 dark:hover:bg-slate-700/50"
          >
            <td class="px-4 py-3 text-slate-700 dark:text-slate-300">
              {{ member.namapoli }}
            </td>
            <td class="px-4 py-3 text-slate-700 dark:text-slate-300">
              {{ member.divisi }}
            </td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2.5 py-1 text-xs font-medium rounded-full',
                  member.status === 'aktif'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30',
                ]"
              >
                {{ member.status === "aktif" ? "Aktif" : "Tidak Aktif" }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex justify-center gap-2">
                <!-- EDIT -->
                <button
                  @click="editUser(index)"
                  class="p-2 bg-amber-400 dark:bg-amber-500 text-white rounded-lg hover:bg-amber-500 transition"
                >
                  <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
                </button>

                <!-- DELETE -->
                <button
                  @click="deleteUser(index)"
                  class="p-2 bg-rose-500 dark:bg-rose-600 text-white rounded-lg hover:bg-rose-600 transition"
                >
                  <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- End Team Table -->
    <!-- Pagination Info -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
      <!-- Info -->
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Menampilkan
        <span class="font-semibold text-slate-800 dark:text-white">
          {{ startItem }}
        </span>
        -
        <span class="font-semibold text-slate-800 dark:text-white">
          {{ endItem }}
        </span>
        dari
        <span class="font-semibold text-slate-800 dark:text-white">
          {{ totalUsers }}
        </span>
        data
      </p>

      <!-- Pagination Buttons -->
      <div class="flex items-center gap-1">
        <!-- PREV -->
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 rounded-lg border text-sm flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700"
        >
          ← Prev
        </button>

        <!-- PAGE NUMBER -->
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'w-9 h-9 rounded-lg text-sm font-medium transition',
            currentPage === page
              ? 'bg-blue-600 text-white shadow'
              : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700',
          ]"
        >
          {{ page }}
        </button>

        <!-- NEXT -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-lg border text-sm flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700"
        >
          Next →
        </button>
      </div>
    </div>
    <!-- End Pagination Info -->

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        class="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <!-- CLOSE BUTTON -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- TITLE -->
        <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">
          {{ isEdit ? "Edit User" : "Tambah User" }}
        </h2>

        <!-- INPUT -->
        <div class="space-y-4">
          <div>
            <label class="text-sm text-slate-600 dark:text-slate-400"> Nama POli </label>

            <USelectMenu
              v-model="form.namapoli"
              :items="namaPoliOptions"
              value-key="value"
              option-attribute="label"
              searchable
              placeholder="Pilih Nama Poli"
              class="w-full"
              size="lg"
            />
          </div>

          <div>
            <label class="text-sm text-slate-600 dark:text-slate-400"> Divisi </label>

            <USelectMenu
              v-model="form.divisi"
              :items="divisiOptions"
              value-key="value"
              option-attribute="label"
              searchable
              placeholder="Pilih Divisi"
              class="w-full"
              size="lg"
            />
          </div>

          <div>
            <label class="text-sm text-slate-600 dark:text-slate-400 block mb-2">
              Status
            </label>

            <div class="flex gap-4">
              <!-- AKTIF -->
              <label
                class="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20"
              >
                <input
                  type="radio"
                  value="aktif"
                  v-model="form.status"
                  class="text-emerald-500 focus:ring-emerald-500"
                />
                <span class="text-sm text-emerald-700 dark:text-emerald-300">
                  Aktif
                </span>
              </label>

              <!-- TIDAK AKTIF -->
              <label
                class="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer border-rose-200 bg-rose-50 dark:bg-rose-900/20"
              >
                <input
                  type="radio"
                  value="tidak_aktif"
                  v-model="form.status"
                  class="text-rose-500 focus:ring-rose-500"
                />
                <span class="text-sm text-rose-700 dark:text-rose-300">
                  Tidak Aktif
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- ACTION -->
        <div class="flex justify-end gap-2 mt-6">
          <button
            @click="closeModal"
            class="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Batal
          </button>

          <button
            @click="saveUser"
            class="px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            {{ isEdit ? "Update" : "Simpan" }}
          </button>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "Admin Daftar Poli",
});
import { reactive, ref, computed, watch } from "vue";
import Swal from "sweetalert2";
const showModal = ref(false);
const isEdit = ref(false);
const editIndex = ref<number | null>(null);

const form = reactive({
  namapoli: "",
  divisi: "",
  status: "aktif",
  dataTableuser: [
    {
      namapoli: "Poli Anak",
      divisi: "Alergi Imunologi Anak",
      status: "aktif",
    },
    { namapoli: "Poli Anak", divisi: "Alergi Imunologi Anak", status: "tidak_aktif" },
    { namapoli: "Poli Anak", divisi: "Endokrinologi", status: "aktif" },
    { namapoli: "Poli Anak", divisi: "Gastro Anak", status: "aktif" },
    { namapoli: "Poli Anak", divisi: "Gizi Anak", status: "tidak_aktif" },
    { namapoli: "Poli Anak", divisi: "Hematologi", status: "aktif" },
  ],
});

const divisi = [
  "Alergi Imunologi Anak",
  "Endokrinologi",
  "Gastro Anak",
  "Gizi Anak",
  "Hematologi",
];

const divisiOptions = divisi.map((divisi) => ({
  label: divisi,
  value: divisi,
}));

const poli = [
  "Dr. Andi Wijaya",
  "Dr. Siti Rahma",
  "Dr. Budi Santoso",
  "Dr. Lina Marlina",
  "Dr. Rina Susanti",
  "Dr. Agus Pratama",
];

const namaPoliOptions = poli.map((poli) => ({
  label: poli,
  value: poli,
}));

/* =====================
   CREATE / UPDATE USER
===================== */

function saveUser() {
  if (!form.divisi || !form.namapoli) return;

  if (isEdit.value && editIndex.value !== null) {
    form.dataTableuser[editIndex.value] = {
      namapoli: form.namapoli,
      divisi: form.divisi,
      status: form.status,
    };
  } else {
    form.dataTableuser.push({
      namapoli: form.namapoli,
      divisi: form.divisi,
      status: form.status,
    });
  }

  resetForm();
}

const search = ref("");

watch(search, () => {
  currentPage.value = 1;
});

const filteredUsers = computed(() => {
  if (!search.value) return form.dataTableuser;

  return form.dataTableuser.filter((user) =>
    [user.divisi, user.namapoli]
      .join(" ")
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );
});

function resetForm() {
  form.divisi = "";
  form.namapoli = "";
  showModal.value = false;
  isEdit.value = false;
  editIndex.value = null;
}

function closeModal() {
  showModal.value = false;

  form.divisi = "";
  form.namapoli = "";
  form.status = "aktif";

  isEdit.value = false;
  editIndex.value = null;
}

/* =====================
   EDIT USER
===================== */

function editUser(index: number) {
  const user = form.dataTableuser[index];

  if (!user) return;

  form.namapoli = user.namapoli;
  form.divisi = user.divisi;
  form.status = user.status;

  editIndex.value = index;
  isEdit.value = true;
  showModal.value = true;
}

/* =====================
   DELETE USER
===================== */

function deleteUser(index: number) {
  Swal.fire({
    title: "Hapus User?",
    text: "Data akan dihapus secara permanen",
    icon: "warning",
    width: 380,
    padding: "1.5rem",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#94a3b8",
    reverseButtons: true,
    customClass: {
      popup: "rounded-xl",
      title: "text-lg font-semibold",
      confirmButton: "px-4 py-2 rounded-lg text-sm",
      cancelButton: "px-4 py-2 rounded-lg text-sm",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      form.dataTableuser.splice(index, 1);

      Swal.fire({
        icon: "success",
        title: "User dihapus",
        text: "Data berhasil dihapus",
        width: 350,
        timer: 1200,
        showConfirmButton: false,
      });
    }
  });
}

/* =====================
   PAGINATION
===================== */

const currentPage = ref(1);
const perPage = 5;

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return filteredUsers.value.slice(start, end);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

const totalUsers = computed(() => filteredUsers.value.length);
const startItem = computed(() => (currentPage.value - 1) * perPage + 1);
const endItem = computed(() => Math.min(currentPage.value * perPage, totalUsers.value));

/* =====================
   STATISTIK
===================== */

const statistikHariIni = computed(() => {
  const total = form.dataTableuser.length;

  const aktif = form.dataTableuser.filter((user) => user.status === "aktif").length;

  const tidakAktif = form.dataTableuser.filter((user) => user.status === "tidak_aktif")
    .length;

  return {
    totaldaftarpoli: total,
    totaldaftarpoliaktif: aktif,
    totaldaftarpolitidakatif: tidakAktif,
  };
});
</script>
