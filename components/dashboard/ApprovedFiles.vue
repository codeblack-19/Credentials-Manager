<template>
  <div>
    <v-sheet height="42vh" rounded class="pa-3">
      <div class="d-flex justify-space-between align-center mb-2">
        <p class="text-h5 font-weight-light">Approved Access files</p>
      </div>
      <v-divider />
      <div class="mt-2">
        <div class="mt-2">
          <FileCard
            v-for="(file, key) in fileStore.approvedRequestedFiles"
            :key="key"
            :file="file.files"
          />
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
const fileStore = useFileStore();
</script>
