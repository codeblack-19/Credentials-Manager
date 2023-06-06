<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Credentials Manager',
  ogTitle: 'Credentials Manager',
  description: 'This is a client-side application which manages the creation, storage, retrieval, and deletion of user specific files and records'
})
</script>
