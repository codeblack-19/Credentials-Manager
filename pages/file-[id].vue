<template>
    <div>
        <NuxtLayout name="dashboard">
            <v-container>
                <v-sheet class="pa-10" rounded>
                    <p>Hello</p>
                </v-sheet>
            </v-container>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: ["auth"]
})
const fileStore = useFileStore()

const { id } = useRoute().params

if(id !== fileStore.previewUriToken){
    navigateTo('/')
}
</script>

<style scoped>

</style>