<template>
    <div>
        <NuxtLayout name="dashboard">
            <v-container>
                <v-row>
                    <v-col cols="12" md="8">
                        <DashboardMyFiles />
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-row>
                            <v-col cols="12">
                                <DashboardRequestFiles/>
                            </v-col>
                            <v-col cols="12">
                                <DashboardPublicFiles />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
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

const fetchAllFileContents = async () => {
    fileStore.loading = true
    await fileStore.getUserFiles()
    await fileStore.getRequestedFiles()
    await fileStore.getOtherUserFiles()
    fileStore.loading = false
}

const Interval = setInterval(() => {
    (async () => {
        await fetchAllFileContents()
    })()
}, 10000)

onBeforeMount(async () => {
    await fetchAllFileContents()
})

onBeforeUnmount(() => {
    clearInterval(Interval)
})
</script>