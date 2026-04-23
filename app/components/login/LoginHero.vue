<script setup lang="ts">
const stats = [
  { label: "Total Users", value: "1.2K" },
  { label: "Active Sessions", value: "350" },
  { label: "Server Uptime", value: "99.9%" },
];
</script>

<template>
  <div
    class="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-500 via-primary-700 to-primary-800 relative overflow-hidden"
  >
    <!-- Dot Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
          background-size: 40px 40px;
        "
      />
    </div>

    <div class="relative z-10 flex flex-col justify-center px-12 text-white">
      <div class="flex items-center gap-3 mb-8">
        <div
          class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
        >
          <img src="/logo.png" alt="Logo" class="w-32 h-32 object-contain" />
        </div>
        <div>
          <h1 class="text-3xl font-bold">
            <span class="text-emerald-200">Admin</span>
            <span class="text-white"> Website</span>
          </h1>
          <p class="text-white/80 text-sm">Monitoring Admin Website</p>
        </div>
      </div>

      <h2 class="text-4xl font-bold mb-4 leading-tight">
        Sistem Admin<br />Website RSUD Dr.Soetomo
      </h2>
      <p class="text-lg text-white/90 mb-8 leading-relaxed">
        Kelola dan pantau semua aspek operasional RSUD Dr.Soetomo dengan mudah melalui
        dashboard yang intuitif dan terintegrasi.
      </p>

      <div class="grid grid-cols-3 gap-4 mt-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white/10 backdrop-blur-sm rounded-lg p-4"
        >
          <div class="text-3xl font-bold mb-1">
            {{ stat.value }}
          </div>
          <div class="text-sm text-white/80">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
