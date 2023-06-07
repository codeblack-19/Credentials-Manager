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
          <p class="text-body-1 font-weight-medium mx-1">
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
          <p class="text-caption text-right text-blue-darken-3 font-italic">
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
          <div class="px-5 text-center">
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
        </v-card>
      </v-dialog>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import FileTypes from "~/types/fileType";
const props = defineProps<{
  file?: FileTypes;
}>();

const alertStore = useAlertStore();
const fileStore = useFileStore();

const dialog = ref<boolean>(false);
const secretCode = ref("");

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
</script>
