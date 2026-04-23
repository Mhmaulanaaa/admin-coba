<script setup lang="ts">
import { api } from "~/services/ApiService";
definePageMeta({
  layout: false,
});

const router = useRouter();
const { $toast, $api } = useNuxtApp();
const { setAuth } = useAuth();

const loading = ref(false);

const handleLogin = async (data: { email: string; password: string }) => {
  loading.value = true;

  try {
    const res = await api.post("/login", {
      username: data.email,
      password: data.password,
    });

    // ✅ sekarang sudah langsung data
    setAuth(res);

    $toast.success("Login berhasil!", {
      description: `Selamat datang ${res.data.username}`,
    });

    console.log(res.data);

    // ✅ redirect
    await router.push("/dashboard");
  } catch (err: any) {
    $toast.error("Login gagal", {
      description: err?.data?.message || "Username / password salah",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex">
    <LoginHero />
    <LoginForm v-model:loading="loading" @submit="handleLogin" />
  </div>
</template>
