<template>
  <div>
    <client-only>
      <v-card
        variant="flat"
        color="grey-lighten-4"
        v-if="file"
        class="mt-2 py-2 px-3"
        style="cursor: pointer"
        @click="dialog = true"
      >
        <div class="d-flex flex-wrap justify-space-between align-center">
          <p class="text-body-2 font-weight-medium mx-1">
            {{ file?.title }}
          </p>
          <v-chip
            :color="
              file?.visibility == 'Private' ? 'green-darken-3' : 'red-darken-3'
            "
            size="x-small"
            >{{ file?.visibility }}</v-chip
          >
          <v-spacer></v-spacer>
          <p class="text-caption ms-auto text-right text-blue-darken-3 font-italic">
            {{ useTimeAgo(new Date(file?.created_at)).value }}
          </p>
        </div>
      </v-card>
      <v-dialog v-model="dialog" width="320px" persistent>
        <v-card class="pb-5">
          <div class="text-right">
            <v-btn
              @click="closeDialog"
              :elevation="0"
              value="flat"
              size="small"
              icon="mdi-window-close"
            />
          </div>
          <div v-if="user?.id === file?.creator_uid || access?.approved" class="px-5 text-center">
            <p class="text-center font-weight-medium text-subtitle-1">
              Please enter the secret code for this file
            </p>
            <FormAlert></FormAlert>
            <v-text-field
              variant="outlined"
              v-model="secretCode"
              label="Secret Code"
              name="secret_code"
              density="compact"
              hide-details
            >
            </v-text-field>
            <v-btn
              size="small"
              variant="flat"
              color="blue-darken-1"
              class="mt-2"
              @click="accesFile"
              >Access</v-btn
            >
          </div>
          <RequestAccess v-else :file="file" v-model:access="access" />
        </v-card>
      </v-dialog>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import FileTypes from "~/types/fileType";
import FileRequestType from "~/types/fileRequestType"

const props = defineProps<{
  file?: FileTypes;
}>();

const alertStore = useAlertStore();
const user = useSupabaseUser();
const fileStore = useFileStore();

const dialog = ref<boolean>(false);
const secretCode = ref("");
const access = ref<FileRequestType | null>(null)

const accesFile = async () => {
  alertStore.clear();
  if (props.file?.secret_code === secretCode.value) {
    await fileStore.setPreviewUriToken(props.file?.id, props.file);
    return navigateTo(`/file-${fileStore.previewUriToken}`);
  } else {
    alertStore.error = "Invalid Secret Code";
  }
};

const closeDialog = () => {
  alertStore.clear();
  secretCode.value = "";
  dialog.value = false;
};

const fetchRequestedFile = async () => {
  access.value = await fileStore.getRequestedFile(props.file?.id ?? 0)
}

const Interval = setInterval(() => {
  (async () => {
    await fetchRequestedFile()
  })()
}, 10000)

onBeforeMount(async() => {
  await fetchRequestedFile()
})

onBeforeUnmount(() => {
  clearInterval(Interval)
})
</script>
