<template>
    <div>
        <v-layout>
            <v-main class="main-bx">
                <slot />
            </v-main>
        </v-layout>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.main-bx{
    height: 100vh;
    overflow-y: auto;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.463), rgba(225, 225, 225, 0)),
        url(~/assets/bg3.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>