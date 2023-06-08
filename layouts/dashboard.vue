<template>
  <div>
    <v-layout>
      <v-app-bar class="px-md-10" :elevation="0">
        <v-app-bar-title>
          <NuxtLink
            to="/"
            class="text-h5 text-blue-darken-2 font-weight-bold text-decoration-none"
          >
            CM Portal
            <v-progress-circular
              v-if="fileStore.loading"
              :width="2"
              size="25"
              indeterminate
            ></v-progress-circular>
          </NuxtLink>
        </v-app-bar-title>
        <template v-slot:append>
          <ClientOnly>
            <RequestsRequestDialog />
          </ClientOnly>
          <v-chip @click="navigateTo('/profile')" prepend-icon="mdi-account">{{
            user?.email?.split("@")[0]
          }}</v-chip>
          <v-btn :loading="loading" class="ml-1" size="small" @click="logout"
            >Logout</v-btn>
        </template>
      </v-app-bar>

      <v-main class="main-bx">
        <ClientOnly>
          <slot />
        </ClientOnly>
      </v-main>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref<boolean>(false);
const fileStore = useFileStore();

const logout = async () => {
  loading.value = true;
  const { error } = await supabase.auth.signOut();
  if (!error) {
    loading.value = false;
    return window.location.reload();
  }
};
</script>

<style scoped>
.main-bx {
  height: 100vh;
  overflow-y: auto;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url(~/assets/bg1.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
