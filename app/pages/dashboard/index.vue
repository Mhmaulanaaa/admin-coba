<script setup lang="ts">
definePageMeta({
  layout: "default",
});

// Dark mode state
const colorMode = useColorMode();

/* ================= WEEKLY BAR ================= */

const weeklySeries = [
  {
    name: "Operasi",
    data: [8, 12, 10, 15, 12, 6, 4],
  },
];

const weeklyOptions = computed(() => ({
  chart: {
    type: "bar",
    toolbar: { show: false },
    background: "transparent",
    foreColor: colorMode.value === "dark" ? "#94a3b8" : "#64748b",
  },
  theme: {
    mode: colorMode.value === "dark" ? "dark" : "light",
  },
  colors: ["#22c55e"],
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "55%",
      distributed: false,
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: colorMode.value === "dark" ? "#64748b" : "#94a3b8",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: colorMode.value === "dark" ? "#64748b" : "#94a3b8",
      },
    },
  },
  grid: {
    borderColor: colorMode.value === "dark" ? "#1e293b" : "#e2e8f0",
    strokeDashArray: 4,
    yaxis: { lines: { show: true } },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: colorMode.value === "dark" ? "dark" : "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: ["#10b981"],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  tooltip: {
    theme: colorMode.value === "dark" ? "dark" : "light",
    style: {
      fontSize: "13px",
    },
    y: {
      formatter: function (val: number) {
        return val + " operasi";
      },
    },
  },
}));

/* ================= DONUT ================= */

const donutSeries = [30, 25, 20, 15, 10];

const donutOptions = computed(() => ({
  chart: {
    type: "donut",
    background: "transparent",
  },
  theme: {
    mode: colorMode.value === "dark" ? "dark" : "light",
  },
  labels: ["Bedah", "Jantung", "Saraf", "Orthopedi", "Lainnya"],
  colors: ["#22c55e", "#eab308", "#3b82f6", "#a855f7", "#64748b"],
  legend: {
    position: "bottom",
    fontSize: "13px",
    labels: {
      colors: colorMode.value === "dark" ? "#94a3b8" : "#64748b",
    },
    markers: {
      radius: 3,
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    show: true,
    colors: colorMode.value === "dark" ? ["#0f172a"] : ["#ffffff"],
    width: 2,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "14px",
            color: colorMode.value === "dark" ? "#94a3b8" : "#64748b",
          },
          value: {
            show: true,
            fontSize: "24px",
            fontWeight: 600,
            color: colorMode.value === "dark" ? "#f1f5f9" : "#1e293b",
          },
          total: {
            show: true,
            showAlways: true,
            label: "Total",
            fontSize: "14px",
            color: colorMode.value === "dark" ? "#64748b" : "#94a3b8",
            formatter: function (w: { globals: { seriesTotals: number[] } }) {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            },
          },
        },
      },
    },
  },
  tooltip: {
    theme: colorMode.value === "dark" ? "dark" : "light",
  },
}));

// Status data dengan warna yang lebih kaya
const stats = [
  {
    title: "Hari Ini",
    value: 12,
    icon: "i-lucide-heart-pulse",
    color: "success",
    bgGradient: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    trend: "+12%",
  },
  {
    title: "Berlangsung",
    value: 3,
    icon: "i-lucide-activity",
    color: "warning",
    bgGradient: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    trend: "Live",
  },
  {
    title: "Menunggu",
    value: 5,
    icon: "i-lucide-clock",
    color: "info",
    bgGradient: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    trend: "2 jam",
  },
  {
    title: "Selesai",
    value: 4,
    icon: "i-lucide-check-circle-2",
    color: "success",
    bgGradient: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-600 dark:text-green-400",
    trend: "100%",
  },
];

// Jadwal operasi dengan status yang lebih detail
const schedules = [
  {
    patient: "Ahmad Wijaya",
    time: "08:00",
    room: "OK 1",
    department: "Bedah Digestif",
    status: "Berlangsung",
    statusColor: "success" as const, // ✅ valid: primary, secondary, success, info, warning, error, neutral
    avatar: "AW",
    priority: "high",
  },
  {
    patient: "Siti Nurhaliza",
    time: "09:00",
    room: "OK 2",
    department: "Bedah Saraf",
    status: "Dijadwalkan",
    statusColor: "warning" as const, // ✅ valid
    avatar: "SN",
    priority: "normal",
  },
  {
    patient: "Bambang Suryadi",
    time: "10:30",
    room: "OK 3",
    department: "Jantung",
    status: "Verifikasi",
    statusColor: "info" as const, // ✅ valid
    avatar: "BS",
    priority: "high",
  },
  {
    patient: "Dewi Kusuma",
    time: "13:00",
    room: "OK 1",
    department: "Orthopedi",
    status: "Dijadwalkan",
    statusColor: "neutral" as const, // ✅ valid (bukan 'slate')
    avatar: "DK",
    priority: "normal",
  },
];
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 space-y-6 transition-colors duration-300"
  >
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-1">
          Ringkasan aktivitas operasi hari ini
        </p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-slate-500 dark:text-slate-400">
          {{
            new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </span>
      </div>
    </div>

    <!-- ================= STAT CARDS ================= -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <UCard
        v-for="stat in stats"
        :key="stat.title"
        :class="[
          'group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
          'bg-white dark:bg-slate-900/50 backdrop-blur-sm',
          'border-0 shadow-sm dark:shadow-slate-900/20',
        ]"
        :ui="{
          body: 'p-6',
        }"
      >
        <!-- Background Gradient Effect -->
        <div
          :class="[
            'absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            stat.bgGradient,
          ]"
        />

        <div class="relative flex justify-between items-start">
          <div class="space-y-1">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
              {{ stat.title }}
            </p>
            <div class="flex items-baseline gap-2">
              <p class="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
                {{ stat.value }}
              </p>
              <span
                :class="[
                  'text-xs font-semibold px-2 py-1 rounded-full',
                  stat.color === 'emerald'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : stat.color === 'amber'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    : stat.color === 'blue'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
                ]"
              >
                {{ stat.trend }}
              </span>
            </div>
          </div>

          <div
            :class="[
              'p-3.5 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
              'bg-slate-100 dark:bg-slate-800',
              stat.iconColor,
            ]"
          >
            <UIcon :name="stat.icon" class="w-6 h-6" />
          </div>
        </div>

        <!-- Progress Bar -->
        <div
          class="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
        >
          <div
            :class="[
              'h-full rounded-full transition-all duration-1000 ease-out',
              stat.color === 'emerald'
                ? 'bg-emerald-500'
                : stat.color === 'amber'
                ? 'bg-amber-500'
                : stat.color === 'blue'
                ? 'bg-blue-500'
                : 'bg-violet-500',
            ]"
            :style="{ width: (stat.value / 15) * 100 + '%' }"
          />
        </div>
      </UCard>
    </div>

    <!-- ================= CHARTS ================= -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- BAR CHART -->
      <UCard
        class="xl:col-span-2"
        :class="[
          'bg-white dark:bg-slate-900/50 backdrop-blur-sm',
          'border-0 shadow-sm dark:shadow-slate-900/20',
        ]"
        :ui="{}"
      >
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
              Operasi Mingguan
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Statistik 7 hari terakhir
            </p>
          </div>
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-more-horizontal"
          />
        </div>

        <ClientOnly>
          <apexchart
            type="bar"
            height="320"
            :options="weeklyOptions"
            :series="weeklySeries"
          />
        </ClientOnly>
      </UCard>

      <!-- DONUT CHART -->
      <UCard
        :class="[
          'bg-white dark:bg-slate-900/50 backdrop-blur-sm',
          'border-0 shadow-sm dark:shadow-slate-900/20',
        ]"
        :ui="{}"
      >
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
            Distribusi KSM
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Berdasarkan spesialisasi
          </p>
        </div>

        <ClientOnly>
          <apexchart
            type="donut"
            height="320"
            :options="donutOptions"
            :series="donutSeries"
          />
        </ClientOnly>
      </UCard>
    </div>

    <!-- ================= SCHEDULE LIST ================= -->
    <UCard
      :class="[
        'bg-white dark:bg-slate-900/50 backdrop-blur-sm',
        'border-0 shadow-sm dark:shadow-slate-900/20',
      ]"
      :ui="{}"
    >
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
            Jadwal Operasi Hari Ini
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {{ schedules.length }} pasien terjadwal
          </p>
        </div>
        <UButton
          size="sm"
          color="success"
          variant="soft"
          trailing-icon="i-lucide-arrow-right"
        >
          Lihat Semua
        </UButton>
      </div>

      <div class="space-y-3">
        <div
          v-for="(schedule, index) in schedules"
          :key="schedule.patient"
          :class="[
            'group flex items-center justify-between p-4 rounded-2xl transition-all duration-300',
            'hover:shadow-md hover:scale-[1.01]',
            'bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800',
            'border border-transparent hover:border-slate-200 dark:hover:border-slate-700',
          ]"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="flex items-center gap-4">
            <!-- Avatar dengan Priority Indicator -->
            <div class="relative">
              <div
                :class="[
                  'w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg',
                  schedule.priority === 'high'
                    ? 'bg-linear-to-br from-rose-500 to-orange-500'
                    : 'bg-linear-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600',
                ]"
              >
                {{ schedule.avatar }}
              </div>
              <div
                v-if="schedule.priority === 'high'"
                class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"
              />
            </div>

            <div>
              <div class="flex items-center gap-2">
                <p class="font-semibold text-slate-800 dark:text-slate-200">
                  {{ schedule.patient }}
                </p>
                <UIcon
                  v-if="schedule.priority === 'high'"
                  name="i-lucide-alert-circle"
                  class="w-4 h-4 text-amber-500"
                />
              </div>
              <div
                class="flex items-center gap-3 mt-1 text-sm text-slate-500 dark:text-slate-400"
              >
                <span class="flex items-center gap-1">
                  <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
                  {{ schedule.time }}
                </span>
                <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span>{{ schedule.room }}</span>
                <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span class="text-slate-600 dark:text-slate-300">{{
                  schedule.department
                }}</span>
              </div>
            </div>
          </div>

          <UBadge :color="schedule.statusColor" variant="subtle" class="font-medium">
            <template #leading>
              <UIcon
                :name="
                  schedule.status === 'Berlangsung'
                    ? 'i-lucide-loader-2'
                    : schedule.status === 'Dijadwalkan'
                    ? 'i-lucide-calendar'
                    : 'i-lucide-clipboard-check'
                "
                class="w-3.5 h-3.5 mr-1.5"
                :class="{ 'animate-spin': schedule.status === 'Berlangsung' }"
              />
            </template>
            {{ schedule.status }}
          </UBadge>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.3);
  border-radius: 20px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(148, 163, 184, 0.5);
}

/* Animasi Stagger */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass Effect Enhancement */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.dark .glass {
  background: rgba(15, 23, 42, 0.7);
}
</style>
