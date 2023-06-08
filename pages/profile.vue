<template>
  <div>
    <NuxtLayout name="dashboard">
      <v-container>
        <v-sheet class="pa-10 mt-10" rounded>
          <p class="text-h4 my-2">Profile</p>
          <v-divider></v-divider>

          <div class="mt-5">
            <v-text-field
              variant="outlined"
              label="Email"
              name="email"
              :disabled="true"
              v-model="profile.email"
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              label="Full Name"
              name="full_name"
              v-model="profile.full_name"
            >
            </v-text-field>
            <v-textarea
              label="Bio"
              v-model="profile.bio"
              variant="outlined"
            ></v-textarea>
            <div class="text-center">
              <v-btn
                :loading="loading"
                variant="flat"
                color="blue-darken-2"
                @click="saveProfile"
                >Save Changes</v-btn
              >
            </div>
          </div>
        </v-sheet>
      </v-container>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const userStore = useUserStore();

const profile = ref({
  email: "",
  full_name: "",
  bio: "",
});
const loading = ref<boolean>(false);

onBeforeMount(async () => {
  await userStore.getUserProfile();
  profile.value.email = user.value?.email!;
  profile.value.full_name = userStore.UserProfile?.full_name ?? "";
  profile.value.bio = userStore.UserProfile?.bio ?? "";
});

const saveProfile = async () => {
  loading.value = true;
  const { error } = await supabase
    .from("UserProfile")
    .update({
      full_name: profile.value.full_name,
      bio: profile.value.bio,
    } as never)
    .eq("email", user.value?.email);

  if (error) {
    console.log(error.message);
  }

  loading.value = false;
};
</script>
