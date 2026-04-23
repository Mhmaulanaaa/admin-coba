<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Toaster
    position="top-center"
    rich-colors
  />
</template>

<script setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>
