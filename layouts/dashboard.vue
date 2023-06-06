<template>
    <div>
        <v-layout>
            <v-app-bar class="px-md-10" :elevation="0">
                <v-app-bar-title>
                    <NuxtLink to="/" class="text-h5 text-blue-darken-2 font-weight-bold text-decoration-none">
                        CM Portal
                    </NuxtLink>
                </v-app-bar-title>
                <template v-slot:append>
                    <v-chip prepend-icon="mdi-account">Username</v-chip>
                    <v-btn class="ml-1" size="small">Logout</v-btn>
                </template>
            </v-app-bar>

            <v-main class="main-bx">
                <slot />
            </v-main>
        </v-layout>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-bx{
    height: 100vh;
    overflow-y: auto;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
        url(~/assets/bg1.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>