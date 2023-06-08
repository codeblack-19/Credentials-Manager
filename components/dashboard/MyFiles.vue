<template>
  <div>
    <v-sheet max-height="85vh" class="pa-3" rounded>
      <div class="d-flex justify-space-between align-center mb-2">
        <p class="text-h5 font-weight-light">
          My files <v-icon icon="mdi-file-document-outline" size="small" class="ml-2" />
        </p>
        <CreateFileDropDown />
      </div>
      <v-divider />

      <div class="mt-2">
        <FileCard
          v-for="(file, key) in fileStore.files"
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
