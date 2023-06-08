<template>
  <div>
    <NuxtLayout name="dashboard">
      <v-container>
        <v-sheet class="pa-10 mt-10" rounded>
          <v-row>
            <v-col cols="12" md="6">
              <div class="d-flex align-center mb-2">
                <p class="mr-3 text-h6 font-weight-light">Name:</p>
                <p class="text-h5 text-blue-darken-2">
                  {{ fileStore.selected_file?.title }}
                </p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center my-2">
                <p class="mr-3 text-h6 font-weight-light">Creator:</p>
                <p class="text-h5 text-blue-darken-2">
                  {{
                    creator?.email === user?.email
                      ? "You"
                      : creator?.email.split("@")[0]
                  }}
                </p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center my-2">
                <p class="mr-3 text-h6 font-weight-light">File Url:</p>
                <NuxtLink
                  target="_blank"
                  :to="fileStore.selected_file?.file_url"
                  class="text-h6 text-blue-darken-2 text-decoration-none"
                >
                  Click here
                  <v-icon
                    class="ml-1"
                    size="small"
                    icon="mdi-open-in-new"
                  ></v-icon>
                </NuxtLink>
              </div>
              <v-divider></v-divider>
              <div
                v-if="fileStore.selected_file?.creator_uid == user?.id"
                class="text-center mt-3"
              >
                <v-btn variant="flat" color="error" @click="deleteFile"
                  >Delete File</v-btn
                >
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="text-center">
                <NuxtLink
                  target="_blank"
                  :to="fileStore.selected_file?.file_url"
                  class="text-h6 text-blue-darken-2 text-decoration-none"
                >
                  <v-icon
                    color="blue-darken-2"
                    size="150"
                    icon="mdi-file-link"
                  ></v-icon>
                </NuxtLink>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { deleteSupabaseFile } from "~/utils/FileProcessing";

definePageMeta({
  layout: false,
  middleware: ["auth"],
});
const fileStore = useFileStore();
const userStore = useUserStore();
const user = useSupabaseUser();

const loading = ref<boolean>(false);
const { id } = useRoute().params;

if (id !== fileStore.previewUriToken) {
  await navigateTo("/");
}
const creator = ref<any>();

const deleteFile = async () => {
  loading.value = true;
  await deleteSupabaseFile(fileStore.selected_file!)
    .then(async () => {
      return navigateTo("/");
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => (loading.value = false));
};

onBeforeMount(async () => {
  creator.value = await userStore.getUserById(
    fileStore.selected_file?.creator_uid!
  );
});
</script>
