<template>
  <div>
    <v-sheet height="42vh" rounded class="pa-3">
      <div class="d-flex justify-space-between align-center mb-2">
        <p class="text-h5 font-weight-light">File Requests</p>
      </div>
      <v-divider />
      <div class="mt-2">
        <template v-for="(req, key) in fileStore.requestFiles" :key="key">
          <FileAccessCard :req="req" />
        </template>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
const fileStore = useFileStore();
</script>
