<template>
    <div>
        <v-sheet max-height="85vh" class="pa-3" rounded>
            <div class="d-flex justify-space-between align-center mb-2">
                <p class="text-h5 font-weight-light">My files</p>
                <v-btn size="sm" elevation="1" icon="mdi-plus" rounded="sm" />
            </div>
            <v-divider />

            <div class="mt-2">
                <FileCard />
            </div>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>