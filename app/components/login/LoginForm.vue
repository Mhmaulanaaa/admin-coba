<script setup lang="ts">
const emit = defineEmits<{
  submit: [data: { email: string; password: string }];
}>();

const formData = reactive({
  email: "",
  password: "",
});

const props = defineProps<{
  loading?: boolean;
}>();
// Toggle password visibility
const showPassword = ref(false);

const handleSubmit = () => {
  emit("submit", { ...formData });
};
</script>

<template>
  <div class="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-950">
    <div class="w-full max-w-md">
      <!-- Mobile Logo -->
      <div class="lg:hidden flex items-center justify-center mb-8">
        <div
          class="w-12 h-12 bg-linear-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center"
        >
          <UIcon name="i-lucide-activity-square" class="w-7 h-7 text-white" />
        </div>
        <h1 class="text-2xl font-bold ml-3">
          <span class="text-emerald-200">Admin</span>
          <span class="ext-gray-900 dark:text-white"> Website</span>
        </h1>
      </div>

      <UCard class="shadow-xl border-0">
        <template #header>
          <div class="space-y-1">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Selamat Datang
            </h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>
        </template>

        <UForm :state="formData" class="space-y-4" @submit="handleSubmit">
          <UFormField label="Username" name="Username" required>
            <UInput
              v-model="formData.email"
              type="text"
              placeholder="Username"
              icon="i-lucide-user"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Password" name="password" required>
            <div class="relative">
              <UInput
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                icon="i-lucide-lock"
                size="lg"
                class="w-full"
                :ui="{ base: 'pr-12' }"
              />
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                class="absolute right-2 top-1/2 -translate-y-1/2"
                @click="showPassword = !showPassword"
              />
            </div>
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            size="lg"
            block
            class="font-medium"
            :loading="props.loading"
          >
            Masuk
          </UButton>
        </UForm>

        <template #footer>
          <div class="text-center text-sm text-gray-500 dark:text-gray-400">
            Gunakan Username dan password untuk masuk
          </div>
        </template>
      </UCard>

      <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        © 2026 Admin Website. All rights reserved.
      </p>
    </div>
  </div>
</template>
