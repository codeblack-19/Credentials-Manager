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
                                <DashboardSharedFiles />
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
</script>