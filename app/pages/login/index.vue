<script setup lang="ts">
import { api } from "~/services/ApiService";
definePageMeta({
  layout: false,
});

const router = useRouter();
const { $toast, $api } = useNuxtApp();
const { setAuth } = useAuth();

const loading = ref(false);

const handleLogin = async (data: { username: string; password: string }) => {
  loading.value = true;

  try {
    const res = (await api.post("/login", {
      username: data.username,
      password: data.password,
    })) as any;

    setAuth(res);

    console.log("LOGIN RES:", res);

    $toast.success("Login berhasil!", {
      description: `Selamat datang ${res.user?.username}`,
    });

    await router.push("/dashboard");
  } catch (err: any) {
    console.log("ERROR:", err);

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
