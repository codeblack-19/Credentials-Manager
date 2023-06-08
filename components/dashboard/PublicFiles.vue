<template>
  <div>
    <v-sheet height="40vh" rounded class="pa-3">
      <div class="d-flex justify-space-between align-center mb-2">
        <p class="text-h5 font-weight-light">Public files (others)</p>
      </div>
      <v-divider />
      <div class="mt-2">
        <FileCard
          v-for="(file, key) in fileStore.public_files"
          :key="key"
          :file="file"
        />
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
const fileStore = useFileStore();
</script>
