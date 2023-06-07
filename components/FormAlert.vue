<template>
  <div class="my-1">
    <p v-if="alertStore.error" class="text-error text-body-1 text-center">{{ alertStore.error }}</p>
    <p v-if="alertStore.success" class="text-success text-body-1 text-center">
      {{ alertStore.success }}
    </p>
  </div>
</template>

<script setup lang="ts">
const alertStore= useAlertStore()
</script>